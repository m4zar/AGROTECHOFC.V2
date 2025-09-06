import React from 'react';

const MarketAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002-2m0 0h6a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2 2v2a2 2 0 01-2-2h-6z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Análise de Mercado</h1>
          <p className="text-gray-600 text-lg mb-6">
            Esta seção está em desenvolvimento e conterá análises detalhadas do mercado agrícola.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
            <p className="text-sm">
              🚧 Funcionalidades que serão implementadas: preços em tempo real, tendências de mercado, 
              análise de commodities e recomendações de venda.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketAnalysis;