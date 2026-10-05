-- Kadane's Algorithm
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'kadanesAlgorithm', 
    'Kadane''s Algorithm', 
    'Dynamic Programming', 
    'Kadane''s algorithm looks for all positive contiguous segments of the array and keeps track of the maximum sum contiguous segment among all positive segments.', 
    '{"time": "O(N)", "space": "O(1)"}',
    'int maxSubArraySum(int a[], int size) {\n    int max_so_far = INT_MIN, max_ending_here = 0;\n    for (int i = 0; i < size; i++) {\n        max_ending_here = max_ending_here + a[i];\n        if (max_so_far < max_ending_here)\n            max_so_far = max_ending_here;\n        if (max_ending_here < 0)\n            max_ending_here = 0;\n    }\n    return max_so_far;\n}',
    'int maxSubArraySum(int a[]) {\n    int size = a.length;\n    int max_so_far = Integer.MIN_VALUE, max_ending_here = 0;\n    for (int i = 0; i < size; i++) {\n        max_ending_here = max_ending_here + a[i];\n        if (max_so_far < max_ending_here)\n            max_so_far = max_ending_here;\n        if (max_ending_here < 0)\n            max_ending_here = 0;\n    }\n    return max_so_far;\n}',
    'def max_sub_array_sum(a, size):\n    max_so_far = float("-inf")\n    max_ending_here = 0\n    for i in range(0, size):\n        max_ending_here = max_ending_here + a[i]\n        if (max_so_far < max_ending_here):\n            max_so_far = max_ending_here\n        if max_ending_here < 0:\n            max_ending_here = 0\n    return max_so_far'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('kadanesAlgorithm', 'array', 'Array', 'array', '-2, -3, 4, -1, -2, 1, 5, -3', 1, 'Comma-separated list of numbers');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('kadanesAlgorithm', 'init', 'Start Kadane''s Algorithm to find the maximum subarray sum.', 'Starting Kadane''s Algorithm.'),
    ('kadanesAlgorithm', 'add', 'Add element {{val}} to max_ending_here. It is now {{meh}}.', 'Adding {{val}} to the running sum.'),
    ('kadanesAlgorithm', 'update_max', 'max_ending_here ({{meh}}) is greater than max_so_far ({{msf}}). Updating max_so_far.', 'Updating the maximum sum found so far.'),
    ('kadanesAlgorithm', 'reset_meh', 'max_ending_here is less than 0. Resetting it to 0.', 'Running sum is negative, resetting to zero.'),
    ('kadanesAlgorithm', 'no_reset', 'max_ending_here is still positive. Continuing.', 'Running sum is positive.'),
    ('kadanesAlgorithm', 'complete', 'Algorithm complete. Maximum subarray sum is {{msf}}.', 'Maximum subarray sum is {{msf}}.');

-- Dutch National Flag
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'dutchNationalFlag', 
    'Dutch National Flag', 
    'Two Pointers', 
    'The Dutch National Flag algorithm sorts an array of 0s, 1s, and 2s in linear time without any extra space. It uses three pointers: low, mid, and high.', 
    '{"time": "O(N)", "space": "O(1)"}',
    'void sort012(int a[], int arr_size) {\n    int lo = 0;\n    int hi = arr_size - 1;\n    int mid = 0;\n    while (mid <= hi) {\n        switch (a[mid]) {\n        case 0:\n            swap(a[lo++], a[mid++]);\n            break;\n        case 1:\n            mid++;\n            break;\n        case 2:\n            swap(a[mid], a[hi--]);\n            break;\n        }\n    }\n}',
    'void sort012(int a[], int arr_size) {\n    int lo = 0;\n    int hi = arr_size - 1;\n    int mid = 0, temp = 0;\n    while (mid <= hi) {\n        switch (a[mid]) {\n            case 0: {\n                temp = a[lo];\n                a[lo] = a[mid];\n                a[mid] = temp;\n                lo++;\n                mid++;\n                break;\n            }\n            case 1:\n                mid++;\n                break;\n            case 2: {\n                temp = a[mid];\n                a[mid] = a[hi];\n                a[hi] = temp;\n                hi--;\n                break;\n            }\n        }\n    }\n}',
    'def sort012(a, arr_size):\n    lo = 0\n    hi = arr_size - 1\n    mid = 0\n    while mid <= hi:\n        if a[mid] == 0:\n            a[lo], a[mid] = a[mid], a[lo]\n            lo = lo + 1\n            mid = mid + 1\n        elif a[mid] == 1:\n            mid = mid + 1\n        else:\n            a[mid], a[hi] = a[hi], a[mid]\n            hi = hi - 1\n    return a'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('dutchNationalFlag', 'array', 'Array (0s, 1s, 2s)', 'array', '0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1', 1, 'Array of only 0, 1, and 2');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('dutchNationalFlag', 'init', 'Start Dutch National Flag. Initialize low, mid to 0, and high to end of array.', 'Starting Dutch National Flag sort.'),
    ('dutchNationalFlag', 'case_0', 'Element at mid is 0. Swap with low, then increment both low and mid.', 'Element is zero, swapping with low pointer.'),
    ('dutchNationalFlag', 'case_1', 'Element at mid is 1. Leave it in place and increment mid.', 'Element is one, leaving it in place.'),
    ('dutchNationalFlag', 'case_2', 'Element at mid is 2. Swap with high, then decrement high.', 'Element is two, swapping with high pointer.'),
    ('dutchNationalFlag', 'complete', 'Array is fully sorted!', 'Dutch National Flag sort complete.');
