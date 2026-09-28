function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const dutchNationalFlagData = {
  id: 'dutchNationalFlag',
  name: 'Dutch National Flag',
  category: 'Two Pointers',
  defaultInput: {
    array: [0, 1, 1, 0, 1, 2, 1, 2, 0, 0]
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

    let lo = 0;
    let hi = n - 1;
    let mid = 0;

    steps.push({
      state: { array: [...arr], lo, mid, hi },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', {})
    });

    while (mid <= hi) {
      if (arr[mid] === 0) {
        let temp = arr[lo];
        arr[lo] = arr[mid];
        arr[mid] = temp;
        
        steps.push({
          state: { array: [...arr], lo, mid, hi, swappedIndices: [lo, mid] },
          activeLines: { cpp: 7, java: 8, python: 7 },
          ...t('case_0', {})
        });
        
        lo++;
        mid++;
      } else if (arr[mid] === 1) {
        steps.push({
          state: { array: [...arr], lo, mid, hi, comparing: [mid] },
          activeLines: { cpp: 11, java: 15, python: 11 },
          ...t('case_1', {})
        });
        mid++;
      } else {
        let temp = arr[mid];
        arr[mid] = arr[hi];
        arr[hi] = temp;
        
        steps.push({
          state: { array: [...arr], lo, mid, hi, swappedIndices: [mid, hi] },
          activeLines: { cpp: 14, java: 19, python: 13 },
          ...t('case_2', {})
        });
        hi--;
      }
    }

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 18, java: 26, python: 15 },
      ...t('complete', {})
    });

    return steps;
  }
};
