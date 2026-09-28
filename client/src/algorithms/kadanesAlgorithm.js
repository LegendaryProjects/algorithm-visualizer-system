function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const kadanesAlgorithmData = {
  id: 'kadanesAlgorithm',
  name: "Kadane's Algorithm",
  category: 'Dynamic Programming',
  defaultInput: {
    array: [-2, -3, 4, -1, -2, 1, 5, -3, 6, -4]
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
      state: { array: [...arr] },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', {})
    });

    let max_so_far = -Infinity;
    let max_ending_here = 0;

    for (let i = 0; i < n; i++) {
      max_ending_here = max_ending_here + arr[i];
      
      steps.push({
        state: { array: [...arr], i, max_so_far, max_ending_here, comparing: [i] },
        activeLines: { cpp: 4, java: 5, python: 5 },
        ...t('add', { val: arr[i], meh: max_ending_here })
      });

      if (max_so_far < max_ending_here) {
        max_so_far = max_ending_here;
        steps.push({
          state: { array: [...arr], i, max_so_far, max_ending_here, comparing: [i] },
          activeLines: { cpp: 6, java: 7, python: 7 },
          ...t('update_max', { meh: max_ending_here, msf: max_so_far })
        });
      }

      if (max_ending_here < 0) {
        max_ending_here = 0;
        steps.push({
          state: { array: [...arr], i, max_so_far, max_ending_here },
          activeLines: { cpp: 8, java: 9, python: 9 },
          ...t('reset_meh', {})
        });
      } else {
        steps.push({
          state: { array: [...arr], i, max_so_far, max_ending_here },
          activeLines: { cpp: 4, java: 5, python: 5 }, // Just arbitrary active line for visualizing
          ...t('no_reset', {})
        });
      }
    }

    steps.push({
      state: { array: [...arr], max_so_far, complete: true },
      activeLines: { cpp: 10, java: 11, python: 10 },
      ...t('complete', { msf: max_so_far })
    });

    return steps;
  }
};
