import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
      <p className="text-gray-600">Carregando dados climáticos...</p>
    </div>
  );
}

export default LoadingSpinner;