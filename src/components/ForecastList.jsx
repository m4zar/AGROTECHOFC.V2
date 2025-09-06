import React from 'react';
import { getWeatherIcon } from './WeatherIcons.jsx';

function ForecastList({ forecast, weatherAPI, onDayClick, selectedDayIndex }) {

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
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    }
  };

  return (
    <div className="flex gap-3">
      {forecast.map((day, index) => (
        <div 
          key={day.date || index} 
          className={`flex-1 min-w-0 p-3 rounded-lg transition-all duration-200 cursor-pointer text-center
            ${selectedDayIndex === index 
              ? 'bg-blue-100 border-2 border-blue-500 shadow-md' 
              : 'bg-gray-50 hover:bg-blue-50 hover:shadow-sm border-2 border-transparent'
            }`}
          onClick={() => onDayClick && onDayClick(day.date, index)}
        >
          {/* Data */}
          <div className="mb-3">
            <div className="font-medium text-gray-800 text-sm truncate">
              {formatDate(day.date)}
            </div>
          </div>

          {/* Ícone do tempo */}
          <div className="flex justify-center mb-3 h-8 items-center">
            {getWeatherIcon(day.weatherCode)}
          </div>

          {/* Temperaturas */}
          <div className="mb-3">
            <div className="font-semibold text-gray-800 text-sm">
              <span className="text-green-600">{day.maxTemp}°</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-blue-600">{day.minTemp}°</span>
            </div>
          </div>

          {/* Descrição do tempo */}
          <div className="text-xs text-gray-600 mb-2 min-h-[32px] flex items-center justify-center">
            <span className="text-center leading-tight">
              {weatherAPI.getWeatherDescription(day.weatherCode)}
            </span>
          </div>

          {/* Precipitação */}
          <div className="text-xs text-blue-600 min-h-[16px] flex items-center justify-center">
            {day.precipitation > 0 && (
              <span>💧 {day.precipitation}mm</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForecastList;
