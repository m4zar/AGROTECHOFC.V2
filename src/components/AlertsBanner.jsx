import React from 'react';

function AlertsBanner({ weatherData, weatherAPI }) {
  if (!weatherData) return null;

  const alerts = [];
  const current = weatherData.current;
  const forecast = weatherData.forecast;

  // Alerta de geada (temperatura < 5°C)
  if (current.temperature <= 5) {
    alerts.push({
      type: 'danger',
      icon: '🧊',
      title: 'Risco de Geada',
      message: 'Temperatura muito baixa. Proteja as plantas sensíveis.',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      textColor: 'text-red-800'
    });
  }

  // Alerta de chuva forte (próximas 24h)
  const heavyRainForecast = forecast.find(day => day.precipitation > 20);
  if (heavyRainForecast) {
    alerts.push({
      type: 'warning',
      icon: '🌧️',
      title: 'Chuva Intensa Prevista',
      message: 'Evite aplicação de defensivos e prepare drenagem.',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800'
    });
  }

  // Alerta de vento forte
  if (current.windSpeed > 30) {
    alerts.push({
      type: 'warning',
      icon: '💨',
      title: 'Vento Forte',
      message: 'Evite pulverizações e cuidado com estruturas.',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-400',
      textColor: 'text-orange-800'
    });
  }

  // Alerta de tempo ideal para atividades
  if (current.temperature >= 18 && current.temperature <= 28 && 
      current.weatherCode <= 1 && current.windSpeed <= 15) {
    alerts.push({
      type: 'success',
      icon: '✅',
      title: 'Condições Ideais',
      message: 'Ótimo momento para atividades agrícolas.',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-400',
      textColor: 'text-green-800'
    });
  }

  // Alerta de seca (sem chuva prevista por 7 dias)
  const totalPrecipitation = forecast.reduce((sum, day) => sum + day.precipitation, 0);
  if (totalPrecipitation < 5) {
    alerts.push({
      type: 'info',
      icon: '☀️',
      title: 'Período Seco',
      message: 'Considere irrigação adicional para as culturas.',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800'
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      {alerts.map((alert, index) => (
        <div key={index} className={`${alert.bgColor} border ${alert.borderColor} rounded-lg p-4`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl mr-3">{alert.icon}</span>
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${alert.textColor}`}>{alert.title}</h4>
              <p className={`text-sm ${alert.textColor} mt-1`}>{alert.message}</p>
            </div>
            <div className="flex-shrink-0">
              <svg className={`h-5 w-5 ${alert.textColor}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlertsBanner;