'use client';

import { useState } from "react";
import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";
import TransparentButton from "../TransparentButton";

function AppScenarios() {
  // Estado para el carrusel móvil
  const [currentSlide, setCurrentSlide] = useState(0);
  // Estado para el carrusel de documentos
  const [currentDocSlide, setCurrentDocSlide] = useState(0);
  
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

  // Datos de las cards para el carrusel
  const scenarios = [
    {
      title: "EW & RF NEUTRALIZATION",
      image: "/product/product-scenarios-1.png",
      inverted: false,
      big: false,
      content: (
        <>
          <b className="font-bold">Use Case:</b> Detect and disable hostile RF activity using precision strike or suppression tools.
          <br/><br/>
          <b className="font-bold">Expanded Capability:</b> Overwatch integrates modular payloads for RF detection, triangulation, and neutralization. Its software and sensors map RF environments, identify anomalies, and trigger jamming or spoofing. It can also link with larger EW platforms via mesh networks for coordinated multi-node electronic attacks—ideal for C-UAS denial, rogue signal isolation, and small-cell neutralization in dense RF zones.
        </>
      )
    },
    {
      title: "ANTI-ACCESS AREA DENIAL",
      image: "/product/product-scenarios-2.png",
      inverted: true,
      big: true,
      content: (
        <>
          <b className="font-bold">Use Case:</b> Disrupt enemy communications and deny ISR in contested zones.
          <br/><br/>
          <b className="font-bold">Expanded Capability:</b> Overwatch carries an embedded low-power EW suite for tactical comms disruption and RF denial across 1 MHz–6 GHz. It detects and suppresses hostile telemetry, disrupts drone-swarm coordination, and blocks enemy ground-station links. Precision jamming profiles are customizable mid-mission and can perform short-range electromagnetic disruption on civilian and military bands, supporting pre-assault softening or rapid-response denial missions.
        </>
      )
    },
    {
      title: "MARITIME / BORDER ISR",
      image: "/product/product-scenarios-3.png",
      inverted: false,
      big: false,
      content: (
        <>
          <b className="font-bold">Use Case:</b> Persistent patrol and incursion detection across extended coastal or desert borders.
          <br/><br/>
          <b className="font-bold">Expanded Capability:</b> Overwatch delivers persistent low-altitude ISR with high-resolution EO/IR optics for detecting human and vehicular targets in poor visibility or at night. Its modular GPS and RTK systems provide centimeter-level geolocation accuracy, while the compact design enables launch from vehicles, vessels, or forward positions. Ideal for narcotics interdiction, infiltration detection, and smuggler route surveillance over coasts, rivers, and unregulated terrain.
        </>
      )
    },
    {
      title: "EQUIPMENT & SUPPLY DEPLOYMENT",
      image: "/product/product-scenarios-4.png",
      imagePadding: "md:pl-0 p-16",
      inverted: true,
      big: false,
      content: (
        <>
          <b className="font-bold">Use Case:</b> Persistent patrol and incursion detection across extended coastal or desert borders.
          <br/><br/>
          <b className="font-bold">Expanded Capability:</b> Overwatch delivers persistent low-altitude ISR with high-resolution EO/IR optics for detecting human and vehicular targets in poor visibility or at night. Its modular GPS and RTK systems provide centimeter-level geolocation accuracy, while the compact design enables launch from vehicles, vessels, or forward positions. Ideal for narcotics interdiction, infiltration detection, and smuggler route surveillance over coasts, rivers, and unregulated terrain.
        </>
      )
    }
  ];

  // Datos de los documentos
  const documents = [
    {
      image: "/product/product-doc-1.png",
      title: "OVERWATCH: Comparisson Overview",
      titleMobile: "OVERWATCH: <br/>Comparisson Overview"
    },
    {
      image: "/product/product-doc-2.png", 
      title: "OVERWATCH: Technical Specifications",
      titleMobile: "OVERWATCH: <br/>Technical Specifications"
    },
    {
      image: "/product/product-doc-3.png",
      title: "Warranty & Service Level Agreement",
      titleMobile: "Warranty & Service<br/> Level Agreement"
    }
  ];

  // Funciones para navegar el carrusel de scenarios
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % scenarios.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + scenarios.length) % scenarios.length);
  };

  // Funciones para navegar el carrusel de documentos
  const nextDocSlide = () => {
    setCurrentDocSlide((prev) => (prev + 1) % documents.length);
  };

  const prevDocSlide = () => {
    setCurrentDocSlide((prev) => (prev - 1 + documents.length) % documents.length);
  };


  return (
    <div className="w-full bg-white border-b border-dashed border-foreground relative 
    overflow-hidden transition-opacity duration-1000 ease-in-out"
    style={{ zIndex: 1000 }}>
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12 md:mb-36 mt-36 px-12 md:px-0">
        <h2 className="md:text-[72px] md:leading-[72px] text-[32px] leading-[32px] text-blue font-coulson w-1/2 md:mb-16" >
        APPLICATION SCENARIOS</h2>
        
        {/* Versión Desktop - Mantiene el diseño original */}
        <div className="hidden md:block">
          {scenarios.map((scenario, index) => {
            return (
            <DesktopScenarioCard 
              key={index}
              title={scenario.title} 
              image={getImageUrl(scenario.image)}
              inverted={scenario.inverted}
              big={scenario.big}>
              {scenario.content}
            </DesktopScenarioCard>
          )})}
        </div>

        {/* Versión Móvil - Carrusel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {scenarios.map((scenario, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <ScenarioCard 
                    title={scenario.title} 
                    image={scenario.image}
                    inverted={scenario.inverted}
                    big={scenario.big}
                    imagePadding={scenario.imagePadding}>
                    {scenario.content}
                  </ScenarioCard>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-[-45px] top-[150px] transform -translate-y-1/2 
            rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Anterior"
          >
            <svg className="w-12 h-12 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-[-45px] top-[150px] transform -translate-y-1/2  
            rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Siguiente"
          >
            <svg className="w-12 h-12 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto md:pb-36 pb-16">
        <img src={getImageUrl(window.innerWidth < 768 ? "/product/product-detail-title4-m.png" : "/product/product-detail-title4.png")} alt="Application Scenarios" 
        className="w-2/3 mx-auto object-cover" />
        {/* Versión Desktop - Mantiene el diseño original */}
        <div className="hidden md:flex gap-24 mb-36 md:mt-36 mt-12 relative" id="documentation">
          {documents.map((doc, index) => (
            
            <div key={index} className="w-1/3 flex flex-col justify-between">
              <img src={getImageUrl(doc.image)} alt="Application Scenarios" className="w-4/5 mx-auto object-cover" />
              <p className="text-center text-md font-bold text-blue w-3/5 mx-auto mt-3" style={{ fontFamily: 'var(--font-nunito-sans)' }} dangerouslySetInnerHTML={{ __html: doc.title }} />
              <TransparentButton text="DOWNLOAD" style={{ width: '100%' }} onClick={() => {}} />
            </div>
          ))}
        </div>

        {/* Versión Móvil - Carrusel de documentos */}
        <div className="md:hidden relative mb-16 mt-12" id="documentation">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentDocSlide * 100}%)` }}
            >
              {documents.map((doc, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col justify-between items-center h-full">
                    <img src={getImageUrl(doc.image)} alt="Application Scenarios" className="w-4/5 mx-auto object-cover" />
                    <p className="text-center text-md font-bold text-blue w-4/5 mx-auto mt-3" style={{ fontFamily: 'var(--font-nunito-sans)' }} ><div dangerouslySetInnerHTML={{ __html: doc.titleMobile }} /></p>
                    <TransparentButton text="DOWNLOAD" style={{ width: '80%' }} onClick={() => {}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botones de navegación para documentos */}
          <button
            onClick={prevDocSlide}
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 
            rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Documento anterior"
          >
            <svg className="w-12 h-12 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextDocSlide}
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2  
            rounded-full p-3 transition-all duration-200 z-10"
            aria-label="Documento siguiente"
          >
            <svg className="w-12 h-12 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        
      </div>

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[120vh] md:right-0 
          right-0 w-[50%] top-[720px] 
          transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[60vh] 
          left-0 w-[50%] top-[450px]
          transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `rotateY(180deg) translate3d(0px, ${parallaxLeft.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[300vh] md:left-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />


      <img
        src={getImageUrl("/textures/unmanned-text.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[300vh] md:right-0 w-[50%] 
          right-0
          transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `rotateY(180deg) translate3d(0px, ${parallaxLeft.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:bottom-[220vh] md:right-0 
          bottom-[1200px]
          right-0 w-[50%] transition-opacity 
          duration-1000 ease-in-out}`}
        style={{
          transform: `rotateX(180deg) translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />

    </div>
  )
}

// Componente para Desktop - mantiene la lógica original con inverted
const DesktopScenarioCard = ({ title, children, image, inverted, big }) => {
  return (
    <div className="flex gap-12 items-center mb-16">
      { inverted ? <img src={getImageUrl(image)} alt="Application Scenarios" className={`w-1/2 ${big ? "max-h-[450px]" : "max-h-[300px]"} object-contain`} /> : '' }

      <div className="flex flex-col gap-8 justify-center w-1/2">
        <h2 className="text-[50px] text-palegray font-coulson " 
          style={{ lineHeight: '50px' }}>{title}</h2>
        <p className="text-xl font-light text-blue" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
          {children}
        </p>
      </div>
      { inverted ? '' : <img src={getImageUrl(image)} alt="Application Scenarios" className={`w-1/2 ${big ? "max-h-[450px]" : "max-h-[300px]"} object-contain`} />}
    </div>
  )
}

// Componente para Móvil - diseño simplificado para el carrusel
const ScenarioCard = ({ title, children, image, inverted, big, imagePadding }) => {
  return (
    <div className="flex flex-col items-center mb-16 px-4">
      {/* Imagen */}
      <div className="w-full">
        <img 
          src={getImageUrl(image)} 
          alt="Application Scenarios" 
          className={`w-full h-[350px] object-contain ${imagePadding ? imagePadding : ''}`} 
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-6 justify-center w-full mt-[-10px]">
        <h2 className="text-[30px] text-palegray font-coulson break-words overflow-hidden" 
          style={{ lineHeight: '32px' }}>{title}</h2>
        <p className="text-lg font-light text-blue" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '28px', wordBreak: 'break-all' }}>
          {children}
        </p>
      </div>
    </div>
  )
}

export default AppScenarios;