import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import { WeatherAPI } from '../services/weatherAPI';
import { getWeatherIcon } from '../components/WeatherIcons.jsx';
import ClimaDashboard from '../ClimaDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  const [showClimaModal, setShowClimaModal] = useState(false);
  const { currentLocation } = useLocation();
  const weatherAPI = useMemo(() => new WeatherAPI(), []);

  const [forecast, setForecast] = useState([]);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [forecastError, setForecastError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!currentLocation?.latitude || !currentLocation?.longitude) {
        setForecast([]);
        return;
      }
      setLoadingForecast(true);
      setForecastError('');
      try {
        const data = await weatherAPI.getWeatherData(
          currentLocation.latitude,
          currentLocation.longitude,
          '7d'
        );
        if (data && Array.isArray(data.forecast)) {
          setForecast(data.forecast.slice(0, 7));
        } else {
          setForecastError('Não foi possível carregar a previsão.');
        }
      } catch (e) {
        setForecastError('Erro ao carregar previsão climática.');
      } finally {
        setLoadingForecast(false);
      }
    };
    load();
  }, [currentLocation, weatherAPI]);

  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return 'Hoje';
    if (date.toDateString() === tomorrow.toDateString()) return 'Amanhã';
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  };

  const handleClimaClick = () => {
    setShowClimaModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-6">
        {/* Resumo e Alertas */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Olá, {user?.name || 'Agricultor'}</h2>
              <p className="text-gray-600">Bem-vindo ao seu painel de controle agrícola</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center text-sm">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full mr-3">
                  🌱 Plantio recomendado
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  ⚠️ Alerta de chuva
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Previsão Climática */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Previsão Climática {currentLocation?.name ? `• ${currentLocation.name}` : ''}
                </h3>
                <div className="flex space-x-2 items-center">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md font-medium">7 dias</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md font-medium">15 dias</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md font-medium">30 dias</button>
                </div>
              </div>
              
              {/* Estado de carregamento/erro/sem localização */}
              {loadingForecast && (
                <div className="flex items-center justify-center h-24 mb-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <span className="ml-3 text-gray-600 text-sm">Carregando previsão...</span>
                </div>
              )}

              {!loadingForecast && forecastError && (
                <div className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3 text-center">
                  {forecastError}
                </div>
              )}

              {!loadingForecast && !forecastError && !currentLocation && (
                <div className="mb-6 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded p-3 text-center">
                  Selecione uma cidade no topo para ver a previsão.
                </div>
              )}

              {!loadingForecast && !forecastError && currentLocation && (
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {forecast.map((day, index) => (
                    <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">{formatDateLabel(day.date)}</p>
                      <div className="my-2 flex justify-center h-6 items-center">
                        {getWeatherIcon(day.weatherCode)}
                      </div>
                      <p className="text-lg font-semibold text-gray-800">{day.maxTemp}°C</p>
                      <p className="text-xs text-gray-600">{day.minTemp}°C</p>
                      <div className="mt-2 flex items-center justify-center">
                        <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                        </svg>
                        <span className="ml-1 text-xs text-blue-500">{(day.precipitation || 0).toFixed ? (day.precipitation).toFixed(0) : day.precipitation}mm</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Índices para os próximos 7 dias:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Umidade do Solo</p>
                    <p className="text-lg font-bold text-green-600">85%</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Índice UV</p>
                    <p className="text-lg font-bold text-blue-600">Moderado</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Vento</p>
                    <p className="text-lg font-bold text-purple-600">12 km/h</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Evapotranspiração</p>
                    <p className="text-lg font-bold text-yellow-600">4.2 mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botão CTA Clima Detalhado - Lateral */}
          <div className="col-span-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
              <button 
                onClick={handleClimaClick}
                className="w-full h-full bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 hover:from-green-700 hover:to-green-800 transition-all duration-500 
                           transform hover:scale-105 group clima-cta-button 
                           hover:shadow-xl active:scale-95 relative overflow-hidden flex flex-col justify-center text-center min-h-[300px]"
              >
                <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:animate-pulse mx-auto mb-4">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002-2M9 19l6-6a2 2 0 012-2h2a2 2 0 012-2V7a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-green-100">🌤️ Dashboard Climático Completo</h3>
                  <p className="text-green-100 text-sm group-hover:text-white mb-4">
                    Análises detalhadas, gráficos interativos e previsões estendidas
                  </p>
                  <p className="text-green-200 text-xs group-hover:text-green-50">
                    ✨ Clique para acessar
                  </p>
                </div>
                <div className="text-white/70 group-hover:text-white transition-colors mt-4">
                  <svg className="h-6 w-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Segunda linha: Recomendações de Cultivo */}
        <div className="mt-6">
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recomendações de Cultivo</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl mr-3">🌽</div>
                  <div>
                    <p className="font-medium text-gray-900">Milho</p>
                    <p className="text-sm text-green-600">Ideal para plantio</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mr-3">🌱</div>
                  <div>
                    <p className="font-medium text-gray-900">Soja</p>
                    <p className="text-sm text-yellow-600">Aguardar 1 semana</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl mr-3">🥕</div>
                  <div>
                    <p className="font-medium text-gray-900">Cenoura</p>
                    <p className="text-sm text-blue-600">Condições favoráveis</p>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition">
                Ver Mais Recomendações
              </button>
            </div>
          </div>
        </div>

        {/* Segunda linha: Mercado + Calendário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Tendências de Mercado */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Tendências de Mercado</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md font-medium">Local</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md font-medium">Regional</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md font-medium">Nacional</button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Milho</span>
                  <span className="text-green-600">↗ +5.2%</span>
                  <span className="font-bold">R$ 65,50/saca</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Soja</span>
                  <span className="text-red-600">↘ -2.1%</span>
                  <span className="font-bold">R$ 152,30/saca</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Feijão</span>
                  <span className="text-green-600">↗ +3.8%</span>
                  <span className="font-bold">R$ 280,00/saca</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendário Agrícola */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Calendário Agrícola</h3>
                <div className="flex items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Maio 2023</h4>
                  <div className="flex space-x-1 ml-4">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <p className="text-sm font-medium">15 Mai - Plantio de Milho</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                  <p className="text-sm font-medium">20 Mai - Aplicação de Fertilizante</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-500">
                  <p className="text-sm font-medium">25 Mai - Monitoramento de Pragas</p>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition">
                Ver Calendário Completo
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600">© 2025 AgroInfo - Apoiando o pequeno agricultor</p>
              <div className="mt-2 md:mt-0">
                <button className="text-sm text-blue-600 hover:text-blue-800">Ajuda</button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Contato</button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">Termos de Uso</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ClimaDashboard Modal */}
      {showClimaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col relative shadow-2xl">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002-2M9 19l6-6a2 2 0 012-2h2a2 2 0 012-2V7a2 2 0 00-2-2h-2a2 2 0 00-2-2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">🌤️ Dashboard Climático Completo</h2>
                  <p className="text-gray-600">Monitoramento avançado para sua propriedade</p>
                </div>
              </div>
              <button 
                onClick={() => setShowClimaModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Conteúdo do Modal - ClimaDashboard Integrado */}
            <div className="flex-1 overflow-auto">
              <ClimaDashboard />
            </div>
            
            {/* Footer do Modal */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  🌱 Dados atualizados em tempo real para otimizar seu cultivo
                </div>
                <button 
                  onClick={() => setShowClimaModal(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Fechar Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
