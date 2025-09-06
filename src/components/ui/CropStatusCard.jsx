import React from 'react';

const CropStatusCard = ({ 
  cropName, 
  variety,
  area,
  plantDate,
  harvestDate,
  status,
  progress,
  health,
  nextActivity,
  image
}) => {
  const statusConfig = {
    planted: { color: 'bg-green-100 text-green-800', text: 'Plantado' },
    growing: { color: 'bg-blue-100 text-blue-800', text: 'Crescimento' },
    flowering: { color: 'bg-purple-100 text-purple-800', text: 'Floração' },
    fruiting: { color: 'bg-orange-100 text-orange-800', text: 'Frutificação' },
    ready: { color: 'bg-yellow-100 text-yellow-800', text: 'Pronto p/ Colheita' },
    harvested: { color: 'bg-gray-100 text-gray-800', text: 'Colhido' }
  };

  const healthConfig = {
    excellent: { color: 'text-green-600', text: 'Excelente' },
    good: { color: 'text-green-500', text: 'Boa' },
    fair: { color: 'text-yellow-500', text: 'Regular' },
    poor: { color: 'text-red-500', text: 'Ruim' }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header com imagem */}
      <div className="relative h-32 bg-gradient-to-r from-green-400 to-green-600">
        {image ? (
          <img src={image} alt={cropName} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
        
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
            {statusConfig[status]?.text || status}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Título e variedade */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{cropName}</h3>
          {variety && (
            <p className="text-sm text-gray-600">Variedade: {variety}</p>
          )}
        </div>

        {/* Informações principais */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Área:</span>
            <span className="font-medium">{area} ha</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Plantio:</span>
            <span className="font-medium">{plantDate}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Colheita prevista:</span>
            <span className="font-medium">{harvestDate}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Saúde:</span>
            <span className={`font-medium ${healthConfig[health]?.color || 'text-gray-600'}`}>
              {healthConfig[health]?.text || health}
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progresso do ciclo</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Próxima atividade */}
        {nextActivity && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs font-medium text-blue-800">Próxima atividade:</p>
                <p className="text-xs text-blue-600">{nextActivity}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropStatusCard;