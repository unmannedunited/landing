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
      <div className="w-full max-w-[1200px] mx-auto mb-28 mt-48 md:mt-12">
        <div className="flex justify-between gap-20 relative">
          <div className="md:w-1/2 w-full relative top-[-180px] md:mb-0 mb-[-240px]"
          style={{
            transform: `translate3d(0px, ${250 + parallaxUS.y}px, 0)`,
            willChange: 'transform', zIndex: 800
          }}>
            <img src={getImageUrl("/about/about-usa.png")} alt="Everything We Build" className="md:w-full w-[65%] mx-auto object-cover" />
            <h3 className="block md:hidden mt-6 w-full pl-20 pr-14 text-palegray text-[31px] leading-[35px] tracking-[-1.5px]
            font-coulson"
              >Everything we build is sourced and crafted in the Us.</h3>
            <p className="text-lg font-light text-foreground md:pl-0 md:pr-0 md:mt-12 mt-16 pl-20 pr-14" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              From rapid prototyping to field deployment, we operate on tight cycles. Our USA-based manufacturing capability, coupled with advanced rapid iteration processes, allows us to outpace traditional defense primes by orders of magnitude in both time and cost. Our systems are field-ready, modular, and tested for real-world adversarial environments.
            </p>
          </div>

          <h3 className="hidden md:block w-1/2 text-palegray text-[60px] font-coulson"
            style={{ lineHeight: '58px' }}>Everything we build is sourced and crafted in the Us.</h3>

        </div>

        <div className="w-full mt-[-60px] bg-white relative max-h-content ease-in-out px-12 md:px-0">

          <div className="max-w-[1100px] mx-auto flex md:flex-row flex-col mb-48 gap-20">
            <div className="md:w-1/3 w-full px-8 relative">
              <div className="absolute top-[35%] left-[38%] h-24 w-20 bg-white"
              style={{
                transform: `translateY(${(window.innerWidth < 768 ? 800 + (parallaxImages.y)*2 : 320 + (parallaxImages.y)) }px)`,
                willChange: 'transform',
                zIndex: 500
              }}></div>
              <img
                src={getImageUrl("/schemes/about-1-bis.png")}
                alt="Rapid prototyping"
                className="absolute h-[80px] md:top-[39%] top-[43%] left-[50%] transform -translate-x-1/2"
              />
              <img
                src={getImageUrl("/schemes/about-1.png")}
                alt="Rapid prototyping"
                className="h-[220px] relative object-contain p-6 mx-auto"
                style={{
                  zIndex: 1000
                }}
              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Rapid prototyping
              </p>
            </div>
            <div className="md:w-1/3 w-full px-8 relative">
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
                className="absolute h-[112px] md:w-[36%] top-[18.5%] left-[50%] transform -translate-x-1/2"
              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                USA-based  /<br /> manufacturing
              </p>
            </div>
            <div className="md:w-1/3 w-full px-8 relative">
              {/* <div className="w-full h-36 border border-darkblue mb-8"></div> */}
              <img
                src={getImageUrl("/schemes/about-3.png")}
                alt="ANTI-ACCESS AREA DENIAL (A2AD)"
                className="h-[220px] object-contain p-6 mx-auto"
              />
              <img
                src={getImageUrl("/schemes/about-3-bis.png")}
                alt="ANTI-ACCESS AREA DENIAL (A2AD)"
                className="absolute h-[87px] top-[24%] md:left-[62%] left-[60.5%] transform -translate-x-1/2"
                style={{
                  transform: `translateY(${((window.innerWidth < 768 ? -500 : -400) - parallaxImages.y > 0 ? 0 : 
                    (window.innerWidth < 768 ? -500 : -400) - parallaxImages.y)}px) translateX(-40px)`,
                  willChange: 'transform'
                }}

              />
              <p className="text-xl text-darkblue uppercase font-semibold text-center mt-5" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Field-ready,<br /> modular systems
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-24 md:flex-row flex-col">
            <div className="md:w-4/5 w-full">

            <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview"
              className="block  md:hidden w-[100px] mx-auto mb-20" />

              <img src={getImageUrl(window.innerWidth < 768 ? "/about/about-vision-m.png" : "/about/about-vision.png")}
                alt="Unmanned United Overview" className="mr-auto px-12 md:px-0" />
              <p className="text-lg font-light text-foreground mt-20 md:mt-12 px-4 md:px-0" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
                Our team shares a unified vision: to close the technological gap threatening U.S. and allied national security and to empower tactical units with autonomous platforms that act as true force multipliers. We believe the next war will be won by the most adaptable systems, not the biggest ones.
              </p>

            </div>
            <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview"
              className="md:block hidden md:w-1/5 w-full p-4 mx-auto mb-6" style={{ transform: `rotate(25deg)` }} />

          </div>
        </div>

        <img
          src={getImageUrl("/textures/unmanned-text-left.png")}
          alt="Background pattern"
          className="md:w-[20%] w-[30%] absolute md:right-[-7%] right-[0%] bottom-[-85%] md:bottom-[-150%] z-10" 
          style={{
            transform: `rotateY(180deg) translate3d(0px, ${parallaxRight.y}px, 0)`,
            willChange: 'transform'
          }}
        />

        <img
          src={getImageUrl("/textures/unmanned-text-right.png")}
          alt="Background pattern"
          className="md:w-[20%] w-[30%] absolute md:left-[-7%] left-[0%] md:top-[60%] top-[32%] z-10" 
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