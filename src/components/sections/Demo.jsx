import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Demo = () => {
  const features = [
    { text: "Dados meteorológicos atualizados a cada hora", color: "bg-green-500" },
    { text: "Previsões precisas para os próximos 14 dias", color: "bg-blue-500" },
    { text: "Alertas automáticos de condições adversas", color: "bg-yellow-500" },
    { text: "Análises personalizadas por cultura", color: "bg-purple-500" }
  ];

  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experimente Nossa Plataforma</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como nossa tecnologia pode revolucionar sua operação agrícola
          </p>
        </motion.div>

        <motion.div 
          className="demo-card rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Dashboard em Tempo Real</h3>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-3 h-3 ${feature.color} rounded-full mr-3`}></div>
                    <span className="text-gray-700">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/login"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors text-center"
                >
                  Testar Dashboard Climático
                </Link>
                <Link 
                  to="/login"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors text-center"
                >
                  Ver Dashboard Completo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <motion.img 
                src="/img/dashboard-preview.png" 
                alt="Preview do Dashboard" 
                className="w-full rounded-xl shadow-2xl"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjI3MCIgaGVpZ2h0PSIxODAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzEwQjk4MSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQzIDEwMCkiPgo8cGF0aCBkPSJNMTIgMkw0IDlMNyAxMkwxMiA3TDE3IDEyTDIwIDlMMTIgMloiLz4KPC9zdmc+Cjx0ZXh0IHg9IjE1NSIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsaW1hPC90ZXh0Pgo8cmVjdCB4PSIzMTAiIHk9IjIwIiB3aWR0aD0iMjcwIiBoZWlnaHQ9IjE4MCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI0U1RTdFQiIvPgo8cGF0aCBkPSJNNDMwIDEwMEw0NTAgOTBMNDcwIDEwNUw0OTAgODVMNTEwIDEwMCIgc3Ryb2tlPSIjMjJBMDVBIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIyQTA1QSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDMzIDEzMCkiPgo8cGF0aCBkPSJNMTIgMkw0IDlMNyAxMkwxMiA3TDE3IDEyTDIwIDlMMTIgMloiLz4KPC9zdmc+Cjx0ZXh0IHg9IjQ0NSIgeT0iMTcwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1lcmNhZG88L3RleHQ+Cjx0ZXh0IHg9IjMwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRhc2hib2FyZCBBZ3JvSW5mbzwvdGV4dD4KPC9zdmc+";
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl"></div>
              
              {/* Play button */}
              <Link
                to="/login"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-green-600 p-4 rounded-full shadow-lg hover:bg-white transition-all block"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;