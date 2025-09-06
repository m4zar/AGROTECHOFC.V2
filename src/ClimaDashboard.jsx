import React, { useState, useEffect, useMemo } from 'react';
import { WeatherAPI } from './services/weatherAPI';
import { useLocation } from './contexts/LocationContext';
import { useCache } from './utils/cache';
import LocationSearch from './components/LocationSearch.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeatherChart from './components/WeatherChart.jsx';
import HumidityChart from './components/HumidityChart.jsx';
import WindChart from './components/WindChart.jsx';
import RainChart from './components/RainChart.jsx';
import ForecastList from './components/ForecastList.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import AlertsBanner from './components/AlertsBanner.jsx';
import TimeRangeSelector from './components/TimeRangeSelector.jsx';
import DayDetailModal from './components/DayDetailModal.jsx';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartsLoading, setChartsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetailData, setDayDetailData] = useState(null);
  const [dayLoading, setDayLoading] = useState(false);
  const [dayError, setDayError] = useState('');

  const weatherAPI = useMemo(() => new WeatherAPI(), []);
  const { currentLocation } = useLocation();

  // Carregar dados quando localização global muda
  useEffect(() => {
    if (currentLocation) {
      loadWeatherData(currentLocation.latitude, currentLocation.longitude);
    }
  }, [currentLocation, selectedTimeRange]);

  const loadWeatherData = async (latitude, longitude) => {
    setLoading(true);
    setError('');
    
    try {
      const weather = await weatherAPI.getWeatherData(
        latitude, 
        longitude,
        selectedTimeRange
      );

      if (weather) {
        setWeatherData(weather);
      } else {
        setError('Erro ao carregar dados climáticos.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      // Busca coordenadas da cidade
      const location = await weatherAPI.searchLocation(cityName);
      
      if (!location) {
        setError('Cidade não encontrada. Tente novamente.');
        setLoading(false);
        return;
      }

      // Busca dados climáticos
      const weather = await weatherAPI.getWeatherData(
        location.latitude, 
        location.longitude,
        selectedTimeRange
      );

      if (weather) {
        setWeatherData(weather);
      } else {
        setError('Erro ao carregar dados climáticos.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = async (newRange) => {
    setSelectedTimeRange(newRange);
    
    if (currentLocation && weatherData) {
      setChartsLoading(true);
      try {
        const weather = await weatherAPI.getWeatherData(
          currentLocation.latitude, 
          currentLocation.longitude,
          newRange
        );
        if (weather) {
          setWeatherData(weather);
        }
      } catch (err) {
        console.error('Erro ao atualizar dados:', err);
      } finally {
        setChartsLoading(false);
      }
    }
  };

  // Função para buscar detalhes de um dia específico
  const handleDayClick = async (dayDate, dayIndex) => {
    if (!currentLocation) {
      setDayError('Localização não disponível. Selecione uma cidade primeiro.');
      return;
    }
    
    setSelectedDay({ date: dayDate, index: dayIndex });
    setDayLoading(true);
    setDayError('');
    setDayDetailData(null);
    
    try {
      const dayData = await weatherAPI.getSpecificDayData(
        currentLocation.latitude,
        currentLocation.longitude,
        dayDate
      );
      
      if (dayData) {
        setDayDetailData(dayData);
      } else {
        setDayError('Não foi possível carregar os dados detalhados deste dia. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do dia:', error);
      setDayError('Erro de conexão ao buscar detalhes do dia. Verifique sua internet e tente novamente.');
    } finally {
      setDayLoading(false);
    }
  };

  // Função para fechar o modal de detalhes
  const closeDayDetails = () => {
    setSelectedDay(null);
    setDayDetailData(null);
    setDayError('');
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 pt-20">
      <div className="max-w-7xl mx-auto">

        {/* Search - Only show if no global location */}
        {!currentLocation && (
          <LocationSearch onSearch={handleCitySearch} disabled={loading} />
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center my-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="space-y-4">
            {/* Alerts */}
            <AlertsBanner 
              weatherData={weatherData} 
              weatherAPI={weatherAPI}
            />
            
            {/* Current Weather - Full Width */}
            <WeatherCard 
              data={weatherData.current} 
              city={currentLocation?.name || ''}
              weatherAPI={weatherAPI}
            />

            {/* Forecast - Full Width */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Previsão 7 dias
              </h3>
              <ForecastList 
                forecast={weatherData.forecast} 
                weatherAPI={weatherAPI}
                onDayClick={handleDayClick}
                selectedDayIndex={selectedDay?.index}
              />
            </div>

            {/* Time Range Selector - Left aligned */}
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600">Período:</span>
                  <TimeRangeSelector 
                    selectedRange={selectedTimeRange} 
                    onRangeChange={handleTimeRangeChange} 
                  />
                </div>
              </div>
            </div>

            {/* Charts Grid - 2x2 Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Temperature Chart */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Temperatura ({selectedTimeRange === '7d' ? '7 dias' : selectedTimeRange})
                </h3>
                {chartsLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <span className="ml-3 text-gray-600 text-sm">Atualizando...</span>
                  </div>
                ) : (
                  <div className="h-48 w-full">
                    <WeatherChart data={weatherData.hourlyTemps} />
                  </div>
                )}
              </div>

              {/* Humidity Chart */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Umidade ({selectedTimeRange === '7d' ? '7 dias' : selectedTimeRange})
                </h3>
                {chartsLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <span className="ml-3 text-gray-600 text-sm">Atualizando...</span>
                  </div>
                ) : (
                  <div className="h-48 w-full">
                    <HumidityChart data={weatherData.hourlyHumidity} />
                  </div>
                )}
              </div>

              {/* Wind Chart */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Velocidade do Vento ({selectedTimeRange === '7d' ? '7 dias' : selectedTimeRange})
                </h3>
                {chartsLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <span className="ml-3 text-gray-600 text-sm">Atualizando...</span>
                  </div>
                ) : (
                  <div className="h-48 w-full">
                    <WindChart data={weatherData.hourlyWind} />
                  </div>
                )}
              </div>

              {/* Rain Chart */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-3">
                  Precipitação ({selectedTimeRange === '7d' ? '7 dias' : selectedTimeRange})
                </h3>
                {chartsLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <span className="ml-3 text-gray-600 text-sm">Atualizando...</span>
                  </div>
                ) : (
                  <div className="h-48 w-full">
                    <RainChart data={weatherData.hourlyPrecipitation} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Initial state */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-16">
            <svg className="h-24 w-24 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-500 mb-2">
              Digite uma cidade para começar
            </h3>
            <p className="text-gray-400">
              Veja dados climáticos e previsão do tempo
            </p>
          </div>
        )}

        {/* Day Detail Modal */}
        <DayDetailModal 
          isOpen={selectedDay !== null}
          onClose={closeDayDetails}
          selectedDay={selectedDay}
          dayDetailData={dayDetailData}
          dayLoading={dayLoading}
          dayError={dayError}
          onRetry={handleDayClick}
        />
      </div>
    </div>
  );
}

export default App;
