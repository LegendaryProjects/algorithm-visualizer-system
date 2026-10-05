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

export const treeTraversalsData = {
  id: 'treeTraversals',
  name: 'Tree Traversals',
  category: 'Trees',
  defaultInput: {
    order: 'inorder' // inorder, preorder, postorder
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const order = (input.order || 'inorder').toLowerCase();
    
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
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { order })
    });

    let result = [];
    let foundNodeIds = [];

    const traverse = (node) => {
      if (!node) return;

      steps.push({
        state: { treeRoot, activeNodeId: node.id, foundNodeIds: [...foundNodeIds] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('visit', { val: node.val })
      });

      if (order === 'preorder') {
        result.push(node.val);
        foundNodeIds.push(node.id);
        steps.push({
          state: { treeRoot, activeNodeId: node.id, foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 9, java: 9, python: 8 },
          ...t('process', { val: node.val })
        });
      }

      traverse(node.left);

      if (order === 'inorder') {
        result.push(node.val);
        foundNodeIds.push(node.id);
        steps.push({
          state: { treeRoot, activeNodeId: node.id, foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 4, java: 4, python: 4 },
          ...t('process', { val: node.val })
        });
      }

      traverse(node.right);

      if (order === 'postorder') {
        result.push(node.val);
        foundNodeIds.push(node.id);
        steps.push({
          state: { treeRoot, activeNodeId: node.id, foundNodeIds: [...foundNodeIds] },
          activeLines: { cpp: 16, java: 16, python: 15 },
          ...t('process', { val: node.val })
        });
      }
    };

    traverse(treeRoot);

    steps.push({
      state: { treeRoot, complete: true, foundNodeIds: [...foundNodeIds] },
      activeLines: { cpp: 6, java: 6, python: 5 },
      ...t('complete', { result: result.join(', ') })
    });

    return steps;
  }
};
