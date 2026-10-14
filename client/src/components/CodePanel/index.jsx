import React, { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useTheme } from '../../context/ThemeContext';

const CodePanel = ({ codeSamples, activeLines }) => {
  const [language, setLanguage] = useState('cpp');
  const { isLight } = useTheme();
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
                className: isLight ? 'bg-indigo-100/70 font-semibold' : 'bg-blue-200/20 font-semibold',
                marginClassName: isLight ? 'bg-indigo-600' : 'bg-blue-500'
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
  }, [activeLines, language, monaco, isLight]);

  const langMap = {
    'cpp': 'cpp',
    'java': 'java',
    'python': 'python'
  };

  const langLabels = {
    'cpp': 'C++',
    'java': 'Java',
    'python': 'Python'
  };

  return (
    <div className={`flex flex-col h-full rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300 ${
      isLight 
        ? 'bg-white/95 border border-slate-200/90 shadow-xs' 
        : 'bg-white/10 border border-white/20 shadow-xl'
    }`}>
      <div className={`flex items-center justify-between border-b px-3 py-2 transition-colors ${
        isLight 
          ? 'bg-gradient-to-r from-slate-50 via-indigo-50/30 to-slate-50 border-slate-200/90' 
          : 'bg-black/20 border-white/20'
      }`}>
        <div className="flex items-center gap-1.5 p-0.5 rounded-lg">
          {['cpp', 'java', 'python'].map((lang) => {
            const isActive = language === lang;
            return (
              <button
                key={lang}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-100'
                      : 'bg-blue-600 text-white shadow-sm'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setLanguage(lang)}
              >
                {langLabels[lang]}
              </button>
            );
          })}
        </div>
        <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
          isLight ? 'text-slate-500 bg-slate-100 border border-slate-200/60' : 'text-gray-400 bg-white/5 border border-white/10'
        }`}>
          {language === 'cpp' ? 'C++17' : language === 'java' ? 'Java 17' : 'Python 3'}
        </span>
      </div>
      <div className="flex-grow p-1">
        <Editor
          height="100%"
          language={langMap[language]}
          value={codeSamples?.[language] || '// No code implementation available'}
          theme={isLight ? "vs-light" : "vs-dark"}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            lineNumbers: 'on',
            lineDecorationsWidth: 6,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'none',
            folding: false,
            fontFamily: "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace"
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodePanel;
