function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const nQueensData = {
  id: 'nQueens',
  name: 'N-Queens Problem',
  category: 'Backtracking',
  defaultInput: {
    n: 4
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let n = input.n;
    if (n > 8) n = 8; // Cap for visualizer

    let board = Array(n).fill().map(() => Array(n).fill(0));
    
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
      state: { matrix: cloneMatrix(board) },
      activeLines: { cpp: 9, java: 9, python: 12 },
      ...t('init', { n })
    });

    function isSafe(r, c) {
      for (let i = 0; i < c; i++) {
        if (board[r][i] === 1) return false;
      }
      for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
      }
      for (let i = r, j = c; j >= 0 && i < n; i++, j--) {
        if (board[i][j] === 1) return false;
      }
      return true;
    }

    let solved = false;
    function solveNQUtil(col) {
      if (solved) return true;
      if (col >= n) {
        solved = true;
        return true;
      }

      for (let i = 0; i < n; i++) {
        if (solved) return true;

        steps.push({
          state: { matrix: cloneMatrix(board), activeCells: [[i, col]] },
          activeLines: { cpp: 12, java: 12, python: 15 },
          ...t('try', { r: i, c: col })
        });

        if (isSafe(i, col)) {
          board[i][col] = 1;
          steps.push({
            state: { matrix: cloneMatrix(board), pathCells: [[i, col]] },
            activeLines: { cpp: 13, java: 13, python: 16 },
            ...t('safe', {})
          });

          if (solveNQUtil(col + 1)) return true;

          board[i][col] = 0;
          steps.push({
            state: { matrix: cloneMatrix(board), comparingCells: [[i, col]] },
            activeLines: { cpp: 15, java: 15, python: 18 },
            ...t('backtrack', { r: i, c: col })
          });
        } else {
          steps.push({
            state: { matrix: cloneMatrix(board), comparingCells: [[i, col]] },
            activeLines: { cpp: 11, java: 11, python: 14 },
            ...t('unsafe', {})
          });
        }
      }
      return false;
    }

    solveNQUtil(0);

    steps.push({
      state: { matrix: cloneMatrix(board), complete: true },
      activeLines: { cpp: 18, java: 18, python: 19 },
      ...t('complete', { n })
    });

    return steps;
  }
};
