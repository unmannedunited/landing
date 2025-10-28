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
    <div className="relative md:h-full h-[350px]" >
     <img src={getImageUrl("/about/about-team.png")} alt="Team Pic" className="w-full h-full object-cover" />
     <img src={getImageUrl(window.innerWidth < 768 ? "/about/about-stamp-m.png" : "/about/about-stamp.png")} alt="" className="absolute md:left-0 left-[-10%] top-[-4px] w-[250px] md:w-auto" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl(window.innerWidth < 768 ? "/about/about-stamp-m.png" : "/about/about-stamp.png")} alt="" className="hidden md:block absolute left-[35%] top-[-4px] w-[250px] md:w-auto" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl(window.innerWidth < 768 ? "/about/about-stamp-m.png" : "/about/about-stamp.png")} alt="" className="hidden md:block absolute left-[70%] top-[-4px] w-[250px] md:w-auto" style={{ transform: `translate3d(${parallax.x}px, 0px, 0)`, willChange: 'transform'}} />
     <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
      className="absolute md:left-[70%] md:top-[40%] md:w-max 
      w-[18%] right-[10%] top-[12%]" 
      style={{ transform: `rotate(-25deg)`, willChange: 'transform'}} />
      <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[200px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>
    </div>
  )
}

export default TeamPic;
