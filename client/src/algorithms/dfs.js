function renderTemplate(template, data) {
  if (!template) return '';
  return template.replace(/\{\{(.+?)\}\}/g, (match, key) => data[key.trim()] !== undefined ? data[key.trim()] : match);
}

// Sample Graph
const buildGraph = () => {
  return {
    nodes: [
      { id: 0, val: '0', x: 400, y: 100 },
      { id: 1, val: '1', x: 250, y: 200 },
      { id: 2, val: '2', x: 550, y: 200 },
      { id: 3, val: '3', x: 150, y: 300 },
      { id: 4, val: '4', x: 350, y: 300 },
      { id: 5, val: '5', x: 450, y: 300 },
      { id: 6, val: '6', x: 650, y: 300 },
    ],
    edges: [
      { id: '0-1', source: 0, target: 1, isDirected: true },
      { id: '0-2', source: 0, target: 2, isDirected: true },
      { id: '1-3', source: 1, target: 3, isDirected: true },
      { id: '1-4', source: 1, target: 4, isDirected: true },
      { id: '2-5', source: 2, target: 5, isDirected: true },
      { id: '2-6', source: 2, target: 6, isDirected: true },
      { id: '4-5', source: 4, target: 5, isDirected: true },
    ],
    adjacencyList: {
      0: [1, 2],
      1: [3, 4],
      2: [5, 6],
      3: [],
      4: [5],
      5: [],
      6: []
    }
  };
};

export const dfsData = {
  id: 'dfs',
  name: 'Depth First Search',
  category: 'Graphs',
  defaultInput: {
    startNode: 0
  },
  generateSteps: function(input, templates = {}) {
    const steps = [];
    let startNode = parseInt(input.startNode, 10);
    if (isNaN(startNode)) startNode = 0;
    
    const graph = buildGraph();
    if (!graph.adjacencyList[startNode]) startNode = 0;

    const t = (stepId, data) => {
      const tmpl = templates[stepId];
      if (!tmpl) return { explanation: `Step: ${stepId}`, narration: `Step: ${stepId}` };
      return {
        explanation: renderTemplate(tmpl.explanation, data),
        narration: renderTemplate(tmpl.narration, data)
      };
    };

    steps.push({
      state: { graph },
      activeLines: { cpp: 1, java: 1, python: 1 },
      ...t('init', { startNode })
    });

    let visited = new Set();
    let result = [];
    let foundNodeIds = [];
    let pathEdgeIds = [];

    const dfsUtil = (u) => {
      visited.add(u);
      result.push(u);
      foundNodeIds.push(u);

      steps.push({
        state: { graph, activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 2, java: 2, python: 2 },
        ...t('visit', { node: u })
      });

      for (let v of graph.adjacencyList[u]) {
        const edgeId = `${u}-${v}`;
        
        steps.push({
          state: { graph, activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
          activeLines: { cpp: 3, java: 3, python: 3 },
          ...t('neighbor', { node: u, neighbor: v })
        });

        if (!visited.has(v)) {
          pathEdgeIds.push(edgeId);
          steps.push({
            state: { graph, activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
            activeLines: { cpp: 5, java: 5, python: 5 },
            ...t('recurse', { neighbor: v })
          });
          dfsUtil(v);
        } else {
          steps.push({
            state: { graph, activeNodeId: u, comparingNodeIds: [v], foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds], activeEdgeIds: [edgeId] },
            activeLines: { cpp: 4, java: 4, python: 4 },
            ...t('skip', { neighbor: v })
          });
        }
      }

      steps.push({
        state: { graph, activeNodeId: u, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
        activeLines: { cpp: 6, java: 6, python: 1 },
        ...t('backtrack', { node: u })
      });
    };

    dfsUtil(startNode);

    steps.push({
      state: { graph, complete: true, foundNodeIds: [...foundNodeIds], pathEdgeIds: [...pathEdgeIds] },
      activeLines: { cpp: 10, java: 10, python: 8 },
      ...t('complete', { result: result.join(', ') })
    });

    return steps;
  }
};
