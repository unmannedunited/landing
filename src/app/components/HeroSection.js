'use client';

import { useState, useEffect } from "react";
import { getImageUrl } from "../../lib/utils";
import { useAdvancedParallax } from "../../hooks/useParallax";

export default function HeroSection() {
  const [showPattern, setShowPattern] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [showDron, setShowDron] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efectos de parallax para las imágenes de fondo
  const parallaxRight = useAdvancedParallax({ 
    speed: 0.3, 
    enabled: showPattern, 
    direction: 'up-left' 
  });
  const parallaxLeft = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: showPattern, 
    direction: 'up-right' 
  });


  // Secuencia de animaciones al cargar la página
  useEffect(() => {
    const timer1 = setTimeout(() => setShowPattern(true), 200);
    const timer2 = setTimeout(() => setShowTitle(true), 600);
    const timer3 = setTimeout(() => setShowBarcode(true), 1000);
    const timer4 = setTimeout(() => setShowDron(true), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

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
  }, [showDron]);

  return (
    <div className="w-full relative">
      <div className="w-full h-[70vh] md:h-[45vw] relative overflow-hidden">
        {/* Imágenes de fondo con parallax */}
        <img
          src={getImageUrl("/unmanned-text-right.png")}
          alt="Background pattern"
          className={`absolute md:w-[25%] md:top-[-60%] md:right-[-5%] right-0 top-[-55%] w-[50%] transition-opacity duration-1000 ease-in-out ${showPattern ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            transform: `translate3d(0px, ${parallaxRight.y}px, 0)`,
            willChange: 'transform'
          }}
        />

        <img
          src={getImageUrl("/unmanned-text-left.png")}
          alt="Background pattern"
          className={`absolute md:w-[25%] md:bottom-[-70%] bottom-[-45%] left-[-5%] w-[50%] transition-opacity duration-1000 ease-in-out ${showPattern ? 'opacity-100' : 'opacity-0'
            }`}
          style={{
            transform: `translate3d(0px, ${parallaxLeft.y}px, 0)`,
            willChange: 'transform'
          }}
        />

        <div className="w-full h-full mx-auto relative">
          {/* Imagen de código de barras */}
          <img
            src={getImageUrl("/unmanned-misc.png")}
            alt="Barcode"
            style={{
              maxWidth: 'none',
            }}
            className={`absolute md:top-[-5%] md:right-0 right-[-35%] top-[-10%]  w-[250vw] md:w-full transition-opacity duration-1000 ease-in-out ${showBarcode ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <div className="max-w-[1200px] mx-auto relative h-full">
            {/* Título principal */}
            <img
              src={getImageUrl("/unmanned-text.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[20%] left-0 w-full transition-opacity duration-1000 ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Dron con efecto de mouse */}
            <img
              src={getImageUrl("/dron1.png")}
              alt="Dron image"
              className={`absolute top-[2%] right-[-25%] transition-all duration-300 ease-out ${showDron ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                width: 'calc(80vw)',
                maxWidth: 'none',
                transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
              }}
            />
            
            {/* Subtítulo */}
            <img
              src={getImageUrl("/unmanned-text-sub.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[20%] left-0 w-full transition-opacity duration-1000 ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
