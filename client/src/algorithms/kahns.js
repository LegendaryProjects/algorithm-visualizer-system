function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 200, y: 150, inDegree: 0 },
      { id: 1, val: '1', x: 200, y: 250, inDegree: 0 },
      { id: 2, val: '2', x: 400, y: 150, inDegree: 2 },
      { id: 3, val: '3', x: 400, y: 250, inDegree: 1 },
      { id: 4, val: '4', x: 600, y: 200, inDegree: 2 }
    ],
    edges: [
      { id: '0-2', source: 0, target: 2, isDirected: true },
      { id: '1-2', source: 1, target: 2, isDirected: true },
      { id: '1-3', source: 1, target: 3, isDirected: true },
      { id: '2-4', source: 2, target: 4, isDirected: true },
      { id: '3-4', source: 3, target: 4, isDirected: true },
    ],
    adjacencyList: {
      0: [2],
      1: [2, 3],
      2: [4],
      3: [4],
      4: []
    }
  };
};

export const kahnsData = {
  id: 'kahns',
  name: 'Kahn\'s Algorithm (Topological Sort)',
  category: 'Graphs',
  defaultInput: {
    run: 1
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    const graph = buildGraph();
    let V = graph.nodes.length;
    let inDegree = Array(V).fill(0);

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

    for (let u = 0; u < V; u++) {
      for (let v of graph.adjacencyList[u]) {
        inDegree[v]++;
      }
    }

    let queue = [];
    for (let i = 0; i < V; i++) {
      graph.nodes[i].distance = `In-degree: ${inDegree[i]}`; // Reuse distance field to show in-degree
      if (inDegree[i] === 0) {
        queue.push(i);
        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: i },
          activeLines: { cpp: 2, java: 2, python: 2 },
          ...t('enqueue', { node: i })
        });
      }
    }

    let topoOrder = [];
    let foundNodeIds = [];
    let pathEdgeIds = [];

    while (queue.length > 0) {
      let u = queue.shift();
      topoOrder.push(u);
      foundNodeIds.push(u);

      steps.push({
        state: { graph: cloneGraph(graph), activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 3, java: 3, python: 3 },
        ...t('process', { node: u })
      });

      for (let v of graph.adjacencyList[u]) {
        inDegree[v]--;
        graph.nodes[v].distance = `In-degree: ${inDegree[v]}`;
        const edgeId = `${u}-${v}`;
        pathEdgeIds.push(edgeId);

        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 4, java: 4, python: 4 },
          ...t('reduce', { node: u, neighbor: v })
        });

        if (inDegree[v] === 0) {
          queue.push(v);
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: v, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
            activeLines: { cpp: 2, java: 2, python: 2 },
            ...t('enqueue', { node: v })
          });
        }
      }
    }

    steps.push({
      state: { graph: cloneGraph(graph), complete: true, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
      activeLines: { cpp: 5, java: 5, python: 5 },
      ...t('complete', { result: topoOrder.join(', ') })
    });

    return steps;
  }
};
