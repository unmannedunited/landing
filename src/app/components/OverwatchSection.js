'use client';

import { useState, useEffect } from "react";
import { getImageUrl } from "../../lib/utils";
import { useAdvancedParallax } from "../../hooks/useParallax";
import Button from "./Button";

export default function OverwatchSection({ scrollY = 0 }) {
  const [showDron, setShowDron] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


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
      <div className="hidden md:block w-full relative overflow-hidden">
        <div className="w-full h-fit mx-auto relative mt-20">

          <div className="max-w-[1200px] mx-auto relative h-[38vw]">
            {/* Título principal */}
            <img
              src={getImageUrl("/home/overw-title-b.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[20%] left-0 w-full transition-opacity duration-1000 ease-in-out
                }`}
                // style={{ paddingLeft: '10px' }}
            />

            {/* Dron con efecto de mouse */}
            <img
              src={getImageUrl("/dron1.png")}
              alt="Dron image"
              className={`absolute top-[2%] right-[-25%] transition-all duration-300 ease-out
                }`}
              style={{
                width: 'calc(80vw)',
                zIndex: 10,
                maxWidth: 'none',
                transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
              }}
            />
            
            {/* Subtítulo */}
            <img
              src={getImageUrl("/home/overw-title-w.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[25%] left-[0px] w-full transition-opacity duration-1000 ease-in-out
                }`}
                style={{ paddingLeft: '7px', paddingRight: '7px' }}
            />

            <img
              src={getImageUrl("/home/overw-text.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[70%] left-[0px] w-[25%] transition-opacity duration-1000 ease-in-out
                }`}
            />

          </div>
          <div className="w-full max-w-[1200px] mt-[-60px] mx-auto relative">
            <h1 className="text-xl text-blue font-bold" style={{ fontFamily: 'var(--font-nunito-sans)' }}>OVERWATCH-LR™ PROJECT<br/><br/></h1>
            <p className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
              The Overwatch-LR™ is a heavy-lift, long-endurance coaxial-octocopter with optional fixed wings for extended cruise efficiency. Designed for ISR, cargo, and ulti-mission defence roles, the platform combines four parallel hybrid generators with high-capacity solid-state batteries to deliver hours of station time plus rapid burst-power for vertical manoeuvres.
            </p>
          </div>
          <div className="w-full max-w-[1200px] mt-40 mx-auto relative">
              <h3 className="hidden md:block w-4/5 mb-8 text-darkblue text-[71px] font-coulson" style={{ lineHeight: '71px' }}>Application scenarios</h3>

              <div className="w-full flex mb-24">
                <div className="w-1/3 px-16">
                  {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
                  <img
                    src={getImageUrl("/schemes/UU_Esquema_EW & RF NEUTRALIZATION.png")}
                    alt="Tactical ISR"
                    className="w-full h-72 object-cover"
                  />
                  <p className="text-xl text-darkblue font-semibold px-6 text-center" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                    EW & RF NEUTRALIZATION
                  </p>
                </div>
                <div className="w-1/3 px-16">
                  {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
                  <img
                    src={getImageUrl("/schemes/UU_Esquema_MARITIME BORDER ISR.png")}
                    alt="MARITIME / BORDER ISR"
                    className="w-full h-72 object-cover"
                  />
                  <p className="text-xl text-darkblue font-semibold px-6 text-center" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                    MARITIME /<br/> BORDER ISR
                  </p>
                </div>
                <div className="w-1/3 px-16">
                  {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
                  <img
                    src={getImageUrl("/schemes/UU_Esquema_ANTI-ACCESS AREA DENIAL (A2AD).png")}
                    alt="ANTI-ACCESS AREA DENIAL (A2AD)"
                    className="w-full h-72 object-cover"
                  />
                  <p className="text-xl text-darkblue font-semibold px-6 text-center" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                    ANTI-ACCESS AREA DENIAL (A2AD)
                  </p>  
                </div>
              </div>
              <Button className="md:w-[50%] md:px-6" text="learn more about overwatch" href="/overwatch" showButton={true} />
              <div className="h-40"></div>

          </div>


        </div>
      </div>
      <div className="block md:hidden w-full h-[60vh] md:h-[45vw] relative overflow-hidden">

        <div className="w-full h-full mx-auto relative">
          <div className="max-w-[1200px] mx-auto relative h-full">
            {/* Título principal */}
            <img
              src={getImageUrl("/unmanned-text-mobile.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[10%] left-[10%] w-4/5 transition-opacity duration-1000 ease-in-out
                }`}
            />

            {/* Dron con efecto de mouse */}
            <img
              src={getImageUrl("/unmanned-text-mobile-dron.png")}
              alt="Dron image"
              className={`absolute top-[15%] right-[10%] transition-all duration-300 ease-out
                }`}
              style={{
                width: 'calc(80vw)',
                maxWidth: 'none',
                transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
              }}
            />
            
            {/* Subtítulo */}
            <img
              src={getImageUrl("/unmanned-text-mobile-sub.png")}
              alt="Badge of Unmanned united"
              className={`absolute top-[10%] left-[10%] w-4/5 transition-opacity duration-1000 ease-in-out
                }`}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
