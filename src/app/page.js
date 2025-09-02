"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);
  const [showPattern, setShowPattern] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showDron, setShowDron] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleEnded = () => {
    console.log("🎬 Video terminado - ejecutando secuencia de animaciones");
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setEnded(true);
    
    // Secuencia de animaciones
    setTimeout(() => setShowPattern(true), 200); // Pattern aparece después de 200ms
    setTimeout(() => setShowBarcode(true), 1800); // Barcode aparece después de 800ms
    setTimeout(() => setShowBadge(true), 2100); // Badge aparece después de 800ms
    setTimeout(() => {
      setVideoOpacity(0); // Video desaparece
      setShowDron(true); // Dron aparece al mismo tiempo
    }, 1000); // Después de 1.5 segundos
    setTimeout(() => setShowTitle(true), 1200); // Badge aparece después de 800ms

  };


  // Usar useEffect para controlar el timing del video
  useEffect(() => {
    if (videoRef.current && ended === false) {
      // Acelerar el video a 3x
      if (videoRef.current) {
        videoRef.current.playbackRate = 1;
        console.log("🚀 Video acelerado a 3x velocidad");
      }
    }
  }, [ended]);

  // Asegurar que el video se acelere cuando esté listo
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        video.playbackRate = 1;
      };
      
      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  // Efecto parallax para el dron
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calcular posición relativa del mouse (0 a 1)
      const x = (clientX / innerWidth - 0.5) * 2; // -1 a 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 a 1
      
      setMousePosition({ y, x });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full">
      <nav className="fixed top-0 w-full  h-16 flex items-center justify-between px-4 bg-background border-b border-dashed border-foreground z-10">
        <div className="text-xs flex items-center justify-between gap-2 uppercase tracking-[3px] font-regular w-full   max-w-[1200px] mx-auto ">
          <button className="flex items-center gap-2 uppercase cursor-pointer text-xs font-syncopate font-regular tracking-[4.5px]">
            <img src="/unmanned/unmanned-logo.png" alt="Unmanned united" className="w-10 h-10" />
            Unmanned united
          </button>
          <button className="uppercase text-xs font-syncopate font-regular tracking-[4.5px] cursor-pointer"
            onClick={() => { console.log("This does nothing yet"); }}
          >
            Contact us
          </button>

        </div>
      </nav>
      <div className={"mt-16 w-full relative"} style={{ height: "calc(100vh - 128px)" }}>
        <video
          ref={videoRef}
          src="/unmanned/start.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: videoOpacity }}
          onEnded={handleEnded}
        />
        <div className="absolute w-full h-full top-0 left-0">

          <img 
              src="/unmanned/backgroundPattern.svg" 
              alt="Background pattern" 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                showPattern ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          <div className="w-full h-full max-w-[1200px] mx-auto relative">
          <img 
              src="/unmanned/unmanned-text.svg" 
              alt="Badge of Unmanned united" 
              className={`absolute left-[5%] top-[15%] w-content transition-opacity duration-1000 ease-in-out ${
                showTitle ? 'opacity-100' : 'opacity-0'
              }`} 
            />

          <img 
            src="/unmanned/barcode.svg" 
            alt="Barcode" 
            className={`absolute right-[15%] top-[55%] w-content transition-opacity duration-1000 ease-in-out ${
              showBarcode ? 'opacity-100' : 'opacity-0'
            }`} 
          />
          
          <img 
            src="/unmanned/badge.svg" 
            alt="Badge of Unmanned united" 
            className={`absolute right-[5%] top-[15%] w-content transition-opacity duration-1000 ease-in-out ${
              showBadge ? 'opacity-100' : 'opacity-0'
            }`} 
          />

          <img 
            src="/unmanned/dron1.png" 
            alt="Dron image" 
            className={`absolute right-[5vw] top-[10%] w-3/5 transition-all duration-300 ease-out ${
              showDron ? 'opacity-100' : 'opacity-0'
            }`} 
            style={{
              transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
            }}
          />


          <img 
            src="/unmanned/unmanned-text-sub.svg" 
            alt="Badge of Unmanned united" 
            style={{ transform: "translate(7px, 39px)", width: 1112 }}
            className={`absolute left-[5%] top-[15%] w-content transition-opacity duration-1000 ease-in-out ${
              showTitle ? 'opacity-100' : 'opacity-0'
            }`} 
          />

          <div className="absolute left-[17%] top-[65%] w-content transition-opacity duration-1000 ease-in-out">
            <p className="text-xl uppercase font-syncopate font-regular tracking-[7.5px]">Unmanned, <br/>United, <br/><span className="text-blue font-bold">Unstoppable</span></p>
          </div>
          </div>

        </div>
      </div>
      
      
      {(ended || true) && (
        <div className={`w-full h-16 flex bg-background border-t border-dashed border-foreground z-10 transition-opacity duration-1000 ease-in-out`}>
          <button 
            className={`uppercase px-6 cursor-pointer py-3 bg-blue transition-all left-1/2 relative -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-xl shadow-lg text-lg font-regular tracking-[6.5px] font-syncopate ${
              showDron ? 'opacity-100' : 'opacity-0'
            }`} 
            onClick={() => {
            }}>
            Schedule a demo
          </button>
        </div>
      )}
    </div>
  );
}