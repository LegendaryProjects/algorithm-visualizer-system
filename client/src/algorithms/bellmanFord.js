function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 200, y: 150, distance: Infinity },
      { id: 1, val: '1', x: 400, y: 50, distance: Infinity },
      { id: 2, val: '2', x: 400, y: 250, distance: Infinity },
      { id: 3, val: '3', x: 600, y: 150, distance: Infinity }
    ],
    edges: [
      { id: '0-1', source: 0, target: 1, isDirected: true, weight: 4 },
      { id: '0-2', source: 0, target: 2, isDirected: true, weight: 5 },
      { id: '1-3', source: 1, target: 3, isDirected: true, weight: 3 },
      { id: '2-1', source: 2, target: 1, isDirected: true, weight: -2 }, // Negative weight edge!
      { id: '2-3', source: 2, target: 3, isDirected: true, weight: 4 },
    ]
  };
};

export const bellmanFordData = {
  id: 'bellmanFord',
  name: 'Bellman-Ford Algorithm',
  category: 'Graphs',
  defaultInput: {
    startNode: 0
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let startNode = parseInt(input.startNode, 10);
    if (isNaN(startNode)) startNode = 0;
    
    let graph = buildGraph();
    let V = graph.nodes.length;
    let E = graph.edges.length;

    const cloneGraph = (g) => ({
      nodes: g.nodes.map(n => ({...n})),
      edges: g.edges.map(e => ({...e}))
    });

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    let distances = Array(V).fill(Infinity);
    distances[startNode] = 0;
    graph.nodes.find(n => n.id === startNode).distance = 0;

    steps.push({
      state: { graph: cloneGraph(graph) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { startNode })
    });

    let foundNodeIds = [startNode];
    let pathEdgeIds = [];

    // Relax all edges V-1 times
    for (let i = 1; i <= V - 1; i++) {
      steps.push({
        state: { graph: cloneGraph(graph), foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('iteration', { i, "V-1": V - 1 })
      });

      for (let j = 0; j < E; j++) {
        let edge = graph.edges[j];
        let u = edge.source;
        let v = edge.target;
        let weight = edge.weight;

        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edge.id] },
          activeLines: { cpp: 3, java: 3, python: 3 },
          ...t('relax', { u, v, weight })
        });

        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          graph.nodes.find(n => n.id === v).distance = distances[v];
          
          if (!foundNodeIds.includes(v)) foundNodeIds.push(v);
          
          // Basic visualization to keep latest path
          pathEdgeIds = pathEdgeIds.filter(eId => !eId.endsWith(`-${v}`)); 
          pathEdgeIds.push(edge.id);

          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edge.id] },
            activeLines: { cpp: 4, java: 4, python: 4 },
            ...t('update', { v, old: distances[v] === Infinity ? 'INF' : distances[v] - weight, new: distances[v] })
          });
        } else {
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edge.id] },
            activeLines: { cpp: 5, java: 5, python: 5 },
            ...t('skip', { v })
          });
        }
      }
    }

    steps.push({
      state: { graph: cloneGraph(graph), complete: true, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
      activeLines: { cpp: 6, java: 6, python: 6 },
      ...t('complete', {})
    });

    return steps;
  }
};
