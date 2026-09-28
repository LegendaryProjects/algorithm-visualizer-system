function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const selectionSortData = {
  id: 'selectionSort',
  name: 'Selection Sort',
  category: 'Sorting',
  defaultInput: {
    array: [64, 25, 12, 22, 11, 90, 45, 78, 3, 50]
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let arr = [...input.array];
    let n = arr.length;

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { array: [...arr], n, i: 0 },
      activeLines: { cpp: 1, java: 2, python: 2 },
      ...t('init', {})
    });

    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      
      steps.push({
        state: { array: [...arr], n, i, min_idx, sortedIndex: i - 1 },
        activeLines: { cpp: 3, java: 4, python: 4 },
        ...t('outer_loop', { i, pass: i + 1 })
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          state: { array: [...arr], n, i, j, min_idx, comparing: [j, min_idx], sortedIndex: i - 1 },
          activeLines: { cpp: 5, java: 6, python: 6 },
          ...t('compare', { val: arr[j], minVal: arr[min_idx] })
        });

        if (arr[j] < arr[min_idx]) {
          min_idx = j;
          steps.push({
            state: { array: [...arr], n, i, j, min_idx, comparing: [j, min_idx], sortedIndex: i - 1 },
            activeLines: { cpp: 6, java: 7, python: 7 },
            ...t('new_min', { val: arr[min_idx], j })
          });
        }
      }

      if (min_idx !== i) {
        steps.push({
          state: { array: [...arr], n, i, min_idx, swappedIndices: [i, min_idx], sortedIndex: i - 1 },
          activeLines: { cpp: 10, java: 11, python: 9 },
          ...t('swap', { minVal: arr[min_idx], val: arr[i] })
        });

        // Swap
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;

        steps.push({
          state: { array: [...arr], n, i, min_idx, swappedIndices: [i, min_idx], sortedIndex: i },
          activeLines: { cpp: 10, java: 13, python: 9 },
          ...t('swap', { minVal: arr[i], val: arr[min_idx] }) 
        });
      } else {
        steps.push({
          state: { array: [...arr], n, i, min_idx, sortedIndex: i },
          activeLines: { cpp: 9, java: 10, python: 8 },
          ...t('no_swap', {})
        });
      }
    }

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 14, java: 16, python: 9 },
      ...t('complete', {})
    });

    return steps;
  }
};
