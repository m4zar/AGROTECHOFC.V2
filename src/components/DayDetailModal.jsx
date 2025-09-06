import React from 'react';
import WeatherChart from './WeatherChart.jsx';
import HumidityChart from './HumidityChart.jsx';
import WindChart from './WindChart.jsx';
import RainChart from './RainChart.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

function DayDetailModal({ isOpen, onClose, selectedDay, dayDetailData, dayLoading, dayError, onRetry }) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Detalhes do Dia
            </h2>
            <p className="text-gray-600">
              {selectedDay && formatDate(selectedDay.date)}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {dayLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
              <span className="ml-3 text-gray-600">Carregando detalhes do dia...</span>
            </div>
          ) : dayError ? (
            <div className="text-center py-16">
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 max-w-md mx-auto">
                <div className="flex items-center">
                  <svg className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-left">
                    <p className="font-semibold">Erro ao carregar dados</p>
                    <p className="text-sm">{dayError}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => selectedDay && onRetry && onRetry(selectedDay.date, selectedDay.index)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : dayDetailData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  🌡️ Temperatura por Hora
                </h3>
                <WeatherChart data={dayDetailData.hourlyTemps} />
              </div>

              {/* Humidity Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  💧 Umidade por Hora
                </h3>
                <HumidityChart data={dayDetailData.hourlyHumidity} />
              </div>

              {/* Wind Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  💨 Velocidade do Vento por Hora
                </h3>
                <WindChart data={dayDetailData.hourlyWind} />
              </div>

              {/* Rain Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  🌧️ Precipitação por Hora
                </h3>
                <RainChart data={dayDetailData.hourlyPrecipitation} />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500">
                Erro ao carregar dados do dia selecionado
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayDetailModal;