import React from 'react';

// Ícones SVG profissionais para condições climáticas
export const WeatherIcons = {
  sunny: (
    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  ),
  
  cloudy: (
    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
    </svg>
  ),
  
  partlyCloudy: (
    <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m6.364.636l-1.414 1.414M20 12h2m-1.636 6.364l-1.414-1.414M12 20v2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414" />
    </svg>
  ),
  
  rainy: (
    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      <path d="M7 17a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zM10 17a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zM13 17a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" />
    </svg>
  ),
  
  drizzle: (
    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      <circle cx="8" cy="18" r="0.5" />
      <circle cx="11" cy="18" r="0.5" />
      <circle cx="14" cy="18" r="0.5" />
    </svg>
  ),
  
  foggy: (
    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 16h14M7 8h10" />
    </svg>
  ),
  
  stormy: (
    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      <path d="M10 6l-2 4h1.5l-1 4 2-4H9l1-4z" fill="#FCD34D" />
    </svg>
  )
};

// Função para obter ícone baseado no código meteorológico
export const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) return WeatherIcons.sunny;
  if (weatherCode === 1) return WeatherIcons.partlyCloudy;
  if (weatherCode === 2) return WeatherIcons.partlyCloudy;
  if (weatherCode === 3) return WeatherIcons.cloudy;
  if (weatherCode === 45 || weatherCode === 48) return WeatherIcons.foggy;
  if (weatherCode >= 51 && weatherCode <= 55) return WeatherIcons.drizzle;
  if (weatherCode >= 61 && weatherCode <= 65) return WeatherIcons.rainy;
  if (weatherCode >= 80 && weatherCode <= 82) return WeatherIcons.stormy;
  return WeatherIcons.cloudy; // fallback
};