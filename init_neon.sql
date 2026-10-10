DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.algorithm_templates CASCADE;
DROP TABLE IF EXISTS public.algorithm_inputs CASCADE;
DROP TABLE IF EXISTS public.algorithms CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

DROP SEQUENCE IF EXISTS public.algorithm_inputs_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.algorithm_templates_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.bookmarks_bookmark_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.user_sessions_id_seq CASCADE;
DROP SEQUENCE IF EXISTS public.users_id_seq CASCADE;

--
-- PostgreSQL database dump
--


-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6


SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: algorithm_inputs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.algorithm_inputs (
    id integer NOT NULL,
    algorithm_id character varying(50),
    input_name character varying(50) NOT NULL,
    input_label character varying(50) NOT NULL,
    input_type character varying(20) NOT NULL,
    default_value text NOT NULL,
    description text,
    sort_order integer DEFAULT 0
);


ALTER TABLE public.algorithm_inputs OWNER TO neondb_owner;

--
-- Name: algorithm_inputs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.algorithm_inputs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.algorithm_inputs_id_seq OWNER TO neondb_owner;

--
-- Name: algorithm_inputs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.algorithm_inputs_id_seq OWNED BY public.algorithm_inputs.id;


--
-- Name: algorithm_templates; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.algorithm_templates (
    id integer NOT NULL,
    algorithm_id character varying(50),
    step_id character varying(50) NOT NULL,
    explanation_template text NOT NULL,
    narration_template text NOT NULL
);


ALTER TABLE public.algorithm_templates OWNER TO neondb_owner;

--
-- Name: algorithm_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.algorithm_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.algorithm_templates_id_seq OWNER TO neondb_owner;

--
-- Name: algorithm_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.algorithm_templates_id_seq OWNED BY public.algorithm_templates.id;


--
-- Name: algorithms; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.algorithms (
    id character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    description text,
    complexity character varying(50),
    code_cpp text,
    code_java text,
    code_python text
);


