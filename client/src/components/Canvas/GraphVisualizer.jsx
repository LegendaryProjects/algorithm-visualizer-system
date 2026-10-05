import React from 'react';

const GraphVisualizer = ({ state, algoId }) => {
  if (!state || !state.graph) return null;

  const { graph, activeNodeId, comparingNodeIds, foundNodeIds, activeEdgeIds, pathEdgeIds } = state;
  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 400;

  const isComparing = (id) => comparingNodeIds && comparingNodeIds.includes(id);
  const isFound = (id) => foundNodeIds && foundNodeIds.includes(id);
  
  const isActiveEdge = (edgeId) => activeEdgeIds && activeEdgeIds.includes(edgeId);
  const isPathEdge = (edgeId) => pathEdgeIds && pathEdgeIds.includes(edgeId);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 pt-8 overflow-auto">
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="overflow-visible min-h-[400px]">
        <defs>
          <marker id="arrowhead-default" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker id="arrowhead-path" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
          </marker>
        </defs>
        
        {graph.edges && graph.edges.map((edge, i) => {
          const sourceNode = graph.nodes.find(n => n.id === edge.source);
          const targetNode = graph.nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const edgeId = edge.id || `${edge.source}-${edge.target}`;
          
          let strokeColor = '#475569';
          let markerEnd = edge.isDirected ? 'url(#arrowhead-default)' : '';
          let strokeWidth = '2';

          if (isPathEdge(edgeId)) {
            strokeColor = '#22c55e'; // Green
            strokeWidth = '3';
            if (edge.isDirected) markerEnd = 'url(#arrowhead-path)';
          } else if (isActiveEdge(edgeId)) {
            strokeColor = '#3b82f6'; // Blue
            strokeWidth = '3';
            if (edge.isDirected) markerEnd = 'url(#arrowhead-active)';
          }

          const midX = (sourceNode.x + targetNode.x) / 2;
          const midY = (sourceNode.y + targetNode.y) / 2;

          return (
            <g key={`edge-${i}`}>
              <line 
                x1={sourceNode.x} 
                y1={sourceNode.y} 
                x2={targetNode.x} 
                y2={targetNode.y} 
                stroke={strokeColor} 
                strokeWidth={strokeWidth}
                markerEnd={markerEnd}
                className="transition-all duration-300"
              />
              {edge.weight !== undefined && (
                <text 
                  x={midX} 
                  y={midY - 8} 
                  fill="#94a3b8" 
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
        
        {graph.nodes && graph.nodes.map((node) => {
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
                r="18" 
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
              {node.distance !== undefined && (
                <text 
                  x={node.x} 
                  y={node.y - 25} 
                  textAnchor="middle" 
                  fill="#94a3b8" 
                  fontSize="12"
                >
                  {node.distance === Infinity ? '∞' : node.distance}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-300 sticky left-0">
         <div className="flex items-center"><span className="w-3 h-3 border-2 border-blue-500 bg-[#1e293b] inline-block mr-2 rounded-full"></span> Default</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded-full"></span> Active</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-yellow-500 inline-block mr-2 rounded-full"></span> Processing</div>
         <div className="flex items-center"><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded-full"></span> Visited/Result</div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
