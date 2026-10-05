import React from 'react';
import TreeVisualizer from './TreeVisualizer';
import GraphVisualizer from './GraphVisualizer';

const ArrayVisualizer = ({ state, algoId }) => {
  if (!state || !state.array) return null;
// ... (I'll just replace the whole Canvas function at the bottom)


  const { 
    array, 
    comparing, 
    swappedIndices, 
    foundIndices, 
    sortedIndex, 
    complete,
    l, r, m,
    lo, hi, mid,
    pivot
  } = state;

  const maxVal = Math.max(...array.filter(v => typeof v === 'number'), 1);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 overflow-auto">
      <div className="flex items-end space-x-2 h-64 min-w-max">
        {array.map((val, idx) => {
          let bgColor = 'bg-blue-400';
          let textColor = 'text-white';
          
          if (complete) {
            bgColor = 'bg-green-500';
          } else {
            // Out of bounds for divide and conquer algorithms
            if (l !== undefined && r !== undefined && (idx < l || idx > r)) {
              bgColor = 'bg-gray-600/50 text-gray-500';
            }
            if (lo !== undefined && hi !== undefined && (idx < lo || idx > hi)) {
              bgColor = 'bg-gray-600/50 text-gray-500';
            }
            
            // Sorted elements
            if (sortedIndex !== undefined) {
              if (algoId === 'bubbleSort' && idx >= sortedIndex) bgColor = 'bg-green-500';
              if (algoId !== 'bubbleSort' && idx <= sortedIndex) bgColor = 'bg-green-500';
            }

            // Pointers and active states
            if (comparing && comparing.includes(idx)) {
              bgColor = 'bg-yellow-400';
              textColor = 'text-gray-900';
            }
            if (swappedIndices && swappedIndices.includes(idx)) {
              bgColor = 'bg-red-500';
            }
            if (foundIndices && foundIndices.includes(idx)) {
              bgColor = 'bg-green-500';
            }
            if (state.found && idx === m) {
              bgColor = 'bg-green-500';
            }

            // Key structural pointers
            if (idx === m || idx === mid) {
              bgColor = 'bg-purple-500';
            }
            if (pivot !== undefined && idx === state.high) {
               bgColor = 'bg-pink-500';
            }
          }

          const heightPct = typeof val === 'number' 
            ? Math.max((val / maxVal) * 100, 10) 
            : 50;

          return (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xs mb-1 text-gray-400 font-mono">{idx}</span>
              <div 
                className={`w-10 sm:w-12 flex items-end justify-center rounded-t-md transition-all duration-300 ${bgColor} ${textColor}`}
                style={{ height: `${heightPct}%` }}
              >
                <span className="mb-2 font-bold text-sm sm:text-base">{val}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300 sticky left-0">
         <div className="flex items-center"><span className="w-3 h-3 bg-blue-400 inline-block mr-2 rounded"></span> Default</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 inline-block mr-2 rounded"></span> Comparing</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded"></span> Changing/Swapping</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded"></span> Sorted/Found</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 inline-block mr-2 rounded"></span> Middle/Pivot</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-gray-600/50 inline-block mr-2 rounded"></span> Outside bounds</div>
      </div>
    </div>
  );
};

const MatrixVisualizer = ({ state, algoId }) => {
  if (!state || !state.matrix) return null;

  const { 
    matrix, 
    rowLabels, 
    colLabels, 
    activeCells, 
    pathCells, 
    comparingCells, 
    complete 
  } = state;

  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  const isCellInArray = (r, c, arr) => {
    return arr && arr.some(([rr, cc]) => rr === r && cc === c);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 pt-8 overflow-auto">
      <div className="inline-block min-w-max bg-black/20 p-4 rounded-xl border border-white/10">
        <table className="border-collapse">
          <thead>
            <tr>
              {rowLabels && colLabels && <th></th>}
              {colLabels && colLabels.map((label, c) => (
                <th key={`col-${c}`} className="p-2 text-gray-400 font-mono text-sm font-normal">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, r) => (
              <tr key={`row-${r}`}>
                {rowLabels && (
                  <td className="p-2 text-gray-400 font-mono text-sm text-right pr-4 border-r border-white/10">
                    {rowLabels[r]}
                  </td>
                )}
                {row.map((val, c) => {
                  let bgColor = 'bg-[#1e293b]';
                  let textColor = 'text-white';
                  let borderColor = 'border-white/10';
                  
                  if (algoId === 'nQueens') {
                    // Chessboard pattern
                    bgColor = (r + c) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600';
                    if (val === 1) {
                      val = '♛';
                      textColor = 'text-yellow-400 text-xl';
                    } else {
                      val = '';
                    }
                  }

                  if (complete && algoId !== 'nQueens') {
                     if (isCellInArray(r, c, pathCells)) {
                         bgColor = 'bg-green-600';
                     }
                  } else {
                    if (isCellInArray(r, c, comparingCells)) {
                      bgColor = 'bg-yellow-500';
                      textColor = 'text-gray-900';
                    } else if (isCellInArray(r, c, activeCells)) {
                      bgColor = 'bg-blue-500';
                    } else if (isCellInArray(r, c, pathCells)) {
                      bgColor = 'bg-green-500';
                    }
                  }

                  return (
                    <td 
                      key={`cell-${r}-${c}`} 
                      className={`w-12 h-12 text-center align-middle border ${borderColor} ${bgColor} ${textColor} transition-colors duration-300`}
                    >
                      {val !== null && val !== undefined ? val : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300 sticky left-0">
         <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded"></span> Active/Writing</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 inline-block mr-2 rounded"></span> Comparing/Reading</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded"></span> Solution Path</div>
      </div>
    </div>
  );
};

const Canvas = ({ state, algoId }) => {
  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
      {state ? (
        state.graph ? (
          <GraphVisualizer state={state} algoId={algoId} />
        ) : state.treeRoot ? (
          <TreeVisualizer state={state} algoId={algoId} />
        ) : state.matrix ? (
          <MatrixVisualizer state={state} algoId={algoId} />
        ) : (
          <ArrayVisualizer state={state} algoId={algoId} />
        )
      ) : (
        <div className="text-gray-400 text-lg">Select an algorithm to begin</div>
      )}
    </div>
  );
};

export default Canvas;
