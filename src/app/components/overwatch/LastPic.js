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
        <div className="absolute top-0 md:left-0 left-1/2 md:-translate-x-0 -translate-x-1/2 pr-4 flex gap-4 pt-12">
          <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
            className="w-[23%] md:w-[15%] object-contain "  
            style={{ transform: `rotate(15deg)`, willChange: 'transform'}} />
          <h2 className="md:text-[96px] text-[25px] leading-[22px] md:leading-[96px] 
          text-white uppercase font-coulson w-1/2 mt-[0px] md:mt-[-4px]" 
            >unmanned united</h2>
        </div>
      </div>
      
      
     <img src={getImageUrl("/product/product-last-pic.png")} alt="Team Pic" 
     className="w-full md:h-full h-[350px] object-cover mt-[-15px]" />
     
      <div className="absolute bottom-0 left-0 w-full md:h-[250px] h-[100px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

    </div>
  )
}

export default LastPic;
