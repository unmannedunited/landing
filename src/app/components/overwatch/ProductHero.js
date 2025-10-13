'use client';

import { useState, useEffect } from "react";
import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

export default function HeroSection({ scrollY = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Hook de parallax para la imagen principal
  const parallaxTransform = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'down' 
  });

  // Efecto de seguimiento del mouse para el dron
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const innerWidth = window.innerWidth || document.documentElement.clientWidth;
      const innerHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Validar que tenemos dimensiones válidas
      if (innerWidth > 0 && innerHeight > 0) {
        // Calcular posición relativa del mouse (0 a 1)
        const x = (clientX / innerWidth - 0.5) * 5; // -1 a 1
        const y = (clientY / innerHeight - 0.5) * 5; // -1 a 1

        setMousePosition({ y, x });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden">
      <div className="max-w-[1200px] w-full h-full mx-auto relative overflow-visible" style={{ zIndex: 1000 }}>
        <p className="text-white text-xl uppercase font-syncopate absolute tracking-widest" style={{ top: 150 }}>Overwatch isn’t <br/> like other drones</p>
        <p className="text-white text-right text-xl uppercase font-syncopate absolute right-0 tracking-widest" style={{ top: "calc(100vh + 50px)" }}>it’s what those other <br/> drones wish they were</p>
      </div>

      <div 
        className="w-full h-full"
        style={{
          transform: `translateY(${parallaxTransform.y}px)`,
          willChange: 'transform'
        }}
      >
        <img 
          src={getImageUrl("/product/product-hero.png")} 
          alt="Hero" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
      <img src={getImageUrl("/home/hero-logo.png")} alt="Hero" 
        className="absolute right-[18%] top-[50%] w-[17%]" />

    </div>
  );
}
