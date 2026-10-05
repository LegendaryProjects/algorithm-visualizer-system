function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildBST = (arr) => {
  if (!arr || arr.length === 0) return null;
  let idCounter = 1;
  const root = { id: idCounter++, val: arr[0], left: null, right: null };
  
  for (let i = 1; i < arr.length; i++) {
    let curr = root;
    let val = arr[i];
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = { id: idCounter++, val, left: null, right: null }; break; }
        else curr = curr.left;
      } else {
        if (!curr.right) { curr.right = { id: idCounter++, val, left: null, right: null }; break; }
        else curr = curr.right;
      }
    }
  }
  return root;
};

export const bstData = {
  id: 'bst',
  name: 'BST Operations',
  category: 'Trees',
  defaultInput: {
    target: 40
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const target = parseInt(input.target, 10) || 40;
    
    // Build a sample tree
    const arr = [50, 30, 20, 40, 70, 60, 80];
    const treeRoot = buildBST(arr);

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
      activeLines: { cpp: 10, java: 11, python: 15 },
      ...t('init', { target })
    });

    let curr = treeRoot;
    while (curr) {
      steps.push({
        state: { treeRoot, activeNodeId: curr.id, comparingNodeIds: [curr.id] },
        activeLines: { cpp: 11, java: 12, python: 16 },
        ...t('compare', { target, val: curr.val })
      });

      if (curr.val === target) {
        steps.push({
          state: { treeRoot, activeNodeId: curr.id, foundNodeIds: [curr.id] },
          activeLines: { cpp: 12, java: 13, python: 17 },
          ...t('found', { target, val: curr.val })
        });
        break;
      } else if (target < curr.val) {
        steps.push({
          state: { treeRoot, activeNodeId: curr.id },
          activeLines: { cpp: 15, java: 16, python: 20 },
          ...t('go_left', { target, val: curr.val })
        });
        curr = curr.left;
      } else {
        steps.push({
          state: { treeRoot, activeNodeId: curr.id },
          activeLines: { cpp: 13, java: 14, python: 18 },
          ...t('go_right', { target, val: curr.val })
        });
        curr = curr.right;
      }
    }

    if (!curr) {
      steps.push({
        state: { treeRoot },
        activeLines: { cpp: 11, java: 12, python: 16 },
        ...t('not_found', { target })
      });
    }

    steps.push({
      state: { treeRoot, complete: true, foundNodeIds: curr ? [curr.id] : [] },
      activeLines: { cpp: 16, java: 17, python: 20 },
      ...t('complete', {})
    });

    return steps;
  }
};
