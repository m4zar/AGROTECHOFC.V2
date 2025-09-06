import React from 'react';
import { getWeatherIcon } from './WeatherIcons.jsx';

function WeatherCard({ data, city, weatherAPI }) {

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{city}</h2>
          <p className="text-gray-600">Clima atual</p>
        </div>
        <div className="text-right">
          <div className="mb-2 flex justify-end">
            {getWeatherIcon(data.weatherCode)}
          </div>
          <p className="text-sm text-gray-500">
            {weatherAPI.getWeatherDescription(data.weatherCode)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Temperatura */}
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {data.temperature}°C
          </div>
          <div className="text-sm text-gray-600">Temperatura</div>
        </div>

        {/* Umidade */}
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {data.humidity}%
          </div>
          <div className="text-sm text-gray-600">Umidade</div>
        </div>

        {/* Vento */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-600 mb-1">
            {data.windSpeed}
          </div>
          <div className="text-sm text-gray-600">km/h Vento</div>
        </div>

        {/* Condição */}
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-1">
            {data.weatherCode <= 3 ? '👍' : data.weatherCode <= 55 ? '⚠️' : '☔'}
          </div>
          <div className="text-sm text-gray-600">
            {data.weatherCode <= 3 ? 'Bom' : data.weatherCode <= 55 ? 'Regular' : 'Ruim'}
          </div>
        </div>
      </div>

      {/* Dica agrícola simples */}
      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <p className="text-sm text-green-800">
          <span className="font-medium">💡 Dica: </span>
          {data.weatherCode <= 3 && data.temperature > 15 && data.temperature < 30 
            ? 'Condições ideais para atividades agrícolas!'
            : data.weatherCode > 55 
            ? 'Evite atividades no campo devido à chuva.'
            : data.temperature > 30
            ? 'Temperatura alta - irrigue as plantas mais cedo.'
            : 'Monitore as condições climáticas regularmente.'
          }
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;