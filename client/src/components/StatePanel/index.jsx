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
      isLight ? 'bg-white/90 border border-slate-200 shadow-sm text-slate-800' : 'bg-white/10 border border-white/20 shadow-xl text-white'
    }`}>
      <div className={`px-4 py-3 border-b font-semibold transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-black/20 border-white/20 text-gray-200'
      }`}>
        Live state
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <table className={`w-full text-sm text-left ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          <thead className={`text-xs uppercase ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-black/20 text-gray-400'}`}>
            <tr>
              <th scope="col" className={`px-4 py-2 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>Variable</th>
              <th scope="col" className={`px-4 py-2 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>Value</th>
            </tr>
          </thead>
          <tbody>
            {variables.map(([key, value]) => {
              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = value ? 'true' : 'false';
              } else if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value);
              }

              return (
                <tr key={key} className="bg-transparent border-b border-white/10 transition-colors duration-200 hover:bg-white/5">
                  <td className="px-4 py-2 font-mono text-gray-200 font-medium">
                    {key}
                  </td>
                  <td className="px-4 py-2 font-mono text-blue-400">
                    {displayValue}
                  </td>
                </tr>
              );
            })}
            {variables.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-4 text-center text-gray-500 italic">
                  No active variables
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
