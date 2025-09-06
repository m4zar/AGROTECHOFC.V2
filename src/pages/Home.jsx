import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Demo from '../components/sections/Demo';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Demo />
      <HowItWorks />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;