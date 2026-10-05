-- Selection Sort
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'selectionSort', 
    'Selection Sort', 
    'Sorting', 
    'Selection sort is a simple sorting algorithm. It maintains two subarrays: the sorted part and the unsorted part. In every iteration, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.', 
    '{"time": "O(N²)", "space": "O(1)"}',
    'void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        if (min_idx != i) {\n            swap(arr[min_idx], arr[i]);\n        }\n    }\n}',
    'void selectionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        if (min_idx != i) {\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}',
    'def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        if min_idx != i:\n            arr[i], arr[min_idx] = arr[min_idx], arr[i]'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('selectionSort', 'array', 'Array', 'array', '64, 25, 12, 22, 11', 1, 'Comma-separated list of numbers');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('selectionSort', 'init', 'Start Selection Sort on the array.', 'Starting Selection Sort.'),
    ('selectionSort', 'outer_loop', 'Finding the minimum element for the subarray starting at index {{i}}.', 'Starting pass {{pass}}.'),
    ('selectionSort', 'compare', 'Comparing current element {{val}} with current minimum {{minVal}}.', 'Comparing {{val}} with minimum {{minVal}}.'),
    ('selectionSort', 'new_min', 'Found a new minimum: {{val}} at index {{j}}.', 'New minimum is {{val}}.'),
    ('selectionSort', 'swap', 'Swapping the minimum element {{minVal}} with the first element of the unsorted part {{val}}.', 'Swapping minimum element into position.'),
    ('selectionSort', 'no_swap', 'The element is already in the correct position.', 'No swap needed.'),
    ('selectionSort', 'complete', 'Array is fully sorted!', 'Selection Sort complete.');

-- Insertion Sort
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'insertionSort', 
    'Insertion Sort', 
    'Sorting', 
    'Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, it removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.', 
    '{"time": "O(N²)", "space": "O(1)"}',
    'void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}',
    'void insertionSort(int arr[]) {\n    int n = arr.length;\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}',
    'def insertion_sort(arr):\n    n = len(arr)\n    for i in range(1, n):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('insertionSort', 'array', 'Array', 'array', '12, 11, 13, 5, 6', 1, 'Comma-separated list of numbers');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('insertionSort', 'init', 'Start Insertion Sort. The first element is assumed sorted.', 'Starting Insertion Sort.'),
    ('insertionSort', 'pick_key', 'Selected key element {{key}} at index {{i}} to insert into the sorted portion.', 'Picking element {{key}} as the key.'),
    ('insertionSort', 'compare', 'Comparing key {{key}} with element {{val}}.', 'Comparing key {{key}} with {{val}}.'),
    ('insertionSort', 'shift', 'Element {{val}} is greater than key {{key}}, so shift {{val}} one position to the right.', 'Shifting {{val}} to the right.'),
    ('insertionSort', 'insert', 'Found the correct position. Inserting key {{key}}.', 'Inserting key into position.'),
    ('insertionSort', 'complete', 'Array is fully sorted!', 'Insertion Sort complete.');
