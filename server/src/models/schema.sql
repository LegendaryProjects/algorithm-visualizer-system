-- Create Algorithms Table
CREATE TABLE IF NOT EXISTS algorithms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    complexity VARCHAR(50),
    code_cpp TEXT,
    code_java TEXT,
    code_python TEXT
);

-- Create Algorithm Inputs Table (defines dynamic custom inputs)
CREATE TABLE IF NOT EXISTS algorithm_inputs (
    id SERIAL PRIMARY KEY,
    algorithm_id VARCHAR(50) REFERENCES algorithms(id) ON DELETE CASCADE,
    input_name VARCHAR(50) NOT NULL,
    input_label VARCHAR(50) NOT NULL,
    input_type VARCHAR(20) NOT NULL,
    default_value TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

-- Create Algorithm Templates Table (for dynamic explanations and speech)
CREATE TABLE IF NOT EXISTS algorithm_templates (
    id SERIAL PRIMARY KEY,
    algorithm_id VARCHAR(50) REFERENCES algorithms(id) ON DELETE CASCADE,
    step_id VARCHAR(50) NOT NULL, 
    explanation_template TEXT NOT NULL,
    narration_template TEXT NOT NULL
);

-- Seed Data

-- 1. Bubble Sort
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'bubbleSort', 
    'Bubble Sort', 
    'Sorting', 
    'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.', 
    'O(n²)',
    'void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}',
    'void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}',
    'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]'
) ON CONFLICT (id) DO NOTHING;

-- Bubble Sort Inputs
INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, description, sort_order)
VALUES 
('bubbleSort', 'array', 'Array', 'array', '5, 2, 9, 1, 5, 6', 'Comma-separated list of numbers', 1);

-- Bubble Sort Templates
INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES 
('bubbleSort', 'init', 'Initialize swapped to false.', 'We start by initializing the swapped flag to false.'),
('bubbleSort', 'outer_loop', 'Start outer loop for pass {{pass}}. Set swapped to false.', 'Starting a new pass. We set swapped to false.'),
('bubbleSort', 'compare', 'Compare arr[{{j}}] ({{val1}}) and arr[{{jPlus1}}] ({{val2}}).', 'We compare the element at index {{j}} with the next element.'),
('bubbleSort', 'swap', 'Since {{val1}} > {{val2}}, we swap them.', 'Since the first element is greater than the second, we swap them.'),
('bubbleSort', 'set_swapped', 'Set swapped to true.', 'We set the swapped flag to true, indicating a change was made.'),
('bubbleSort', 'no_swap', 'Since {{val1}} <= {{val2}}, no swap is needed.', 'The elements are in the correct order, so no swap is needed.'),
('bubbleSort', 'check_swaps', 'Check if any swaps happened in this pass.', 'Pass complete. We check if any swaps occurred.'),
('bubbleSort', 'early_break', 'No swaps occurred, which means the array is sorted. Breaking out of loop.', 'No swaps occurred during this pass, meaning the array is fully sorted. We can stop early.'),
('bubbleSort', 'complete', 'Bubble Sort complete. The array is sorted.', 'The algorithm has completed, and the array is now sorted.');


-- 2. Binary Search
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'binarySearch', 
    'Binary Search', 
    'Searching', 
    'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.', 
    'O(log n)',
    'int binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}',
    'int binarySearch(int arr[], int x) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}',
    'def binary_search(arr, x):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        m = l + (r - l) // 2\n        if arr[m] == x:\n            return m\n        elif arr[m] < x:\n            l = m + 1\n        else:\n            r = m - 1\n    return -1'
) ON CONFLICT (id) DO NOTHING;

-- Binary Search Inputs
INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, description, sort_order)
VALUES 
('binarySearch', 'array', 'Sorted Array', 'array', '2, 3, 4, 10, 40', 'Comma-separated sorted list of numbers', 1),
('binarySearch', 'target', 'Target Value', 'number', '10', 'Number to search for', 2);

-- Binary Search Templates
INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES 
('binarySearch', 'init', 'Initialize left pointer l = 0 and right pointer r = {{r}}.', 'We initialize the left pointer to the start of the array and the right pointer to the end.'),
('binarySearch', 'while_cond', 'Check if left ({{l}}) <= right ({{r}}).', 'We check if the left pointer is less than or equal to the right pointer.'),
('binarySearch', 'calc_mid', 'Calculate mid point m = {{m}}.', 'We calculate the middle index of the current range.'),
('binarySearch', 'check_match', 'Check if arr[{{m}}] ({{val}}) == target ({{target}}).', 'We check if the middle element is our target value.'),
('binarySearch', 'found', 'Target found at index {{m}}!', 'The target value has been found at the middle index.'),
('binarySearch', 'check_less', 'Check if arr[{{m}}] ({{val}}) < target ({{target}}).', 'Since they do not match, we check if the middle element is less than the target.'),
('binarySearch', 'move_left', 'Since {{val}} < {{target}}, the target must be in the right half. Move left pointer to m + 1 ({{new_l}}).', 'The middle element is smaller than the target, so we discard the left half and move the left pointer.'),
('binarySearch', 'move_right', 'Since {{val}} > {{target}}, the target must be in the left half. Move right pointer to m - 1 ({{new_r}}).', 'The middle element is larger than the target, so we discard the right half and move the right pointer.'),
('binarySearch', 'not_found', 'Left pointer ({{l}}) > Right pointer ({{r}}). The target is not in the array.', 'The left pointer has passed the right pointer, meaning the target does not exist in the array.');
