"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Overview from "./components/Overview";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LinkScrollButton from "./components/LinkScrollButton";
import OverwatchSection from "./components/OverwatchSection";
import LogoLoader from "../components/LogoLoader";

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
    <LogoLoader>
      <div className="relative w-full bg-white max-w-[100vw] overflow-x-hidden">
        <Navigation />
        <div className="md:pt-0 pt-16">
          <HeroSection scrollY={scrollY} />
        </div>

        <div className={`w-full bg-background border-t border-dashed border-foreground transition-opacity duration-1000 ease-in-out`}>
          <LinkScrollButton text="Contact us" href="#contact-form" showButton={showButton} />
          

          <Overview />
          <LinkScrollButton text={window.innerWidth < 768 ? "Learn more" : "Learn more about us"} href="#contact-form" showButton={true} />


          <OverwatchSection scrollY={scrollY} />

          <ContactForm offset={window.innerWidth < 768 ? 900 : 300} />
        </div>

        <Footer />
      </div>
    </LogoLoader>
  );
}