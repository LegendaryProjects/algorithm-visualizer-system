function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const binarySearchData = {
  id: 'binarySearch',
  name: 'Binary Search',
  category: 'Searching',
  description: 'Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.',
  defaultInput: {
    array: [2, 3, 4, 10, 40],
    target: 10
  },
  code: {
    cpp: `int binarySearch(int arr[], int l, int r, int x) {\n  while (l <= r) {\n    int m = l + (r - l) / 2;\n    if (arr[m] == x)\n      return m;\n    if (arr[m] < x)\n      l = m + 1;\n    else\n      r = m - 1;\n  }\n  return -1;\n}`,
    java: `int binarySearch(int arr[], int x) {\n  int l = 0, r = arr.length - 1;\n  while (l <= r) {\n    int m = l + (r - l) / 2;\n    if (arr[m] == x)\n      return m;\n    if (arr[m] < x)\n      l = m + 1;\n    else\n      r = m - 1;\n  }\n  return -1;\n}`,
    python: `def binary_search(arr, x):\n  l, r = 0, len(arr) - 1\n  while l <= r:\n    m = l + (r - l) // 2\n    if arr[m] == x:\n      return m\n    elif arr[m] < x:\n      l = m + 1\n    else:\n      r = m - 1\n  return -1`
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const arr = [...input.array];
    const target = input.target;
    
    let l = 0;
    let r = arr.length - 1;

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) {
        return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      }
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { array: arr, l, r, m: null, target, found: null },
      activeLines: { cpp: 1, java: 2, python: 2 },
      ...t('init', { r })
    });

    while (l <= r) {
      steps.push({
        state: { array: arr, l, r, m: null, target, found: null },
        activeLines: { cpp: 2, java: 3, python: 3 },
        ...t('while_cond', { l, r })
      });

      let m = Math.floor(l + (r - l) / 2);

      steps.push({
        state: { array: arr, l, r, m, target, found: null },
        activeLines: { cpp: 3, java: 4, python: 4 },
        ...t('calc_mid', { m })
      });

      steps.push({
        state: { array: arr, l, r, m, target, found: null, comparing: [m] },
        activeLines: { cpp: 4, java: 5, python: 5 },
        ...t('check_match', { m, val: arr[m], target })
      });

      if (arr[m] === target) {
        steps.push({
          state: { array: arr, l, r, m, target, found: m, complete: true },
          activeLines: { cpp: 5, java: 6, python: 6 },
          ...t('found', { m })
        });
        return steps;
      }

      steps.push({
        state: { array: arr, l, r, m, target, found: null, comparing: [m] },
        activeLines: { cpp: 6, java: 7, python: 7 },
        ...t('check_less', { m, val: arr[m], target })
      });

      if (arr[m] < target) {
        l = m + 1;
        steps.push({
          state: { array: arr, l, r, m, target, found: null },
          activeLines: { cpp: 7, java: 8, python: 8 },
          ...t('move_left', { val: arr[m], target, new_l: l })
        });
      } else {
        r = m - 1;
        steps.push({
          state: { array: arr, l, r, m, target, found: null },
          activeLines: { cpp: 9, java: 10, python: 10 },
          ...t('move_right', { val: arr[m], target, new_r: r })
        });
      }
    }

    steps.push({
      state: { array: arr, l, r, m: null, target, found: -1, complete: true },
      activeLines: { cpp: 11, java: 12, python: 11 },
      ...t('not_found', { l, r })
    });

    return steps;
  }
};
