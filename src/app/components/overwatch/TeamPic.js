'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function TeamPic() {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.15,
    enabled: true,
    direction: 'right'
  });

  return (
    <div className="relative" style={{ zIndex: 1000 }} >
     <img src={getImageUrl("/about/about-team.png")} alt="Team Pic" className="w-full h-full mt-[-15px]" />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-[-35%] top-[-10px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-0 top-[-10px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-[35%] top-[-10px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-[70%] top-[-10px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
      className="absolute left-[70%] top-[40%]" 
      style={{ transform: `rotate(-25deg)`, willChange: 'transform'}} />
    </div>
  )
}

export default TeamPic;
