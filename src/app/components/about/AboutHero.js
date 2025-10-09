'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function AboutHero() {
  // Efectos de parallax para las imágenes de fondo
  const parallaxRight = useAdvancedParallax({
    speed: 0.3,
    enabled: true,
    direction: 'up'
  });
  const parallaxLeft = useAdvancedParallax({
    speed: 0.2,
    enabled: true,
    direction: 'up'
  });


  return (
    <div className="w-full bg-white border-b border-dashed border-foreground relative overflow-hidden transition-opacity duration-1000 ease-in-out px-12 md:px-0">
      <div className="w-full max-w-[1200px] mx-auto md:mt-48 md:mb-4 mt-0 mb-8 ">
        <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview" className="w-24 h-24 mx-auto mb-6" />
        {/* <h1 className="text-xl text-blue font-bold" style={{ fontFamily: 'var(--font-nunito-sans)' }}>Company OVERVIEW</h1> */}
      </div>
      <div className="w-full max-w-[800px] mx-auto flex md:flex-row flex-col gap-12 mt-24">
        <img src={getImageUrl("/about/about-mission.png")} alt="Unmanned United Overview" className="mx-auto" />
      </div>
      <div className="w-full max-w-[800px] mx-auto flex md:flex-row flex-col gap-12 mb-36 mt-16">
        <div className="flex-1">
          <p className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
          Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today.  
          </p>
        </div>
      </div>
      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[-20%] md:right-0 right-0 top-[-55%] w-[50%] transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text-left.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:bottom-[-40%] bottom-[-45%] left-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `translate3d(0px, ${parallaxLeft.y}px, 0)`,
          willChange: 'transform'
        }}
      />
    </div>
  )
}

export default AboutHero;