"use client";

import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import TeamPic from "../components/overwatch/TeamPic";
import ContactForm from "../components/ContactForm";
import ProductHero from "../components/overwatch/ProductHero";
import ProductDetail from "../components/overwatch/ProductDetail";
import AppScenarios from "../components/overwatch/AppScenarios";
import LastPic from "../components/overwatch/LastPic";
import { getImageUrl } from "@/lib/utils";
import VideoPlayer from "../components/VideoPlayer";

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
    <div className="relative w-full bg-white max-w-[100vw] overflow-x-hidden">
      <Navigation />
      <div className="bg-black relative z-10">
        <div className="w-full max-w-[1400px] mx-auto h-fit bg-black object-contain relative">
          <VideoPlayer 
            src={getImageUrl("/UU_vid_sm.mp4")}
            className="w-full h-fit bg-black object-contain relative"
            volume={0.3}
          />
        </div>
      </div>
      
      <div className="md:pt-0 pt-16 border-black border-b">
        <ProductHero scrollY={scrollY} />
      </div>
      <ProductDetail />

      <TeamPic />

      <AppScenarios />
      <LastPic />

      <ContactForm offset={-1000} scrollY={scrollY} />
      <Footer />
    </div>
  );
}
