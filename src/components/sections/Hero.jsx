import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="hero-gradient text-white min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              O Futuro da
              <span className="text-green-300"> Agricultura</span>
              é Inteligente
            </h1>
            <p className="text-xl mb-8 text-green-100 leading-relaxed">
              Transforme sua fazenda com dados climáticos precisos, análises de mercado em tempo real e 
              insights personalizados para maximizar sua produtividade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/login"
                className="clima-cta-button bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg text-center"
              >
                Dashboard Climático
              </Link>
              <Link 
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-700 transition-all text-center"
              >
                Plataforma Completa
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img 
              src="/img/hero-dashboard.png" 
              alt="AgroInfo Dashboard" 
              className="w-full rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjU2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIyQTA1QSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjg4IDIwMCkiPgo8cGF0aCBkPSJNMTIgMkw0IDlMNyAxMkwxMiA3TDE3IDEyTDIwIDlMMTIgMloiLz4KPC9zdmc+Cjx0ZXh0IHg9IjMwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QjdBODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRhc2hib2FyZCBBZ3JvSW5mbzwvdGV4dD4KPC9zdmc+";
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;