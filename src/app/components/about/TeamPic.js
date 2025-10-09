'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function TeamPic() {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'right'
  });

  return (
    <div className="relative" >
     <img src={getImageUrl("/about/about-team.png")} alt="Team Pic" className="w-full h-full" />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-0 top-[-4px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-[35%] top-[-4px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-stamp.png")} alt="" className="absolute left-[70%] top-[-4px]" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
      className="absolute left-[70%] top-[40%]" 
      style={{ transform: `rotate(-25deg)`, willChange: 'transform'}} />
      <div className="absolute bottom-0 left-0 w-full h-[200px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
    </div>
  )
}

export default TeamPic;
