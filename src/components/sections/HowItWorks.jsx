import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Coleta de Dados",
      description: "Integramos dados meteorológicos, de mercado e suas informações de cultivo em uma única plataforma inteligente.",
      color: "from-green-400 to-green-600"
    },
    {
      number: 2,
      title: "Análise Inteligente",
      description: "Nossos algoritmos processam os dados e geram insights personalizados para sua operação específica.",
      color: "from-blue-400 to-blue-600"
    },
    {
      number: 3,
      title: "Decisões Assertivas",
      description: "Receba recomendações práticas e alertas em tempo real para tomar as melhores decisões no momento certo.",
      color: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa tecnologia trabalha em três etapas simples para maximizar seus resultados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/login"
            className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 inline-block"
          >
            Comece Agora Gratuitamente
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;