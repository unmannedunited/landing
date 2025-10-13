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
    <div className="relative" >
      <div className="w-full max-w-[1200px] mx-auto relative"> 
        <div className="absolute top-0 left-0 flex gap-12 pt-24">
        <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
          className="w-[120px] object-contain" 
          style={{ transform: `rotate(15deg)`, willChange: 'transform'}} />
        <h2 className="text-[72px] text-white uppercase font-coulson w-1/2" 
          style={{ lineHeight: '72px' }}>unmanned united</h2>
      </div>
      </div>
      
      
     <img src={getImageUrl("/product/product-last-pic.png")} alt="Team Pic" className="w-full h-full mt-[-15px]" />
     
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

    </div>
  )
}

export default LastPic;
