function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const lcsData = {
  id: 'lcs',
  name: 'Longest Common Subsequence',
  category: 'Dynamic Programming',
  defaultInput: {
    string1: 'AGGTAB',
    string2: 'GXTXAYB'
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let X = input.string1;
    let Y = input.string2;
    let m = X.length;
    let n = Y.length;

    let L = Array(m + 1).fill().map(() => Array(n + 1).fill(null));
    
    let rowLabels = ['"" (0)'];
    for(let i=0; i<m; i++) rowLabels.push(`${X[i]} (${i+1})`);
    let colLabels = ['"" (0)'];
    for(let j=0; j<n; j++) colLabels.push(`${Y[j]} (${j+1})`);

    const cloneMatrix = (matrix) => matrix.map(row => [...row]);

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { matrix: cloneMatrix(L), rowLabels, colLabels, activeCells: [] },
      activeLines: { cpp: 2, java: 2, python: 2 },
      ...t('init', { m, n })
    });

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        let activeCells = [[i, j]];
        let comparingCells = [];

        if (i === 0 || j === 0) {
          L[i][j] = 0;
          steps.push({
            state: { matrix: cloneMatrix(L), rowLabels, colLabels, activeCells },
            activeLines: { cpp: 5, java: 5, python: 6 },
            ...t('zero', {})
          });
        } else {
          steps.push({
            state: { matrix: cloneMatrix(L), rowLabels, colLabels, activeCells, comparingCells },
            activeLines: { cpp: 6, java: 6, python: 7 },
            ...t('compare', { c1: X[i-1], c2: Y[j-1] })
          });

          if (X[i - 1] === Y[j - 1]) {
            comparingCells.push([i - 1, j - 1]);
            L[i][j] = L[i - 1][j - 1] + 1;
            steps.push({
              state: { matrix: cloneMatrix(L), rowLabels, colLabels, activeCells, comparingCells },
              activeLines: { cpp: 7, java: 7, python: 8 },
              ...t('match', { val: L[i][j] })
            });
          } else {
            comparingCells.push([i - 1, j]);
            comparingCells.push([i, j - 1]);
            L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
            steps.push({
              state: { matrix: cloneMatrix(L), rowLabels, colLabels, activeCells, comparingCells },
              activeLines: { cpp: 9, java: 9, python: 10 },
              ...t('mismatch', { val1: L[i-1][j], val2: L[i][j-1] })
            });
          }
        }
      }
    }

    // Path
    let pathCells = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (X[i - 1] === Y[j - 1]) {
        pathCells.push([i, j]);
        i--; j--;
      } else if (L[i - 1][j] > L[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    steps.push({
      state: { matrix: cloneMatrix(L), rowLabels, colLabels, pathCells, complete: true },
      activeLines: { cpp: 12, java: 12, python: 11 },
      ...t('complete', { ans: L[m][n] })
    });

    return steps;
  }
};
