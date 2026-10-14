import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const StatePanel = ({ state }) => {
  const { isLight } = useTheme();
  if (!state) return null;

  // Filter out internal or large data structures for this simple table view
  const ignoreKeys = [
    'array', 'matrix', 'treeRoot', 
    'comparing', 'swappedIndices', 'complete', 'found',
    'rowLabels', 'colLabels', 'activeCells', 'comparingCells', 'pathCells',
    'activeNodeId', 'comparingNodeIds', 'foundNodeIds'
  ];

  const variables = Object.entries(state).filter(([key, value]) => {
    return !ignoreKeys.includes(key);
  });

  return (
    <div className={`h-full backdrop-blur-md rounded-xl flex flex-col transition-all duration-300 ${
      isLight ? 'bg-white/95 border border-slate-200/90 shadow-xs text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      <div className={`px-4 py-3 border-b font-semibold flex items-center justify-between transition-colors ${
        isLight ? 'bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border-slate-200/90 text-slate-800' : 'bg-black/20 border-white/20 text-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>Live State</span>
        </div>
        <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full border ${
          isLight ? 'bg-slate-100 text-slate-600 border-slate-200/80' : 'bg-white/10 text-gray-300 border-white/10'
        }`}>
          {variables.length} {variables.length === 1 ? 'variable' : 'variables'}
        </span>
      </div>
      <div className="flex-grow p-3 overflow-y-auto">
        <table className={`w-full text-sm text-left ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          <thead className={`text-xs uppercase tracking-wider ${isLight ? 'bg-slate-50/80 text-slate-500' : 'bg-black/20 text-gray-400'}`}>
            <tr>
              <th scope="col" className={`px-3 py-2 border-b rounded-l-md ${isLight ? 'border-slate-200' : 'border-white/10'}`}>Variable</th>
              <th scope="col" className={`px-3 py-2 border-b rounded-r-md ${isLight ? 'border-slate-200' : 'border-white/10'}`}>Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {variables.map(([key, value]) => {
              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = value ? 'true' : 'false';
              } else if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value);
              }

              return (
                <tr key={key} className={`transition-colors duration-150 ${
                  isLight ? 'border-b border-slate-100 hover:bg-indigo-50/30' : 'border-b border-white/10 hover:bg-white/5'
                }`}>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${
                      isLight ? 'bg-slate-100 text-slate-700 border border-slate-200/80' : 'bg-white/10 text-gray-200 border border-white/10'
                    }`}>
                      {key}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      isLight ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/70 shadow-2xs' : 'bg-blue-500/20 text-blue-300 border border-blue-400/20'
                    }`}>
                      {String(displayValue)}
                    </span>
                  </td>
                </tr>
              );
            })}
            {variables.length === 0 && (
              <tr>
                <td colSpan="2" className={`px-4 py-8 text-center text-xs italic ${
                  isLight ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  No active variables in this step
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatePanel;
