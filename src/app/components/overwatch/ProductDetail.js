import { getImageUrl } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const ProductDetail = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [flashlightPosition, setFlashlightPosition] = useState({ x: 0, y: 0 });
    const [flashlightPosition2, setFlashlightPosition2] = useState({ x: 0, y: 0 });


    // Efecto de seguimiento del mouse para el dron
    useEffect(() => {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const innerWidth = window.innerWidth || document.documentElement.clientWidth;
        const innerHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Validar que tenemos dimensiones válidas
        if (innerWidth > 0 && innerHeight > 0) {
          // Calcular posición relativa del mouse (0 a 1)
          const x = (clientX / innerWidth - 0.5) * 5; // -1 a 1
          const y = (clientY / innerHeight - 0.5) * 5; // -1 a 1
  
          setMousePosition({ y, x });
        }
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    // Efecto de linterna para la imagen
    useEffect(() => {
      const handleFlashlightMove = (e) => {
        // Obtener el elemento contenedor de la imagen
        const container = document.querySelector('.flashlight-container');
        if (container) {
          const rect = container.getBoundingClientRect();
          // Calcular posición relativa al contenedor
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setFlashlightPosition({ x, y });
        }

        const container2 = document.querySelector('.flashlight-container2');
        if (container2) {
          const rect = container2.getBoundingClientRect();
          // Calcular posición relativa al contenedor
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setFlashlightPosition2({ x, y });
        }
      };

      window.addEventListener('mousemove', handleFlashlightMove);
      
      return () => {
        window.removeEventListener('mousemove', handleFlashlightMove);
      };
    }, []);
  return (
    <div className="w-full bg-black border-black border-b relative" style={{  }}>
      {/* <div className="w-full h-full" style={{ backgroundImage: `url(${getImageUrl("/product/product-bg.png")})`, backgroundSize: 'contain', backgroundAttachment: 'fixed', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}></div> */}
      <img src={getImageUrl(window.innerWidth < 768 ? "/product/product-bg-m.png" : "/product/product-bg.png")} alt="Product Detail" 
      className="w-full h-full object-cover fixed top-0 left-0 z-9 md:opacity-50 opacity-100"/>
      <div className="absolute top-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

        <div className="w-full max-w-[1200px] mx-auto">

        <div className="md:w-full w-fit max-w-[700px] md:mx-auto mx-16 pt-40 pb-40 relative z-10">
            <p className="text-white text-lg font-nunito font-light">Overwatch is a Category II UAS that merges endurance, autonomy, payload flexibility, and battlefield survivability in a way that simply doesn’t exist anywhere else in the current market.</p>
            
        </div>

        <div className="md:pb-56 pb-20 relative flex flex-col md:gap-48 gap-16">

            <FirstSection mousePosition={mousePosition} flashlightPosition={flashlightPosition} />

            <SecondSection mousePosition={mousePosition} flashlightPosition={flashlightPosition2} />

        </div>


        </div>
    </div>
  )
}

const FirstSection = ({mousePosition, flashlightPosition}) => {
  // Hooks para detectar cuando cada elemento entra en pantalla
  const [ref1, isIntersecting1, hasIntersected1] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const [ref2, isIntersecting2, hasIntersected2] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const [ref3, isIntersecting3, hasIntersected3] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  // Refs para los videos
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  // Control de reproducción según visibilidad
  useEffect(() => {
    const el = videoRef1.current;
    if (!el) return;
    if (isIntersecting1) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isIntersecting1]);

  useEffect(() => {
    const el = videoRef2.current;
    if (!el) return;
    if (isIntersecting2) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isIntersecting2]);

  useEffect(() => {
    const el = videoRef3.current;
    if (!el) return;
    if (isIntersecting3) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isIntersecting3]);

  return (
    <div className="w-full flex gap-16 relative md:flex-row flex-col">
      
      <img src={getImageUrl("/product/product-detail-model.png")} alt="Product Detail" 
                className="absolute right-0 top-[100px] w-[100%] 
                md:right-[10%] md:top-[0%] md:w-[80%] opacity-60"
                  />
        <div className="md:w-2/3 w-full md:pl-0 md:pr-0 pl-16 pr-10">
            <img src={getImageUrl(window.innerWidth < 768 ? "/product/product-detail-title-m.png" : "/product/product-detail-title.png")} alt="Product Detail" 
              className="relative z-10 md:w-full mt-0 md:mt-0 w-fit object-contain md:mb-16 mb-48  md:pr-0 pr-6" />

              <div className="md:block hidden flex gap-8 align-middle justify-center">
                <img src={getImageUrl("/product/product-detail-camera.png")} alt="Product Detail" 
                className="md:mb-8 w-1/3 object-contain" />

                <p className="text-white text-[15px] md:text-lg font-nunito font-light md:w-1/2 w-2/3">
                  4K 20X Optical Zoom Triple Sensors Al Object Tracking Target GPS Coordinate Resolving and 3000m LRF Gimbal Camera
                </p>

              </div>


              <div className="md:hidden block flex gap-4 align-middle justify-center">
                <p className="text-white text-[15px] md:text-lg font-nunito font-light md:w-1/2 w-2/3">
                  4K 20X Optical Zoom Triple Sensors Al Object Tracking Target GPS Coordinate Resolving and 3000m LRF Gimbal Camera
                </p>
  
                <img src={getImageUrl("/product/product-detail-camera.png")} alt="Product Detail" 
                className="md:mb-8 w-1/3 object-contain" />


              </div>


        </div>
        <div className="md:w-1/3 w-full md:px-0 pl-20 pr-24 flex flex-col gap-4 mt-[-32px]">
            <div 
              ref={ref1}
              className={`flex flex-col gap-2 pt-3 transition-opacity duration-500 ${
                hasIntersected1 ? 'animate-flicker' : 'opacity-0'
              }`}
            >
                <video
                  ref={videoRef1}
                  src={getImageUrl("/product/video001_sm.mp4")}
                  className="w-full object-cover"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
            </div>

            <div 
              ref={ref2}
              className={`flex flex-col gap-2 transition-opacity duration-500 ${
                hasIntersected2 ? 'animate-flicker2' : 'opacity-0'
              }`}
            >
                <video
                  ref={videoRef2}
                  src={getImageUrl("/product/video002_sm.mp4")}
                  className="w-full object-cover"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
            </div>

            <div 
              ref={ref3}
              className={`flex flex-col gap-2 transition-opacity duration-500 ${
                hasIntersected3 ? 'animate-flicker3' : 'opacity-0'
              }`}
            >
                <video
                  ref={videoRef3}
                  src={getImageUrl("/product/video003_sm.mp4")}
                  className="w-full object-cover"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
            </div>
        
        </div>

      <img src={getImageUrl("/product/product-detail-model-dodge.png")} alt="Product Detail" 
                className="absolute right-0 top-[100px] w-[100%] 
                md:right-[10%] md:top-[0%] md:w-[80%] flashlight-container overflow-hidden"
                    style={{
                        maskImage: `radial-gradient(circle 300px at ${flashlightPosition.x}px ${flashlightPosition.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 300px at ${flashlightPosition.x}px ${flashlightPosition.y}px, black 0%, transparent 100%)`,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        zIndex: 1000,
                        transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out'
                    }}
                  />
    </div>
  )
}


const SecondSection = ({mousePosition, flashlightPosition}) => {
    return (
        <div>
            <div className="w-full flex gap-16 relative md:flex-row flex-col">
                <div className="md:w-3/5 w-full md:px-0 px-12">
                    
                    <img src={getImageUrl(window.innerWidth < 768 ? "/product/product-detail-title2-m.png" : "/product/product-detail-title2.png")} alt="Product Detail" 
                            className="w-full object-cover mb-16" />

                    <p className="text-white text-lg font-nunito font-light w-4/5 md:w-1/2">
                    Resilient connectivity in remote areas and harsh environments, extreme weather, high-vibration settings, and in-motion usage
                    </p>
        
                </div>
                <div className="w-1/3 flex flex-col gap-10">
                    <img src={getImageUrl("/home/hero-logo.png")} alt="Product Detail" 
                        className="md:w-2/3 w-full ml-8 md:ml-0 mt-[-30px] md:mt-0 object-cover ml-auto" />
                
                </div>
                <div 
                    className="flashlight-container absolute md:left-[15%] left-0 md:top-[-7%] top-[50%] md:w-[80%] w-full 
                    overflow-hidden opacity-60 md:opacity-60"
                >
                    <img src={getImageUrl("/product/product-detail-model2.png")} alt="Product Detail" 
                        className="w-full h-full object-cover" 
                        />
                </div>
                <div 
                    className="flashlight-container2 absolute md:left-[15%] left-0 md:top-[-7%] top-[50%] md:w-[80%] w-full  overflow-hidden"
                    style={{
                        maskImage: `radial-gradient(circle 300px at ${flashlightPosition.x}px ${flashlightPosition.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 300px at ${flashlightPosition.x}px ${flashlightPosition.y}px, black 0%, transparent 100%)`,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out'
                    }}
                >
                    <img src={getImageUrl("/product/product-detail-model2-dodge.png")} alt="Product Detail" 
                        className="w-full h-full object-cover" 
                        />
                </div>
                

            </div>
            <div className="w-full flex md:gap-24 gap-12 relative md:mt-32 mt-16 md:flex-row flex-col">
                <div className="md:w-3/5 w-1/2 md:mx-0  md:pr-20 ml-auto mr-12">
                    <img src={getImageUrl(window.innerWidth < 768 ? "/product/product-detail-title3-m.png" : "/product/product-detail-title3.png")} alt="Product Detail" 
                            className="w-full object-cover md:mb-16" />        
                </div>
            </div>
        </div>
      
    )
  }

export default ProductDetail;