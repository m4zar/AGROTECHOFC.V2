import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  subtitle,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  };

  const changeClasses = {
    positive: 'text-green-600 bg-green-100',
    negative: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {icon && (
              <div className={`p-2 rounded-lg ${colorClasses[color]} text-white`}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            
            {change && (
              <div className={`px-2 py-1 rounded-full text-sm font-medium ${changeClasses[changeType]}`}>
                <div className="flex items-center space-x-1">
                  {changeType === 'positive' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  )}
                  {changeType === 'negative' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l-9.2 9.2M7 7v10h10" />
                    </svg>
                  )}
                  <span>{change}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;