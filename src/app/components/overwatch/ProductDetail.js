import { getImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
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
      <img src={getImageUrl("/product/product-bg.png")} alt="Product Detail" 
      className="w-full h-full object-cover fixed top-0 left-0 z-9 opacity-50"/>
      <div className="absolute top-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

        <div className="w-full max-w-[1200px] mx-auto">

        <div className="w-full max-w-[700px] mx-auto pt-40 pb-40 relative z-10">
            <p className="text-white text-lg font-nunito font-light">Overwatch is a Category II UAS that merges endurance, autonomy, payload flexibility, and battlefield survivability in a way that simply doesn’t exist anywhere else in the current market.</p>
            
        </div>

        <div className="pb-56 relative flex flex-col gap-48">

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

  return (
    <div className="w-full flex gap-16 relative">
      
      <img src={getImageUrl("/product/product-detail-model.png")} alt="Product Detail" 
                className="absolute right-[10%] top-[0%] w-[80%]"
                  />
        <div className="w-2/3">
            <img src={getImageUrl("/product/product-detail-title.png")} alt="Product Detail" 
                    className="relative z-10 w-full object-cover mb-16" />

            <img src={getImageUrl("/product/product-detail-camera.png")} alt="Product Detail" 
                className="mb-16" />

            <p className="text-white text-lg font-nunito font-light w-1/2">
            A20KTR 4K 20X Optical Zoom Triple Sensors Al Object Tracking Target GPS Coordinate Resolving and 3000m LRF Gimbal Camera
            </p>

        </div>
        <div className="w-1/3 flex flex-col gap-4 mt-[-32px]">
            <div 
              ref={ref1}
              className={`flex flex-col gap-2 transition-opacity duration-500 ${
                hasIntersected1 ? 'animate-flicker' : 'opacity-0'
              }`}
            >
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    4K VIDEO REC.
                </p>
                <img src={getImageUrl("/product/product-detail-1.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>

            <div 
              ref={ref2}
              className={`flex flex-col gap-2 transition-opacity duration-500 ${
                hasIntersected2 ? 'animate-flicker2' : 'opacity-0'
              }`}
            >
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    HEAT VISION
                </p>
                <img src={getImageUrl("/product/product-detail-2.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>

            <div 
              ref={ref3}
              className={`flex flex-col gap-2 transition-opacity duration-500 ${
                hasIntersected3 ? 'animate-flicker3' : 'opacity-0'
              }`}
            >
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    NIGHT VISION
                </p>
                <img src={getImageUrl("/product/product-detail-3.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>
        
        </div>

      <img src={getImageUrl("/product/product-detail-model-dodge.png")} alt="Product Detail" 
                className="absolute right-[10%] top-[0%] w-[80%] flashlight-container overflow-hidden"
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
            <div className="w-full flex gap-16 relative">
                <div className="w-2/3">
                    
                    <img src={getImageUrl("/product/product-detail-title2.png")} alt="Product Detail" 
                            className="w-full object-cover mb-16" />

                    <p className="text-white text-lg font-nunito font-light w-1/2">
                    A20KTR 4K 20X Optical Zoom Triple Sensors Al Object Tracking Target GPS Coordinate Resolving and 3000m LRF Gimbal Camera
                    </p>
        
                </div>
                <div className="w-1/3 flex flex-col gap-10">
                    <img src={getImageUrl("/home/hero-logo.png")} alt="Product Detail" 
                        className="w-2/3 mr-12 object-cover ml-auto" />
                
                </div>
                <div 
                    className="flashlight-container absolute left-[15%] top-[-7%] w-[80%] 
                    overflow-hidden opacity-10"
                >
                    <img src={getImageUrl("/product/product-detail-model2.png")} alt="Product Detail" 
                        className="w-full h-full object-cover" 
                        />
                </div>
                <div 
                    className="flashlight-container2 absolute left-[15%] top-[-7%] w-[80%] overflow-hidden"
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
            <div className="w-full flex gap-24 relative mt-32">
                <div className="w-2/3">
                    <img src={getImageUrl("/product/product-detail-title3.png")} alt="Product Detail" 
                            className="w-full object-cover mb-16" />        
                </div>
                <div className="w-1/3 flex flex-col pt-28">

                    <p className="text-white text-lg font-nunito font-light">
                    A20KTR 4K 20X Optical Zoom Triple Sensors Al Object Tracking Target GPS Coordinate Resolving and 3000m LRF Gimbal Camera
                    </p>                
                </div>
            </div>
        </div>
      
    )
  }

export default ProductDetail;