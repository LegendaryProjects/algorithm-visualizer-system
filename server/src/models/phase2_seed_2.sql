-- Floyd-Warshall
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'floydWarshall', 
    'Floyd-Warshall', 
    'Dynamic Programming', 
    'The Floyd Warshall Algorithm is for solving the All Pairs Shortest Path problem. The problem is to find shortest distances between every pair of vertices in a given edge weighted directed Graph.', 
    '{"time": "O(V³)", "space": "O(V²)"}',
    'void floydWarshall(int graph[V][V]) {\n    int dist[V][V], i, j, k;\n    for (i = 0; i < V; i++)\n        for (j = 0; j < V; j++)\n            dist[i][j] = graph[i][j];\n    for (k = 0; k < V; k++) {\n        for (i = 0; i < V; i++) {\n            for (j = 0; j < V; j++) {\n                if (dist[i][k] + dist[k][j] < dist[i][j])\n                    dist[i][j] = dist[i][k] + dist[k][j];\n            }\n        }\n    }\n}',
    'void floydWarshall(int graph[][]) {\n    int dist[][] = new int[V][V];\n    int i, j, k;\n    for (i = 0; i < V; i++)\n        for (j = 0; j < V; j++)\n            dist[i][j] = graph[i][j];\n    for (k = 0; k < V; k++) {\n        for (i = 0; i < V; i++) {\n            for (j = 0; j < V; j++) {\n                if (dist[i][k] + dist[k][j] < dist[i][j])\n                    dist[i][j] = dist[i][k] + dist[k][j];\n            }\n        }\n    }\n}',
    'def floydWarshall(graph):\n    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))\n    for k in range(V):\n        for i in range(V):\n            for j in range(V):\n                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('floydWarshall', 'vertices', 'Number of Vertices', 'number', '4', 1, 'Number of vertices in the graph');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('floydWarshall', 'init', 'Initialize distance matrix same as input graph.', 'Initializing distance matrix.'),
    ('floydWarshall', 'k_loop', 'Considering vertex {{k}} as an intermediate vertex.', 'Considering intermediate vertex.'),
    ('floydWarshall', 'compare', 'Checking if path from {{i}} to {{j}} via {{k}} is shorter than direct path.', 'Checking intermediate path.'),
    ('floydWarshall', 'update', 'Found shorter path ({{new_dist}}). Updating dist[{{i}}][{{j}}].', 'Found shorter path, updating.'),
    ('floydWarshall', 'no_update', 'Current path ({{old_dist}}) is shorter or equal.', 'Current path is shorter.'),
    ('floydWarshall', 'complete', 'All pairs shortest paths computed.', 'Floyd Warshall complete.');

-- A* Search (Grid)
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'aStar', 
    'A* Search (Grid)', 
    'Pathfinding', 
    'A* is a graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and optimal efficiency.', 
    '{"time": "O(E)", "space": "O(V)"}',
    '// Standard A* implementation for grid',
    '// Standard A* implementation for grid',
    '# Standard A* implementation for grid'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('aStar', 'gridSize', 'Grid Size (N)', 'number', '5', 1, 'Size of the NxN grid');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('aStar', 'init', 'Initialize A* search on {{n}}x{{n}} grid.', 'Initializing A* search.'),
    ('aStar', 'current', 'Evaluating cell ({{r}}, {{c}}).', 'Evaluating current cell.'),
    ('aStar', 'neighbor', 'Checking neighbor ({{r}}, {{c}}).', 'Checking neighbor.'),
    ('aStar', 'update', 'Found better path to neighbor. Updating costs.', 'Updating neighbor costs.'),
    ('aStar', 'found', 'Reached target cell!', 'Target reached!'),
    ('aStar', 'path', 'Backtracking to find optimal path.', 'Highlighting path.'),
    ('aStar', 'complete', 'A* Search complete.', 'A* Search complete.');