ALTER TABLE public.algorithms OWNER TO neondb_owner;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.bookmarks (
    bookmark_id integer NOT NULL,
    user_id integer,
    algo_id character varying(50),
    bookmark_notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bookmarks OWNER TO neondb_owner;

--
-- Name: bookmarks_bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.bookmarks_bookmark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookmarks_bookmark_id_seq OWNER TO neondb_owner;

--
-- Name: bookmarks_bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.bookmarks_bookmark_id_seq OWNED BY public.bookmarks.bookmark_id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_progress (
    user_id integer NOT NULL,
    algo_id character varying(50) NOT NULL,
    completion_pct integer DEFAULT 0,
    steps_viewed integer DEFAULT 0,
    last_visited timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_progress OWNER TO neondb_owner;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    user_id integer,
    refresh_token_hash character varying(255) NOT NULL,
    device_info character varying(255),
    ip_address character varying(45),
    created_at timestamp without time zone DEFAULT now(),
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO neondb_owner;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_sessions_id_seq OWNER TO neondb_owner;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'learner'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: algorithm_inputs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_inputs ALTER COLUMN id SET DEFAULT nextval('public.algorithm_inputs_id_seq'::regclass);


--
-- Name: algorithm_templates id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_templates ALTER COLUMN id SET DEFAULT nextval('public.algorithm_templates_id_seq'::regclass);


--
-- Name: bookmarks bookmark_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks ALTER COLUMN bookmark_id SET DEFAULT nextval('public.bookmarks_bookmark_id_seq'::regclass);


--
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: algorithm_inputs algorithm_inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_inputs
    ADD CONSTRAINT algorithm_inputs_pkey PRIMARY KEY (id);


--
-- Name: algorithm_templates algorithm_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_templates
    ADD CONSTRAINT algorithm_templates_pkey PRIMARY KEY (id);


--
-- Name: algorithms algorithms_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithms
    ADD CONSTRAINT algorithms_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (bookmark_id);


--
-- Name: bookmarks bookmarks_user_id_algo_id_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_algo_id_key UNIQUE (user_id, algo_id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (user_id, algo_id);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: algorithm_inputs algorithm_inputs_algorithm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_inputs
    ADD CONSTRAINT algorithm_inputs_algorithm_id_fkey FOREIGN KEY (algorithm_id) REFERENCES public.algorithms(id) ON DELETE CASCADE;


--
-- Name: algorithm_templates algorithm_templates_algorithm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.algorithm_templates
    ADD CONSTRAINT algorithm_templates_algorithm_id_fkey FOREIGN KEY (algorithm_id) REFERENCES public.algorithms(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_algo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_algo_id_fkey FOREIGN KEY (algo_id) REFERENCES public.algorithms(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_algo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_algo_id_fkey FOREIGN KEY (algo_id) REFERENCES public.algorithms(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--




-- DATA IMPORT --

INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('bubbleSort', 'Bubble Sort', 'Sorting', 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.', 'O(n²)', 'void bubbleSort(int arr[], int n) {\
    for (int i = 0; i < n - 1; i++) {\
        for (int j = 0; j < n - i - 1; j++) {\
            if (arr[j] > arr[j + 1]) {\
                swap(arr[j], arr[j + 1]);\
            }\
        }\
    }\
}', 'void bubbleSort(int[] arr) {\
    int n = arr.length;\
    for (int i = 0; i < n - 1; i++) {\
        for (int j = 0; j < n - i - 1; j++) {\
            if (arr[j] > arr[j + 1]) {\
                int temp = arr[j];\
                arr[j] = arr[j + 1];\
                arr[j + 1] = temp;\
            }\
        }\
    }\
}', 'def bubble_sort(arr):\
    n = len(arr)\
    for i in range(n - 1):\
        for j in range(0, n - i - 1):\
            if arr[j] > arr[j + 1]:\
                arr[j], arr[j + 1] = arr[j + 1], arr[j]');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('binarySearch', 'Binary Search', 'Searching', 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.', 'O(log n)', 'int binarySearch(int arr[], int l, int r, int x) {\
    while (l <= r) {\
        int m = l + (r - l) / 2;\
        if (arr[m] == x) return m;\
        if (arr[m] < x) l = m + 1;\
        else r = m - 1;\
    }\
    return -1;\
}', 'int binarySearch(int arr[], int x) {\
    int l = 0, r = arr.length - 1;\
    while (l <= r) {\
        int m = l + (r - l) / 2;\
        if (arr[m] == x) return m;\
        if (arr[m] < x) l = m + 1;\
        else r = m - 1;\
    }\
    return -1;\
}', 'def binary_search(arr, x):\
    l, r = 0, len(arr) - 1\
    while l <= r:\
        m = l + (r - l) // 2\
        if arr[m] == x:\
            return m\
        elif arr[m] < x:\
            l = m + 1\
        else:\
            r = m - 1\
    return -1');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('selectionSort', 'Selection Sort', 'Sorting', 'Selection sort is a simple sorting algorithm. It maintains two subarrays: the sorted part and the unsorted part. In every iteration, the minimum element from the unsorted subarray is picked and moved to the sorted subarray.', '{"time": "O(N²)", "space": "O(1)"}', 'void selectionSort(int arr[], int n) {\
    for (int i = 0; i < n - 1; i++) {\
        int min_idx = i;\
        for (int j = i + 1; j < n; j++) {\
            if (arr[j] < arr[min_idx]) {\
                min_idx = j;\
            }\
        }\
        if (min_idx != i) {\
            swap(arr[min_idx], arr[i]);\
        }\
    }\
}', 'void selectionSort(int arr[]) {\
    int n = arr.length;\
    for (int i = 0; i < n - 1; i++) {\
        int min_idx = i;\
        for (int j = i + 1; j < n; j++) {\
            if (arr[j] < arr[min_idx]) {\
                min_idx = j;\
            }\
        }\
        if (min_idx != i) {\
            int temp = arr[min_idx];\
            arr[min_idx] = arr[i];\
            arr[i] = temp;\
        }\
    }\
}', 'def selection_sort(arr):\
    n = len(arr)\
    for i in range(n - 1):\
        min_idx = i\
        for j in range(i + 1, n):\
            if arr[j] < arr[min_idx]:\
                min_idx = j\
        if min_idx != i:\
            arr[i], arr[min_idx] = arr[min_idx], arr[i]');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('insertionSort', 'Insertion Sort', 'Sorting', 'Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, it removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.', '{"time": "O(N²)", "space": "O(1)"}', 'void insertionSort(int arr[], int n) {\
    for (int i = 1; i < n; i++) {\
        int key = arr[i];\
        int j = i - 1;\
        while (j >= 0 && arr[j] > key) {\
            arr[j + 1] = arr[j];\
            j = j - 1;\
        }\
        arr[j + 1] = key;\
    }\
}', 'void insertionSort(int arr[]) {\
    int n = arr.length;\
    for (int i = 1; i < n; i++) {\
        int key = arr[i];\
        int j = i - 1;\
        while (j >= 0 && arr[j] > key) {\
            arr[j + 1] = arr[j];\
            j = j - 1;\
        }\
        arr[j + 1] = key;\
    }\
}', 'def insertion_sort(arr):\
    n = len(arr)\
    for i in range(1, n):\
        key = arr[i]\
        j = i - 1\
        while j >= 0 and arr[j] > key:\
            arr[j + 1] = arr[j]\
            j -= 1\
        arr[j + 1] = key');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('mergeSort', 'Merge Sort', 'Sorting', 'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.', '{"time": "O(N log N)", "space": "O(N)"}', 'void merge(int arr[], int l, int m, int r) {\
    int n1 = m - l + 1;\
    int n2 = r - m;\
    int L[n1], R[n2];\
    for (int i = 0; i < n1; i++)\
        L[i] = arr[l + i];\
    for (int j = 0; j < n2; j++)\
        R[j] = arr[m + 1 + j];\
    int i = 0, j = 0, k = l;\
    while (i < n1 && j < n2) {\
        if (L[i] <= R[j]) {\
            arr[k] = L[i];\
            i++;\
        } else {\
            arr[k] = R[j];\
            j++;\
        }\
        k++;\
    }\
    while (i < n1) {\
        arr[k] = L[i];\
        i++;\
        k++;\
    }\
    while (j < n2) {\
        arr[k] = R[j];\
        j++;\
        k++;\
    }\
}\
\
void mergeSort(int arr[], int l, int r) {\
    if (l >= r) return;\
    int m = l + (r - l) / 2;\
    mergeSort(arr, l, m);\
    mergeSort(arr, m + 1, r);\
    merge(arr, l, m, r);\
}', 'void merge(int arr[], int l, int m, int r) {\
    int n1 = m - l + 1;\
    int n2 = r - m;\
    int L[] = new int[n1];\
    int R[] = new int[n2];\
    for (int i = 0; i < n1; ++i)\
        L[i] = arr[l + i];\
    for (int j = 0; j < n2; ++j)\
        R[j] = arr[m + 1 + j];\
    int i = 0, j = 0;\
    int k = l;\
    while (i < n1 && j < n2) {\
        if (L[i] <= R[j]) {\
            arr[k] = L[i];\
            i++;\
        } else {\
            arr[k] = R[j];\
            j++;\
        }\
        k++;\
    }\
    while (i < n1) {\
        arr[k] = L[i];\
        i++;\
        k++;\
    }\
    while (j < n2) {\
        arr[k] = R[j];\
        j++;\
        k++;\
    }\
}\
\
void mergeSort(int arr[], int l, int r) {\
    if (l < r) {\
        int m = l + (r - l) / 2;\
        mergeSort(arr, l, m);\
        mergeSort(arr, m + 1, r);\
        merge(arr, l, m, r);\
    }\
}', 'def merge(arr, l, m, r):\
    n1 = m - l + 1\
    n2 = r - m\
    L = [0] * n1\
    R = [0] * n2\
    for i in range(0, n1):\
        L[i] = arr[l + i]\
    for j in range(0, n2):\
        R[j] = arr[m + 1 + j]\
    i = 0\
    j = 0\
    k = l\
    while i < n1 and j < n2:\
        if L[i] <= R[j]:\
            arr[k] = L[i]\
            i += 1\
        else:\
            arr[k] = R[j]\
            j += 1\
        k += 1\
    while i < n1:\
        arr[k] = L[i]\
        i += 1\
        k += 1\
    while j < n2:\
        arr[k] = R[j]\
        j += 1\
        k += 1\
\
def merge_sort(arr, l, r):\
    if l < r:\
        m = l + (r - l) // 2\
        merge_sort(arr, l, m)\
        merge_sort(arr, m + 1, r)\
        merge(arr, l, m, r)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('quickSort', 'Quick Sort', 'Sorting', 'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.', '{"time": "O(N log N)", "space": "O(log N)"}', 'int partition(int arr[], int low, int high) {\
    int pivot = arr[high];\
    int i = (low - 1);\
    for (int j = low; j <= high - 1; j++) {\
        if (arr[j] < pivot) {\
            i++;\
            swap(arr[i], arr[j]);\
        }\
    }\
    swap(arr[i + 1], arr[high]);\
    return (i + 1);\
}\
\
void quickSort(int arr[], int low, int high) {\
    if (low < high) {\
        int pi = partition(arr, low, high);\
        quickSort(arr, low, pi - 1);\
        quickSort(arr, pi + 1, high);\
    }\
}', 'int partition(int arr[], int low, int high) {\
    int pivot = arr[high];\
    int i = (low - 1);\
    for (int j = low; j <= high - 1; j++) {\
        if (arr[j] < pivot) {\
            i++;\
            int temp = arr[i];\
            arr[i] = arr[j];\
            arr[j] = temp;\
        }\
    }\
    int temp = arr[i + 1];\
    arr[i + 1] = arr[high];\
    arr[high] = temp;\
    return (i + 1);\
}\
\
void quickSort(int arr[], int low, int high) {\
    if (low < high) {\
        int pi = partition(arr, low, high);\
        quickSort(arr, low, pi - 1);\
        quickSort(arr, pi + 1, high);\
    }\
}', 'def partition(arr, low, high):\
    pivot = arr[high]\
    i = low - 1\
    for j in range(low, high):\
        if arr[j] < pivot:\
            i += 1\
            arr[i], arr[j] = arr[j], arr[i]\
    arr[i + 1], arr[high] = arr[high], arr[i + 1]\
    return i + 1\
\
def quick_sort(arr, low, high):\
    if low < high:\
        pi = partition(arr, low, high)\
        quick_sort(arr, low, pi - 1)\
        quick_sort(arr, pi + 1, high)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('kadanesAlgorithm', 'Kadane''s Algorithm', 'Dynamic Programming', 'Kadane''s algorithm looks for all positive contiguous segments of the array and keeps track of the maximum sum contiguous segment among all positive segments.', '{"time": "O(N)", "space": "O(1)"}', 'int maxSubArraySum(int a[], int size) {\
    int max_so_far = INT_MIN, max_ending_here = 0;\
    for (int i = 0; i < size; i++) {\
        max_ending_here = max_ending_here + a[i];\
        if (max_so_far < max_ending_here)\
            max_so_far = max_ending_here;\
        if (max_ending_here < 0)\
            max_ending_here = 0;\
    }\
    return max_so_far;\
}', 'int maxSubArraySum(int a[]) {\
    int size = a.length;\
    int max_so_far = Integer.MIN_VALUE, max_ending_here = 0;\
    for (int i = 0; i < size; i++) {\
        max_ending_here = max_ending_here + a[i];\
        if (max_so_far < max_ending_here)\
            max_so_far = max_ending_here;\
        if (max_ending_here < 0)\
            max_ending_here = 0;\
    }\
    return max_so_far;\
}', 'def max_sub_array_sum(a, size):\
    max_so_far = float("-inf")\
    max_ending_here = 0\
    for i in range(0, size):\
        max_ending_here = max_ending_here + a[i]\
        if (max_so_far < max_ending_here):\
            max_so_far = max_ending_here\
        if max_ending_here < 0:\
            max_ending_here = 0\
    return max_so_far');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('dutchNationalFlag', 'Dutch National Flag', 'Two Pointers', 'The Dutch National Flag algorithm sorts an array of 0s, 1s, and 2s in linear time without any extra space. It uses three pointers: low, mid, and high.', '{"time": "O(N)", "space": "O(1)"}', 'void sort012(int a[], int arr_size) {\
    int lo = 0;\
    int hi = arr_size - 1;\
    int mid = 0;\
    while (mid <= hi) {\
        switch (a[mid]) {\
        case 0:\
            swap(a[lo++], a[mid++]);\
            break;\
        case 1:\
            mid++;\
            break;\
        case 2:\
            swap(a[mid], a[hi--]);\
            break;\
        }\
    }\
}', 'void sort012(int a[], int arr_size) {\
    int lo = 0;\
    int hi = arr_size - 1;\
    int mid = 0, temp = 0;\
    while (mid <= hi) {\
        switch (a[mid]) {\
            case 0: {\
                temp = a[lo];\
                a[lo] = a[mid];\
                a[mid] = temp;\
                lo++;\
                mid++;\
                break;\
            }\
            case 1:\
                mid++;\
                break;\
            case 2: {\
                temp = a[mid];\
                a[mid] = a[hi];\
                a[hi] = temp;\
                hi--;\
                break;\
            }\
        }\
    }\
}', 'def sort012(a, arr_size):\
    lo = 0\
    hi = arr_size - 1\
    mid = 0\
    while mid <= hi:\
        if a[mid] == 0:\
            a[lo], a[mid] = a[mid], a[lo]\
            lo = lo + 1\
            mid = mid + 1\
        elif a[mid] == 1:\
            mid = mid + 1\
        else:\
            a[mid], a[hi] = a[hi], a[mid]\
            hi = hi - 1\
    return a');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('kmp', 'KMP String Matching', 'String', 'The Knuth-Morris-Pratt (KMP) string searching algorithm looks for occurrences of a "word" W within a main "text string" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin.', '{"time": "O(N + M)", "space": "O(M)"}', 'void computeLPSArray(char* pat, int M, int* lps) {\
    int len = 0;\
    lps[0] = 0;\
    int i = 1;\
    while (i < M) {\
        if (pat[i] == pat[len]) {\
            len++;\
            lps[i] = len;\
            i++;\
        } else {\
            if (len != 0) {\
                len = lps[len - 1];\
            } else {\
                lps[i] = 0;\
                i++;\
            }\
        }\
    }\
}\
\
void KMPSearch(char* pat, char* txt) {\
    int M = strlen(pat);\
    int N = strlen(txt);\
    int lps[M];\
    computeLPSArray(pat, M, lps);\
    int i = 0, j = 0;\
    while (i < N) {\
        if (pat[j] == txt[i]) {\
            j++;\
            i++;\
        }\
        if (j == M) {\
            printf("Found pattern at index %d ", i - j);\
            j = lps[j - 1];\
        } else if (i < N && pat[j] != txt[i]) {\
            if (j != 0)\
                j = lps[j - 1];\
            else\
                i = i + 1;\
        }\
    }\
}', 'void computeLPSArray(String pat, int M, int lps[]) {\
    int len = 0;\
    int i = 1;\
    lps[0] = 0;\
    while (i < M) {\
        if (pat.charAt(i) == pat.charAt(len)) {\
            len++;\
            lps[i] = len;\
            i++;\
        } else {\
            if (len != 0) {\
                len = lps[len - 1];\
            } else {\
                lps[i] = len;\
                i++;\
            }\
        }\
    }\
}\
\
void KMPSearch(String pat, String txt) {\
    int M = pat.length();\
    int N = txt.length();\
    int lps[] = new int[M];\
    int j = 0;\
    computeLPSArray(pat, M, lps);\
    int i = 0;\
    while (i < N) {\
        if (pat.charAt(j) == txt.charAt(i)) {\
            j++;\
            i++;\
        }\
        if (j == M) {\
            System.out.println("Found pattern at index " + (i - j));\
            j = lps[j - 1];\
        } else if (i < N && pat.charAt(j) != txt.charAt(i)) {\
            if (j != 0)\
                j = lps[j - 1];\
            else\
                i = i + 1;\
        }\
    }\
}', 'def computeLPSArray(pat, M, lps):\
    len = 0\
    lps[0] = 0\
    i = 1\
    while i < M:\
        if pat[i] == pat[len]:\
            len += 1\
            lps[i] = len\
            i += 1\
        else:\
            if len != 0:\
                len = lps[len-1]\
            else:\
                lps[i] = 0\
                i += 1\
\
def KMPSearch(pat, txt):\
    M = len(pat)\
    N = len(txt)\
    lps = [0]*M\
    j = 0\
    computeLPSArray(pat, M, lps)\
    i = 0\
    while i < N:\
        if pat[j] == txt[i]:\
            i += 1\
            j += 1\
        if j == M:\
            print("Found pattern at index " + str(i-j))\
            j = lps[j-1]\
        elif i < N and pat[j] != txt[i]:\
            if j != 0:\
                j = lps[j-1]\
            else:\
                i += 1');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('knapsack', '0/1 Knapsack', 'Dynamic Programming', 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.', '{"time": "O(N * W)", "space": "O(N * W)"}', 'int knapSack(int W, int wt[], int val[], int n) {\
    int dp[n + 1][W + 1];\
    for (int i = 0; i <= n; i++) {\
        for (int w = 0; w <= W; w++) {\
            if (i == 0 || w == 0)\
                dp[i][w] = 0;\
            else if (wt[i - 1] <= w)\
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\
            else\
                dp[i][w] = dp[i - 1][w];\
        }\
    }\
    return dp[n][W];\
}', 'int knapSack(int W, int wt[], int val[], int n) {\
    int dp[][] = new int[n + 1][W + 1];\
    for (int i = 0; i <= n; i++) {\
        for (int w = 0; w <= W; w++) {\
            if (i == 0 || w == 0)\
                dp[i][w] = 0;\
            else if (wt[i - 1] <= w)\
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\
            else\
                dp[i][w] = dp[i - 1][w];\
        }\
    }\
    return dp[n][W];\
}', 'def knapSack(W, wt, val, n):\
    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]\
    for i in range(n + 1):\
        for w in range(W + 1):\
            if i == 0 or w == 0:\
                dp[i][w] = 0\
            elif wt[i-1] <= w:\
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]],  dp[i-1][w])\
            else:\
                dp[i][w] = dp[i-1][w]\
    return dp[n][W]');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('lcs', 'Longest Common Subsequence', 'Dynamic Programming', 'Finds the longest subsequence present in both strings. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.', '{"time": "O(M * N)", "space": "O(M * N)"}', 'int lcs(char* X, char* Y, int m, int n) {\
    int L[m + 1][n + 1];\
    for (int i = 0; i <= m; i++) {\
        for (int j = 0; j <= n; j++) {\
            if (i == 0 || j == 0)\
                L[i][j] = 0;\
            else if (X[i - 1] == Y[j - 1])\
                L[i][j] = L[i - 1][j - 1] + 1;\
            else\
                L[i][j] = max(L[i - 1][j], L[i][j - 1]);\
        }\
    }\
    return L[m][n];\
}', 'int lcs(char[] X, char[] Y, int m, int n) {\
    int L[][] = new int[m + 1][n + 1];\
    for (int i = 0; i <= m; i++) {\
        for (int j = 0; j <= n; j++) {\
            if (i == 0 || j == 0)\
                L[i][j] = 0;\
            else if (X[i - 1] == Y[j - 1])\
                L[i][j] = L[i - 1][j - 1] + 1;\
            else\
                L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);\
        }\
    }\
    return L[m][n];\
}', 'def lcs(X, Y, m, n):\
    L = [[0 for x in range(n+1)] for x in range(m+1)]\
    for i in range(m+1):\
        for j in range(n+1):\
            if i == 0 or j == 0:\
                L[i][j] = 0\
            elif X[i-1] == Y[j-1]:\
                L[i][j] = L[i-1][j-1] + 1\
            else:\
                L[i][j] = max(L[i-1][j], L[i][j-1])\
    return L[m][n]');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('nQueens', 'N-Queens Problem', 'Backtracking', 'The N Queen is the problem of placing N chess queens on an N×N chessboard so that no two queens attack each other.', '{"time": "O(N!)", "space": "O(N²)"}', 'bool isSafe(int board[N][N], int row, int col) {\
    for (int i = 0; i < col; i++)\
        if (board[row][i]) return false;\
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)\
        if (board[i][j]) return false;\
    for (int i = row, j = col; j >= 0 && i < N; i++, j--)\
        if (board[i][j]) return false;\
    return true;\
}\
bool solveNQUtil(int board[N][N], int col) {\
    if (col >= N) return true;\
    for (int i = 0; i < N; i++) {\
        if (isSafe(board, i, col)) {\
            board[i][col] = 1;\
            if (solveNQUtil(board, col + 1)) return true;\
            board[i][col] = 0;\
        }\
    }\
    return false;\
}', 'boolean isSafe(int board[][], int row, int col) {\
    for (int i = 0; i < col; i++)\
        if (board[row][i] == 1) return false;\
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)\
        if (board[i][j] == 1) return false;\
    for (int i = row, j = col; j >= 0 && i < N; i++, j--)\
        if (board[i][j] == 1) return false;\
    return true;\
}\
boolean solveNQUtil(int board[][], int col) {\
    if (col >= N) return true;\
    for (int i = 0; i < N; i++) {\
        if (isSafe(board, i, col)) {\
            board[i][col] = 1;\
            if (solveNQUtil(board, col + 1)) return true;\
            board[i][col] = 0;\
        }\
    }\
    return false;\
}', 'def isSafe(board, row, col):\
    for i in range(col):\
        if board[row][i] == 1:\
            return False\
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):\
        if board[i][j] == 1:\
            return False\
    for i, j in zip(range(row, N, 1), range(col, -1, -1)):\
        if board[i][j] == 1:\
            return False\
    return True\
