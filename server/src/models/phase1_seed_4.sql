-- KMP String Matching
INSERT INTO algorithms (id, name, category, description, complexity, code_cpp, code_java, code_python)
VALUES (
    'kmp', 
    'KMP String Matching', 
    'String', 
    'The Knuth-Morris-Pratt (KMP) string searching algorithm looks for occurrences of a "word" W within a main "text string" S by employing the observation that when a mismatch occurs, the word itself embodies sufficient information to determine where the next match could begin.', 
    '{"time": "O(N + M)", "space": "O(M)"}',
    'void computeLPSArray(char* pat, int M, int* lps) {\n    int len = 0;\n    lps[0] = 0;\n    int i = 1;\n    while (i < M) {\n        if (pat[i] == pat[len]) {\n            len++;\n            lps[i] = len;\n            i++;\n        } else {\n            if (len != 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i] = 0;\n                i++;\n            }\n        }\n    }\n}\n\nvoid KMPSearch(char* pat, char* txt) {\n    int M = strlen(pat);\n    int N = strlen(txt);\n    int lps[M];\n    computeLPSArray(pat, M, lps);\n    int i = 0, j = 0;\n    while (i < N) {\n        if (pat[j] == txt[i]) {\n            j++;\n            i++;\n        }\n        if (j == M) {\n            printf("Found pattern at index %d ", i - j);\n            j = lps[j - 1];\n        } else if (i < N && pat[j] != txt[i]) {\n            if (j != 0)\n                j = lps[j - 1];\n            else\n                i = i + 1;\n        }\n    }\n}',
    'void computeLPSArray(String pat, int M, int lps[]) {\n    int len = 0;\n    int i = 1;\n    lps[0] = 0;\n    while (i < M) {\n        if (pat.charAt(i) == pat.charAt(len)) {\n            len++;\n            lps[i] = len;\n            i++;\n        } else {\n            if (len != 0) {\n                len = lps[len - 1];\n            } else {\n                lps[i] = len;\n                i++;\n            }\n        }\n    }\n}\n\nvoid KMPSearch(String pat, String txt) {\n    int M = pat.length();\n    int N = txt.length();\n    int lps[] = new int[M];\n    int j = 0;\n    computeLPSArray(pat, M, lps);\n    int i = 0;\n    while (i < N) {\n        if (pat.charAt(j) == txt.charAt(i)) {\n            j++;\n            i++;\n        }\n        if (j == M) {\n            System.out.println("Found pattern at index " + (i - j));\n            j = lps[j - 1];\n        } else if (i < N && pat.charAt(j) != txt.charAt(i)) {\n            if (j != 0)\n                j = lps[j - 1];\n            else\n                i = i + 1;\n        }\n    }\n}',
    'def computeLPSArray(pat, M, lps):\n    len = 0\n    lps[0] = 0\n    i = 1\n    while i < M:\n        if pat[i] == pat[len]:\n            len += 1\n            lps[i] = len\n            i += 1\n        else:\n            if len != 0:\n                len = lps[len-1]\n            else:\n                lps[i] = 0\n                i += 1\n\ndef KMPSearch(pat, txt):\n    M = len(pat)\n    N = len(txt)\n    lps = [0]*M\n    j = 0\n    computeLPSArray(pat, M, lps)\n    i = 0\n    while i < N:\n        if pat[j] == txt[i]:\n            i += 1\n            j += 1\n        if j == M:\n            print("Found pattern at index " + str(i-j))\n            j = lps[j-1]\n        elif i < N and pat[j] != txt[i]:\n            if j != 0:\n                j = lps[j-1]\n            else:\n                i += 1'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO algorithm_inputs (algorithm_id, input_name, input_label, input_type, default_value, sort_order, description)
VALUES 
    ('kmp', 'text', 'Text String', 'string', 'ABABDABACDABABCABAB', 1, 'The main text to search in'),
    ('kmp', 'pattern', 'Pattern String', 'string', 'ABABCABAB', 2, 'The pattern to search for');

INSERT INTO algorithm_templates (algorithm_id, step_id, explanation_template, narration_template)
VALUES
    ('kmp', 'init', 'Start KMP String Matching.', 'Starting KMP String Matching.'),
    ('kmp', 'lps_start', 'Computing Longest Prefix Suffix (LPS) array for the pattern.', 'Computing LPS array.'),
    ('kmp', 'lps_match', 'Characters match at pattern[{{i}}] and pattern[{{len}}]. LPS[{{i}}] becomes {{new_len}}.', 'Characters match, extending LPS length.'),
    ('kmp', 'lps_mismatch_fallback', 'Mismatch. Falling back len to LPS[{{len}} - 1] ({{new_len}}).', 'Mismatch, falling back to previous LPS value.'),
    ('kmp', 'lps_mismatch_zero', 'Mismatch and len is 0. LPS[{{i}}] becomes 0.', 'Mismatch, LPS becomes zero.'),
    ('kmp', 'search_start', 'Starting search in text with the computed LPS array.', 'Starting search.'),
    ('kmp', 'match', 'Characters match at text[{{i}}] and pattern[{{j}}]. Incrementing both i and j.', 'Characters match.'),
    ('kmp', 'found', 'Pattern fully matched! Found occurrence starting at index {{idx}}.', 'Pattern found!'),
    ('kmp', 'mismatch_fallback', 'Mismatch at text[{{i}}] and pattern[{{j}}]. Using LPS to skip comparisons. j becomes {{new_j}}.', 'Mismatch, using LPS to skip comparisons.'),
    ('kmp', 'mismatch_zero', 'Mismatch and j is 0. Incrementing i to {{new_i}}.', 'Mismatch, advancing text pointer.'),
    ('kmp', 'complete', 'KMP Search complete.', 'KMP Search complete.');
