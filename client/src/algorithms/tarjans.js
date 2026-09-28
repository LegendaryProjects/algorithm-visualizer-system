function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 200, y: 150 },
      { id: 1, val: '1', x: 400, y: 150 },
      { id: 2, val: '2', x: 300, y: 250 },
      { id: 3, val: '3', x: 500, y: 250 },
      { id: 4, val: '4', x: 600, y: 150 }
    ],
    edges: [
      { id: '0-1', source: 0, target: 1, isDirected: true },
      { id: '1-2', source: 1, target: 2, isDirected: true },
      { id: '2-0', source: 2, target: 0, isDirected: true },
      { id: '1-3', source: 1, target: 3, isDirected: true },
      { id: '3-4', source: 3, target: 4, isDirected: true },
      { id: '4-3', source: 4, target: 3, isDirected: true },
    ],
    adjacencyList: {
      0: [1],
      1: [2, 3],
      2: [0],
      3: [4],
      4: [3]
    }
  };
};

export const tarjansData = {
  id: 'tarjans',
  name: 'Tarjan\'s Algorithm (SCC)',
  category: 'Graphs',
  defaultInput: {
    run: 1
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const graph = buildGraph();
    let V = graph.nodes.length;

    const cloneGraph = (g) => ({
      nodes: g.nodes.map(n => ({...n})),
      edges: g.edges.map(e => ({...e})),
      adjacencyList: g.adjacencyList
    });

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { graph: cloneGraph(graph) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', {})
    });

    let time = 0;
    let disc = Array(V).fill(-1);
    let low = Array(V).fill(-1);
    let inStack = Array(V).fill(false);
    let stack = [];
    let sccCount = 0;
    
    let pathEdgeIds = [];
    let foundNodeIds = [];

    const tarjanSCC = (u) => {
      disc[u] = low[u] = ++time;
      stack.push(u);
      inStack[u] = true;

      graph.nodes[u].distance = `L:${low[u]} D:${disc[u]}`; // Reusing distance to show low/disc values

      steps.push({
        state: { graph: cloneGraph(graph), activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('visit', { u })
      });

      for (let v of graph.adjacencyList[u]) {
        const edgeId = `${u}-${v}`;
        
        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 3, java: 3, python: 3 },
          ...t('neighbor', { u, v })
        });

        if (disc[v] === -1) {
          pathEdgeIds.push(edgeId);
          tarjanSCC(v);
          low[u] = Math.min(low[u], low[v]);
          graph.nodes[u].distance = `L:${low[u]} D:${disc[u]}`;
          
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
            activeLines: { cpp: 4, java: 4, python: 4 },
            ...t('update_low', { u, v })
          });
        } else if (inStack[v]) {
          low[u] = Math.min(low[u], disc[v]);
          graph.nodes[u].distance = `L:${low[u]} D:${disc[u]}`;
          
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
            activeLines: { cpp: 4, java: 4, python: 4 },
            ...t('update_low', { u, v })
          });
        }
      }

      if (low[u] === disc[u]) {
        sccCount++;
        let w = -1;
        while (w !== u) {
          w = stack.pop();
          inStack[w] = false;
          if (!foundNodeIds.includes(w)) foundNodeIds.push(w);
        }

        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
          activeLines: { cpp: 5, java: 5, python: 5 },
          ...t('scc_found', { u })
        });
      }
    };

    for (let i = 0; i < V; i++) {
      if (disc[i] === -1) {
        tarjanSCC(i);
      }
    }

    steps.push({
      state: { graph: cloneGraph(graph), complete: true, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
      activeLines: { cpp: 6, java: 6, python: 6 },
      ...t('complete', { count: sccCount })
    });

    return steps;
  }
};
