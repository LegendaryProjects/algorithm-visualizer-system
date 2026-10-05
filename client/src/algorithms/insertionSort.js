function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const insertionSortData = {
  id: 'insertionSort',
  name: 'Insertion Sort',
  category: 'Sorting',
  defaultInput: {
    array: [12, 11, 13, 5, 6, 90, 45, 78, 3, 50]
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
      state: { array: [...arr], n, i: 1, sortedIndex: 0 },
      activeLines: { cpp: 1, java: 2, python: 2 },
      ...t('init', {})
    });

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      steps.push({
        state: { array: [...arr], n, i, j, key, sortedIndex: i - 1, comparing: [i] },
        activeLines: { cpp: 3, java: 4, python: 4 },
        ...t('pick_key', { key, i })
      });

      while (j >= 0 && arr[j] > key) {
        steps.push({
          state: { array: [...arr], n, i, j, key, sortedIndex: i - 1, comparing: [j, j+1] },
          activeLines: { cpp: 5, java: 6, python: 6 },
          ...t('compare', { key, val: arr[j] })
        });

        arr[j + 1] = arr[j];
        
        steps.push({
          state: { array: [...arr], n, i, j, key, sortedIndex: i - 1, swappedIndices: [j, j+1] },
          activeLines: { cpp: 6, java: 7, python: 7 },
          ...t('shift', { key, val: arr[j] })
        });
        
        j = j - 1;
      }
      
      if (j >= 0) {
         steps.push({
          state: { array: [...arr], n, i, j, key, sortedIndex: i - 1, comparing: [j] },
          activeLines: { cpp: 5, java: 6, python: 6 },
          ...t('compare', { key, val: arr[j] })
        });
      }

      arr[j + 1] = key;
      
      steps.push({
        state: { array: [...arr], n, i, j, key, sortedIndex: i, swappedIndices: [j+1] },
        activeLines: { cpp: 9, java: 10, python: 9 },
        ...t('insert', { key })
      });
    }

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 11, java: 12, python: 9 },
      ...t('complete', {})
    });

    return steps;
  }
};
