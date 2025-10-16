'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function LastPic() {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'right'
  });

  return (
    <div className="relative" style={{ zIndex: 1000 }}>
      <div className="w-full max-w-[1200px] mx-auto relative"> 
        <div className="absolute top-0 left-0 flex gap-6 pt-24">
          <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
            className="w-[15%] object-contain" 
            style={{ transform: `rotate(15deg)`, willChange: 'transform'}} />
          <h2 className="text-[96px] text-white uppercase font-coulson w-1/2 mt-[-4px]" 
            style={{ lineHeight: '88px' }}>unmanned united</h2>
        </div>
      </div>
      
      
     <img src={getImageUrl("/product/product-last-pic.png")} alt="Team Pic" className="w-full h-full mt-[-15px]" />
     
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

    </div>
  )
}

export default LastPic;
