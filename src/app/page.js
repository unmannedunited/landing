"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Overview from "./components/Overview";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

export default function Home() {
  // Estado para la sección de overview y botón
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Estado para parallax global
  const [scrollY, setScrollY] = useState(0);

  // Efecto para la sección de overview y botón
  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 2000);
    const timer2 = setTimeout(() => setShowButton(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Listener de scroll global
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      console.log('Scroll detected in page.js:', currentScrollY);
      setScrollY(currentScrollY);
    };

    // Agregar listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Llamar una vez para establecer valor inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full bg-white max-w-[100vw] overflow-x-hidden">
      <Navigation />
      <div className="md:pt-0 pt-16">
        <HeroSection scrollY={scrollY} />
      </div>

      <div className={`w-full bg-background border-t border-dashed border-foreground transition-opacity duration-1000 ease-in-out`}>
        <a
            className={`uppercase md:px-24 px-4 w-[70%] text-center md:w-fit cursor-pointer py-3 bg-blue transition-all left-1/2 absolute -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] font-syncopate ${showButton ? 'opacity-100' : 'opacity-0'
              }`}
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}>
            Contact us
          </a>
          <div className="h-20"></div>

        <Overview />

        <ContactForm scrollY={scrollY} />
      </div>

      <Footer />
    </div>
  );
}