\
def solveNQUtil(board, col):\
    if col >= N:\
        return True\
    for i in range(N):\
        if isSafe(board, i, col):\
            board[i][col] = 1\
            if solveNQUtil(board, col + 1):\
                return True\
            board[i][col] = 0\
    return False');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('floydWarshall', 'Floyd-Warshall', 'Dynamic Programming', 'The Floyd Warshall Algorithm is for solving the All Pairs Shortest Path problem. The problem is to find shortest distances between every pair of vertices in a given edge weighted directed Graph.', '{"time": "O(V³)", "space": "O(V²)"}', 'void floydWarshall(int graph[V][V]) {\
    int dist[V][V], i, j, k;\
    for (i = 0; i < V; i++)\
        for (j = 0; j < V; j++)\
            dist[i][j] = graph[i][j];\
    for (k = 0; k < V; k++) {\
        for (i = 0; i < V; i++) {\
            for (j = 0; j < V; j++) {\
                if (dist[i][k] + dist[k][j] < dist[i][j])\
                    dist[i][j] = dist[i][k] + dist[k][j];\
            }\
        }\
    }\
}', 'void floydWarshall(int graph[][]) {\
    int dist[][] = new int[V][V];\
    int i, j, k;\
    for (i = 0; i < V; i++)\
        for (j = 0; j < V; j++)\
            dist[i][j] = graph[i][j];\
    for (k = 0; k < V; k++) {\
        for (i = 0; i < V; i++) {\
            for (j = 0; j < V; j++) {\
                if (dist[i][k] + dist[k][j] < dist[i][j])\
                    dist[i][j] = dist[i][k] + dist[k][j];\
            }\
        }\
    }\
}', 'def floydWarshall(graph):\
    dist = list(map(lambda i: list(map(lambda j: j, i)), graph))\
    for k in range(V):\
        for i in range(V):\
            for j in range(V):\
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('bst', 'BST Operations', 'Trees', 'A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties: The left subtree of a node contains only nodes with keys lesser than the node’s key. The right subtree of a node contains only nodes with keys greater than the node’s key.', '{"time": "O(log N)", "space": "O(N)"}', 'struct Node {\
    int key;\
    struct Node *left, *right;\
};\
struct Node* insert(struct Node* node, int key) {\
    if (node == NULL) return newNode(key);\
    if (key < node->key)\
        node->left  = insert(node->left, key);\
    else if (key > node->key)\
        node->right = insert(node->right, key);\
    return node;\
}\
struct Node* search(struct Node* root, int key) {\
    if (root == NULL || root->key == key)\
       return root;\
    if (root->key < key)\
       return search(root->right, key);\
    return search(root->left, key);\
}', 'class Node {\
    int key;\
    Node left, right;\
    public Node(int item) {\
        key = item;\
        left = right = null;\
    }\
}\
Node insert(Node node, int key) {\
    if (node == null) return new Node(key);\
    if (key < node.key)\
        node.left = insert(node.left, key);\
    else if (key > node.key)\
        node.right = insert(node.right, key);\
    return node;\
}\
Node search(Node root, int key) {\
    if (root==null || root.key==key)\
        return root;\
    if (root.key < key)\
        return search(root.right, key);\
    return search(root.left, key);\
}', 'class Node:\
    def __init__(self, key):\
        self.left = None\
        self.right = None\
        self.val = key\
\
def insert(root, key):\
    if root is None:\
        return Node(key)\
    else:\
        if root.val == key:\
            return root\
        elif root.val < key:\
            root.right = insert(root.right, key)\
        else:\
            root.left = insert(root.left, key)\
    return root\
\
def search(root,key):\
    if root is None or root.val == key:\
        return root\
    if root.val < key:\
        return search(root.right,key)\
    return search(root.left,key)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('treeTraversals', 'Tree Traversals', 'Trees', 'Unlike linear data structures (Array, Linked List, Queues, Stacks, etc) which have only one logical way to traverse them, trees can be traversed in different ways: Inorder, Preorder, and Postorder.', '{"time": "O(N)", "space": "O(H)"}', 'void printInorder(struct Node* node) {\
    if (node == NULL) return;\
    printInorder(node->left);\
    cout << node->data << " ";\
    printInorder(node->right);\
}\
void printPreorder(struct Node* node) {\
    if (node == NULL) return;\
    cout << node->data << " ";\
    printPreorder(node->left);\
    printPreorder(node->right);\
}\
void printPostorder(struct Node* node) {\
    if (node == NULL) return;\
    printPostorder(node->left);\
    printPostorder(node->right);\
    cout << node->data << " ";\
}', 'void printInorder(Node node) {\
    if (node == null) return;\
    printInorder(node.left);\
    System.out.print(node.key + " ");\
    printInorder(node.right);\
}\
void printPreorder(Node node) {\
    if (node == null) return;\
    System.out.print(node.key + " ");\
    printPreorder(node.left);\
    printPreorder(node.right);\
}\
void printPostorder(Node node) {\
    if (node == null) return;\
    printPostorder(node.left);\
    printPostorder(node.right);\
    System.out.print(node.key + " ");\
}', 'def printInorder(root):\
    if root:\
        printInorder(root.left)\
        print(root.val),\
        printInorder(root.right)\
\
def printPreorder(root):\
    if root:\
        print(root.val),\
        printPreorder(root.left)\
        printPreorder(root.right)\
\
def printPostorder(root):\
    if root:\
        printPostorder(root.left)\
        printPostorder(root.right)\
        print(root.val),');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('trie', 'Trie (Prefix Tree)', 'Trees', 'Trie is an efficient information reTrieval data structure. Using Trie, search complexities can be brought to optimal limit (key length).', '{"time": "O(L)", "space": "O(N * L)"}', 'void insert(struct TrieNode *root, string key) {\
    struct TrieNode *pCrawl = root;\
    for (int i = 0; i < key.length(); i++) {\
        int index = key[i] - ''a'';\
        if (!pCrawl->children[index])\
            pCrawl->children[index] = getNode();\
        pCrawl = pCrawl->children[index];\
    }\
    pCrawl->isEndOfWord = true;\
}\
bool search(struct TrieNode *root, string key) {\
    struct TrieNode *pCrawl = root;\
    for (int i = 0; i < key.length(); i++) {\
        int index = key[i] - ''a'';\
        if (!pCrawl->children[index])\
            return false;\
        pCrawl = pCrawl->children[index];\
    }\
    return (pCrawl != NULL && pCrawl->isEndOfWord);\
}', 'void insert(String key) {\
    int level;\
    int length = key.length();\
    int index;\
    TrieNode pCrawl = root;\
    for (level = 0; level < length; level++) {\
        index = key.charAt(level) - ''a'';\
        if (pCrawl.children[index] == null)\
            pCrawl.children[index] = new TrieNode();\
        pCrawl = pCrawl.children[index];\
    }\
    pCrawl.isEndOfWord = true;\
}\
boolean search(String key) {\
    int level;\
    int length = key.length();\
    int index;\
    TrieNode pCrawl = root;\
    for (level = 0; level < length; level++) {\
        index = key.charAt(level) - ''a'';\
        if (pCrawl.children[index] == null)\
            return false;\
        pCrawl = pCrawl.children[index];\
    }\
    return (pCrawl != null && pCrawl.isEndOfWord);\
}', 'def insert(self, key):\
    pCrawl = self.root\
    length = len(key)\
    for level in range(length):\
        index = self._charToIndex(key[level])\
        if not pCrawl.children[index]:\
            pCrawl.children[index] = self.getNode()\
        pCrawl = pCrawl.children[index]\
    pCrawl.isEndOfWord = True\
\
def search(self, key):\
    pCrawl = self.root\
    length = len(key)\
    for level in range(length):\
        index = self._charToIndex(key[level])\
        if not pCrawl.children[index]:\
            return False\
        pCrawl = pCrawl.children[index]\
    return pCrawl.isEndOfWord');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('bfs', 'Breadth First Search', 'Graphs', 'Breadth First Search (BFS) is a graph traversal algorithm that explores all the vertices in a graph at the current depth prior to moving on to the vertices at the next depth level.', '{"time": "O(V + E)", "space": "O(V)"}', 'void BFS(int s) {\
    vector<bool> visited(V, false);\
    queue<int> q;\
    visited[s] = true;\
    q.push(s);\
    while(!q.empty()) {\
        int s = q.front();\
        q.pop();\
        for (auto i = adj[s].begin(); i != adj[s].end(); ++i) {\
            if (!visited[*i]) {\
                visited[*i] = true;\
                q.push(*i);\
            }\
        }\
    }\
}', 'void BFS(int s) {\
    boolean visited[] = new boolean[V];\
    LinkedList<Integer> queue = new LinkedList<Integer>();\
    visited[s] = true;\
    queue.add(s);\
    while (queue.size() != 0) {\
        s = queue.poll();\
        Iterator<Integer> i = adj[s].listIterator();\
        while (i.hasNext()) {\
            int n = i.next();\
            if (!visited[n]) {\
                visited[n] = true;\
                queue.add(n);\
            }\
        }\
    }\
}', 'def BFS(s):\
    visited = [False] * (len(graph))\
    queue = []\
    queue.append(s)\
    visited[s] = True\
    while queue:\
        s = queue.pop(0)\
        for i in graph[s]:\
            if visited[i] == False:\
                queue.append(i)\
                visited[i] = True');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('dfs', 'Depth First Search', 'Graphs', 'Depth First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.', '{"time": "O(V + E)", "space": "O(V)"}', 'void DFSUtil(int v, vector<bool>& visited) {\
    visited[v] = true;\
    for (auto i = adj[v].begin(); i != adj[v].end(); ++i)\
        if (!visited[*i])\
            DFSUtil(*i, visited);\
}\
void DFS(int v) {\
    vector<bool> visited(V, false);\
    DFSUtil(v, visited);\
}', 'void DFSUtil(int v, boolean visited[]) {\
    visited[v] = true;\
    Iterator<Integer> i = adj[v].listIterator();\
    while (i.hasNext()) {\
        int n = i.next();\
        if (!visited[n])\
            DFSUtil(n, visited);\
    }\
}\
void DFS(int v) {\
    boolean visited[] = new boolean[V];\
    DFSUtil(v, visited);\
}', 'def DFSUtil(v, visited):\
    visited.add(v)\
    for neighbour in graph[v]:\
        if neighbour not in visited:\
            DFSUtil(neighbour, visited)\
\
def DFS(v):\
    visited = set()\
    DFSUtil(v, visited)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('aStar', 'A* Search (Grid)', 'Pathfinding', 'A* is a graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and optimal efficiency.', '{"time": "O(E)", "space": "O(V)"}', 'void aStarSearch(int grid[][COL], Pair src, Pair dest) {\
    if (isValid(src.first, src.second) == false) return;\
    if (isUnBlocked(grid, src.first, src.second) == false) return;\
    if (isDestination(src.first, src.second, dest)) return;\
    bool closedList[ROW][COL];\
    memset(closedList, false, sizeof(closedList));\
    cell cellDetails[ROW][COL];\
    // Initialize start node and open list\
    // Loop until open list is empty\
    // Extract min f, update neighbors\
}', 'void aStarSearch(int grid[][], int[] src, int[] dest) {\
    if (!isValid(src[0], src[1])) return;\
    if (!isUnBlocked(grid, src[0], src[1])) return;\
    if (isDestination(src[0], src[1], dest)) return;\
    boolean[][] closedList = new boolean[ROW][COL];\
    Cell[][] cellDetails = new Cell[ROW][COL];\
    // Initialize start node and open list\
    // Loop until open list is empty\
    // Extract min f, update neighbors\
}', 'def aStarSearch(grid, src, dest):\
    if not isValid(src[0], src[1]): return\
    if not isUnBlocked(grid, src[0], src[1]): return\
    if isDestination(src[0], src[1], dest): return\
    closedList = [[False for _ in range(COL)] for _ in range(ROW)]\
    cellDetails = [[Cell() for _ in range(COL)] for _ in range(ROW)]\
    # Initialize start node and open list\
    # Loop until open list is empty\
    # Extract min f, update neighbors');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('dijkstras', 'Dijkstra''s Algorithm', 'Graphs', 'Dijkstra''s algorithm is used for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.', '{"time": "O((V+E) log V)", "space": "O(V)"}', 'void dijkstra(int graph[V][V], int src) {\
    int dist[V];\
    bool sptSet[V];\
    for (int i = 0; i < V; i++) dist[i] = INT_MAX, sptSet[i] = false;\
    dist[src] = 0;\
    for (int count = 0; count < V - 1; count++) {\
        int u = minDistance(dist, sptSet);\
        sptSet[u] = true;\
        for (int v = 0; v < V; v++)\
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v])\
                dist[v] = dist[u] + graph[u][v];\
    }\
}', 'void dijkstra(int graph[][], int src) {\
    int dist[] = new int[V];\
    Boolean sptSet[] = new Boolean[V];\
    for (int i = 0; i < V; i++) {\
        dist[i] = Integer.MAX_VALUE;\
        sptSet[i] = false;\
    }\
    dist[src] = 0;\
    for (int count = 0; count < V - 1; count++) {\
        int u = minDistance(dist, sptSet);\
        sptSet[u] = true;\
        for (int v = 0; v < V; v++)\
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE && dist[u] + graph[u][v] < dist[v])\
                dist[v] = dist[u] + graph[u][v];\
    }\
}', 'def dijkstra(graph, src):\
    dist = [float("inf")] * V\
    sptSet = [False] * V\
    dist[src] = 0\
    for cout in range(V):\
        u = minDistance(dist, sptSet)\
        sptSet[u] = True\
        for v in range(V):\
            if graph[u][v] > 0 and sptSet[v] == False and dist[v] > dist[u] + graph[u][v]:\
                dist[v] = dist[u] + graph[u][v]');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('kahns', 'Kahn''s Algorithm (Topological Sort)', 'Graphs', 'Kahn''s algorithm finds a topological ordering of a Directed Acyclic Graph (DAG). It works by repeatedly removing nodes with in-degree 0.', '{"time": "O(V + E)", "space": "O(V)"}', 'void topologicalSort(vector<int> adj[], int V) {\
    vector<int> in_degree(V, 0);\
    for (int u = 0; u < V; u++) {\
        for (auto itr = adj[u].begin(); itr != adj[u].end(); itr++)\
            in_degree[*itr]++;\
    }\
    queue<int> q;\
    for (int i = 0; i < V; i++) {\
        if (in_degree[i] == 0) q.push(i);\
    }\
    int cnt = 0;\
    vector<int> top_order;\
    while (!q.empty()) {\
        int u = q.front(); q.pop();\
        top_order.push_back(u);\
        for (auto itr = adj[u].begin(); itr != adj[u].end(); itr++) {\
            if (--in_degree[*itr] == 0) q.push(*itr);\
        }\
        cnt++;\
    }\
}', 'void topologicalSort(List<List<Integer>> adj, int V) {\
    int[] in_degree = new int[V];\
    for (int u = 0; u < V; u++) {\
        for (int node : adj.get(u)) in_degree[node]++;\
    }\
    Queue<Integer> q = new LinkedList<>();\
    for (int i = 0; i < V; i++) {\
        if (in_degree[i] == 0) q.add(i);\
    }\
    List<Integer> topOrder = new ArrayList<>();\
    while (!q.isEmpty()) {\
        int u = q.poll();\
        topOrder.add(u);\
        for (int node : adj.get(u)) {\
            if (--in_degree[node] == 0) q.add(node);\
        }\
    }\
}', 'def topologicalSort(adj, V):\
    in_degree = [0]*(V)\
    for i in range(V):\
        for j in adj[i]: in_degree[j] += 1\
    queue = []\
    for i in range(V):\
        if in_degree[i] == 0: queue.append(i)\
    top_order = []\
    while queue:\
        u = queue.pop(0)\
        top_order.append(u)\
        for i in adj[u]:\
            in_degree[i] -= 1\
            if in_degree[i] == 0: queue.append(i)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('bellmanFord', 'Bellman-Ford Algorithm', 'Graphs', 'Bellman-Ford algorithm finds shortest paths from a single source vertex to all of the other vertices in a weighted digraph, including those with negative weights.', '{"time": "O(V * E)", "space": "O(V)"}', 'void BellmanFord(struct Graph* graph, int src) {\
    int V = graph->V, E = graph->E;\
    int dist[V];\
    for (int i = 0; i < V; i++) dist[i] = INT_MAX;\
    dist[src] = 0;\
    for (int i = 1; i <= V - 1; i++) {\
        for (int j = 0; j < E; j++) {\
            int u = graph->edge[j].src, v = graph->edge[j].dest, weight = graph->edge[j].weight;\
            if (dist[u] != INT_MAX && dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;\
        }\
    }\
}', 'void BellmanFord(Graph graph, int src) {\
    int V = graph.V, E = graph.E;\
    int dist[] = new int[V];\
    for (int i = 0; i < V; ++i) dist[i] = Integer.MAX_VALUE;\
    dist[src] = 0;\
    for (int i = 1; i < V; ++i) {\
        for (int j = 0; j < E; ++j) {\
            int u = graph.edge[j].src, v = graph.edge[j].dest, weight = graph.edge[j].weight;\
            if (dist[u] != Integer.MAX_VALUE && dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;\
        }\
    }\
}', 'def BellmanFord(graph, src):\
    dist = [float("Inf")] * V\
    dist[src] = 0\
    for _ in range(V - 1):\
        for u, v, w in graph:\
            if dist[u] != float("Inf") and dist[u] + w < dist[v]:\
                dist[v] = dist[u] + w');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('prims', 'Prim''s Algorithm (MST)', 'Graphs', 'Prim''s algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.', '{"time": "O(E log V)", "space": "O(V)"}', 'void primMST(int graph[V][V]) {\
    int parent[V], key[V];\
    bool mstSet[V];\
    for (int i = 0; i < V; i++) key[i] = INT_MAX, mstSet[i] = false;\
    key[0] = 0;\
    parent[0] = -1;\
    for (int count = 0; count < V - 1; count++) {\
        int u = minKey(key, mstSet);\
        mstSet[u] = true;\
        for (int v = 0; v < V; v++)\
            if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v])\
                parent[v] = u, key[v] = graph[u][v];\
    }\
}', 'void primMST(int graph[][]) {\
    int parent[] = new int[V], key[] = new int[V];\
    Boolean mstSet[] = new Boolean[V];\
    for (int i = 0; i < V; i++) { key[i] = Integer.MAX_VALUE; mstSet[i] = false; }\
    key[0] = 0; parent[0] = -1;\
    for (int count = 0; count < V - 1; count++) {\
        int u = minKey(key, mstSet);\
        mstSet[u] = true;\
        for (int v = 0; v < V; v++)\
            if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {\
                parent[v] = u;\
                key[v] = graph[u][v];\
            }\
    }\
}', 'def primMST(graph):\
    key = [float("inf")] * V\
    parent = [None] * V\
    mstSet = [False] * V\
    key[0] = 0\
    parent[0] = -1\
    for cout in range(V):\
        u = minKey(key, mstSet)\
        mstSet[u] = True\
        for v in range(V):\
            if graph[u][v] > 0 and mstSet[v] == False and key[v] > graph[u][v]:\
                key[v] = graph[u][v]\
                parent[v] = u');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('kruskals', 'Kruskal''s Algorithm (MST)', 'Graphs', 'Kruskal''s algorithm finds a minimum spanning forest of an undirected edge-weighted graph.', '{"time": "O(E log E)", "space": "O(V)"}', 'void KruskalMST(Graph* graph) {\
    int V = graph->V; Edge result[V];\
    int e = 0, i = 0;\
    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), myComp);\
    subset* subsets = new subset[(V * sizeof(subset))];\
    for (int v = 0; v < V; ++v) { subsets[v].parent = v; subsets[v].rank = 0; }\
    while (e < V - 1 && i < graph->E) {\
        Edge next_edge = graph->edge[i++];\
        int x = find(subsets, next_edge.src), y = find(subsets, next_edge.dest);\
        if (x != y) {\
            result[e++] = next_edge;\
            Union(subsets, x, y);\
        }\
    }\
}', 'void KruskalMST() {\
    Edge result[] = new Edge[V];\
    int e = 0, i = 0;\
    for (i = 0; i < V; ++i) result[i] = new Edge();\
    Arrays.sort(edge);\
    subset subsets[] = new subset[V];\
    for (i = 0; i < V; ++i) subsets[i] = new subset(i, 0);\
    i = 0;\
    while (e < V - 1) {\
        Edge next_edge = edge[i++];\
        int x = find(subsets, next_edge.src), y = find(subsets, next_edge.dest);\
        if (x != y) {\
            result[e++] = next_edge;\
            Union(subsets, x, y);\
        }\
    }\
}', 'def KruskalMST(self):\
    result = []\
    i, e = 0, 0\
    self.graph = sorted(self.graph, key=lambda item: item[2])\
    parent = []\
    rank = []\
    for node in range(self.V):\
        parent.append(node)\
        rank.append(0)\
    while e < self.V - 1:\
        u, v, w = self.graph[i]\
        i = i + 1\
        x = self.find(parent, u)\
        y = self.find(parent, v)\
        if x != y:\
            e = e + 1\
            result.append([u, v, w])\
            self.union(parent, rank, x, y)');
