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
      isLight ? 'bg-white/95 border border-slate-200/90 shadow-xs text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      <div className={`px-4 py-3 border-b font-semibold flex items-center justify-between transition-colors ${
        isLight ? 'bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border-slate-200/90 text-slate-800' : 'bg-black/20 border-white/20 text-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
          <span>Written Explanation</span>
        </div>
        {steps.length > 0 && (
          <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${
            isLight ? 'bg-indigo-50 text-indigo-700 border-indigo-200/80' : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
          }`}>
            Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
          </span>
        )}
      </div>
      <div 
        ref={containerRef}
        className="flex-grow p-4 overflow-y-auto"
      >
        {steps.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm italic opacity-50">
            No steps generated yet
          </div>
        ) : (
          steps.slice(0, currentStepIndex + 1).map((step, idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <div 
                key={idx}
                className={`p-3.5 mb-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? isLight
                      ? 'active-explanation bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-indigo-200/70 border-l-4 border-l-indigo-600 text-slate-900 shadow-xs'
                      : 'active-explanation bg-blue-500/20 border-l-4 border-blue-400 text-blue-100 shadow-sm'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start">
                  {isActive ? (
                    <span className={`w-5 h-5 rounded-full font-bold text-xs flex items-center justify-center mr-3 mt-0.5 shrink-0 shadow-2xs ${
                      isLight ? 'bg-indigo-600 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                  ) : (
                    <span className={`font-mono text-xs mr-3 mt-1 shrink-0 ${
                      isLight ? 'text-slate-400 font-medium' : 'text-gray-500'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                  <p className={`text-sm leading-relaxed ${
                    isActive ? (isLight ? 'font-medium text-slate-900' : 'font-medium text-white') : ''
                  }`}>
                    {step.explanation}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;
