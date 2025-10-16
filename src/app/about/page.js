"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import EachMember from "../components/about/EachMember";
import TeamPic from "../components/about/TeamPic";
import WhatWe from "../components/about/WhatWe";
import ContactForm from "../components/ContactForm";
import EverythingWeBuild from "../components/about/EverythingWeBuild";

export default function About() {
  // Estado para parallax global
  const [scrollY, setScrollY] = useState(0);

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
    <div className="relative w-full bg-white ">
      <Navigation />
      
      <div className="md:pt-0 pt-16">
        <AboutHero scrollY={scrollY} />
      </div>
      <WhoWeAre scrollY={scrollY} />


      <EachMember />

      <TeamPic />
      <WhatWe />
      <EverythingWeBuild />

      <ContactForm offset={0} scrollY={scrollY} />
      <Footer />
    </div>
  );
}
