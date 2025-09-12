"use client";

import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import Overview from "./components/Overview";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";

export default function Home() {
  // Estado para la sección de overview y botón
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Efecto para la sección de overview y botón
  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 2000);
    const timer2 = setTimeout(() => setShowButton(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full bg-white">
      <Navigation />
      <div className="md:pt-0 pt-16">
        <HeroSection />
      </div>

      <div className={`w-full bg-background border-t border-dashed border-foreground transition-opacity duration-1000 ease-in-out`}>
        <a
            className={`uppercase px-24 cursor-pointer py-3 bg-blue transition-all left-1/2 absolute -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] font-syncopate ${showButton ? 'opacity-100' : 'opacity-0'
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
          <div className="w-[1200px] mx-auto mt-12 pb-20">
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