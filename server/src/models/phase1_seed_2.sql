-- Merge Sort
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'mergeSort', 
    'Merge Sort', 
    'Sorting', 
    'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.', 
    '{"time": "O(N log N)", "space": "O(N)"}',
    'void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++)\n        L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++)\n        R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n    while (i < n1) {\n        arr[k] = L[i];\n        i++;\n        k++;\n    }\n    while (j < n2) {\n        arr[k] = R[j];\n        j++;\n        k++;\n    }\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}',
    'void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int L[] = new int[n1];\n    int R[] = new int[n2];\n    for (int i = 0; i < n1; ++i)\n        L[i] = arr[l + i];\n    for (int j = 0; j < n2; ++j)\n        R[j] = arr[m + 1 + j];\n    int i = 0, j = 0;\n    int k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n    while (i < n1) {\n        arr[k] = L[i];\n        i++;\n        k++;\n    }\n    while (j < n2) {\n        arr[k] = R[j];\n        j++;\n        k++;\n    }\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}',
    'def merge(arr, l, m, r):\n    n1 = m - l + 1\n    n2 = r - m\n    L = [0] * n1\n    R = [0] * n2\n    for i in range(0, n1):\n        L[i] = arr[l + i]\n    for j in range(0, n2):\n        R[j] = arr[m + 1 + j]\n    i = 0\n    j = 0\n    k = l\n    while i < n1 and j < n2:\n        if L[i] <= R[j]:\n            arr[k] = L[i]\n            i += 1\n        else:\n            arr[k] = R[j]\n            j += 1\n        k += 1\n    while i < n1:\n        arr[k] = L[i]\n        i += 1\n        k += 1\n    while j < n2:\n        arr[k] = R[j]\n        j += 1\n        k += 1\n\ndef merge_sort(arr, l, r):\n    if l < r:\n        m = l + (r - l) // 2\n        merge_sort(arr, l, m)\n        merge_sort(arr, m + 1, r)\n        merge(arr, l, m, r)'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('mergeSort', 'array', 'Array', 'array', '38, 27, 43, 3, 9, 82, 10', 1, 'Comma-separated list of numbers');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('mergeSort', 'init', 'Start Merge Sort on the entire array.', 'Starting Merge Sort.'),
    ('mergeSort', 'divide', 'Dividing the array from index {{l}} to {{r}} at midpoint {{m}}.', 'Dividing the array into two halves.'),
    ('mergeSort', 'merge_start', 'Merging the two sorted halves: [{{l}}..{{m}}] and [{{mPlus1}}..{{r}}].', 'Merging the two halves.'),
    ('mergeSort', 'merge_compare', 'Comparing {{val1}} from the left half and {{val2}} from the right half.', 'Comparing elements.'),
    ('mergeSort', 'merge_copy', 'Copying {{val}} into the main array.', 'Copying the smaller element.'),
    ('mergeSort', 'merge_exhaust', 'One half is exhausted. Copying remaining elements.', 'Copying remaining elements.'),
    ('mergeSort', 'complete', 'Array is fully sorted!', 'Merge Sort complete.');

-- Quick Sort
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'quickSort', 
    'Quick Sort', 
    'Sorting', 
    'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.', 
    '{"time": "O(N log N)", "space": "O(log N)"}',
    'int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}',
    'int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            int temp = arr[i];\n            arr[i] = arr[j];\n            arr[j] = temp;\n        }\n    }\n    int temp = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp;\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}',
    'def partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] < pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1\n\ndef quick_sort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('quickSort', 'array', 'Array', 'array', '10, 80, 30, 90, 40, 50, 70', 1, 'Comma-separated list of numbers');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('quickSort', 'init', 'Start Quick Sort on the entire array.', 'Starting Quick Sort.'),
    ('quickSort', 'partition_start', 'Partitioning subarray from index {{low}} to {{high}}. Pivot chosen is {{pivot}}.', 'Partitioning the array around the pivot {{pivot}}.'),
    ('quickSort', 'compare', 'Comparing {{val}} with pivot {{pivot}}.', 'Comparing element with pivot.'),
    ('quickSort', 'swap_smaller', '{{val}} is smaller than pivot. Swapping with element at the smaller partition index.', 'Swapping smaller element.'),
    ('quickSort', 'pivot_place', 'Placing the pivot {{pivot}} in its correct sorted position.', 'Placing the pivot.'),
    ('quickSort', 'complete', 'Array is fully sorted!', 'Quick Sort complete.');
