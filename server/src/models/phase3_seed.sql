-- BST Operations
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'bst', 
    'BST Operations', 
    'Trees', 
    'A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node’s key. The right subtree of a node contains only nodes with keys greater than the node’s key.', 
    '{"time": "O(log N)", "space": "O(N)"}',
    'struct Node {\n    int key;\n    struct Node *left, *right;\n};\nstruct Node* insert(struct Node* node, int key) {\n    if (node == NULL) return newNode(key);\n    if (key < node->key)\n        node->left  = insert(node->left, key);\n    else if (key > node->key)\n        node->right = insert(node->right, key);\n    return node;\n}\nstruct Node* search(struct Node* root, int key) {\n    if (root == NULL || root->key == key)\n       return root;\n    if (root->key < key)\n       return search(root->right, key);\n    return search(root->left, key);\n}',
    'class Node {\n    int key;\n    Node left, right;\n    public Node(int item) {\n        key = item;\n        left = right = null;\n    }\n}\nNode insert(Node node, int key) {\n    if (node == null) return new Node(key);\n    if (key < node.key)\n        node.left = insert(node.left, key);\n    else if (key > node.key)\n        node.right = insert(node.right, key);\n    return node;\n}\nNode search(Node root, int key) {\n    if (root==null || root.key==key)\n        return root;\n    if (root.key < key)\n        return search(root.right, key);\n    return search(root.left, key);\n}',
    'class Node:\n    def __init__(self, key):\n        self.left = None\n        self.right = None\n        self.val = key\n\ndef insert(root, key):\n    if root is None:\n        return Node(key)\n    else:\n        if root.val == key:\n            return root\n        elif root.val < key:\n            root.right = insert(root.right, key)\n        else:\n            root.left = insert(root.left, key)\n    return root\n\ndef search(root,key):\n    if root is None or root.val == key:\n        return root\n    if root.val < key:\n        return search(root.right,key)\n    return search(root.left,key)'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('bst', 'target', 'Target to Search', 'number', '40', 1, 'Value to search for in the BST');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('bst', 'init', 'Start searching for {{target}} in the Binary Search Tree.', 'Starting BST search.'),
    ('bst', 'compare', 'Comparing target {{target}} with current node {{val}}.', 'Comparing target with current node.'),
    ('bst', 'go_left', '{{target}} < {{val}}. Exploring the left subtree.', 'Target is smaller, going left.'),
    ('bst', 'go_right', '{{target}} > {{val}}. Exploring the right subtree.', 'Target is larger, going right.'),
    ('bst', 'found', 'Found {{target}} at node {{val}}!', 'Target found!'),
    ('bst', 'not_found', 'Reached a null leaf. {{target}} is not in the tree.', 'Target not found in tree.'),
    ('bst', 'complete', 'BST search complete.', 'BST search complete.');

-- Tree Traversals
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'treeTraversals', 
    'Tree Traversals', 
    'Trees', 
    'Unlike linear data structures (Array, Linked List, Queues, Stacks, etc) which have only one logical way to traverse them, trees can be traversed in different ways: Inorder, Preorder, and Postorder.', 
    '{"time": "O(N)", "space": "O(H)"}',
    'void printInorder(struct Node* node) {\n    if (node == NULL) return;\n    printInorder(node->left);\n    cout << node->data << " ";\n    printInorder(node->right);\n}\nvoid printPreorder(struct Node* node) {\n    if (node == NULL) return;\n    cout << node->data << " ";\n    printPreorder(node->left);\n    printPreorder(node->right);\n}\nvoid printPostorder(struct Node* node) {\n    if (node == NULL) return;\n    printPostorder(node->left);\n    printPostorder(node->right);\n    cout << node->data << " ";\n}',
    'void printInorder(Node node) {\n    if (node == null) return;\n    printInorder(node.left);\n    System.out.print(node.key + " ");\n    printInorder(node.right);\n}\nvoid printPreorder(Node node) {\n    if (node == null) return;\n    System.out.print(node.key + " ");\n    printPreorder(node.left);\n    printPreorder(node.right);\n}\nvoid printPostorder(Node node) {\n    if (node == null) return;\n    printPostorder(node.left);\n    printPostorder(node.right);\n    System.out.print(node.key + " ");\n}',
    'def printInorder(root):\n    if root:\n        printInorder(root.left)\n        print(root.val),\n        printInorder(root.right)\n\ndef printPreorder(root):\n    if root:\n        print(root.val),\n        printPreorder(root.left)\n        printPreorder(root.right)\n\ndef printPostorder(root):\n    if root:\n        printPostorder(root.left)\n        printPostorder(root.right)\n        print(root.val),'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('treeTraversals', 'order', 'Traversal Order', 'string', 'inorder', 1, 'inorder, preorder, or postorder');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('treeTraversals', 'init', 'Starting {{order}} traversal on the tree.', 'Starting tree traversal.'),
    ('treeTraversals', 'visit', 'Visiting node {{val}}.', 'Visiting node.'),
    ('treeTraversals', 'process', 'Processing/Printing node {{val}}.', 'Processing node.'),
    ('treeTraversals', 'complete', 'Traversal complete. Output: {{result}}.', 'Tree traversal complete.');

