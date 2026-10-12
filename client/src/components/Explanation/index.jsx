import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const ExplanationPanel = ({ steps, currentStepIndex }) => {
  const containerRef = useRef(null);
  const { isLight } = useTheme();
  
  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom to push old lines upwards
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentStepIndex]);

  return (
    <div className={`h-full backdrop-blur-md rounded-xl flex flex-col transition-all duration-300 ${
      isLight ? 'bg-white/90 border border-slate-200 shadow-sm text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      <div className={`px-4 py-3 border-b font-semibold transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-black/20 border-white/20 text-gray-200'
      }`}>
        Written explanation
      </div>
      <div 
        ref={containerRef}
        className="flex-grow p-4 overflow-y-auto"
      >
        {steps.slice(0, currentStepIndex + 1).map((step, idx) => (
          <div 
            key={idx}
            className={`p-3 mb-2 rounded-md transition-colors duration-200 ${
              idx === currentStepIndex 
                ? 'active-explanation bg-blue-500/20 border-l-4 border-blue-400 text-blue-100 shadow-sm' 
                : 'text-gray-400' 
            }`}
          >
            <div className="flex items-start">
              <span className="font-mono text-xs mr-3 mt-1 opacity-60">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed">
                {step.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationPanel;
