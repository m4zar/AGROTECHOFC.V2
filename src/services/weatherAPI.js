// Serviço simples para API do clima
import { withCache, generateCacheKey } from '../utils/cache';

export class WeatherAPI {
  constructor() {
    this.baseURL = 'https://api.open-meteo.com/v1';
    this.geocodingURL = 'https://geocoding-api.open-meteo.com/v1';
  }

  // Busca coordenadas de uma cidade
  async searchLocation(cityName) {
    const cacheKey = generateCacheKey('location', cityName.toLowerCase());
    
    return await withCache(
      cacheKey,
      async () => {
        const response = await fetch(
          `${this.geocodingURL}/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`
        );
        const data = await response.json();
        return data.results?.[0] || null;
      },
      'location'
    );
  }

  // Busca dados climáticos atuais e previsão
  async getWeatherData(latitude, longitude, timeRange = '24h') {
    const cacheKey = generateCacheKey('weather', latitude.toFixed(2), longitude.toFixed(2), timeRange);
    
    return await withCache(
      cacheKey,
      async () => {
        // Calcular forecast_hours baseado no timeRange
        let forecastHours = 24;
        if (timeRange === '48h') forecastHours = 48;
        if (timeRange === '7d') forecastHours = 168; // 7 * 24

        const params = new URLSearchParams({
          latitude: latitude,
          longitude: longitude,
          current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
          daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
          hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation',
          timezone: 'America/Sao_Paulo',
          forecast_days: 7,
          forecast_hours: forecastHours
        });

        const response = await fetch(`${this.baseURL}/forecast?${params}`);
        const data = await response.json();
        
        return this.formatWeatherData(data, timeRange);
      },
      'weather'
    );
  }

  // Formata os dados da API
  formatWeatherData(rawData, timeRange = '24h') {
    const current = rawData.current;
    const daily = rawData.daily;
    const hourly = rawData.hourly;
    
    // Calcular quantas horas mostrar baseado no timeRange
    let hoursToShow = 24;
    if (timeRange === '48h') hoursToShow = 48;
    if (timeRange === '7d') hoursToShow = 168;

    return {
      current: {
        temperature: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        weatherIcon: this.getWeatherIcon(current.weather_code)
      },
      forecast: daily.time.slice(0, 7).map((date, index) => ({
        date,
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        minTemp: Math.round(daily.temperature_2m_min[index]),
        precipitation: daily.precipitation_sum[index],
        weatherCode: daily.weather_code[index],
        weatherIcon: this.getWeatherIcon(daily.weather_code[index])
      })),
      hourlyTemps: {
        times: hourly.time.slice(0, hoursToShow),
        temperatures: hourly.temperature_2m.slice(0, hoursToShow).map(temp => Math.round(temp))
      },
      hourlyHumidity: {
        times: hourly.time.slice(0, hoursToShow),
        humidity: hourly.relative_humidity_2m.slice(0, hoursToShow)
      },
      hourlyWind: {
        times: hourly.time.slice(0, hoursToShow),
        windSpeed: hourly.wind_speed_10m.slice(0, hoursToShow)
      },
      hourlyPrecipitation: {
        times: hourly.time.slice(0, hoursToShow),
        precipitation: hourly.precipitation ? hourly.precipitation.slice(0, hoursToShow) : []
      }
    };
  }

  // Converte código do tempo em descrição
  getWeatherDescription(code) {
    const descriptions = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Nevoeiro',
      48: 'Nevoeiro com geada',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa forte',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva forte'
    };
    return descriptions[code] || 'Tempo indefinido';
  }

  // Mapeia código do tempo para ícone
  getWeatherIcon(code) {
    const iconMap = {
      0: 'sol.png',                    // Céu limpo
      1: 'sol entre nuvens.png',       // Principalmente limpo  
      2: 'sol entre nuvens.png',       // Parcialmente nublado
      3: 'duas nuvens.png',            // Nublado
      45: 'duas nuvens.png',           // Nevoeiro
      48: 'duas nuvens.png',           // Nevoeiro com geada
      51: 'chuva fraca.png',           // Garoa leve
      53: 'chuva fraca.png',           // Garoa moderada
      55: 'gotas.png',                 // Garoa forte
      61: 'chuva.png',                 // Chuva leve
      63: 'chuva.png',                 // Chuva moderada
      65: 'tempestade.png',            // Chuva forte
      80: 'tempestade.png',            // Pancadas de chuva
      95: 'tempestade com raio.png',   // Tempestade
      96: 'tempestade com raio.png',   // Tempestade com granizo leve
      99: 'tempestade com raio.png'    // Tempestade com granizo forte
    };
    return iconMap[code] || 'sol.png'; // Default: sol
  }

  // Busca dados de um dia específico
  async getSpecificDayData(latitude, longitude, date) {
    const cacheKey = generateCacheKey('weather-day', latitude.toFixed(2), longitude.toFixed(2), date);
    
    return await withCache(
      cacheKey,
      async () => {
        const params = new URLSearchParams({
          latitude: latitude,
          longitude: longitude,
          start_date: date, // YYYY-MM-DD
          end_date: date,   // YYYY-MM-DD  
          hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation',
          timezone: 'America/Sao_Paulo'
        });
        
        const response = await fetch(`${this.baseURL}/forecast?${params}`);
        const data = await response.json();
        
        return this.formatDayData(data, date);
      },
      'weather',
      20 * 60 * 1000 // 20 minutos para dados de um dia específico
    );
  }

  // Formata dados de um dia específico
  formatDayData(rawData, date) {
    const hourly = rawData.hourly;
    
    return {
      date: date,
      hourlyTemps: {
        times: hourly.time,
        temperatures: hourly.temperature_2m.map(temp => Math.round(temp))
      },
      hourlyHumidity: {
        times: hourly.time,
        humidity: hourly.relative_humidity_2m
      },
      hourlyWind: {
        times: hourly.time,  
        windSpeed: hourly.wind_speed_10m
      },
      hourlyPrecipitation: {
        times: hourly.time,
        precipitation: hourly.precipitation || []
      }
    };
  }
}