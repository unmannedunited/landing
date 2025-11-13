'use client';

import { useState, useEffect } from "react";
import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

export default function HeroSection({ scrollY = 0 }) {
  
  // Hook de parallax para la imagen principal
  const parallaxTransform = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'down' 
  });


  return (
    <div className="w-full relative md:overflow-hidden">
      <div className="max-w-[1200px] w-full h-full mx-auto relative overflow-visible" style={{ zIndex: 2000 }}>
        <p className="text-white md:text-left text-center text-xs md:text-xl w-full md:w-auto md:leading-[35px] md:top-[150px] top-[-20px] uppercase font-syncopate absolute tracking-[4px]">Overwatch isn’t <br/> like other drones</p>
        <p className="text-white md:text-right text-center text-xs md:text-xl w-full md:w-auto md:leading-[35px] uppercase font-syncopate absolute right-0 md:right-[5vw] right-[0] tracking-[4px]" 
        style={{ top: window.innerWidth < 768 ? "420px" : "calc(50vw)" }}>it’s what those other <br/> drones wish they were</p>
      </div>

      <div 
        className="w-full md:h-full h-[400px]"
        style={{
          transform: `translateY(${ window.innerWidth < 768 ? 0 : -100 + parallaxTransform.y}px)`,
          willChange: 'transform'
        }}
      >
        <img 
          src={getImageUrl("/product/product-hero.png")} 
          alt="Hero" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="absolute top-0 left-0 w-full md:h-[250px] h-[100px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full md:h-[250px] h-[100px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
      <img src={getImageUrl("/about/about-logo.png")} alt="Hero" 
        className="absolute md:left-[70%] left-[10%] md:top-[45%] top-[70%] w-[20%] md:w-[12%]" 
        style={{ transform: `rotate(${- 30 + (parallaxTransform.y)*(window.innerWidth < 768 ? 0.4 : 0.2)}deg)`, willChange: 'transform' }} />

    </div>
  );
}
