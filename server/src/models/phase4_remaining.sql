-- Kahn's Algorithm
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'kahns', 
    'Kahn''s Algorithm (Topological Sort)', 
    'Graphs', 
    'Kahn''s algorithm finds a topological ordering of a Directed Acyclic Graph (DAG). It works by repeatedly removing nodes with in-degree 0.', 
    '{"time": "O(V + E)", "space": "O(V)"}',
    '// Kahn logic',
    '// Kahn logic',
    '# Kahn logic'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('kahns', 'run', 'Run Algorithm', 'number', '1', 1, 'Click to run Topological Sort');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('kahns', 'init', 'Calculate in-degrees of all nodes.', 'Calculating in-degrees.'),
    ('kahns', 'enqueue', 'Node {{node}} has in-degree 0. Enqueueing.', 'Node has no incoming edges, adding to queue.'),
    ('kahns', 'process', 'Dequeued node {{node}}. Adding to topological order.', 'Adding node to topological order.'),
    ('kahns', 'reduce', 'Removing edge {{node}} -> {{neighbor}}. Reducing in-degree of {{neighbor}}.', 'Reducing neighbor in-degree.'),
    ('kahns', 'complete', 'Topological Sort complete. Order: {{result}}', 'Topological Sort complete.');

-- Bellman-Ford
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'bellmanFord', 
    'Bellman-Ford Algorithm', 
    'Graphs', 
    'Bellman-Ford algorithm finds shortest paths from a single source vertex to all of the other vertices in a weighted digraph, including those with negative weights.', 
    '{"time": "O(V * E)", "space": "O(V)"}',
    '// Bellman-Ford logic',
    '// Bellman-Ford logic',
    '# Bellman-Ford logic'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('bellmanFord', 'startNode', 'Start Node ID', 'number', '0', 1, 'The ID of the source node');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('bellmanFord', 'init', 'Initialize distances to infinity. Start at node {{startNode}} with distance 0.', 'Initializing Bellman Ford.'),
    ('bellmanFord', 'iteration', 'Starting iteration {{i}} out of {{V-1}}.', 'Starting new iteration.'),
    ('bellmanFord', 'relax', 'Checking edge {{u}} -> {{v}} with weight {{weight}}.', 'Checking edge.'),
    ('bellmanFord', 'update', 'Found shorter path to {{v}}! Old: {{old}}, New: {{new}}.', 'Updating shortest path.'),
    ('bellmanFord', 'skip', 'Current path to {{v}} is already shorter.', 'Current path is shorter.'),
    ('bellmanFord', 'complete', 'Bellman-Ford complete. Shortest paths computed.', 'Algorithm complete.');

-- Prim's Algorithm
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'prims', 
    'Prim''s Algorithm (MST)', 
    'Graphs', 
    'Prim''s algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.', 
    '{"time": "O(E log V)", "space": "O(V)"}',
    '// Prim logic',
    '// Prim logic',
    '# Prim logic'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('prims', 'startNode', 'Start Node ID', 'number', '0', 1, 'Node to start building MST');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('prims', 'init', 'Initialize MST set and priority queue. Start from node {{startNode}}.', 'Initializing Prim MST.'),
    ('prims', 'extract_min', 'Extracting node {{u}} with minimum edge weight {{weight}}.', 'Extracting minimum weight edge.'),
    ('prims', 'relax', 'Checking edge {{u}} - {{v}} with weight {{weight}}.', 'Checking neighbor edge.'),
    ('prims', 'update', 'Updating key value of {{v}} to {{weight}}.', 'Updating neighbor key.'),
    ('prims', 'complete', 'Minimum Spanning Tree complete. Total weight: {{cost}}.', 'MST complete.');

-- Kruskal's Algorithm
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'kruskals', 
    'Kruskal''s Algorithm (MST)', 
    'Graphs', 
    'Kruskal''s algorithm finds a minimum spanning forest of an undirected edge-weighted graph.', 
    '{"time": "O(E log E)", "space": "O(V)"}',
    '// Kruskal logic',
    '// Kruskal logic',
    '# Kruskal logic'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('kruskals', 'run', 'Run Algorithm', 'number', '1', 1, 'Click to run Kruskal MST');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('kruskals', 'init', 'Sort all edges by weight and initialize Disjoint Set.', 'Initializing Kruskal MST.'),
    ('kruskals', 'check_edge', 'Checking edge {{u}} - {{v}} with weight {{weight}}.', 'Checking smallest edge.'),
    ('kruskals', 'union', 'Nodes {{u}} and {{v}} are in different sets. Adding edge to MST.', 'Adding edge to MST.'),
    ('kruskals', 'cycle', 'Nodes {{u}} and {{v}} are in the same set. Adding edge would form a cycle. Skipping.', 'Edge forms a cycle, skipping.'),
    ('kruskals', 'complete', 'Minimum Spanning Tree complete. Total weight: {{cost}}.', 'MST complete.');

-- Tarjan's Algorithm
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'tarjans', 
    'Tarjan''s Algorithm (SCC)', 
    'Graphs', 
    'Tarjan''s algorithm is used to find strongly connected components of a directed graph.', 
    '{"time": "O(V + E)", "space": "O(V)"}',
    '// Tarjan logic',
    '// Tarjan logic',
    '# Tarjan logic'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('tarjans', 'run', 'Run Algorithm', 'number', '1', 1, 'Click to run Tarjan SCC');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('tarjans', 'init', 'Initialize discovery times and low values arrays.', 'Initializing Tarjan SCC.'),
    ('tarjans', 'visit', 'Visiting node {{u}}. Setting discovery time and low value.', 'Visiting node.'),
    ('tarjans', 'neighbor', 'Checking neighbor {{v}} of {{u}}.', 'Checking neighbor.'),
    ('tarjans', 'update_low', 'Updating low value of {{u}} using neighbor {{v}}.', 'Updating low value.'),
    ('tarjans', 'scc_found', 'Found a Strongly Connected Component (SCC) rooted at {{u}}.', 'Strongly Connected Component found.'),
    ('tarjans', 'complete', 'Tarjan''s algorithm complete. Found {{count}} SCCs.', 'Algorithm complete.');
