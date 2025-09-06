import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "João Silva",
      company: "Fazenda Santa Rita - MT",
      text: "Com o AgroInfo consegui aumentar a produtividade em 30% no primeiro ano. Os alertas meteorológicos me salvaram de várias perdas por geada.",
      avatar: "/img/testimonial-1.jpg"
    },
    {
      name: "Maria Santos",
      company: "Cooperativa Agrícola - RS",
      text: "A plataforma é incrivelmente intuitiva. Os dados de mercado em tempo real me ajudam a tomar decisões de venda muito mais assertivas.",
      avatar: "/img/testimonial-2.jpg"
    },
    {
      name: "Carlos Oliveira",
      company: "Agronegócio Oliveira - SP",
      text: "O suporte técnico é excepcional. Sempre que tenho dúvidas, a equipe está pronta para ajudar. Recomendo para todos os produtores!",
      avatar: "/img/testimonial-3.jpg"
    }
  ];

  const fallbackAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzZCNzI4MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgMTYpIj4KPHBhdGggZD0iTTEyIDJBNiA2IDAgMSAwIDEyIDJaTTIxIDE2VjE0QTYgNiAwIDAgMCA5IDE0VjE2QTYgNiAwIDAgMCAyMSAxNloiLz4KPC9zdmc+Cjwvc3ZnPg==";

  return (
    <section id="depoimentos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600">Histórias reais de sucesso com o AgroInfo</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full mr-4" 
                  onError={(e) => {
                    e.target.src = fallbackAvatar;
                  }}
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div className="flex text-yellow-400 text-lg">
                ⭐⭐⭐⭐⭐
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;