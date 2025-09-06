import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  const weatherData = [
    { day: 'Hoje', icon: '☀️', temp: '28°', rain: '0mm' },
    { day: 'Amã', icon: '⛅', temp: '25°', rain: '2mm' },
    { day: 'Ter', icon: '🌧️', temp: '22°', rain: '15mm' },
    { day: 'Qua', icon: '🌤️', temp: '26°', rain: '5mm' },
    { day: 'Qui', icon: '☀️', temp: '29°', rain: '0mm' },
  ];

  const crops = [
    { name: 'Milho', status: 'Ideal', color: 'green', emoji: '🌽' },
    { name: 'Soja', status: 'Aguardar', color: 'yellow', emoji: '🌱' },
    { name: 'Cenoura', status: 'Bom', color: 'blue', emoji: '🥕' },
  ];

  const metrics = [
    { label: 'Umidade', value: '85%', color: 'green' },
    { label: 'Vento', value: '12km/h', color: 'blue' },
    { label: 'UV', value: 'Mod.', color: 'yellow' },
    { label: 'Evap.', value: '4.2mm', color: 'purple' },
  ];

  const marketData = [
    { crop: 'Milho', price: 'R$ 65,50', change: '+5.2%', trend: '↗', color: 'green' },
    { crop: 'Soja', price: 'R$ 152,30', change: '-2.1%', trend: '↘', color: 'red' },
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl mx-auto relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Dashboard AgroInfo</h3>
          <p className="text-sm text-gray-600">Monitoramento em Tempo Real</p>
        </div>
        <div className="flex items-center text-xs">
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full mr-2">
            🌱 Ativo
          </div>
          <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            📊 Live
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        {/* Weather Forecast */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            🌤️ Previsão 5 Dias
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {weatherData.map((day, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg p-2 text-center shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-xs font-medium text-gray-600 mb-1">{day.day}</p>
                <div className="text-lg mb-1">{day.icon}</div>
                <p className="text-sm font-bold text-gray-800">{day.temp}</p>
                <p className="text-xs text-blue-600">{day.rain}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            📊 Métricas
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((metric, index) => (
              <motion.div 
                key={index}
                className={`bg-white rounded-lg p-2 text-center shadow-sm border-l-2 border-${metric.color}-400`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <p className="text-xs text-gray-600">{metric.label}</p>
                <p className={`text-sm font-bold text-${metric.color}-600`}>{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Crop Recommendations */}
        <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            🌾 Recomendações
          </h4>
          <div className="space-y-2">
            {crops.map((crop, index) => (
              <motion.div 
                key={index}
                className="flex items-center bg-white rounded-lg p-2 shadow-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="text-lg mr-2">{crop.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{crop.name}</p>
                  <p className={`text-xs text-${crop.color}-600`}>{crop.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            💰 Mercado
          </h4>
          <div className="space-y-2">
            {marketData.map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-2 shadow-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <span className="text-sm font-medium text-gray-800">{item.crop}</span>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{item.price}</p>
                  <p className={`text-xs text-${item.color}-600 flex items-center`}>
                    {item.trend} {item.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div 
        className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2 shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      </motion.div>

      {/* Gradient Overlay for Modern Look */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-500/5 rounded-2xl pointer-events-none"></div>
    </motion.div>
  );
};

export default DashboardPreview;