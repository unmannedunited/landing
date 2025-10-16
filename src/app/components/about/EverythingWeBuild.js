'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";

function EverythingWeBuild() {
  // Efectos de parallax para las imágenes de fondo
  const parallaxRight = useAdvancedParallax({
    speed: 0.3,
    enabled: true,
    direction: 'up'
  });
  const parallaxUS = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'up'
  });

  const parallaxImages = useAdvancedParallax({
    speed: 0.1,
    enabled: true,
    direction: 'up'
  });

  return (
    <div className="relative">
      <div className="w-full max-w-[1200px] mx-auto mb-28 mt-12">
        <div className="flex justify-between gap-12 relative">
          <div className="w-1/2 p-12 relative top-[-180px]"
          style={{
            transform: `translate3d(0px, ${250 + parallaxUS.y}px, 0)`,
            willChange: 'transform', zIndex: 800
          }}>
            <img src={getImageUrl("/about/about-usa.png")} alt="Everything We Build" className="w-full object-cover" />
            <p className="text-lg font-light text-foreground mt-12" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              From rapid prototyping to field deployment, we operate on tight cycles. Our USA-based manufacturing capability, coupled with advanced rapid iteration processes, allows us to outpace traditional defense primes by orders of magnitude in both time and cost. Our systems are field-ready, modular, and tested for real-world adversarial environments.
            </p>
          </div>

          <h3 className="w-1/2 text-palegray text-[60px] font-coulson"
            style={{ lineHeight: '58px' }}>Everything we build is sourced and crafted in the Us.</h3>

        </div>

        <div className="w-full mt-[-150px] bg-white relative max-h-content ease-in-out px-12 md:px-0">

          <div className="max-w-[1100px] mx-auto flex mb-48 gap-20">
            <div className="w-1/3 px-8 relative">
              {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
              <img
                src={getImageUrl("/schemes/about-1.png")}
                alt="Tactical ISR"
                className="h-[220px] object-contain p-6 mx-auto"
              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Rapid prototyping
              </p>
            </div>
            <div className="w-1/3 px-8 relative">
              {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
              <img
                src={getImageUrl("/schemes/about-2.png")}
                alt="MARITIME / BORDER ISR"
                className="h-[220px] object-contain p-6 mx-auto"
                style={{
                  transform: `rotate(${45 - parallaxImages.y}deg)`,
                  willChange: 'transform'
                }}
              />
              <img
                src={getImageUrl("/schemes/about-2-bis.png")}
                alt="MARITIME / BORDER ISR"
                className="absolute w-[36%] top-[18.5%] left-[50%] transform -translate-x-1/2"
              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                USA-based  /<br /> manufacturing
              </p>
            </div>
            <div className="w-1/3 px-8 relative">
              {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
              <img
                src={getImageUrl("/schemes/about-3.png")}
                alt="ANTI-ACCESS AREA DENIAL (A2AD)"
                className="h-[220px] object-contain p-6 mx-auto"
              />
              <img
                src={getImageUrl("/schemes/about-3-bis.png")}
                alt="ANTI-ACCESS AREA DENIAL (A2AD)"
                className="absolute w-[24.5%] top-[24.5%] left-[62%] transform -translate-x-1/2"
                style={{
                  transform: `translateY(${(-400 - parallaxImages.y > 0 ? 0 : -400 - parallaxImages.y)}px) translateX(-40px)`,
                  willChange: 'transform'
                }}

              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Field-ready,<br /> modular systems
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-24">
            <div className="w-4/5">
              <img src={getImageUrl("/about/about-vision.png")}
                alt="Unmanned United Overview" className="mr-auto" />
              <p className="text-lg font-light text-foreground mt-12" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
                Our team shares a unified vision: to close the technological gap threatening U.S. and allied national security and to empower tactical units with autonomous platforms that act as true force multipliers. We believe the next war will be won by the most adaptable systems, not the biggest ones.
              </p>

            </div>
            <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview"
              className="w-1/5 p-4 mx-auto mb-6" style={{ transform: `rotate(25deg)` }} />

          </div>
        </div>

        <img
          src={getImageUrl("/textures/unmanned-text-left.png")}
          alt="Background pattern"
          className="md:w-[30%] w-[50%] absolute md:right-[-7%] right-[0%] bottom-[-180%] z-10" 
          style={{
            transform: `rotateY(180deg) translate3d(0px, ${parallaxRight.y}px, 0)`,
            willChange: 'transform'
          }}
        />

        <img
          src={getImageUrl("/textures/unmanned-text-right.png")}
          alt="Background pattern"
          className="w-[30%] absolute left-[-7%] top-[20%] z-10" 
          style={{
            transform: `rotateY(180deg) translate3d(0px, ${parallaxRight.y}px, 0)`,
            willChange: 'transform'
          }}
        />
      </div>

    </div>

  )
}

export default EverythingWeBuild;