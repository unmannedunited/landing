'use client';

import { useState, useEffect } from "react";
import { getImageUrlSimple } from "../../lib/utils";
import { useAdvancedParallax } from "../../hooks/useParallax";
import { useHeroImagePreload } from "../../hooks/useImagePreload";
import CustomImage from "../../components/Image";

export default function HeroSection({ scrollY = 0 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isLoading: imagesLoading } = useHeroImagePreload();
  
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
      <div 
        className="w-full h-full"
        style={{
          transform: `translateY(${parallaxTransform.y}px)`,
          willChange: 'transform'
        }}
      >
        <img 
          src={getImageUrlSimple("/home/hero.png")} 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-[200px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[200px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
      <img src={getImageUrlSimple("/home/hero-text.png")} alt="Hero" 
        className="absolute right-[10%] top-[35%] w-[40%]" />
      <img src={getImageUrlSimple("/home/hero-text-sm.png")} alt="Hero" 
        className="absolute right-[30%] top-[60%] w-[15%]" />
      <img src={getImageUrlSimple("/home/hero-logo.png")} alt="Hero" 
        className="absolute right-[14%] top-[45%] w-[10%]" />

    </div>
  );
}
