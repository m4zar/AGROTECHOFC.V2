import React, { useState } from 'react';

const PriceChart = ({ data, title, color = '#3B82F6' }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          <span className="ml-2">Carregando dados...</span>
        </div>
      </div>
    );
  }

  // Calcular dimensões responsivas
  const width = 400;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  // Encontrar valores min e max com margem
  const prices = data.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const paddedMin = minPrice - (priceRange * 0.05);
  const paddedMax = maxPrice + (priceRange * 0.05);
  const paddedRange = paddedMax - paddedMin;

  // Gerar pontos do SVG
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + ((paddedMax - point.price) / paddedRange) * chartHeight;
    return { x, y, ...point };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Área preenchida
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;

  // Grid lines
  const gridLines = [];
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const y = padding.top + (i / gridSteps) * chartHeight;
    const price = paddedMax - (i / gridSteps) * paddedRange;
    gridLines.push({ y, price });
  }

  // Determinar cor baseada na tendência
  const isPositive = prices[prices.length - 1] > prices[0];
  const trendColor = isPositive ? '#10B981' : '#EF4444';
  const finalColor = color === '#3B82F6' ? trendColor : color;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: finalColor }}
          ></div>
          <span className="text-sm text-gray-600">R$</span>
        </div>
      </div>
      
      <div className="relative">
        <svg 
          width={width} 
          height={height} 
          className="w-full h-auto"
          viewBox={`0 0 ${width} ${height}`}
        >
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: finalColor, stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: finalColor, stopOpacity: 0.05 }} />
            </linearGradient>
            
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* Grid lines */}
          {gridLines.map((line, index) => (
            <g key={index}>
              <line
                x1={padding.left}
                y1={line.y}
                x2={width - padding.right}
                y2={line.y}
                stroke="#E5E7EB"
                strokeWidth="1"
                opacity="0.5"
              />
              <text
                x={padding.left - 8}
                y={line.y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {line.price.toFixed(1)}
              </text>
            </g>
          ))}
          
          {/* Área preenchida */}
          <path
            d={areaPath}
            fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
            stroke="none"
          />
          
          {/* Linha principal */}
          <path
            d={pathData}
            fill="none"
            stroke={finalColor}
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#shadow)"
          />
          
          {/* Pontos de dados */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "6" : "4"}
              fill={finalColor}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 drop-shadow-sm"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
            </circle>
          ))}
          
          {/* Tooltip hover */}
          {hoveredPoint !== null && (
            <g>
              <rect
                x={points[hoveredPoint].x - 35}
                y={points[hoveredPoint].y - 35}
                width="70"
                height="25"
                fill="rgba(0,0,0,0.8)"
                rx="4"
              />
              <text
                x={points[hoveredPoint].x}
                y={points[hoveredPoint].y - 18}
                textAnchor="middle"
                className="text-xs fill-white font-medium"
              >
                R$ {points[hoveredPoint].price.toFixed(2)}
              </text>
            </g>
          )}
          
          {/* Eixo X (datas) */}
          {data.map((point, index) => {
            if (index % Math.ceil(data.length / 6) === 0) {
              const x = padding.left + (index / (data.length - 1)) * chartWidth;
              const date = new Date(point.date).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit' 
              });
              return (
                <text
                  key={index}
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {date}
                </text>
              );
            }
            return null;
          })}
        </svg>
      </div>
      
      {/* Estatísticas resumidas */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xs text-gray-500">Mínimo</div>
          <div className="text-sm font-semibold" style={{ color: finalColor }}>
            R$ {minPrice.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Máximo</div>
          <div className="text-sm font-semibold" style={{ color: finalColor }}>
            R$ {maxPrice.toFixed(2)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Variação</div>
          <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{(((prices[prices.length - 1] - prices[0]) / prices[0]) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;