'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function WhoWeAre() {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'up'
  });

  return (
    <div className="max-w-[1200px] mx-auto" 
      style={{ transform: `translate3d(0px, ${-50 + parallax.y}px, 0)`, 
      background: 'linear-gradient(132.3deg, #4C80C0 -11.44%, #174F94 63.2%)',
      boxShadow: '18px 20px 26px -7px rgba(0, 0, 0, 0.25)' }}>
        <div className="flex justify-between">
        <p className="px-8 text-white text-sm uppercase font-thabit " style={{ lineHeight: '26px' }}>UNMANNED UNITED INC.</p>
        <p className="px-8 text-white text-sm uppercase font-thabit " style={{ lineHeight: '26px' }}># 001</p>
        </div>
      <div className="h-2 border-t border-b border-white border-dashed"></div>
      <div className="flex">
        <div className="p-8">
          <img src={getImageUrl("/about/about-logo.png")} alt="Who We Are" className="w-32 h-32 object-cover" />
        </div>
        <div className="flex-1 px-12 py-5 border-l border-white border-dashed">
          <p className="text-white text-sm font-thabit font-bold" style={{ lineHeight: '36px' }}>Who We Are</p>
          <p className="text-white text-sm font-thabit" style={{ lineHeight: '16px' }}>We are a coalition of proven technologists, defense strategists, corporate advisors, and global operators. Our core leadership has decades of combined experience spanning autonomous systems, advanced UAS design, law enforcement, military operations, investment banking, venture scaling, and international corporate governance. Together, our team has led mission-critical programs, navigated the most complex regulatory landscapes, and successfully taken multiple ventures from startup to strategic exit.</p>
        </div>
      </div>
      <div className="h-2 border-t border-white border-dashed"></div>


    </div>
  )
}

export default WhoWeAre;