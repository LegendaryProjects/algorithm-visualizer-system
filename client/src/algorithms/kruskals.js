function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 200, y: 200 },
      { id: 1, val: '1', x: 400, y: 100 },
      { id: 2, val: '2', x: 400, y: 300 },
      { id: 3, val: '3', x: 600, y: 200 }
    ],
    edges: [
      { id: '0-1', source: 0, target: 1, isDirected: false, weight: 1 },
      { id: '0-2', source: 0, target: 2, isDirected: false, weight: 4 },
      { id: '1-2', source: 1, target: 2, isDirected: false, weight: 2 },
      { id: '1-3', source: 1, target: 3, isDirected: false, weight: 5 },
      { id: '2-3', source: 2, target: 3, isDirected: false, weight: 3 },
    ]
  };
};

export const kruskalsData = {
  id: 'kruskals',
  name: 'Kruskal\'s Algorithm (MST)',
  category: 'Graphs',
  defaultInput: {
    run: 1
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let graph = buildGraph();
    let V = graph.nodes.length;

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

    steps.push({
      state: { graph: cloneGraph(graph) },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', {})
    });

    let parent = Array(V).fill().map((_, i) => i);
    const find = (i) => {
      if (parent[i] === i) return i;
      return parent[i] = find(parent[i]);
    };
    const union = (i, j) => {
      let rootI = find(i);
      let rootJ = find(j);
      parent[rootI] = rootJ;
    };

    let edges = [...graph.edges].sort((a, b) => a.weight - b.weight);
    let pathEdgeIds = [];
    let foundNodeIds = [];
    let totalCost = 0;

    for (let edge of edges) {
      let u = edge.source;
      let v = edge.target;
      let edgeId = edge.id;

      steps.push({
        state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('check_edge', { u, v, weight: edge.weight })
      });

      let rootU = find(u);
      let rootV = find(v);

      if (rootU !== rootV) {
        union(u, v);
        totalCost += edge.weight;
        pathEdgeIds.push(edgeId);
        if (!foundNodeIds.includes(u)) foundNodeIds.push(u);
        if (!foundNodeIds.includes(v)) foundNodeIds.push(v);

        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 3, java: 3, python: 3 },
          ...t('union', { u, v })
        });
      } else {
        steps.push({
          state: { graph: cloneGraph(graph), activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 4, java: 4, python: 4 },
          ...t('cycle', { u, v })
        });
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
