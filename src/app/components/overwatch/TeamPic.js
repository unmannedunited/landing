'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";
import { useEffect, useState } from "react";

function TeamPic() {
  // Efectos de parallax para las imágenes de fondo
  const parallax = useAdvancedParallax({
    speed: 0.15,
    enabled: true,
    direction: 'right'
  });

  // Fuente responsive del sello para marquee
  const [stampSrc, setStampSrc] = useState(getImageUrl("/about/about-stamp.png"));

  useEffect(() => {
    const updateSrc = () => {
      const src = getImageUrl(window.innerWidth < 768 ? 
        "/about/about-stamp-m.png" : "/about/about-stamp.png");
      setStampSrc(src);
    };
    updateSrc();
    window.addEventListener('resize', updateSrc);
    return () => window.removeEventListener('resize', updateSrc);
  }, []);

  return (
    <div className="relative md:h-full h-[350px]" style={{ zIndex: 1000 }} >
     <img src={getImageUrl("/about/about-team.png")} alt="Team Pic" className="w-full h-full object-cover" />

    <div className="absolute left-0 top-[-12px] w-full overflow-hidden pointer-events-none">
      <div className="flex items-center gap-48 w-[200%] animate-marquee">
        {Array.from({ length: 10 }).map((_, i) => (
          <img key={`track-a-${i}`} src={stampSrc} alt="" className="h-8 md:h-20" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <img key={`track-b-${i}`} src={stampSrc} alt="" className="h-8 md:h-10" />
        ))}
      </div>
    </div>

     <img src={getImageUrl("/about/about-logo.png")} alt="Team Pic" 
      className="absolute md:left-[65%] md:top-[12%] md:w-max 
      w-[18%] right-[10%] top-[12%]" 
      style={{ transform: `rotate(-25deg)`, willChange: 'transform'}} />
    </div>
  )
}

export default TeamPic;
