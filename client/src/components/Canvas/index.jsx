import React from 'react';
import TreeVisualizer from './TreeVisualizer';
import GraphVisualizer from './GraphVisualizer';
import { useTheme } from '../../context/ThemeContext';

const ArrayVisualizer = ({ state, algoId }) => {
  const { isLight } = useTheme();
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
          let bgStyle = { background: isLight ? 'linear-gradient(180deg, #38bdf8 0%, #2563eb 100%)' : '#3b82f6' };
          let textColor = 'text-white';
          let shadowClass = isLight ? 'shadow-sm shadow-blue-500/20' : '';
          
          if (complete) {
            bgStyle = { background: isLight ? 'linear-gradient(180deg, #34d399 0%, #059669 100%)' : '#22c55e' };
            shadowClass = isLight ? 'shadow-sm shadow-emerald-500/25' : '';
          } else {
            // Out of bounds for divide and conquer algorithms
            if ((l !== undefined && r !== undefined && (idx < l || idx > r)) || 
                (lo !== undefined && hi !== undefined && (idx < lo || idx > hi))) {
              bgStyle = { background: isLight ? '#e2e8f0' : 'rgba(75, 85, 99, 0.4)' };
              textColor = isLight ? 'text-slate-400' : 'text-gray-500';
            }
            
            // Sorted elements
            if (sortedIndex !== undefined) {
              if ((algoId === 'bubbleSort' && idx >= sortedIndex) || 
                  (algoId !== 'bubbleSort' && idx <= sortedIndex)) {
                bgStyle = { background: isLight ? 'linear-gradient(180deg, #34d399 0%, #059669 100%)' : '#22c55e' };
                shadowClass = isLight ? 'shadow-sm shadow-emerald-500/25' : '';
              }
            }

            // Pointers and active states
            if (comparing && comparing.includes(idx)) {
              bgStyle = { background: isLight ? 'linear-gradient(180deg, #fde047 0%, #eab308 100%)' : '#facc15' };
              textColor = isLight ? 'text-amber-950 font-bold' : 'text-gray-900 font-bold';
              shadowClass = isLight ? 'shadow-sm shadow-amber-500/30' : '';
            }
            if (swappedIndices && swappedIndices.includes(idx)) {
              bgStyle = { background: isLight ? 'linear-gradient(180deg, #f87171 0%, #dc2626 100%)' : '#ef4444' };
              textColor = 'text-white';
              shadowClass = isLight ? 'shadow-sm shadow-red-500/30' : '';
            }
            if ((foundIndices && foundIndices.includes(idx)) || (state.found && idx === m)) {
              bgStyle = { background: isLight ? 'linear-gradient(180deg, #34d399 0%, #059669 100%)' : '#22c55e' };
              shadowClass = isLight ? 'shadow-sm shadow-emerald-500/25' : '';
            }

            // Key structural pointers
            if (idx === m || idx === mid) {
              bgStyle = { background: isLight ? 'linear-gradient(180deg, #c084fc 0%, #7c3aed 100%)' : '#a855f7' };
              shadowClass = isLight ? 'shadow-sm shadow-purple-500/25' : '';
            }
            if (pivot !== undefined && idx === state.high) {
              bgStyle = { background: isLight ? 'linear-gradient(180deg, #f472b6 0%, #db2777 100%)' : '#ec4899' };
              shadowClass = isLight ? 'shadow-sm shadow-pink-500/25' : '';
            }
          }

          const heightPct = typeof val === 'number' 
            ? Math.max((val / maxVal) * 100, 12) 
            : 50;

          return (
            <div key={idx} className="flex flex-col items-center">
              <span className={`text-xs mb-1.5 font-mono font-medium ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>{idx}</span>
              <div 
                className={`w-10 sm:w-12 flex items-end justify-center rounded-t-lg transition-all duration-300 ${textColor} ${shadowClass}`}
                style={{ height: `${heightPct}%`, ...bgStyle }}
              >
                <span className="mb-2 font-bold text-sm sm:text-base drop-shadow-2xs">{val}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={`mt-8 flex flex-wrap justify-center gap-2.5 text-xs font-medium sticky left-0 transition-colors ${
        isLight ? 'text-slate-700' : 'text-gray-300'
      }`}>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className="w-2.5 h-2.5 rounded-full mr-2 bg-gradient-to-r from-blue-400 to-blue-600"></span> Default
         </div>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className="w-2.5 h-2.5 rounded-full mr-2 bg-gradient-to-r from-amber-300 to-amber-500"></span> Comparing
         </div>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className="w-2.5 h-2.5 rounded-full mr-2 bg-gradient-to-r from-red-400 to-red-600"></span> Swapping
         </div>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className="w-2.5 h-2.5 rounded-full mr-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></span> Sorted / Found
         </div>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className="w-2.5 h-2.5 rounded-full mr-2 bg-gradient-to-r from-purple-400 to-purple-600"></span> Pivot / Mid
         </div>
         <div className={`flex items-center px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200/90 shadow-2xs' : 'bg-white/5 border-white/10'}`}>
           <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isLight ? 'bg-slate-300' : 'bg-gray-600'}`}></span> Outside bounds
         </div>
      </div>
    </div>
  );
};

const MatrixVisualizer = ({ state, algoId }) => {
  const { isLight } = useTheme();
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
      <div className={`inline-block min-w-max p-4 rounded-xl border transition-colors duration-300 ${
        isLight ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-black/20 border-white/10'
      }`}>
        <table className="border-collapse">
          <thead>
            <tr>
              {rowLabels && colLabels && <th></th>}
              {colLabels && colLabels.map((label, c) => (
                <th key={`col-${c}`} className={`p-2 font-mono text-sm font-medium ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, r) => (
              <tr key={`row-${r}`}>
                {rowLabels && (
                  <td className={`p-2 font-mono text-sm text-right pr-4 border-r ${
                    isLight ? 'text-slate-600 border-slate-200' : 'text-gray-400 border-white/10'
                  }`}>
                    {rowLabels[r]}
                  </td>
                )}
                {row.map((val, c) => {
                  let bgColor = isLight ? 'bg-white' : 'bg-[#1e293b]';
                  let textColor = isLight ? 'text-slate-800' : 'text-white';
                  let borderColor = isLight ? 'border-slate-300' : 'border-white/10';
                  
                  if (algoId === 'nQueens') {
                    // Chessboard pattern
                    if (isLight) {
                      bgColor = (r + c) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-700/80';
                      textColor = (r + c) % 2 === 0 ? 'text-slate-900' : 'text-white';
                    } else {
                      bgColor = (r + c) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600';
                      textColor = 'text-white';
                    }
                    if (val === 1) {
                      val = '♛';
                      textColor = isLight ? 'text-amber-900 text-2xl font-bold' : 'text-yellow-400 text-2xl';
                    } else {
                      val = '';
                    }
                  }

                  if (complete && algoId !== 'nQueens') {
                     if (isCellInArray(r, c, pathCells)) {
                         bgColor = 'bg-green-600';
                         textColor = 'text-white';
                     }
                  } else {
                    if (isCellInArray(r, c, comparingCells)) {
                      bgColor = 'bg-yellow-400';
                      textColor = 'text-gray-900 font-bold';
                    } else if (isCellInArray(r, c, activeCells)) {
                      bgColor = 'bg-blue-500';
                      textColor = 'text-white font-bold';
                    } else if (isCellInArray(r, c, pathCells)) {
                      bgColor = 'bg-green-500';
                      textColor = 'text-white font-bold';
                    }
                  }

                  return (
                    <td 
                      key={`cell-${r}-${c}`} 
                      className={`w-12 h-12 text-center align-middle font-medium border ${borderColor} ${bgColor} ${textColor} transition-colors duration-300`}
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
      
      <div className={`mt-8 flex flex-wrap justify-center gap-4 text-sm sticky left-0 transition-colors ${
        isLight ? 'text-slate-600' : 'text-gray-300'
      }`}>
         <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded"></span> Active/Writing</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 inline-block mr-2 rounded"></span> Comparing/Reading</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded"></span> Solution Path</div>
      </div>
    </div>
  );
};

const Canvas = ({ state, algoId }) => {
  const { isLight } = useTheme();

  return (
    <div 
      className={`w-full h-full backdrop-blur-md rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${
        isLight 
          ? 'border border-slate-200/90 shadow-sm text-slate-800' 
          : 'bg-white/10 border border-white/20 shadow-xl text-white'
      }`}
      style={{
        background: isLight 
          ? 'radial-gradient(circle at 50% 25%, #ffffff 0%, #f8fafc 55%, #f1f5f9 100%)' 
          : undefined
      }}
    >
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
        <div className={`text-sm font-medium ${isLight ? 'text-slate-400' : 'text-gray-400'}`}>Select an algorithm to begin</div>
      )}
    </div>
  );
};

export default Canvas;
