function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const bubbleSortData = {
  id: 'bubbleSort',
  name: 'Bubble Sort',
  category: 'Sorting',
  description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  defaultInput: {
    array: [64, 34, 25, 12, 22, 11, 90, 45, 78, 3]
  },
  code: {
    cpp: `void bubbleSort(int arr[], int n) {\n  bool swapped;\n  for (int i = 0; i < n - 1; i++) {\n    swapped = false;\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        swap(arr[j], arr[j + 1]);\n        swapped = true;\n      }\n    }\n    if (swapped == false)\n      break;\n  }\n}`,
    java: `void bubbleSort(int arr[]) {\n  int n = arr.length;\n  boolean swapped;\n  for (int i = 0; i < n - 1; i++) {\n    swapped = false;\n    for (int j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        int temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n        swapped = true;\n      }\n    }\n    if (swapped == false)\n      break;\n  }\n}`,
    python: `def bubble_sort(arr):\n  n = len(arr)\n  for i in range(n - 1):\n    swapped = False\n    for j in range(0, n - i - 1):\n      if arr[j] > arr[j + 1]:\n        arr[j], arr[j + 1] = arr[j + 1], arr[j]\n        swapped = True\n    if not swapped:\n      break`
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let arr = [...input.array];
    let n = arr.length;

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) {
        // Fallback for development if templates not loaded
        return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      }
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { array: [...arr], n, i: 0, j: 0, swapped: false },
      activeLines: { cpp: 2, java: 3, python: 4 },
      ...t('init', {})
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      steps.push({
        state: { array: [...arr], n, i, j: 0, swapped },
        activeLines: { cpp: 3, java: 4, python: 3 },
        ...t('outer_loop', { pass: i + 1 })
      });

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          state: { array: [...arr], n, i, j, swapped, comparing: [j, j+1] },
          activeLines: { cpp: 6, java: 7, python: 6 },
          ...t('compare', { j, jPlus1: j + 1, val1: arr[j], val2: arr[j+1] })
        });

        if (arr[j] > arr[j + 1]) {
          steps.push({
            state: { array: [...arr], n, i, j, swapped, comparing: [j, j+1] },
            activeLines: { cpp: 7, java: 8, python: 7 },
            ...t('swap', { val1: arr[j], val2: arr[j+1] })
          });

          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;

          steps.push({
            state: { array: [...arr], n, i, j, swapped, swappedIndices: [j, j+1] },
            activeLines: { cpp: 8, java: 11, python: 8 },
            ...t('set_swapped', {})
          });
        } else {
          steps.push({
            state: { array: [...arr], n, i, j, swapped },
            activeLines: { cpp: 6, java: 7, python: 6 },
            ...t('no_swap', { val1: arr[j], val2: arr[j+1] })
          });
        }
      }

      steps.push({
        state: { array: [...arr], n, i, swapped, sortedIndex: n - i - 1 },
        activeLines: { cpp: 12, java: 14, python: 9 },
        ...t('check_swaps', {})
      });

      if (!swapped) {
        steps.push({
          state: { array: [...arr], n, i, swapped, complete: true },
          activeLines: { cpp: 13, java: 15, python: 10 },
          ...t('early_break', {})
        });
        break;
      }
    }

    steps.push({
      state: { array: [...arr], complete: true },
      activeLines: { cpp: 15, java: 17, python: 10 },
      ...t('complete', {})
    });

    return steps;
  }
};
