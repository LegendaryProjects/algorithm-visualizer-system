-- 0/1 Knapsack
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'knapsack', 
    '0/1 Knapsack', 
    'Dynamic Programming', 
    'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.', 
    '{"time": "O(N * W)", "space": "O(N * W)"}',
    'int knapSack(int W, int wt[], int val[], int n) {\n    int dp[n + 1][W + 1];\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0)\n                dp[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            else\n                dp[i][w] = dp[i - 1][w];\n        }\n    }\n    return dp[n][W];\n}',
    'int knapSack(int W, int wt[], int val[], int n) {\n    int dp[][] = new int[n + 1][W + 1];\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0)\n                dp[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            else\n                dp[i][w] = dp[i - 1][w];\n        }\n    }\n    return dp[n][W];\n}',
    'def knapSack(W, wt, val, n):\n    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]\n    for i in range(n + 1):\n        for w in range(W + 1):\n            if i == 0 or w == 0:\n                dp[i][w] = 0\n            elif wt[i-1] <= w:\n                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]],  dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][W]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('knapsack', 'weights', 'Weights Array', 'array', '1, 2, 3, 5', 1, 'Comma-separated list of item weights'),
    ('knapsack', 'values', 'Values Array', 'array', '10, 15, 40, 50', 2, 'Comma-separated list of item values'),
    ('knapsack', 'capacity', 'Knapsack Capacity', 'number', '6', 3, 'Maximum capacity of the knapsack');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('knapsack', 'init', 'Initialize DP table of size ({{n}} + 1) x ({{W}} + 1) with zeros.', 'Initializing DP table.'),
    ('knapsack', 'zero_row_col', 'First row and column are 0. (Base case: 0 items or 0 capacity).', 'Setting base cases to zero.'),
    ('knapsack', 'compare', 'Considering item {{i}} with weight {{wt}} and value {{val}} for capacity {{w}}.', 'Considering item {{i}} for capacity {{w}}.'),
    ('knapsack', 'take', 'Item fits! Max of taking it ({{val}} + {{prev_val_taken}}) or leaving it ({{prev_val_left}}) is {{new_val}}.', 'Item fits, taking the maximum value.'),
    ('knapsack', 'leave', 'Item weight ({{wt}}) > current capacity ({{w}}). Must leave it. Value remains {{val}}.', 'Item is too heavy, leaving it.'),
    ('knapsack', 'complete', 'DP table filled. Maximum value is {{ans}}.', 'Knapsack complete.');

-- Longest Common Subsequence
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'lcs', 
    'Longest Common Subsequence', 
    'Dynamic Programming', 
    'Finds the longest subsequence present in both strings. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.', 
    '{"time": "O(M * N)", "space": "O(M * N)"}',
    'int lcs(char* X, char* Y, int m, int n) {\n    int L[m + 1][n + 1];\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= n; j++) {\n            if (i == 0 || j == 0)\n                L[i][j] = 0;\n            else if (X[i - 1] == Y[j - 1])\n                L[i][j] = L[i - 1][j - 1] + 1;\n            else\n                L[i][j] = max(L[i - 1][j], L[i][j - 1]);\n        }\n    }\n    return L[m][n];\n}',
    'int lcs(char[] X, char[] Y, int m, int n) {\n    int L[][] = new int[m + 1][n + 1];\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= n; j++) {\n            if (i == 0 || j == 0)\n                L[i][j] = 0;\n            else if (X[i - 1] == Y[j - 1])\n                L[i][j] = L[i - 1][j - 1] + 1;\n            else\n                L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);\n        }\n    }\n    return L[m][n];\n}',
    'def lcs(X, Y, m, n):\n    L = [[0 for x in range(n+1)] for x in range(m+1)]\n    for i in range(m+1):\n        for j in range(n+1):\n            if i == 0 or j == 0:\n                L[i][j] = 0\n            elif X[i-1] == Y[j-1]:\n                L[i][j] = L[i-1][j-1] + 1\n            else:\n                L[i][j] = max(L[i-1][j], L[i][j-1])\n    return L[m][n]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('lcs', 'string1', 'String 1', 'string', 'AGGTAB', 1, 'First string'),
    ('lcs', 'string2', 'String 2', 'string', 'GXTXAYB', 2, 'Second string');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('lcs', 'init', 'Initialize DP table of size ({{m}} + 1) x ({{n}} + 1).', 'Initializing DP table.'),
    ('lcs', 'zero', 'Base case: 0 length string has LCS of 0.', 'Setting base cases to zero.'),
    ('lcs', 'compare', 'Comparing {{c1}} and {{c2}}.', 'Comparing characters.'),
    ('lcs', 'match', 'Characters match! Adding 1 to diagonal value: {{val}}.', 'Characters match, incrementing LCS.'),
    ('lcs', 'mismatch', 'Mismatch. Taking max of above ({{val1}}) and left ({{val2}}).', 'Mismatch, taking maximum of previous subsequences.'),
    ('lcs', 'complete', 'DP table filled. LCS length is {{ans}}.', 'Longest Common Subsequence complete.');

