import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Monitoramento Climático",
      description: "Previsões precisas, alertas de condições adversas e análises meteorológicas detalhadas.",
      icon: "🌤️",
      color: "from-blue-50 to-blue-100",
      buttonColor: "text-blue-600 hover:text-blue-700"
    },
    {
      title: "Análise de Mercado",
      description: "Dados de preços, tendências de mercado e insights para maximizar seus lucros.",
      icon: "📊",
      color: "from-green-50 to-green-100",
      buttonColor: "text-green-600 hover:text-green-700"
    },
    {
      title: "Gestão de Cultivos",
      description: "Planejamento de plantio, cronogramas de cuidados e otimização de recursos.",
      icon: "🌱",
      color: "from-yellow-50 to-yellow-100",
      buttonColor: "text-yellow-600 hover:text-yellow-700"
    },
    {
      title: "Relatórios & Análises",
      description: "Dashboards personalizados com insights acionáveis para tomada de decisão.",
      icon: "📈",
      color: "from-purple-50 to-purple-100",
      buttonColor: "text-purple-600 hover:text-purple-700"
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas para otimizar cada aspecto da sua operação agrícola
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`card-hover bg-gradient-to-br ${service.color} p-8 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <button className={`${service.buttonColor} font-semibold transition-colors`}>
                Saiba mais →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;