-- Trie
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'trie', 
    'Trie (Prefix Tree)', 
    'Trees', 
    'Trie is an efficient information reTrieval data structure. Using Trie, search complexities can be brought to optimal limit (key length).', 
    '{"time": "O(L)", "space": "O(N * L)"}',
    'void insert(struct TrieNode *root, string key) {\n    struct TrieNode *pCrawl = root;\n    for (int i = 0; i < key.length(); i++) {\n        int index = key[i] - ''a'';\n        if (!pCrawl->children[index])\n            pCrawl->children[index] = getNode();\n        pCrawl = pCrawl->children[index];\n    }\n    pCrawl->isEndOfWord = true;\n}\nbool search(struct TrieNode *root, string key) {\n    struct TrieNode *pCrawl = root;\n    for (int i = 0; i < key.length(); i++) {\n        int index = key[i] - ''a'';\n        if (!pCrawl->children[index])\n            return false;\n        pCrawl = pCrawl->children[index];\n    }\n    return (pCrawl != NULL && pCrawl->isEndOfWord);\n}',
    'void insert(String key) {\n    int level;\n    int length = key.length();\n    int index;\n    TrieNode pCrawl = root;\n    for (level = 0; level < length; level++) {\n        index = key.charAt(level) - ''a'';\n        if (pCrawl.children[index] == null)\n            pCrawl.children[index] = new TrieNode();\n        pCrawl = pCrawl.children[index];\n    }\n    pCrawl.isEndOfWord = true;\n}\nboolean search(String key) {\n    int level;\n    int length = key.length();\n    int index;\n    TrieNode pCrawl = root;\n    for (level = 0; level < length; level++) {\n        index = key.charAt(level) - ''a'';\n        if (pCrawl.children[index] == null)\n            return false;\n        pCrawl = pCrawl.children[index];\n    }\n    return (pCrawl != null && pCrawl.isEndOfWord);\n}',
    'def insert(self, key):\n    pCrawl = self.root\n    length = len(key)\n    for level in range(length):\n        index = self._charToIndex(key[level])\n        if not pCrawl.children[index]:\n            pCrawl.children[index] = self.getNode()\n        pCrawl = pCrawl.children[index]\n    pCrawl.isEndOfWord = True\n\ndef search(self, key):\n    pCrawl = self.root\n    length = len(key)\n    for level in range(length):\n        index = self._charToIndex(key[level])\n        if not pCrawl.children[index]:\n            return False\n        pCrawl = pCrawl.children[index]\n    return pCrawl.isEndOfWord'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('trie', 'word', 'Word to Search', 'string', 'app', 1, 'Search for this word in the pre-built Trie');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('trie', 'init', 'Start searching for "{{word}}" in the Trie.', 'Starting Trie search.'),
    ('trie', 'char', 'Checking for character "{{char}}" from current node.', 'Checking next character.'),
    ('trie', 'found_char', 'Found path for "{{char}}". Moving to next node.', 'Character found, moving down the Trie.'),
    ('trie', 'not_found_char', 'No path for "{{char}}". Word not in Trie.', 'Character not found, word does not exist.'),
    ('trie', 'end_word_true', 'Reached end of string. Node is marked as EndOfWord. Word found!', 'Word successfully found in Trie!'),
    ('trie', 'end_word_false', 'Reached end of string, but node is NOT EndOfWord. It is only a prefix.', 'Word is only a prefix, not a complete word.'),
    ('trie', 'complete', 'Trie search complete.', 'Trie search complete.');
