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
      { id: '0-1', source: 0, target: 1, isDirected: true, weight: 10 },
      { id: '0-2', source: 0, target: 2, isDirected: true, weight: 5 },
      { id: '1-3', source: 1, target: 3, isDirected: true, weight: 1 },
      { id: '2-1', source: 2, target: 1, isDirected: true, weight: 3 },
      { id: '2-3', source: 2, target: 3, isDirected: true, weight: 9 },
    ],
    adjacencyList: {
      0: [{ to: 1, weight: 10 }, { to: 2, weight: 5 }],
      1: [{ to: 3, weight: 1 }],
      2: [{ to: 1, weight: 3 }, { to: 3, weight: 9 }],
      3: []
    }
  };
};

export const dijkstrasData = {
  id: 'dijkstras',
  name: 'Dijkstra\'s Algorithm',
  category: 'Graphs',
  defaultInput: {
    startNode: 0
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let startNode = parseInt(input.startNode, 10);
    if (isNaN(startNode)) startNode = 0;
    
    let graph = buildGraph();
    if (!graph.adjacencyList[startNode]) startNode = 0;

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

    graph.nodes.find(n => n.id === startNode).distance = 0;

    steps.push({
      state: { graph: cloneGraph(graph) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { startNode })
    });

    let distances = { 0: Infinity, 1: Infinity, 2: Infinity, 3: Infinity };
    distances[startNode] = 0;
    
    let pq = [startNode];
    let visited = new Set();
    let foundNodeIds = [];
    let pathEdgeIds = [];

    while (pq.length > 0) {
      // Very simple min-priority queue extraction
      pq.sort((a, b) => distances[a] - distances[b]);
      let u = pq.shift();

      if (visited.has(u)) continue;
      visited.add(u);
      foundNodeIds.push(u);

      steps.push({
        state: { graph: cloneGraph(graph), activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('extract_min', { node: u, dist: distances[u] })
      });

      for (let edge of graph.adjacencyList[u]) {
        let v = edge.to;
        let weight = edge.weight;
        let edgeId = `${u}-${v}`;

        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 3, java: 3, python: 3 },
          ...t('relax', { neighbor: v, weight })
        });

        if (distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          graph.nodes.find(n => n.id === v).distance = distances[v];
          pq.push(v);
          
          if (!pathEdgeIds.includes(edgeId)) {
            pathEdgeIds.push(edgeId);
          }

          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
            activeLines: { cpp: 4, java: 4, python: 4 },
            ...t('update', { neighbor: v, old: distances[v] === Infinity ? 'INF' : distances[v], new: distances[u] + weight })
          });
        } else {
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
            activeLines: { cpp: 5, java: 5, python: 5 },
            ...t('skip', { neighbor: v })
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
