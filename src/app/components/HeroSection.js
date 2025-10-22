'use client';

import { getImageUrl, getImageUrlSimple } from "../../lib/utils";
import { useAdvancedParallax } from "../../hooks/useParallax";

export default function HeroSection({ scrollY = 0 }) {
  
  // Hook de parallax para la imagen principal
  const parallaxTransform = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'down' 
  });

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
          src={getImageUrl(`/home/hero${window.innerWidth < 768 ? '-mobile' : ''}.png`)} 
          alt="Hero" 
          className="w-full md:h-full h-[450px] object-cover"
          style={{ objectPosition: '10% center' }}
        />
      </div>
      <div className="absolute top-0 left-0 w-full md:h-[200px] h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full md:h-[200px] h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
      <img src={getImageUrl("/home/hero-text.png")} alt="Hero" 
        className="absolute right-[10%] md:top-[35%] top-[10%] md:w-[40%] w-[80%]" />
      <img src={getImageUrl("/home/hero-text-sm.png")} alt="Hero" 
        className="absolute md:right-[30%] right-[10%] md:top-[60%] top-[72%] md:w-[15%] w-[45%]" />
      <img src={getImageUrl("/home/hero-logo.png")} alt="Hero" 
        className="absolute md:right-[14%] right-[60%] md:top-[45%] top-[60%] md:w-[10%] w-[35%]" />

    </div>
  );
}
