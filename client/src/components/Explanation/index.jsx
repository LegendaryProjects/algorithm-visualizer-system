import React, { useEffect, useRef } from 'react';

const ExplanationPanel = ({ steps, currentStepIndex }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the bottom to push old lines upwards
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentStepIndex]);

  return (
    <div className="h-full bg-white/10 backdrop-blur-md shadow-xl rounded-xl border border-white/20 flex flex-col">
      <div className="px-4 py-3 border-b border-white/20 bg-black/20 font-medium text-gray-200">
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
