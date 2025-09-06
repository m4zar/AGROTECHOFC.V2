import React, { useState, useEffect } from 'react';
import StatCard from '../components/ui/StatCard';
import PriceChart from '../components/ui/PriceChart';
import AlertBanner from '../components/ui/AlertBanner';
import { withCache } from '../utils/cache';

// Dados mock para demonstração
const generateMockData = () => {
  const commodities = [
    { name: 'Soja', price: 152.40, change: '+2.1%', changeType: 'positive' },
    { name: 'Milho', price: 89.50, change: '-0.8%', changeType: 'negative' },
    { name: 'Café Arábica', price: 245.80, change: '+4.5%', changeType: 'positive' },
    { name: 'Açúcar Cristal', price: 42.30, change: '+1.2%', changeType: 'positive' },
    { name: 'Boi Gordo', price: 298.75, change: '-1.5%', changeType: 'negative' }
  ];

  const generatePriceHistory = (basePrice, days = 30) => {
    const data = [];
    let currentPrice = basePrice;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Variação aleatória de -5% a +5%
      const variation = (Math.random() - 0.5) * 0.1;
      currentPrice = currentPrice * (1 + variation);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(currentPrice.toFixed(2))
      });
    }
    
    return data;
  };

  return {
    commodities,
    sojaHistory: generatePriceHistory(150),
    milhoHistory: generatePriceHistory(90),
    cafeHistory: generatePriceHistory(240),
    acucarHistory: generatePriceHistory(42),
    boiHistory: generatePriceHistory(300)
  };
};

const MarketAnalysis = () => {
  const [marketData, setMarketData] = useState(null);
  const [alerts, setAlerts] = useState([
    {
      type: 'success',
      title: 'Oportunidade de Venda',
      message: 'Preço da soja subiu 2.1% hoje. Considere vender parte do estoque.',
      timestamp: 'Há 2 horas',
      dismissible: true
    },
    {
      type: 'warning',
      title: 'Preço do Milho em Queda',
      message: 'Milho apresenta tendência de baixa. Monitore de perto.',
      timestamp: 'Há 4 horas',
      dismissible: true
    },
    {
      type: 'info',
      title: 'Relatório Semanal Disponível',
      message: 'Novo relatório de tendências de mercado foi publicado.',
      timestamp: 'Hoje',
      action: {
        text: 'Ver relatório',
        onClick: () => console.log('Ver relatório')
      },
      dismissible: true
    }
  ]);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await withCache(
          'market-data',
          () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(generateMockData());
              }, 1000);
            });
          },
          'market'
        );
        setMarketData(data);
      } catch (error) {
        console.error('Erro ao carregar dados do mercado:', error);
        // Fallback: carregar sem cache
        setTimeout(() => {
          setMarketData(generateMockData());
        }, 1000);
      }
    };

    loadMarketData();
  }, []);

  const dismissAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  if (!marketData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Carregando dados do mercado...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise de Mercado</h1>
          <p className="text-gray-600">Acompanhe preços, tendências e oportunidades do mercado agrícola em tempo real</p>
        </div>

        {/* Alertas */}
        <div className="mb-6">
          <AlertBanner alerts={alerts.map((alert, index) => ({ ...alert, onDismiss: dismissAlert }))} />
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {marketData.commodities.map((commodity, index) => (
            <StatCard
              key={index}
              title={commodity.name}
              value={`R$ ${commodity.price}`}
              change={commodity.change}
              changeType={commodity.changeType}
              subtitle="Por saca"
              color={commodity.changeType === 'positive' ? 'green' : commodity.changeType === 'negative' ? 'red' : 'blue'}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
          ))}
        </div>

        {/* Gráficos de Preços */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PriceChart 
            data={marketData.sojaHistory} 
            title="Soja - Últimos 30 dias" 
            color="#10B981" 
          />
          <PriceChart 
            data={marketData.milhoHistory} 
            title="Milho - Últimos 30 dias" 
            color="#F59E0B" 
          />
          <PriceChart 
            data={marketData.cafeHistory} 
            title="Café - Últimos 30 dias" 
            color="#8B4513" 
          />
          <PriceChart 
            data={marketData.acucarHistory} 
            title="Açúcar - Últimos 30 dias" 
            color="#EC4899" 
          />
        </div>

        {/* Tabela de Cotações */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Cotações Detalhadas</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Atual</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação 24h</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mín. 30d</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Máx. 30d</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.commodities.map((commodity, index) => {
                  const histories = [marketData.sojaHistory, marketData.milhoHistory, marketData.cafeHistory, marketData.acucarHistory, marketData.boiHistory];
                  const history = histories[index] || [];
                  const prices = history.map(d => d.price);
                  const min = Math.min(...prices).toFixed(2);
                  const max = Math.max(...prices).toFixed(2);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{commodity.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {commodity.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          commodity.changeType === 'positive' ? 'bg-green-100 text-green-800' : 
                          commodity.changeType === 'negative' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {commodity.change}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {min}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {max}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(Math.random() * 10000).toFixed(0)} ton</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recomendações de IA */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recomendações Inteligentes</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Oportunidade de Venda - Soja</p>
                  <p className="text-sm text-green-700 mt-1">
                    Com base na análise de tendências, recomendamos a venda de 30-40% do estoque de soja nos próximos 7 dias.
                    Preço atual está 15% acima da média histórica.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">Atenção - Milho</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Milho apresenta volatilidade alta. Considere aguardar estabilização antes de grandes movimentações.
                    Próxima revisão de preços em 3 dias.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Informação - Café</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Café arábica mostra tendência de alta sustentada. Boa oportunidade para contratos futuros.
                    Demanda internacional crescente para os próximos meses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketAnalysis;