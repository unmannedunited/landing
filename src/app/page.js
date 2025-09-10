"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Overview from "./components/Overview";

export default function Home() {
  const [showPattern, setShowPattern] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showDron, setShowDron] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Secuencia de animaciones al cargar la página
  useEffect(() => {
    const timer1 = setTimeout(() => setShowPattern(true), 200);
    const timer2 = setTimeout(() => setShowTitle(true), 600);
    const timer3 = setTimeout(() => setShowBarcode(true), 1000);
    const timer4 = setTimeout(() => setShowBadge(true), 1200);
    const timer5 = setTimeout(() => setShowDron(true), 1400);
    const timer6 = setTimeout(() => setShowText(true), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
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
    <div className="relative w-full bg-white">
      <nav className="fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-background border-b border-dashed border-foreground z-10">
        <div className="text-xs flex items-center justify-between gap-2 uppercase tracking-[3px] font-regular w-full   max-w-[1200px] mx-auto ">
          <a className="flex items-center gap-2 uppercase cursor-pointer text-sm font-syncopate font-regular tracking-[4.5px]"
            href="/unmanned"
          >
            <img src="/unmanned-logo.png" alt="Unmanned united" className="w-10 h-10" />
            Unmanned united
          </a>
          <a className="uppercase text-sm font-syncopate font-regular tracking-[4.5px] cursor-pointer"
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Contact us
          </a>

        </div>
      </nav>
      <div className={"w-full relative"}>
        <div className="w-full h-[90vh] relative overflow-hidden">

          <img
            src="/unmanned-text-right.png"
            alt="Background pattern"
            className={`absolute w-[25%] top-0 right-0 transition-opacity duration-1000 ease-in-out ${showPattern ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <img
            src="/unmanned-text-left.png"
            alt="Background pattern"
            className={`absolute w-[25%] bottom-0 left-0 transition-opacity duration-1000 ease-in-out ${showPattern ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <div className="w-full h-full mx-auto relative">
            <img
              src="/unmanned-text.png"
              alt="Badge of Unmanned united"
              className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <img
              src="/unmanned-misc.png"
              alt="Barcode"
              className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${showBarcode ? 'opacity-100' : 'opacity-0'
                }`}
            />

            <img
              src="/dron1.png"
              alt="Dron image"
              className={`absolute top-[5%] right-0 w-4/5 transition-all duration-300 ease-out ${showDron ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
              }}
            />


            <img
              src="/unmanned-text-sub.png"
              className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
                }`}
            />

          </div>

        </div>
      </div>

      <div className={`w-full bg-background border-t border-dashed border-foreground transition-opacity duration-1000 ease-in-out`}>
        <a
            className={`uppercase px-24 cursor-pointer py-3 bg-blue transition-all left-1/2 absolute -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] font-syncopate ${showDron ? 'opacity-100' : 'opacity-0'
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

        <ContactForm />
      </div>

      <footer className={`w-full bg-background relative z-20 transition-opacity duration-1000 ease-in-out`}>

        <div className="w-full h-full bg-darkblue border-t border-dashed border-white">
          <div className="w-[1000px] mx-auto mt-12 pb-20">
            <div className=" space-y-4 flex justify-between gap-4">
              <p className="flex-1 text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                © 2025 Unmanned United Inc. All rights reserved.
              </p>
              <div className="flex-1 mt-0" style={{ marginTop: '0px' }} >
                <div className="flex gap-4">
                  <div>
                    <p className="text-lg text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                      <span className="font-semibold">Contact:</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                      info@unmannedunited.com
                    </p>
                    <p className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                      +1-321-389-1600
                    </p>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}