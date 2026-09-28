function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

export const floydWarshallData = {
  id: 'floydWarshall',
  name: 'Floyd-Warshall',
  category: 'Dynamic Programming',
  defaultInput: {
    vertices: 4
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let V = input.vertices;
    if (V > 6) V = 6; // Cap for visualizer

    const INF = 999;
    let graph = [
      [0, 5, INF, 10],
      [INF, 0, 3, INF],
      [INF, INF, 0, 1],
      [INF, INF, INF, 0]
    ];
    
    // Adjust matrix size if V changes
    let dist = Array(V).fill().map(() => Array(V).fill(INF));
    for (let i=0; i<V; i++) {
        for (let j=0; j<V; j++) {
            if (i < graph.length && j < graph[i].length) {
                dist[i][j] = graph[i][j];
            } else if (i === j) {
                dist[i][j] = 0;
            } else {
                dist[i][j] = Math.floor(Math.random() * 20) + 1; // Random edge
            }
        }
    }

    let rowLabels = [];
    let colLabels = [];
    for (let i=0; i<V; i++) {
        rowLabels.push(`V${i}`);
        colLabels.push(`V${i}`);
    }

    const formatMatrix = (matrix) => matrix.map(row => row.map(v => v > 100 ? '∞' : v));

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { matrix: formatMatrix(dist), rowLabels, colLabels },
      activeLines: { cpp: 3, java: 3, python: 2 },
      ...t('init', {})
    });

    for (let k = 0; k < V; k++) {
      steps.push({
        state: { matrix: formatMatrix(dist), rowLabels, colLabels },
        activeLines: { cpp: 6, java: 7, python: 3 },
        ...t('k_loop', { k })
      });

      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          let activeCells = [[i, j]];
          let comparingCells = [[i, k], [k, j]];

          steps.push({
            state: { matrix: formatMatrix(dist), rowLabels, colLabels, activeCells, comparingCells },
            activeLines: { cpp: 9, java: 10, python: 6 },
            ...t('compare', { i, j, k })
          });

          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            steps.push({
              state: { matrix: formatMatrix(dist), rowLabels, colLabels, activeCells, comparingCells, swappedIndices: true },
              activeLines: { cpp: 10, java: 11, python: 6 },
              ...t('update', { i, j, new_dist: dist[i][j] })
            });
          } else {
            steps.push({
              state: { matrix: formatMatrix(dist), rowLabels, colLabels, activeCells, comparingCells },
              activeLines: { cpp: 9, java: 10, python: 6 },
              ...t('no_update', { old_dist: dist[i][j] > 100 ? 'INF' : dist[i][j] })
            });
          }
        }
      }
    }

    steps.push({
      state: { matrix: formatMatrix(dist), rowLabels, colLabels, complete: true },
      activeLines: { cpp: 14, java: 15, python: 6 },
      ...t('complete', {})
    });

    return steps;
  }
};
