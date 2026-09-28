function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildTrie = (words) => {
  let idCounter = 1;
  const root = { id: idCounter++, val: 'Root', children: [], isEndOfWord: false };
  
  for (let word of words) {
    let curr = root;
    for (let char of word) {
      let child = curr.children.find(c => c.edgeLabel === char);
      if (!child) {
        child = { id: idCounter++, val: '', edgeLabel: char, children: [], isEndOfWord: false };
        curr.children.push(child);
      }
      curr = child;
    }
    curr.val = 'EOW';
    curr.isEndOfWord = true;
  }
  return root;
};

export const trieData = {
  id: 'trie',
  name: 'Trie (Prefix Tree)',
  category: 'Trees',
  defaultInput: {
    word: 'app'
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const word = (input.word || 'app').toLowerCase();
    
    // Build a sample Trie
    const words = ["apple", "app", "ape", "bat", "ball"];
    const treeRoot = buildTrie(words);

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { treeRoot },
      activeLines: { cpp: 11, java: 12, python: 9 },
      ...t('init', { word })
    });

    let curr = treeRoot;
    let foundNodeIds = [curr.id];
    let isFound = true;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      
      steps.push({
        state: { treeRoot, activeNodeId: curr.id, foundNodeIds: [...foundNodeIds] },
        activeLines: { cpp: 13, java: 14, python: 11 },
        ...t('char', { char })
      });

      let child = curr.children.find(c => c.edgeLabel === char);
      if (child) {
        curr = child;
        foundNodeIds.push(curr.id);
        steps.push({
          state: { treeRoot, activeNodeId: curr.id, foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 16, java: 17, python: 14 },
          ...t('found_char', { char })
        });
      } else {
        isFound = false;
        steps.push({
          state: { treeRoot, activeNodeId: curr.id, comparingNodeIds: [curr.id], foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 15, java: 16, python: 13 },
          ...t('not_found_char', { char })
        });
        break;
      }
    }

    if (isFound) {
      if (curr.isEndOfWord) {
        steps.push({
          state: { treeRoot, activeNodeId: curr.id, foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 18, java: 19, python: 15 },
          ...t('end_word_true', {})
        });
      } else {
        steps.push({
          state: { treeRoot, activeNodeId: curr.id, comparingNodeIds: [curr.id], foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 18, java: 19, python: 15 },
          ...t('end_word_false', {})
        });
      }
    }

    steps.push({
      state: { treeRoot, complete: true, foundNodeIds: [...foundNodeIds] },
      activeLines: { cpp: 19, java: 20, python: 16 },
      ...t('complete', {})
    });

    return steps;
  }
};
