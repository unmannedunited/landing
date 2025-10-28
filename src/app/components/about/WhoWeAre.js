'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function WhoWeAre({ scrollY = 0 }) {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'up'
  });

  return (
    <div className="md:max-w-[1200px] mx-[72px] md:mx-auto" 
      style={{ transform: `translate3d(0px, ${-50 + parallax.y}px, 0)`, 
      background: 'linear-gradient(132.3deg, #4C80C0 -11.44%, #174F94 63.2%)',
      boxShadow: '18px 20px 26px -7px rgba(0, 0, 0, 0.25)' }}>
        <div className="flex justify-between">
        <p className="md:px-8 px-6 text-white md:text-sm text-xs uppercase font-thabit " style={{ lineHeight: '26px' }}>UNMANNED UNITED INC.</p>
        <p className="px-8 text-white md:text-sm text-xs uppercase font-thabit  hidden md:block" style={{ lineHeight: '26px' }}># 001</p>
        </div>
      <div className="h-2 border-t border-b border-white border-dashed"></div>
      <div className="flex">
        <div className="hidden md:block w-1/5 p-8">
          <img src={getImageUrl("/about/about-logo.png")} alt="Who We Are" 
          className="w-full object-cover" />
        </div>
        <div className="md:w-4/5 w-full flex flex-col justify-center px-6 md:px-12 gap-2 items-left border-l border-white border-dashed">
          <p className="text-white text-sm md:text-[16px] font-thabit mt-8 md:mb-0 mb-2 md:mt-0 font-bold">Who We Are</p>
          <p className="text-white text-sm md:text-[16px] md:leading-[21px] leading-[17px] font-thabit md:mb-4 mb-12">We are a coalition of proven technologists, defense strategists, corporate advisors, and global operators. Our core leadership has decades of combined experience spanning autonomous systems, advanced UAS design, law enforcement, military operations, investment banking, venture scaling, and international corporate governance. Together, our team has led mission-critical programs, navigated the most complex regulatory landscapes, and successfully taken multiple ventures from startup to strategic exit.</p>
        </div>
      </div>
      <div className="h-2 border-t border-white border-dashed"></div>


    </div>
  )
}

export default WhoWeAre;