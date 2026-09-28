function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const mergeSortData = {
  id: 'mergeSort',
  name: 'Merge Sort',
  category: 'Sorting',
  defaultInput: {
    array: [38, 27, 43, 3, 9, 82, 10, 45, 78, 50]
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
      state: { array: [...arr], l: 0, r: arr.length - 1 },
      activeLines: { cpp: 29, java: 32, python: 25 },
      ...t('init', {})
    });

    function mergeSortRecursive(l, r) {
      if (l >= r) return;
      let m = Math.floor(l + (r - l) / 2);

      steps.push({
        state: { array: [...arr], l, r, m },
        activeLines: { cpp: 30, java: 33, python: 26 },
        ...t('divide', { l, r, m })
      });

      mergeSortRecursive(l, m);
      mergeSortRecursive(m + 1, r);

      steps.push({
        state: { array: [...arr], l, r, m },
        activeLines: { cpp: 33, java: 36, python: 29 },
        ...t('merge_start', { l, m, mPlus1: m + 1, r })
      });

      // Merge logic for simulation tracking
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        steps.push({
          state: { array: [...arr], l, r, m, k, comparing: [l+i, m+1+j] },
          activeLines: { cpp: 10, java: 11, python: 11 },
          ...t('merge_compare', { val1: L[i], val2: R[j] })
        });

        if (L[i] <= R[j]) {
          arr[k] = L[i];
          steps.push({
            state: { array: [...arr], l, r, m, k, swappedIndices: [k] },
            activeLines: { cpp: 11, java: 12, python: 12 },
            ...t('merge_copy', { val: L[i] })
          });
          i++;
        } else {
          arr[k] = R[j];
          steps.push({
            state: { array: [...arr], l, r, m, k, swappedIndices: [k] },
            activeLines: { cpp: 14, java: 15, python: 15 },
            ...t('merge_copy', { val: R[j] })
          });
          j++;
        }
        k++;
      }

      if (i < n1 || j < n2) {
         steps.push({
           state: { array: [...arr], l, r, m, k },
           activeLines: { cpp: 19, java: 20, python: 19 },
           ...t('merge_exhaust', {})
         });
      }

      while (i < n1) {
        arr[k] = L[i];
        steps.push({
          state: { array: [...arr], l, r, m, k, swappedIndices: [k] },
          activeLines: { cpp: 20, java: 21, python: 20 },
          ...t('merge_copy', { val: L[i] })
        });
        i++;
        k++;
      }
      while (j < n2) {
        arr[k] = R[j];
        steps.push({
          state: { array: [...arr], l, r, m, k, swappedIndices: [k] },
          activeLines: { cpp: 24, java: 25, python: 24 },
          ...t('merge_copy', { val: R[j] })
        });
        j++;
        k++;
      }
    }

    mergeSortRecursive(0, arr.length - 1);

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 34, java: 38, python: 30 },
      ...t('complete', {})
    });

    return steps;
  }
};
