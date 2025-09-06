import React, { useState, useEffect } from 'react';
import CropStatusCard from '../components/ui/CropStatusCard';
import ActivityTimeline from '../components/ui/ActivityTimeline';
import AlertBanner from '../components/ui/AlertBanner';
import StatCard from '../components/ui/StatCard';
import { withCache } from '../utils/cache';

// Dados mock para demonstração
const generateMockData = () => {
  const crops = [
    {
      cropName: 'Soja Transgênica',
      variety: 'BRS 1003IPRO',
      area: 120.5,
      plantDate: '15/09/2024',
      harvestDate: '25/01/2025',
      status: 'growing',
      progress: 45,
      health: 'good',
      nextActivity: 'Aplicação de defensivo - 10/12/2024'
    },
    {
      cropName: 'Milho Safrinha',
      variety: 'DKB 240 PRO3',
      area: 85.3,
      plantDate: '20/02/2024',
      harvestDate: '15/07/2024',
      status: 'harvested',
      progress: 100,
      health: 'excellent',
      nextActivity: null
    },
    {
      cropName: 'Algodão',
      variety: 'TMG 47 B2RF',
      area: 45.7,
      plantDate: '05/11/2024',
      harvestDate: '10/06/2025',
      status: 'planted',
      progress: 15,
      health: 'good',
      nextActivity: 'Irrigação programada - 08/12/2024'
    },
    {
      cropName: 'Café Arábica',
      variety: 'Mundo Novo',
      area: 32.8,
      plantDate: '10/10/2022',
      harvestDate: '20/05/2025',
      status: 'flowering',
      progress: 65,
      health: 'excellent',
      nextActivity: 'Adubação foliar - 12/12/2024'
    },
    {
      cropName: 'Cana-de-açúcar',
      variety: 'RB92579',
      area: 150.0,
      plantDate: '25/03/2024',
      harvestDate: '15/08/2025',
      status: 'growing',
      progress: 55,
      health: 'fair',
      nextActivity: 'Controle de pragas - 15/12/2024'
    },
    {
      cropName: 'Feijão',
      variety: 'IPR Tangará',
      area: 25.4,
      plantDate: '15/11/2024',
      harvestDate: '20/02/2025',
      status: 'ready',
      progress: 95,
      health: 'good',
      nextActivity: 'Colheita programada - 18/02/2025'
    }
  ];

  const activities = [
    {
      id: 1,
      title: 'Plantio de Soja',
      description: 'Plantio da variedade BRS 1003IPRO na área Norte',
      date: '15/09/2024',
      duration: '3 dias',
      status: 'completed',
      tags: ['Plantio', 'Soja', 'Área Norte']
    },
    {
      id: 2,
      title: 'Aplicação de Herbicida',
      description: 'Controle de plantas daninhas na cultura do algodão',
      date: '02/12/2024',
      duration: '1 dia',
      status: 'completed',
      tags: ['Defensivo', 'Algodão', 'Herbicida']
    },
    {
      id: 3,
      title: 'Irrigação Programada',
      description: 'Sistema de irrigação automático para o algodão',
      date: '08/12/2024',
      duration: '4 horas',
      status: 'in-progress',
      tags: ['Irrigação', 'Algodão']
    },
    {
      id: 4,
      title: 'Aplicação de Defensivo',
      description: 'Aplicação preventiva de fungicida na soja',
      date: '10/12/2024',
      duration: '2 dias',
      status: 'pending',
      tags: ['Defensivo', 'Soja', 'Fungicida']
    },
    {
      id: 5,
      title: 'Adubação Foliar',
      description: 'Nutrição foliar do café em floração',
      date: '12/12/2024',
      duration: '1 dia',
      status: 'pending',
      tags: ['Adubação', 'Café', 'Foliar']
    },
    {
      id: 6,
      title: 'Controle de Pragas',
      description: 'Monitoramento e controle de pragas na cana',
      date: '15/12/2024',
      duration: '2 dias',
      status: 'pending',
      tags: ['Praga', 'Cana-de-açúcar']
    },
    {
      id: 7,
      title: 'Colheita do Feijão',
      description: 'Colheita mecanizada da safra de feijão',
      date: '18/02/2025',
      duration: '3 dias',
      status: 'pending',
      tags: ['Colheita', 'Feijão']
    },
    {
      id: 8,
      title: 'Análise de Solo',
      description: 'Coleta e análise de solo para próximo plantio',
      date: '20/12/2024',
      duration: '1 dia',
      status: 'delayed',
      tags: ['Solo', 'Análise', 'Laboratório']
    }
  ];

  const stats = {
    totalArea: crops.reduce((acc, crop) => acc + crop.area, 0),
    activeCrops: crops.filter(crop => crop.status !== 'harvested').length,
    pendingTasks: activities.filter(activity => activity.status === 'pending').length,
    productivity: 85.5 // Percentual médio
  };

  return { crops, activities, stats };
};

