'use client';

import { useState, useEffect } from "react";
import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

export default function HeroSection({ }) {
  
  // Hook de parallax para la imagen principal
  const parallaxTransform = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'down' 
  });


  return (
    <div className="w-full relative overflow-hidden" style={{ zIndex: 1000 }} >
      <div className="max-w-[1200px] w-full h-full mx-auto relative overflow-visible" style={{ zIndex: 1000 }}>
        <p className="text-white text-xl uppercase font-syncopate absolute tracking-[4px]" style={{ lineHeight: '36px', top: 150 }}>Overwatch isn’t <br/> like other drones</p>
        <p className="text-white text-right text-xl uppercase font-syncopate absolute right-0 tracking-[4px]" style={{ lineHeight: '36px', top: "calc(100vh + 50px)" }}>it’s what those other <br/> drones wish they were</p>
      </div>

      <div 
        className="w-full h-full"
        style={{
          transform: `translateY(${ -200 + parallaxTransform.y}px)`,
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
        className="absolute right-[18%] top-[50%] w-[17%]" 
        style={{ transform: `rotate(${- 30 + (parallaxTransform.y)*0.2}deg)`, willChange: 'transform' }} />

    </div>
  );
}
