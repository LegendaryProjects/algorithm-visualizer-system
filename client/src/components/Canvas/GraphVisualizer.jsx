import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const GraphVisualizer = ({ state, algoId }) => {
  const { isLight } = useTheme();
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
            <polygon points="0 0, 10 3.5, 0 7" fill={isLight ? "#94a3b8" : "#475569"} />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
          </marker>
          <marker id="arrowhead-path" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>
        </defs>
        
        {graph.edges && graph.edges.map((edge, i) => {
          const sourceNode = graph.nodes.find(n => n.id === edge.source);
          const targetNode = graph.nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const edgeId = edge.id || `${edge.source}-${edge.target}`;
          
          let strokeColor = isLight ? '#cbd5e1' : '#475569';
          let markerEnd = edge.isDirected ? 'url(#arrowhead-default)' : '';
          let strokeWidth = '2';

          if (isPathEdge(edgeId)) {
            strokeColor = '#10b981'; // Emerald
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
                  fill={isLight ? "#475569" : "#94a3b8"} 
                  fontSize="13"
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
          let bgColor = isLight ? '#ffffff' : '#1e293b';
          let strokeColor = '#3b82f6';
          let textColor = isLight ? '#0f172a' : '#ffffff';
          
          if (isFound(node.id)) {
            bgColor = '#10b981'; // Green
            strokeColor = '#059669';
            textColor = '#ffffff';
          } else if (node.id === activeNodeId) {
            bgColor = '#3b82f6'; // Blue
            strokeColor = '#1d4ed8';
            textColor = '#ffffff';
          } else if (isComparing(node.id)) {
            bgColor = '#f59e0b'; // Amber
            strokeColor = '#d97706';
            textColor = '#ffffff';
          }

          return (
            <g key={`node-${node.id}`}>
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="18" 
                fill={bgColor} 
                stroke={strokeColor} 
                strokeWidth="2.5"
                className="transition-all duration-300 drop-shadow-xs"
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
                  fill={isLight ? "#64748b" : "#94a3b8"} 
                  fontSize="12"
                  fontWeight="600"
                >
                  {node.distance === Infinity ? '∞' : node.distance}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      
      <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium sticky left-0">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
          isLight ? 'bg-white/90 border-slate-200/90 text-slate-700 shadow-2xs' : 'bg-white/5 border-white/10 text-gray-300'
        }`}>
          <span className={`w-2.5 h-2.5 border-2 border-blue-500 ${isLight ? 'bg-white' : 'bg-[#1e293b]'} rounded-full`}></span> Default
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
          isLight ? 'bg-white/90 border-slate-200/90 text-slate-700 shadow-2xs' : 'bg-white/5 border-white/10 text-gray-300'
        }`}>
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Active
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
          isLight ? 'bg-white/90 border-slate-200/90 text-slate-700 shadow-2xs' : 'bg-white/5 border-white/10 text-gray-300'
        }`}>
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> Processing
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
          isLight ? 'bg-white/90 border-slate-200/90 text-slate-700 shadow-2xs' : 'bg-white/5 border-white/10 text-gray-300'
        }`}>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Visited / Path
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