const CropManagement = () => {
  const [farmData, setFarmData] = useState(null);
  const [alerts, setAlerts] = useState([
    {
      type: 'warning',
      title: 'Alerta de Praga',
      message: 'Detectada presença de lagarta na área de cana-de-açúcar. Ação recomendada.',
      timestamp: 'Há 3 horas',
      action: {
        text: 'Ver detalhes',
        onClick: () => console.log('Ver detalhes da praga')
      },
      dismissible: true
    },
    {
      type: 'info',
      title: 'Irrigação Programada',
      message: 'Sistema de irrigação será ativado hoje às 18h para a cultura do algodão.',
      timestamp: 'Há 1 hora',
      dismissible: true
    },
    {
      type: 'success',
      title: 'Aplicação Concluída',
      message: 'Herbicida aplicado com sucesso na área de algodão.',
      timestamp: 'Há 2 horas',
      dismissible: true
    },
    {
      type: 'error',
      title: 'Análise de Solo Atrasada',
      message: 'Análise de solo programada para ontem não foi realizada.',
      timestamp: 'Ontem',
      action: {
        text: 'Reagendar',
        onClick: () => console.log('Reagendar análise')
      },
      dismissible: true
    }
  ]);

  useEffect(() => {
    const loadFarmData = async () => {
      try {
        const data = await withCache(
          'farm-data',
          () => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(generateMockData());
              }, 1000);
            });
          },
          'crops'
        );
        setFarmData(data);
      } catch (error) {
        console.error('Erro ao carregar dados da fazenda:', error);
        // Fallback: carregar sem cache
        setTimeout(() => {
          setFarmData(generateMockData());
        }, 1000);
      }
    };

    loadFarmData();
  }, []);

  const dismissAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  if (!farmData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <main className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Carregando dados da fazenda...</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Cultivo</h1>
          <p className="text-gray-600">Monitore suas culturas, atividades e performance da fazenda em tempo real</p>
        </div>

        {/* Alertas */}
        <div className="mb-6">
          <AlertBanner alerts={alerts.map((alert, index) => ({ ...alert, onDismiss: dismissAlert }))} />
        </div>

        {/* Cards de Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Área Total"
            value={`${farmData.stats.totalArea.toFixed(1)} ha`}
            subtitle="Área cultivada"
            color="green"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
          <StatCard
            title="Cultivos Ativos"
            value={farmData.stats.activeCrops}
            subtitle="Em desenvolvimento"
            color="blue"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="Tarefas Pendentes"
            value={farmData.stats.pendingTasks}
            subtitle="Atividades programadas"
            color="orange"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
          <StatCard
            title="Produtividade"
            value={`${farmData.stats.productivity}%`}
            change="+5.2%"
            changeType="positive"
            subtitle="Média da fazenda"
            color="purple"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </div>

        {/* Título da seção */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Status dos Cultivos</h2>
          <p className="text-sm text-gray-600">Acompanhe o desenvolvimento de cada cultura</p>
        </div>

        {/* Grid Principal - Cultivos e Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Cultivos - 2/3 da largura */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmData.crops.map((crop, index) => (
                <CropStatusCard
                  key={index}
                  cropName={crop.cropName}
                  variety={crop.variety}
                  area={crop.area}
                  plantDate={crop.plantDate}
                  harvestDate={crop.harvestDate}
                  status={crop.status}
                  progress={crop.progress}
                  health={crop.health}
                  nextActivity={crop.nextActivity}
                />
              ))}
            </div>
          </div>

          {/* Timeline - 1/3 da largura */}
          <div>
            <ActivityTimeline activities={farmData.activities} />
          </div>
        </div>

        {/* Painel de Controle Rápido */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Controle Rápido</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sistema de Irrigação */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Sistema de Irrigação</h4>
                <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600 mb-3">3 sistemas ativos</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Algodão - Setor A</span>
                  <span className="text-green-600">Ativo</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Café - Setor B</span>
                  <span className="text-gray-600">Inativo</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Soja - Setor C</span>
                  <span className="text-blue-600">Programado 18h</span>
                </div>
              </div>
              <button className="w-full mt-3 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors">
                Gerenciar Irrigação
              </button>
            </div>

            {/* Monitoramento Climático */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Clima Atual</h4>
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Temperatura:</span>
                  <span className="font-medium">28°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Umidade:</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Vento:</span>
                  <span className="font-medium">12 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Chuva (24h):</span>
                  <span className="font-medium text-blue-600">15mm</span>
                </div>
              </div>
              <button className="w-full mt-3 bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition-colors">
                Ver Previsão
              </button>
            </div>

            {/* Alertas e Notificações */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Alertas Ativos</h4>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span>Praga na cana-de-açúcar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span>Análise de solo atrasada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>Irrigação funcionando</span>
                </div>
              </div>
              <button className="w-full mt-3 bg-red-600 text-white text-sm py-2 rounded hover:bg-red-700 transition-colors">
                Ver Todos Alertas
              </button>
            </div>
          </div>
        </div>

        {/* Histórico de Produção */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Produção (Última Safra)</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultura</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área (ha)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produção</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtividade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receita</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Soja</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">120.5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">362.5 ton</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.01 ton/ha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ 545.250</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      +8.5%
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Milho</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85.3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">596.1 ton</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6.99 ton/ha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ 298.050</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      +12.3%
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Algodão</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45.7</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">91.4 ton</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.00 ton/ha</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ 365.600</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      -3.2%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropManagement;