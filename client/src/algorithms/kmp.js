function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const kmpData = {
  id: 'kmp',
  name: 'KMP String Matching',
  category: 'String',
  defaultInput: {
    text: 'ABABDABACDABABCABAB',
    pattern: 'ABABCABAB'
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let txt = input.text;
    let pat = input.pattern;
    let M = pat.length;
    let N = txt.length;

    // Convert strings to arrays of chars just to display them in the visualizer as "array elements"
    let txtArr = txt.split('');
    let patArr = pat.split('');

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { array: txtArr, pattern: patArr, n: N, m: M },
      activeLines: { cpp: 19, java: 20, python: 13 },
      ...t('init', {})
    });

    // Compute LPS
    steps.push({
      state: { array: patArr, n: M },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('lps_start', {})
    });

    let lps = new Array(M).fill(0);
    let len = 0;
    let i = 1;

    while (i < M) {
      if (pat[i] === pat[len]) {
        len++;
        lps[i] = len;
        
        steps.push({
          state: { array: patArr, lps: [...lps], i, len, comparing: [i, len - 1] },
          activeLines: { cpp: 6, java: 7, python: 6 },
          ...t('lps_match', { i, len: len - 1, new_len: len })
        });
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
          steps.push({
            state: { array: patArr, lps: [...lps], i, len, comparing: [i, len] },
            activeLines: { cpp: 11, java: 12, python: 11 },
            ...t('lps_mismatch_fallback', { len: len + 1, new_len: len }) // bit hacky for display text
          });
        } else {
          lps[i] = 0;
          steps.push({
            state: { array: patArr, lps: [...lps], i, len, comparing: [i] },
            activeLines: { cpp: 13, java: 14, python: 13 },
            ...t('lps_mismatch_zero', { i })
          });
          i++;
        }
      }
    }

    steps.push({
      state: { array: txtArr, pattern: patArr, lps: [...lps], n: N, m: M },
      activeLines: { cpp: 24, java: 25, python: 18 },
      ...t('search_start', {})
    });

    i = 0;
    let j = 0;
    while (i < N) {
      if (pat[j] === txt[i]) {
        steps.push({
          state: { array: txtArr, pattern: patArr, i, j, comparing: [i] },
          activeLines: { cpp: 25, java: 27, python: 20 },
          ...t('match', { i, j })
        });
        j++;
        i++;
      }

      if (j === M) {
        steps.push({
          state: { array: txtArr, pattern: patArr, i, j, foundIndices: [i - j] },
          activeLines: { cpp: 30, java: 32, python: 24 },
          ...t('found', { idx: i - j })
        });
        j = lps[j - 1];
      } else if (i < N && pat[j] !== txt[i]) {
        if (j !== 0) {
          j = lps[j - 1];
          steps.push({
            state: { array: txtArr, pattern: patArr, i, j, comparing: [i] },
            activeLines: { cpp: 33, java: 35, python: 27 },
            ...t('mismatch_fallback', { i, j: lps[j], new_j: j })
          });
        } else {
          i++;
          steps.push({
            state: { array: txtArr, pattern: patArr, i, j, comparing: [i - 1] },
            activeLines: { cpp: 35, java: 37, python: 29 },
            ...t('mismatch_zero', { new_i: i })
          });
        }
      }
    }

    steps.push({
      state: { array: txtArr, complete: true },
      activeLines: { cpp: 38, java: 40, python: 30 },
      ...t('complete', {})
    });

    return steps;
  }
};
