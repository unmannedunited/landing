'use client';

import { getImageUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";
import TransparentButton from "../TransparentButton";

function AppScenarios() {
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
    <div className="w-full bg-white border-b border-dashed border-foreground relative overflow-hidden transition-opacity duration-1000 ease-in-out px-12 md:px-0"
    style={{ zIndex: 1000 }}>
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12 mb-36 mt-16">
        <h2 className="text-[72px] text-blue font-coulson w-1/2 mb-40" 
        style={{ lineHeight: '72px' }}>APPLICATION SCENARIOS</h2>
        <ScenarioCard 
          title="EW & RF NEUTRALIZATION" 
          description="Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today." 
          image={getImageUrl("/product/product-scenarios-1.png")}  /> 
        <ScenarioCard  
          title="ANTI-ACCESS AREA DENIAL" 
          description="Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today." 
          image={getImageUrl("/product/product-scenarios-2.png")} 
          inverted={true} big={true} /> 
        <ScenarioCard 
          title="MARITIME / BORDER ISR" 
          description="Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today." 
          image={getImageUrl("/product/product-scenarios-3.png")} /> 
        <ScenarioCard 
          title="EQUIPMENT & SUPPLY DEPLOYMENT" 
          description="Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today." 
          image={getImageUrl("/product/product-scenarios-4.png")} inverted={true} /> 
      </div>

      <div className="w-full max-w-[1200px] mx-auto pb-36">
        <img src={getImageUrl("/product/product-detail-title4.png")} alt="Application Scenarios" 
        className="w-2/3 mx-auto object-cover" />
        <div className="flex gap-12 mb-36 mt-16 relative">
          <div className="w-1/3 flex flex-col justify-between">
            <img src={getImageUrl("/product/product-doc-1.png")} alt="Application Scenarios" className="w-full object-cover" />
            <p className="text-center text-md font-bold text-blue w-2/5 mx-auto mt-3" style={{ fontFamily: 'var(--font-nunito-sans)' }}>OVERWATCH: Comparisson Overview</p>
            <TransparentButton text="DOWNLOAD" onClick={() => {}} />
          </div>
          <div className="w-1/3 flex flex-col justify-between">
            <img src={getImageUrl("/product/product-doc-2.png")} alt="Application Scenarios" className="w-full object-cover" />
            <p className="text-center text-md font-bold text-blue w-2/5 mx-auto mt-3" style={{ fontFamily: 'var(--font-nunito-sans)' }}>OVERWATCH: Technical Specifications</p>
            <TransparentButton text="DOWNLOAD" onClick={() => {}} />
          </div>
          <div className="w-1/3 flex flex-col justify-between">
            <img src={getImageUrl("/product/product-doc-3.png")} alt="Application Scenarios" className="w-full object-cover" />
            <p className="text-center text-md font-bold text-blue w-2/5 mx-auto mt-3" style={{ fontFamily: 'var(--font-nunito-sans)' }}>Warranty & Service Level Agreement</p>
            <TransparentButton text="DOWNLOAD" onClick={() => {}} />
          </div>
        </div>

        
      </div>

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[120vh] md:right-0 right-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:top-[60vh] left-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
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
        className={`absolute md:w-[15%] md:top-[300vh] md:right-0 w-[50%] transition-opacity duration-1000 ease-in-out}`}
        style={{
          transform: `rotateY(180deg) translate3d(0px, ${parallaxLeft.y}px, 0)`,
          willChange: 'transform'
        }}
      />

      <img
        src={getImageUrl("/textures/unmanned-text-right.png")}
        alt="Background pattern"
        className={`absolute md:w-[15%] md:bottom-[220vh] md:right-0 right-0 w-[50%] transition-opacity 
          duration-1000 ease-in-out}`}
        style={{
          transform: `rotateX(180deg) translate3d(0px, ${parallaxRight.y}px, 0)`,
          willChange: 'transform'
        }}
      />

    </div>
  )
}

const ScenarioCard = ({ title, description, image, inverted, big }) => {
  return (
    <div className="flex gap-12 items-center mb-16">
          { inverted ? <img src={getImageUrl(image)} alt="Application Scenarios" className={`w-1/2 ${big ? "max-h-[450px]" : "max-h-[300px]"} object-contain`} /> : '' }

          <div className="flex flex-col gap-8 justify-center w-1/2">
            <h2 className="text-[50px] text-palegray font-coulson " 
              style={{ lineHeight: '50px' }}>{title}</h2>
            <p className="text-xl font-light text-blue" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              {description}
            </p>
          </div>
          { inverted ? '' : <img src={getImageUrl(image)} alt="Application Scenarios" className={`w-1/2 ${big ? "max-h-[450px]" : "max-h-[300px]"} object-contain`} />}
          
        </div>
  )
}

export default AppScenarios;