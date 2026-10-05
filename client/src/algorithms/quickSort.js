function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const quickSortData = {
  id: 'quickSort',
  name: 'Quick Sort',
  category: 'Sorting',
  defaultInput: {
    array: [10, 80, 30, 90, 40, 50, 70, 20, 60, 100]
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let arr = [...input.array];

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { array: [...arr], low: 0, high: arr.length - 1 },
      activeLines: { cpp: 13, java: 16, python: 10 },
      ...t('init', {})
    });

    function partition(low, high) {
      let pivot = arr[high];
      let i = low - 1;
      
      steps.push({
        state: { array: [...arr], low, high, pivot, i },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('partition_start', { low, high, pivot })
      });

      for (let j = low; j <= high - 1; j++) {
        steps.push({
          state: { array: [...arr], low, high, pivot, i, j, comparing: [j, high] },
          activeLines: { cpp: 5, java: 5, python: 5 },
          ...t('compare', { val: arr[j], pivot })
        });

        if (arr[j] < pivot) {
          i++;
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          
          steps.push({
            state: { array: [...arr], low, high, pivot, i, j, swappedIndices: [i, j] },
            activeLines: { cpp: 7, java: 9, python: 7 },
            ...t('swap_smaller', { val: arr[i] })
          });
        }
      }

      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      
      steps.push({
        state: { array: [...arr], low, high, pivot, i, swappedIndices: [i + 1, high] },
        activeLines: { cpp: 10, java: 14, python: 8 },
        ...t('pivot_place', { pivot })
      });

      return i + 1;
    }

    function quickSortRecursive(low, high) {
      if (low < high) {
        let pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    }

    quickSortRecursive(0, arr.length - 1);

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 17, java: 20, python: 13 },
      ...t('complete', {})
    });

    return steps;
  }
};
