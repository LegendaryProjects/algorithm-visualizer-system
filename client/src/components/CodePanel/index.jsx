import React, { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

const CodePanel = ({ codeSamples, activeLines }) => {
  const [language, setLanguage] = useState('cpp');
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current && monaco && activeLines) {
      const activeLine = activeLines[language];
      
      if (activeLine) {
        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          [
            {
              range: new monaco.Range(activeLine, 1, activeLine, 1),
              options: {
                isWholeLine: true,
                className: 'bg-blue-200 bg-opacity-50', // Tailwind class for highlight
                marginClassName: 'bg-blue-500' // Marker in the margin
              }
            }
          ]
        );

        // Scroll to the active line
        editorRef.current.revealLineInCenter(activeLine);
      } else {
        // Clear decorations if no active line
        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          []
        );
      }
    }
  }, [activeLines, language, monaco]);

  const langMap = {
    'cpp': 'cpp',
    'java': 'java',
    'python': 'python'
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="flex border-b border-gray-200 bg-gray-50">
        {['cpp', 'java', 'python'].map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              language === lang
                ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex-grow p-2">
        <Editor
          height="100%"
          language={langMap[language]}
          value={codeSamples[language] || ''}
          theme="vs-light"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodePanel;
