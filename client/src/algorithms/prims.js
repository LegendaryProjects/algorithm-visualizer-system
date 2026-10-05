function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 200, y: 200, distance: Infinity },
      { id: 1, val: '1', x: 400, y: 100, distance: Infinity },
      { id: 2, val: '2', x: 400, y: 300, distance: Infinity },
      { id: 3, val: '3', x: 600, y: 200, distance: Infinity }
    ],
    edges: [
      { id: '0-1', source: 0, target: 1, isDirected: false, weight: 1 },
      { id: '0-2', source: 0, target: 2, isDirected: false, weight: 4 },
      { id: '1-2', source: 1, target: 2, isDirected: false, weight: 2 },
      { id: '1-3', source: 1, target: 3, isDirected: false, weight: 5 },
      { id: '2-3', source: 2, target: 3, isDirected: false, weight: 3 },
    ],
    adjacencyList: {
      0: [{ to: 1, weight: 1 }, { to: 2, weight: 4 }],
      1: [{ to: 0, weight: 1 }, { to: 2, weight: 2 }, { to: 3, weight: 5 }],
      2: [{ to: 0, weight: 4 }, { to: 1, weight: 2 }, { to: 3, weight: 3 }],
      3: [{ to: 1, weight: 5 }, { to: 2, weight: 3 }]
    }
  };
};

export const primsData = {
  id: 'prims',
  name: 'Prim\'s Algorithm (MST)',
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

    let keys = Array(V).fill(Infinity);
    let mstSet = Array(V).fill(false);
    keys[startNode] = 0;
    graph.nodes.find(n => n.id === startNode).distance = 0; // represent key

    steps.push({
      state: { graph: cloneGraph(graph) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { startNode })
    });

    let foundNodeIds = [];
    let pathEdgeIds = [];
    let parent = Array(V).fill(-1);
    let totalCost = 0;

    for (let count = 0; count < V; count++) {
      let minKey = Infinity;
      let u = -1;
      for (let v = 0; v < V; v++) {
        if (!mstSet[v] && keys[v] < minKey) {
          minKey = keys[v];
          u = v;
        }
      }

      mstSet[u] = true;
      foundNodeIds.push(u);
      
      let parentEdge = null;
      if (parent[u] !== -1) {
        parentEdge = `${Math.min(u, parent[u])}-${Math.max(u, parent[u])}`;
        pathEdgeIds.push(parentEdge);
        totalCost += minKey;
      }

      steps.push({
        state: { graph: cloneGraph(graph), activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: parentEdge ? [parentEdge] : [] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('extract_min', { u, weight: minKey })
      });

      for (let edge of graph.adjacencyList[u]) {
        let v = edge.to;
        let weight = edge.weight;
        let edgeId = `${Math.min(u, v)}-${Math.max(u, v)}`;

        if (!mstSet[v]) {
          steps.push({
            state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
            activeLines: { cpp: 3, java: 3, python: 3 },
            ...t('relax', { u, v, weight })
          });

          if (weight < keys[v]) {
            parent[v] = u;
            keys[v] = weight;
            graph.nodes.find(n => n.id === v).distance = keys[v];

            steps.push({
              state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
              activeLines: { cpp: 4, java: 4, python: 4 },
              ...t('update', { v, weight })
            });
          }
        }
      }
    }

    steps.push({
      state: { graph: cloneGraph(graph), complete: true, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
      activeLines: { cpp: 5, java: 5, python: 5 },
      ...t('complete', { cost: totalCost })
    });

    return steps;
  }
};
