import React from 'react';

const CropManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-24 w-24 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestão de Cultivo</h1>
          <p className="text-gray-600 text-lg mb-6">
            Esta seção está em desenvolvimento e conterá ferramentas completas para gestão de cultivos.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            <p className="text-sm">
              🌱 Funcionalidades que serão implementadas: calendário de plantio, controle de pragas, 
              irrigação inteligente, monitoramento de crescimento e histórico de cultivos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropManagement;