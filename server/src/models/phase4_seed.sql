-- BFS
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'bfs', 
    'Breadth First Search', 
    'Graphs', 
    'Breadth First Search (BFS) is a graph traversal algorithm that explores all the vertices in a graph at the current depth prior to moving on to the vertices at the next depth level.', 
    '{"time": "O(V + E)", "space": "O(V)"}',
    'void BFS(int s) {\n    vector<bool> visited(V, false);\n    queue<int> q;\n    visited[s] = true;\n    q.push(s);\n    while(!q.empty()) {\n        int s = q.front();\n        q.pop();\n        for (auto i = adj[s].begin(); i != adj[s].end(); ++i) {\n            if (!visited[*i]) {\n                visited[*i] = true;\n                q.push(*i);\n            }\n        }\n    }\n}',
    'void BFS(int s) {\n    boolean visited[] = new boolean[V];\n    LinkedList<Integer> queue = new LinkedList<Integer>();\n    visited[s] = true;\n    queue.add(s);\n    while (queue.size() != 0) {\n        s = queue.poll();\n        Iterator<Integer> i = adj[s].listIterator();\n        while (i.hasNext()) {\n            int n = i.next();\n            if (!visited[n]) {\n                visited[n] = true;\n                queue.add(n);\n            }\n        }\n    }\n}',
    'def BFS(s):\n    visited = [False] * (len(graph))\n    queue = []\n    queue.append(s)\n    visited[s] = True\n    while queue:\n        s = queue.pop(0)\n        for i in graph[s]:\n            if visited[i] == False:\n                queue.append(i)\n                visited[i] = True'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('bfs', 'startNode', 'Start Node ID', 'number', '0', 1, 'The ID of the node to start BFS from');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('bfs', 'init', 'Start BFS from node {{startNode}}.', 'Starting BFS.'),
    ('bfs', 'visit', 'Visiting node {{node}}.', 'Visiting node.'),
    ('bfs', 'neighbor', 'Checking neighbor {{neighbor}} of {{node}}.', 'Checking neighbor.'),
    ('bfs', 'enqueue', 'Neighbor {{neighbor}} is unvisited. Enqueueing it.', 'Enqueueing neighbor.'),
    ('bfs', 'skip', 'Neighbor {{neighbor}} is already visited. Skipping.', 'Skipping visited neighbor.'),
    ('bfs', 'complete', 'BFS Traversal complete. Visited nodes: {{result}}', 'BFS complete.');

-- DFS
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'dfs', 
    'Depth First Search', 
    'Graphs', 
    'Depth First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.', 
    '{"time": "O(V + E)", "space": "O(V)"}',
    'void DFSUtil(int v, vector<bool>& visited) {\n    visited[v] = true;\n    for (auto i = adj[v].begin(); i != adj[v].end(); ++i)\n        if (!visited[*i])\n            DFSUtil(*i, visited);\n}\nvoid DFS(int v) {\n    vector<bool> visited(V, false);\n    DFSUtil(v, visited);\n}',
    'void DFSUtil(int v, boolean visited[]) {\n    visited[v] = true;\n    Iterator<Integer> i = adj[v].listIterator();\n    while (i.hasNext()) {\n        int n = i.next();\n        if (!visited[n])\n            DFSUtil(n, visited);\n    }\n}\nvoid DFS(int v) {\n    boolean visited[] = new boolean[V];\n    DFSUtil(v, visited);\n}',
    'def DFSUtil(v, visited):\n    visited.add(v)\n    for neighbour in graph[v]:\n        if neighbour not in visited:\n            DFSUtil(neighbour, visited)\n\ndef DFS(v):\n    visited = set()\n    DFSUtil(v, visited)'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('dfs', 'startNode', 'Start Node ID', 'number', '0', 1, 'The ID of the node to start DFS from');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('dfs', 'init', 'Start DFS from node {{startNode}}.', 'Starting DFS.'),
    ('dfs', 'visit', 'Visiting node {{node}}.', 'Visiting node.'),
    ('dfs', 'neighbor', 'Checking neighbor {{neighbor}} of {{node}}.', 'Checking neighbor.'),
    ('dfs', 'recurse', 'Neighbor {{neighbor}} is unvisited. Recursively visiting it.', 'Recursively exploring neighbor.'),
    ('dfs', 'skip', 'Neighbor {{neighbor}} is already visited. Skipping.', 'Skipping visited neighbor.'),
    ('dfs', 'backtrack', 'Finished exploring all neighbors of {{node}}. Backtracking.', 'Backtracking.'),
    ('dfs', 'complete', 'DFS Traversal complete. Visited nodes: {{result}}', 'DFS complete.');

-- Dijkstra's
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'dijkstras', 
    'Dijkstra''s Algorithm', 
    'Graphs', 
    'Dijkstra''s algorithm is used for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.', 
    '{"time": "O((V+E) log V)", "space": "O(V)"}',
    '// Dijkstra logic here',
    '// Dijkstra logic here',
    '# Dijkstra logic here'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('dijkstras', 'startNode', 'Start Node ID', 'number', '0', 1, 'The ID of the source node');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('dijkstras', 'init', 'Initialize distances to infinity. Start at node {{startNode}} with distance 0.', 'Initializing Dijkstra.'),
    ('dijkstras', 'extract_min', 'Extracting node {{node}} with minimum distance {{dist}} from priority queue.', 'Extracting minimum distance node.'),
    ('dijkstras', 'relax', 'Checking edge to {{neighbor}} with weight {{weight}}.', 'Checking edge weight.'),
    ('dijkstras', 'update', 'Found shorter path to {{neighbor}}! Old dist: {{old}}, New dist: {{new}}.', 'Updating shortest path.'),
    ('dijkstras', 'skip', 'Current path to {{neighbor}} is already shorter.', 'Keeping current shortest path.'),
    ('dijkstras', 'complete', 'Shortest paths computed for all reachable nodes.', 'Dijkstra complete.');