INSERT INTO public.algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python) VALUES ('tarjans', 'Tarjan''s Algorithm (SCC)', 'Graphs', 'Tarjan''s algorithm is used to find strongly connected components of a directed graph.', '{"time": "O(V + E)", "space": "O(V)"}', 'void SCCUtil(int u, int disc[], int low[], stack<int>* st, bool stackMember[]) {\
    static int time = 0;\
    disc[u] = low[u] = ++time;\
    st->push(u);\
    stackMember[u] = true;\
    for (int v : adj[u]) {\
        if (disc[v] == -1) {\
            SCCUtil(v, disc, low, st, stackMember);\
            low[u] = min(low[u], low[v]);\
        } else if (stackMember[v] == true) {\
            low[u] = min(low[u], disc[v]);\
        }\
    }\
    int w = 0;\
    if (low[u] == disc[u]) {\
        while (st->top() != u) {\
            w = (int)st->top(); st->pop(); stackMember[w] = false;\
        }\
        w = (int)st->top(); st->pop(); stackMember[w] = false;\
    }\
}', 'void SCCUtil(int u, int low[], int disc[], boolean stackMember[], Stack<Integer> st) {\
    disc[u] = time; low[u] = time; time++;\
    stackMember[u] = true;\
    st.push(u);\
    for (int v : adj[u]) {\
        if (disc[v] == -1) {\
            SCCUtil(v, low, disc, stackMember, st);\
            low[u] = Math.min(low[u], low[v]);\
        } else if (stackMember[v]) {\
            low[u] = Math.min(low[u], disc[v]);\
        }\
    }\
    int w = -1;\
    if (low[u] == disc[u]) {\
        while (w != u) {\
            w = (int)st.pop();\
            stackMember[w] = false;\
        }\
    }\
}', 'def SCCUtil(self, u, low, disc, stackMember, st):\
    disc[u] = self.Time\
    low[u] = self.Time\
    self.Time += 1\
    stackMember[u] = True\
    st.append(u)\
    for v in self.graph[u]:\
        if disc[v] == -1:\
            self.SCCUtil(v, low, disc, stackMember, st)\
            low[u] = min(low[u], low[v])\
        elif stackMember[v]:\
            low[u] = min(low[u], disc[v])\
    w = -1\
    if low[u] == disc[u]:\
        while w != u:\
            w = st.pop()\
            stackMember[w] = False');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('2', 'binarySearch', 'array', 'Sorted Array', 'array', '2, 3, 4, 10, 40', 'Comma-separated sorted list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('3', 'binarySearch', 'target', 'Target Value', 'number', '10', 'Number to search for', '2');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('10', 'kmp', 'text', 'Text String', 'string', 'ABABDABACDABABCABAB', 'The main text to search in', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('11', 'kmp', 'pattern', 'Pattern String', 'string', 'ABABCABAB', 'The pattern to search for', '2');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('1', 'bubbleSort', 'array', 'Array', 'array', '64, 34, 25, 12, 22, 11, 90, 45, 78, 3', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('4', 'selectionSort', 'array', 'Array', 'array', '64, 25, 12, 22, 11, 90, 45, 78, 3, 50', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('5', 'insertionSort', 'array', 'Array', 'array', '12, 11, 13, 5, 6, 90, 45, 78, 3, 50', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('6', 'mergeSort', 'array', 'Array', 'array', '38, 27, 43, 3, 9, 82, 10, 45, 78, 50', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('7', 'quickSort', 'array', 'Array', 'array', '10, 80, 30, 90, 40, 50, 70, 20, 60, 100', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('8', 'kadanesAlgorithm', 'array', 'Array', 'array', '-2, -3, 4, -1, -2, 1, 5, -3, 6, -4', 'Comma-separated list of numbers', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('9', 'dutchNationalFlag', 'array', 'Array (0s, 1s, 2s)', 'array', '0, 1, 1, 0, 1, 2, 1, 2, 0, 0', 'Array of only 0, 1, and 2', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('12', 'knapsack', 'weights', 'Weights Array', 'array', '1, 2, 3, 5', 'Comma-separated list of item weights', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('13', 'knapsack', 'values', 'Values Array', 'array', '10, 15, 40, 50', 'Comma-separated list of item values', '2');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('14', 'knapsack', 'capacity', 'Knapsack Capacity', 'number', '6', 'Maximum capacity of the knapsack', '3');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('15', 'lcs', 'string1', 'String 1', 'string', 'AGGTAB', 'First string', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('16', 'lcs', 'string2', 'String 2', 'string', 'GXTXAYB', 'Second string', '2');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('17', 'nQueens', 'n', 'Board Size (N)', 'number', '4', 'Size of the chessboard (N x N)', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('18', 'floydWarshall', 'vertices', 'Number of Vertices', 'number', '4', 'Number of vertices in the graph', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('19', 'aStar', 'gridSize', 'Grid Size (N)', 'number', '5', 'Size of the NxN grid', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('20', 'bst', 'target', 'Target to Search', 'number', '40', 'Value to search for in the BST', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('21', 'treeTraversals', 'order', 'Traversal Order', 'string', 'inorder', 'inorder, preorder, or postorder', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('22', 'trie', 'word', 'Word to Search', 'string', 'app', 'Search for this word in the pre-built Trie', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('23', 'bfs', 'startNode', 'Start Node ID', 'number', '0', 'The ID of the node to start BFS from', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('24', 'dfs', 'startNode', 'Start Node ID', 'number', '0', 'The ID of the node to start DFS from', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('25', 'dijkstras', 'startNode', 'Start Node ID', 'number', '0', 'The ID of the source node', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('26', 'kahns', 'run', 'Run Algorithm', 'number', '1', 'Click to run Topological Sort', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('27', 'bellmanFord', 'startNode', 'Start Node ID', 'number', '0', 'The ID of the source node', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('28', 'prims', 'startNode', 'Start Node ID', 'number', '0', 'Node to start building MST', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('29', 'kruskals', 'run', 'Run Algorithm', 'number', '1', 'Click to run Kruskal MST', '1');
INSERT INTO public.algorithm_inputs (id, algorithm_id, input_name, input_label, input_type, default_value, description, sort_order) VALUES ('30', 'tarjans', 'run', 'Run Algorithm', 'number', '1', 'Click to run Tarjan SCC', '1');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('1', 'bubbleSort', 'init', 'Initialize swapped to false.', 'We start by initializing the swapped flag to false.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('2', 'bubbleSort', 'outer_loop', 'Start outer loop for pass {{pass}}. Set swapped to false.', 'Starting a new pass. We set swapped to false.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('3', 'bubbleSort', 'compare', 'Compare arr[{{j}}] ({{val1}}) and arr[{{jPlus1}}] ({{val2}}).', 'We compare the element at index {{j}} with the next element.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('4', 'bubbleSort', 'swap', 'Since {{val1}} > {{val2}}, we swap them.', 'Since the first element is greater than the second, we swap them.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('5', 'bubbleSort', 'set_swapped', 'Set swapped to true.', 'We set the swapped flag to true, indicating a change was made.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('6', 'bubbleSort', 'no_swap', 'Since {{val1}} <= {{val2}}, no swap is needed.', 'The elements are in the correct order, so no swap is needed.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('7', 'bubbleSort', 'check_swaps', 'Check if any swaps happened in this pass.', 'Pass complete. We check if any swaps occurred.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('8', 'bubbleSort', 'early_break', 'No swaps occurred, which means the array is sorted. Breaking out of loop.', 'No swaps occurred during this pass, meaning the array is fully sorted. We can stop early.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('9', 'bubbleSort', 'complete', 'Bubble Sort complete. The array is sorted.', 'The algorithm has completed, and the array is now sorted.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('10', 'binarySearch', 'init', 'Initialize left pointer l = 0 and right pointer r = {{r}}.', 'We initialize the left pointer to the start of the array and the right pointer to the end.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('11', 'binarySearch', 'while_cond', 'Check if left ({{l}}) <= right ({{r}}).', 'We check if the left pointer is less than or equal to the right pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('12', 'binarySearch', 'calc_mid', 'Calculate mid point m = {{m}}.', 'We calculate the middle index of the current range.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('13', 'binarySearch', 'check_match', 'Check if arr[{{m}}] ({{val}}) == target ({{target}}).', 'We check if the middle element is our target value.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('14', 'binarySearch', 'found', 'Target found at index {{m}}!', 'The target value has been found at the middle index.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('15', 'binarySearch', 'check_less', 'Check if arr[{{m}}] ({{val}}) < target ({{target}}).', 'Since they do not match, we check if the middle element is less than the target.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('16', 'binarySearch', 'move_left', 'Since {{val}} < {{target}}, the target must be in the right half. Move left pointer to m + 1 ({{new_l}}).', 'The middle element is smaller than the target, so we discard the left half and move the left pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('17', 'binarySearch', 'move_right', 'Since {{val}} > {{target}}, the target must be in the left half. Move right pointer to m - 1 ({{new_r}}).', 'The middle element is larger than the target, so we discard the right half and move the right pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('18', 'binarySearch', 'not_found', 'Left pointer ({{l}}) > Right pointer ({{r}}). The target is not in the array.', 'The left pointer has passed the right pointer, meaning the target does not exist in the array.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('19', 'selectionSort', 'init', 'Start Selection Sort on the array.', 'Starting Selection Sort.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('20', 'selectionSort', 'outer_loop', 'Finding the minimum element for the subarray starting at index {{i}}.', 'Starting pass {{pass}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('21', 'selectionSort', 'compare', 'Comparing current element {{val}} with current minimum {{minVal}}.', 'Comparing {{val}} with minimum {{minVal}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('22', 'selectionSort', 'new_min', 'Found a new minimum: {{val}} at index {{j}}.', 'New minimum is {{val}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('23', 'selectionSort', 'swap', 'Swapping the minimum element {{minVal}} with the first element of the unsorted part {{val}}.', 'Swapping minimum element into position.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('24', 'selectionSort', 'no_swap', 'The element is already in the correct position.', 'No swap needed.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('25', 'selectionSort', 'complete', 'Array is fully sorted!', 'Selection Sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('26', 'insertionSort', 'init', 'Start Insertion Sort. The first element is assumed sorted.', 'Starting Insertion Sort.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('27', 'insertionSort', 'pick_key', 'Selected key element {{key}} at index {{i}} to insert into the sorted portion.', 'Picking element {{key}} as the key.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('28', 'insertionSort', 'compare', 'Comparing key {{key}} with element {{val}}.', 'Comparing key {{key}} with {{val}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('29', 'insertionSort', 'shift', 'Element {{val}} is greater than key {{key}}, so shift {{val}} one position to the right.', 'Shifting {{val}} to the right.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('30', 'insertionSort', 'insert', 'Found the correct position. Inserting key {{key}}.', 'Inserting key into position.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('31', 'insertionSort', 'complete', 'Array is fully sorted!', 'Insertion Sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('32', 'mergeSort', 'init', 'Start Merge Sort on the entire array.', 'Starting Merge Sort.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('33', 'mergeSort', 'divide', 'Dividing the array from index {{l}} to {{r}} at midpoint {{m}}.', 'Dividing the array into two halves.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('34', 'mergeSort', 'merge_start', 'Merging the two sorted halves: [{{l}}..{{m}}] and [{{mPlus1}}..{{r}}].', 'Merging the two halves.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('35', 'mergeSort', 'merge_compare', 'Comparing {{val1}} from the left half and {{val2}} from the right half.', 'Comparing elements.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('36', 'mergeSort', 'merge_copy', 'Copying {{val}} into the main array.', 'Copying the smaller element.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('37', 'mergeSort', 'merge_exhaust', 'One half is exhausted. Copying remaining elements.', 'Copying remaining elements.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('38', 'mergeSort', 'complete', 'Array is fully sorted!', 'Merge Sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('39', 'quickSort', 'init', 'Start Quick Sort on the entire array.', 'Starting Quick Sort.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('40', 'quickSort', 'partition_start', 'Partitioning subarray from index {{low}} to {{high}}. Pivot chosen is {{pivot}}.', 'Partitioning the array around the pivot {{pivot}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('41', 'quickSort', 'compare', 'Comparing {{val}} with pivot {{pivot}}.', 'Comparing element with pivot.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('42', 'quickSort', 'swap_smaller', '{{val}} is smaller than pivot. Swapping with element at the smaller partition index.', 'Swapping smaller element.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('43', 'quickSort', 'pivot_place', 'Placing the pivot {{pivot}} in its correct sorted position.', 'Placing the pivot.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('44', 'quickSort', 'complete', 'Array is fully sorted!', 'Quick Sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('45', 'kadanesAlgorithm', 'init', 'Start Kadane''s Algorithm to find the maximum subarray sum.', 'Starting Kadane''s Algorithm.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('46', 'kadanesAlgorithm', 'add', 'Add element {{val}} to max_ending_here. It is now {{meh}}.', 'Adding {{val}} to the running sum.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('47', 'kadanesAlgorithm', 'update_max', 'max_ending_here ({{meh}}) is greater than max_so_far ({{msf}}). Updating max_so_far.', 'Updating the maximum sum found so far.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('48', 'kadanesAlgorithm', 'reset_meh', 'max_ending_here is less than 0. Resetting it to 0.', 'Running sum is negative, resetting to zero.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('49', 'kadanesAlgorithm', 'no_reset', 'max_ending_here is still positive. Continuing.', 'Running sum is positive.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('50', 'kadanesAlgorithm', 'complete', 'Algorithm complete. Maximum subarray sum is {{msf}}.', 'Maximum subarray sum is {{msf}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('51', 'dutchNationalFlag', 'init', 'Start Dutch National Flag. Initialize low, mid to 0, and high to end of array.', 'Starting Dutch National Flag sort.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('52', 'dutchNationalFlag', 'case_0', 'Element at mid is 0. Swap with low, then increment both low and mid.', 'Element is zero, swapping with low pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('53', 'dutchNationalFlag', 'case_1', 'Element at mid is 1. Leave it in place and increment mid.', 'Element is one, leaving it in place.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('54', 'dutchNationalFlag', 'case_2', 'Element at mid is 2. Swap with high, then decrement high.', 'Element is two, swapping with high pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('55', 'dutchNationalFlag', 'complete', 'Array is fully sorted!', 'Dutch National Flag sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('56', 'kmp', 'init', 'Start KMP String Matching.', 'Starting KMP String Matching.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('57', 'kmp', 'lps_start', 'Computing Longest Prefix Suffix (LPS) array for the pattern.', 'Computing LPS array.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('58', 'kmp', 'lps_match', 'Characters match at pattern[{{i}}] and pattern[{{len}}]. LPS[{{i}}] becomes {{new_len}}.', 'Characters match, extending LPS length.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('59', 'kmp', 'lps_mismatch_fallback', 'Mismatch. Falling back len to LPS[{{len}} - 1] ({{new_len}}).', 'Mismatch, falling back to previous LPS value.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('60', 'kmp', 'lps_mismatch_zero', 'Mismatch and len is 0. LPS[{{i}}] becomes 0.', 'Mismatch, LPS becomes zero.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('61', 'kmp', 'search_start', 'Starting search in text with the computed LPS array.', 'Starting search.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('62', 'kmp', 'match', 'Characters match at text[{{i}}] and pattern[{{j}}]. Incrementing both i and j.', 'Characters match.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('63', 'kmp', 'found', 'Pattern fully matched! Found occurrence starting at index {{idx}}.', 'Pattern found!');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('64', 'kmp', 'mismatch_fallback', 'Mismatch at text[{{i}}] and pattern[{{j}}]. Using LPS to skip comparisons. j becomes {{new_j}}.', 'Mismatch, using LPS to skip comparisons.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('65', 'kmp', 'mismatch_zero', 'Mismatch and j is 0. Incrementing i to {{new_i}}.', 'Mismatch, advancing text pointer.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('66', 'kmp', 'complete', 'KMP Search complete.', 'KMP Search complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('67', 'knapsack', 'init', 'Initialize DP table of size ({{n}} + 1) x ({{W}} + 1) with zeros.', 'Initializing DP table.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('68', 'knapsack', 'zero_row_col', 'First row and column are 0. (Base case: 0 items or 0 capacity).', 'Setting base cases to zero.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('69', 'knapsack', 'compare', 'Considering item {{i}} with weight {{wt}} and value {{val}} for capacity {{w}}.', 'Considering item {{i}} for capacity {{w}}.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('70', 'knapsack', 'take', 'Item fits! Max of taking it ({{val}} + {{prev_val_taken}}) or leaving it ({{prev_val_left}}) is {{new_val}}.', 'Item fits, taking the maximum value.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('71', 'knapsack', 'leave', 'Item weight ({{wt}}) > current capacity ({{w}}). Must leave it. Value remains {{val}}.', 'Item is too heavy, leaving it.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('72', 'knapsack', 'complete', 'DP table filled. Maximum value is {{ans}}.', 'Knapsack complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('73', 'lcs', 'init', 'Initialize DP table of size ({{m}} + 1) x ({{n}} + 1).', 'Initializing DP table.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('74', 'lcs', 'zero', 'Base case: 0 length string has LCS of 0.', 'Setting base cases to zero.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('75', 'lcs', 'compare', 'Comparing {{c1}} and {{c2}}.', 'Comparing characters.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('76', 'lcs', 'match', 'Characters match! Adding 1 to diagonal value: {{val}}.', 'Characters match, incrementing LCS.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('77', 'lcs', 'mismatch', 'Mismatch. Taking max of above ({{val1}}) and left ({{val2}}).', 'Mismatch, taking maximum of previous subsequences.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('78', 'lcs', 'complete', 'DP table filled. LCS length is {{ans}}.', 'Longest Common Subsequence complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('79', 'nQueens', 'init', 'Initialize empty {{n}}x{{n}} chessboard.', 'Initializing empty chessboard.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('80', 'nQueens', 'try', 'Trying to place queen at row {{r}}, col {{c}}.', 'Trying to place queen.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('81', 'nQueens', 'safe', 'Position is safe. Placing queen.', 'Position is safe.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('82', 'nQueens', 'unsafe', 'Position is unsafe (attacked). Moving to next row.', 'Position is attacked, trying next.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('83', 'nQueens', 'backtrack', 'No safe row in this column. Backtracking by removing queen at row {{r}}, col {{c}}.', 'Dead end, backtracking.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('84', 'nQueens', 'complete', 'Successfully placed all {{n}} queens!', 'N-Queens complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('85', 'floydWarshall', 'init', 'Initialize distance matrix same as input graph.', 'Initializing distance matrix.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('86', 'floydWarshall', 'k_loop', 'Considering vertex {{k}} as an intermediate vertex.', 'Considering intermediate vertex.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('87', 'floydWarshall', 'compare', 'Checking if path from {{i}} to {{j}} via {{k}} is shorter than direct path.', 'Checking intermediate path.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('88', 'floydWarshall', 'update', 'Found shorter path ({{new_dist}}). Updating dist[{{i}}][{{j}}].', 'Found shorter path, updating.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('89', 'floydWarshall', 'no_update', 'Current path ({{old_dist}}) is shorter or equal.', 'Current path is shorter.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('90', 'floydWarshall', 'complete', 'All pairs shortest paths computed.', 'Floyd Warshall complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('91', 'aStar', 'init', 'Initialize A* search on {{n}}x{{n}} grid.', 'Initializing A* search.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('92', 'aStar', 'current', 'Evaluating cell ({{r}}, {{c}}).', 'Evaluating current cell.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('93', 'aStar', 'neighbor', 'Checking neighbor ({{r}}, {{c}}).', 'Checking neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('94', 'aStar', 'update', 'Found better path to neighbor. Updating costs.', 'Updating neighbor costs.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('95', 'aStar', 'found', 'Reached target cell!', 'Target reached!');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('96', 'aStar', 'path', 'Backtracking to find optimal path.', 'Highlighting path.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('97', 'aStar', 'complete', 'A* Search complete.', 'A* Search complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('98', 'bst', 'init', 'Start searching for {{target}} in the Binary Search Tree.', 'Starting BST search.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('99', 'bst', 'compare', 'Comparing target {{target}} with current node {{val}}.', 'Comparing target with current node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('100', 'bst', 'go_left', '{{target}} < {{val}}. Exploring the left subtree.', 'Target is smaller, going left.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('101', 'bst', 'go_right', '{{target}} > {{val}}. Exploring the right subtree.', 'Target is larger, going right.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('102', 'bst', 'found', 'Found {{target}} at node {{val}}!', 'Target found!');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('103', 'bst', 'not_found', 'Reached a null leaf. {{target}} is not in the tree.', 'Target not found in tree.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('104', 'bst', 'complete', 'BST search complete.', 'BST search complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('105', 'treeTraversals', 'init', 'Starting {{order}} traversal on the tree.', 'Starting tree traversal.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('106', 'treeTraversals', 'visit', 'Visiting node {{val}}.', 'Visiting node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('107', 'treeTraversals', 'process', 'Processing/Printing node {{val}}.', 'Processing node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('108', 'treeTraversals', 'complete', 'Traversal complete. Output: {{result}}.', 'Tree traversal complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('109', 'trie', 'init', 'Start searching for "{{word}}" in the Trie.', 'Starting Trie search.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('110', 'trie', 'char', 'Checking for character "{{char}}" from current node.', 'Checking next character.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('111', 'trie', 'found_char', 'Found path for "{{char}}". Moving to next node.', 'Character found, moving down the Trie.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('112', 'trie', 'not_found_char', 'No path for "{{char}}". Word not in Trie.', 'Character not found, word does not exist.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('113', 'trie', 'end_word_true', 'Reached end of string. Node is marked as EndOfWord. Word found!', 'Word successfully found in Trie!');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('114', 'trie', 'end_word_false', 'Reached end of string, but node is NOT EndOfWord. It is only a prefix.', 'Word is only a prefix, not a complete word.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('115', 'trie', 'complete', 'Trie search complete.', 'Trie search complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('116', 'bfs', 'init', 'Start BFS from node {{startNode}}.', 'Starting BFS.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('117', 'bfs', 'visit', 'Visiting node {{node}}.', 'Visiting node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('118', 'bfs', 'neighbor', 'Checking neighbor {{neighbor}} of {{node}}.', 'Checking neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('119', 'bfs', 'enqueue', 'Neighbor {{neighbor}} is unvisited. Enqueueing it.', 'Enqueueing neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('120', 'bfs', 'skip', 'Neighbor {{neighbor}} is already visited. Skipping.', 'Skipping visited neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('121', 'bfs', 'complete', 'BFS Traversal complete. Visited nodes: {{result}}', 'BFS complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('122', 'dfs', 'init', 'Start DFS from node {{startNode}}.', 'Starting DFS.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('123', 'dfs', 'visit', 'Visiting node {{node}}.', 'Visiting node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('124', 'dfs', 'neighbor', 'Checking neighbor {{neighbor}} of {{node}}.', 'Checking neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('125', 'dfs', 'recurse', 'Neighbor {{neighbor}} is unvisited. Recursively visiting it.', 'Recursively exploring neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('126', 'dfs', 'skip', 'Neighbor {{neighbor}} is already visited. Skipping.', 'Skipping visited neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('127', 'dfs', 'backtrack', 'Finished exploring all neighbors of {{node}}. Backtracking.', 'Backtracking.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('128', 'dfs', 'complete', 'DFS Traversal complete. Visited nodes: {{result}}', 'DFS complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('129', 'dijkstras', 'init', 'Initialize distances to infinity. Start at node {{startNode}} with distance 0.', 'Initializing Dijkstra.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('130', 'dijkstras', 'extract_min', 'Extracting node {{node}} with minimum distance {{dist}} from priority queue.', 'Extracting minimum distance node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('131', 'dijkstras', 'relax', 'Checking edge to {{neighbor}} with weight {{weight}}.', 'Checking edge weight.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('132', 'dijkstras', 'update', 'Found shorter path to {{neighbor}}! Old dist: {{old}}, New dist: {{new}}.', 'Updating shortest path.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('133', 'dijkstras', 'skip', 'Current path to {{neighbor}} is already shorter.', 'Keeping current shortest path.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('134', 'dijkstras', 'complete', 'Shortest paths computed for all reachable nodes.', 'Dijkstra complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('135', 'kahns', 'init', 'Calculate in-degrees of all nodes.', 'Calculating in-degrees.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('136', 'kahns', 'enqueue', 'Node {{node}} has in-degree 0. Enqueueing.', 'Node has no incoming edges, adding to queue.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('137', 'kahns', 'process', 'Dequeued node {{node}}. Adding to topological order.', 'Adding node to topological order.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('138', 'kahns', 'reduce', 'Removing edge {{node}} -> {{neighbor}}. Reducing in-degree of {{neighbor}}.', 'Reducing neighbor in-degree.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('139', 'kahns', 'complete', 'Topological Sort complete. Order: {{result}}', 'Topological Sort complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('140', 'bellmanFord', 'init', 'Initialize distances to infinity. Start at node {{startNode}} with distance 0.', 'Initializing Bellman Ford.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('141', 'bellmanFord', 'iteration', 'Starting iteration {{i}} out of {{V-1}}.', 'Starting new iteration.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('142', 'bellmanFord', 'relax', 'Checking edge {{u}} -> {{v}} with weight {{weight}}.', 'Checking edge.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('143', 'bellmanFord', 'update', 'Found shorter path to {{v}}! Old: {{old}}, New: {{new}}.', 'Updating shortest path.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('144', 'bellmanFord', 'skip', 'Current path to {{v}} is already shorter.', 'Current path is shorter.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('145', 'bellmanFord', 'complete', 'Bellman-Ford complete. Shortest paths computed.', 'Algorithm complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('146', 'prims', 'init', 'Initialize MST set and priority queue. Start from node {{startNode}}.', 'Initializing Prim MST.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('147', 'prims', 'extract_min', 'Extracting node {{u}} with minimum edge weight {{weight}}.', 'Extracting minimum weight edge.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('148', 'prims', 'relax', 'Checking edge {{u}} - {{v}} with weight {{weight}}.', 'Checking neighbor edge.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('149', 'prims', 'update', 'Updating key value of {{v}} to {{weight}}.', 'Updating neighbor key.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('150', 'prims', 'complete', 'Minimum Spanning Tree complete. Total weight: {{cost}}.', 'MST complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('151', 'kruskals', 'init', 'Sort all edges by weight and initialize Disjoint Set.', 'Initializing Kruskal MST.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('152', 'kruskals', 'check_edge', 'Checking edge {{u}} - {{v}} with weight {{weight}}.', 'Checking smallest edge.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('153', 'kruskals', 'union', 'Nodes {{u}} and {{v}} are in different sets. Adding edge to MST.', 'Adding edge to MST.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('154', 'kruskals', 'cycle', 'Nodes {{u}} and {{v}} are in the same set. Adding edge would form a cycle. Skipping.', 'Edge forms a cycle, skipping.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('155', 'kruskals', 'complete', 'Minimum Spanning Tree complete. Total weight: {{cost}}.', 'MST complete.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('156', 'tarjans', 'init', 'Initialize discovery times and low values arrays.', 'Initializing Tarjan SCC.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('157', 'tarjans', 'visit', 'Visiting node {{u}}. Setting discovery time and low value.', 'Visiting node.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('158', 'tarjans', 'neighbor', 'Checking neighbor {{v}} of {{u}}.', 'Checking neighbor.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('159', 'tarjans', 'update_low', 'Updating low value of {{u}} using neighbor {{v}}.', 'Updating low value.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('160', 'tarjans', 'scc_found', 'Found a Strongly Connected Component (SCC) rooted at {{u}}.', 'Strongly Connected Component found.');
INSERT INTO public.algorithm_templates (id, algorithm_id, step_id, explanation_template, narration_template) VALUES ('161', 'tarjans', 'complete', 'Tarjan''s algorithm complete. Found {{count}} SCCs.', 'Algorithm complete.');
