import React from 'react';

const TreeVisualizer = ({ state, algoId }) => {
  if (!state || !state.treeRoot) return null;

  const { treeRoot, activeNodeId, comparingNodeIds, foundNodeIds } = state;
  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 400;
  
  // Calculate positions
  const nodes = [];
  const links = [];
  
  const calculatePositions = (node, depth, left, right) => {
    if (!node) return null;
    
    const x = (left + right) / 2;
    const y = depth * 70 + 60; // Increased spacing and top offset
    
    const pos = { id: node.id, val: node.val, x, y, children: node.children };
    
    // For binary tree (left/right)
    if (node.left || node.right) {
      if (node.left) {
        const leftPos = calculatePositions(node.left, depth + 1, left, x);
        links.push({ x1: x, y1: y, x2: leftPos.x, y2: leftPos.y });
      }
      if (node.right) {
        const rightPos = calculatePositions(node.right, depth + 1, x, right);
        links.push({ x1: x, y1: y, x2: rightPos.x, y2: rightPos.y });
      }
    } 
    // For n-ary tree (Trie)
    else if (node.children && node.children.length > 0) {
      const step = (right - left) / Math.max(node.children.length, 1);
      node.children.forEach((child, i) => {
        const childLeft = left + i * step;
        const childRight = childLeft + step;
        const childPos = calculatePositions(child, depth + 1, childLeft, childRight);
        links.push({ x1: x, y1: y, x2: childPos.x, y2: childPos.y, label: child.edgeLabel });
      });
    }
    
    nodes.push(pos);
    return pos;
  };
  
  calculatePositions(treeRoot, 0, 0, SVG_WIDTH);
  
  const isComparing = (id) => comparingNodeIds && comparingNodeIds.includes(id);
  const isFound = (id) => foundNodeIds && foundNodeIds.includes(id);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 pt-8 overflow-auto">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="overflow-visible min-h-[400px]">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
        </defs>
        
        {links.map((link, i) => (
          <g key={`link-${i}`}>
            <line 
              x1={link.x1} 
              y1={link.y1} 
              x2={link.x2} 
              y2={link.y2} 
              stroke="#475569" 
              strokeWidth="2"
              markerEnd={algoId === 'trie' ? 'url(#arrowhead)' : ''}
            />
            {link.label && (
              <text 
                x={(link.x1 + link.x2) / 2 - 10} 
                y={(link.y1 + link.y2) / 2 - 5} 
                fill="#94a3b8" 
                fontSize="14"
                fontWeight="bold"
              >
                {link.label}
              </text>
            )}
          </g>
        ))}
        
        {nodes.map((node) => {
          let bgColor = '#1e293b'; // Default dark
          let strokeColor = '#3b82f6'; // Blue border
          let textColor = '#ffffff';
          
          if (isFound(node.id)) {
            bgColor = '#22c55e'; // Green
            strokeColor = '#16a34a';
          } else if (node.id === activeNodeId) {
            bgColor = '#3b82f6'; // Blue
            strokeColor = '#2563eb';
          } else if (isComparing(node.id)) {
            bgColor = '#eab308'; // Yellow
            strokeColor = '#ca8a04';
            textColor = '#1e293b';
          }

          return (
            <g key={`node-${node.id}`}>
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="16" 
                fill={bgColor} 
                stroke={strokeColor} 
                strokeWidth="3"
                className="transition-all duration-300"
              />
              <text 
                x={node.x} 
                y={node.y} 
                textAnchor="middle" 
                dominantBaseline="central" 
                fill={textColor} 
                fontSize="12"
                fontWeight="bold"
              >
                {node.val}
              </text>
            </g>
          );
        })}
      </svg>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300 sticky left-0">
         <div className="flex items-center"><span className="w-3 h-3 border-2 border-blue-500 bg-[#1e293b] inline-block mr-2 rounded-full"></span> Default Node</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded-full"></span> Active Node</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 inline-block mr-2 rounded-full"></span> Comparing</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded-full"></span> Found/Result</div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
