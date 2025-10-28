"use client";

import { useAdvancedParallax } from "@/hooks/useParallax";
import { getImageUrl } from "../../lib/utils";

function Overview() {  
      // Efectos de parallax para las imágenes de fondo
  const parallaxRight = useAdvancedParallax({ 
    speed: 0.3, 
    enabled: true, 
    direction: 'up-left' 
  });
  const parallaxLeft = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'up-right' 
  });

  
    return (
        <div className="w-full bg-white border-b pt-28 md:pt-0 border-dashed border-foreground relative overflow-hidden transition-opacity duration-1000 ease-in-out px-12 md:px-0">
            <div className="w-full max-w-[1200px] mx-auto md:mt-48 md:mb-4 mt-0 mb-8 ">
                <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview" 
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6" />
            </div>
            <div className="w-full max-w-[1200px] mx-auto flex md:flex-row flex-col gap-12 md:mb-48 mb-20 mt-16">
            
                <div className="flex-1">
                    <p className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
                    Unmanned United Inc. is a U.S.-based defense robotics firm focused on rapidly developing and deploying advanced uncrewed systems for tactical and strategic applications. With U.S. manufacturing, deep ISR expertise, and combat-informed innovation, we specialize in practical autonomous solutions that reduce cost, increase adaptability, and fill urgent capability gaps the U.S. Department of Defense faces in multi-domain operations.
                    </p>
                </div>
                <div className="flex-1">
                    <p className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
                    Our team includes veterans and U.S. military leadership, including former senior executives from Apple and ICE/CBP bringing decades of defense innovation, command insight, and real-world operational relevance.    </p>
                </div>
            </div>
        <img
          src={getImageUrl("/textures/unmanned-text-right.png")}
          alt="Background pattern"
          className={`absolute md:w-[15%] md:bottom-[-60%] md:right-0 
            right-0 bottom-[-40%] w-[50%] 
            transition-opacity duration-1000 ease-in-out}`}
          style={{
            transform: `translate3d(0px, ${parallaxLeft.y}px, 0) rotateX(180deg)`,
            willChange: 'transform'
          }}
        />

        <img
          src={getImageUrl("/textures/unmanned-text-left.png")}
          alt="Background pattern"
          className={`absolute md:w-[15%] top-[-15%] md:top-[0%]
            left-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
          style={{
            transform: `translate3d(0px, ${parallaxRight.y}px, 0) rotateX(180deg)`,
            willChange: 'transform'
          }}
        />
        </div>
    )
}

export default Overview;