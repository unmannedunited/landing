"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Overview from "./components/Overview";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LinkScrollButton from "./components/LinkScrollButton";
import OverwatchSection from "./components/OverwatchSection";
import { getLinkUrl } from "@/lib/utils";
import { trackButtonClick } from "@/lib/analytics";

export default function Home() {
  // Estado para la sección de overview y botón
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Estado para parallax global
  const [scrollY, setScrollY] = useState(0);
  
  // Estado para el ancho de la ventana
  const [windowWidth, setWindowWidth] = useState(0);

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

  // Listener para el ancho de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Establecer el ancho inicial
    handleResize();

    // Agregar listener
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    // Trackear click en botón "Contact us"
    trackButtonClick('Contact Us', 'home');
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLearnMoreClick = (e) => {
    // Trackear click en botón "Learn more"
    trackButtonClick('Learn More', 'home');
  };

  console.log("This is new")

  return (
    <div className="relative w-full bg-white max-w-[100vw] overflow-x-hidden">
      <Navigation />
      <div className="md:pt-0 pt-16">
        <HeroSection scrollY={scrollY} />
      </div>

      <div className={`w-full bg-background border-t border-dashed border-foreground transition-opacity duration-1000 ease-in-out`}>
        <LinkScrollButton text="Contact us" href="#contact-form" showButton={showButton} onClick={handleContactClick} />
        

        <Overview />
        <LinkScrollButton text={windowWidth < 768 ? "Learn more" : "Learn more about us"} href={getLinkUrl("/about")} showButton={true} onClick={handleLearnMoreClick} />


        <OverwatchSection scrollY={scrollY} />

        <ContactForm offset={windowWidth < 768 ? 900 : 300} />
      </div>

      <Footer />
    </div>
  );
}