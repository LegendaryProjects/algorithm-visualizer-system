import React from 'react';

const StatePanel = ({ state }) => {
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
    <div className="h-full bg-white/10 backdrop-blur-md shadow-xl rounded-xl border border-white/20 flex flex-col">
      <div className="px-4 py-3 border-b border-white/20 bg-black/20 font-medium text-gray-200">
        Live state
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-black/20">
            <tr>
              <th scope="col" className="px-4 py-2 border-b border-white/10">Variable</th>
              <th scope="col" className="px-4 py-2 border-b border-white/10">Value</th>
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