-- N-Queens
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'nQueens', 
    'N-Queens Problem', 
    'Backtracking', 
    'The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other.', 
    '{"time": "O(N!)", "space": "O(N²)"}',
    'bool isSafe(int board[N][N], int row, int col) {\n    for (int i = 0; i < col; i++)\n        if (board[row][i]) return false;\n    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)\n        if (board[i][j]) return false;\n    for (int i = row, j = col; j >= 0 && i < N; i++, j--)\n        if (board[i][j]) return false;\n    return true;\n}\nbool solveNQUtil(int board[N][N], int col) {\n    if (col >= N) return true;\n    for (int i = 0; i < N; i++) {\n        if (isSafe(board, i, col)) {\n            board[i][col] = 1;\n            if (solveNQUtil(board, col + 1)) return true;\n            board[i][col] = 0;\n        }\n    }\n    return false;\n}',
    'boolean isSafe(int board[][], int row, int col) {\n    for (int i = 0; i < col; i++)\n        if (board[row][i] == 1) return false;\n    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)\n        if (board[i][j] == 1) return false;\n    for (int i = row, j = col; j >= 0 && i < N; i++, j--)\n        if (board[i][j] == 1) return false;\n    return true;\n}\nboolean solveNQUtil(int board[][], int col) {\n    if (col >= N) return true;\n    for (int i = 0; i < N; i++) {\n        if (isSafe(board, i, col)) {\n            board[i][col] = 1;\n            if (solveNQUtil(board, col + 1)) return true;\n            board[i][col] = 0;\n        }\n    }\n    return false;\n}',
    'def isSafe(board, row, col):\n    for i in range(col):\n        if board[row][i] == 1:\n            return False\n    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):\n        if board[i][j] == 1:\n            return False\n    for i, j in zip(range(row, N, 1), range(col, -1, -1)):\n        if board[i][j] == 1:\n            return False\n    return True\n\ndef solveNQUtil(board, col):\n    if col >= N:\n        return True\n    for i in range(N):\n        if isSafe(board, i, col):\n            board[i][col] = 1\n            if solveNQUtil(board, col + 1):\n                return True\n            board[i][col] = 0\n    return False'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('nQueens', 'n', 'Board Size (N)', 'number', '4', 1, 'Size of the chessboard (N x N)');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('nQueens', 'init', 'Initialize empty {{n}}x{{n}} chessboard.', 'Initializing empty chessboard.'),
    ('nQueens', 'try', 'Trying to place queen at row {{r}}, col {{c}}.', 'Trying to place queen.'),
    ('nQueens', 'safe', 'Position is safe. Placing queen.', 'Position is safe.'),
    ('nQueens', 'unsafe', 'Position is unsafe (attacked). Moving to next row.', 'Position is attacked, trying next.'),
    ('nQueens', 'backtrack', 'No safe row in this column. Backtracking by removing queen at row {{r}}, col {{c}}.', 'Dead end, backtracking.'),
    ('nQueens', 'complete', 'Successfully placed all {{n}} queens!', 'N-Queens complete.');

