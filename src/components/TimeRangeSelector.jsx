import React from 'react';

function TimeRangeSelector({ selectedRange, onRangeChange }) {
  const ranges = [
    { value: '24h', label: '24h', description: '1 dia' },
    { value: '48h', label: '48h', description: '2 dias' },
    { value: '7d', label: '7d', description: '1 semana' }
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {ranges.map(range => (
        <button
          key={range.value}
          onClick={() => onRangeChange(range.value)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedRange === range.value 
              ? 'bg-green-600 text-white shadow-md transform scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          }`}
          title={range.description}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default TimeRangeSelector;