function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const knapsackData = {
  id: 'knapsack',
  name: '0/1 Knapsack',
  category: 'Dynamic Programming',
  defaultInput: {
    weights: [1, 2, 3, 5],
    values: [10, 15, 40, 50],
    capacity: 6
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let wt = [...input.weights];
    let val = [...input.values];
    let W = input.capacity;
    let n = wt.length;

    let dp = Array(n + 1).fill().map(() => Array(W + 1).fill(null));
    
    // Labels
    let rowLabels = ['0 (0,0)'];
    for(let i=0; i<n; i++) rowLabels.push(`I${i+1} (${wt[i]},${val[i]})`);
    let colLabels = [];
    for(let w=0; w<=W; w++) colLabels.push(`W=${w}`);

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
      state: { matrix: cloneMatrix(dp), rowLabels, colLabels, activeCells: [] },
      activeLines: { cpp: 2, java: 2, python: 2 },
      ...t('init', { n, W })
    });

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        let activeCells = [[i, w]];
        let comparingCells = [];

        if (i === 0 || w === 0) {
          dp[i][w] = 0;
          steps.push({
            state: { matrix: cloneMatrix(dp), rowLabels, colLabels, activeCells },
            activeLines: { cpp: 5, java: 5, python: 6 },
            ...t('zero_row_col', {})
          });
        } else {
          comparingCells.push([i - 1, w]); // Always look at cell above
          
          steps.push({
            state: { matrix: cloneMatrix(dp), rowLabels, colLabels, activeCells, comparingCells },
            activeLines: { cpp: 6, java: 6, python: 7 },
            ...t('compare', { i, wt: wt[i-1], val: val[i-1], w })
          });

          if (wt[i - 1] <= w) {
            comparingCells.push([i - 1, w - wt[i - 1]]); // Look at cell above and to the left
            let valTaken = val[i - 1] + dp[i - 1][w - wt[i - 1]];
            let valLeft = dp[i - 1][w];
            dp[i][w] = Math.max(valTaken, valLeft);
            
            steps.push({
              state: { matrix: cloneMatrix(dp), rowLabels, colLabels, activeCells, comparingCells },
              activeLines: { cpp: 7, java: 7, python: 8 },
              ...t('take', { val: val[i-1], prev_val_taken: dp[i-1][w-wt[i-1]], prev_val_left: valLeft, new_val: dp[i][w] })
            });
          } else {
            dp[i][w] = dp[i - 1][w];
            steps.push({
              state: { matrix: cloneMatrix(dp), rowLabels, colLabels, activeCells, comparingCells },
              activeLines: { cpp: 9, java: 9, python: 10 },
              ...t('leave', { wt: wt[i-1], w, val: dp[i][w] })
            });
          }
        }
      }
    }

    // Backtrack to find path
    let pathCells = [];
    let res = dp[n][W];
    let w_rem = W;
    for (let i = n; i > 0 && res > 0; i--) {
      if (res === dp[i - 1][w_rem]) {
        continue;
      } else {
        pathCells.push([i, w_rem]);
        res = res - val[i - 1];
        w_rem = w_rem - wt[i - 1];
      }
    }

    steps.push({
      state: { matrix: cloneMatrix(dp), rowLabels, colLabels, pathCells, complete: true },
      activeLines: { cpp: 12, java: 12, python: 11 },
      ...t('complete', { ans: dp[n][W] })
    });

    return steps;
  }
};
