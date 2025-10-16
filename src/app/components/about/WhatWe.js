"use client";

import { useState } from "react";
import { getImageUrl, getLinkUrl } from "../../../lib/utils";
import { useAdvancedParallax } from "../../../hooks/useParallax";
import ActionButton from "../ActionButton";
import AimIcon from "./AimIcon";

export default function WhatWe({ }) {
  const [formData, setFormData] = useState({
    message: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Efectos de parallax para las texturas blancas del footer
  const parallaxFooterRight = useAdvancedParallax({ 
    speed: 0.25, 
    enabled: true, 
    direction: 'up-right' 
  });
  const parallaxFooterLeft = useAdvancedParallax({ 
    speed: 0.2, 
    enabled: true, 
    direction: 'up-left' 
  });
  const parallax = useAdvancedParallax({ 
    speed: 0.1, 
    enabled: true, 
    direction: 'up' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const link = getLinkUrl('/api/contact');
    
    try {
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ message: "", email: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row md:gap-16 gap-8 z-30">
        <h3 className="absolute text-white text-[113px] font-coulson" 
          style={{ lineHeight: '120px', zIndex: 1000, top: -180
           }}>What<br/>We<br/>Believe</h3>
      </div>
      <div className="w-full relative  overflow-hidden pt-20 pb-36 bg-[#174F94] max-h-content border-t border-dashed border-white" style={{ zIndex: 50 }}>
        
        <img 
          src={getImageUrl("/footer-text2.png")} 
          alt="Footer text" 
          className="md:w-[20%] w-[50%] absolute md:right-[-5%] right-[0%] bottom-[0%] md:bottom-[-100%] z-10" 
          style={{ 
            transform: `rotateY(180deg) translate3d(0px, ${parallaxFooterRight.y}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <img 
          src={getImageUrl("/footer-text.png")} 
          alt="Footer text" 
          className="w-[20%] absolute left-[-5%] top-[25%] z-10" 
          style={{ 
            transform: `rotateY(180deg) translate3d(0px, ${parallaxFooterLeft.y}px, 0)`,
            willChange: 'transform'
          }} 
        />
        <div className="w-full max-w-[1200px] mx-auto flex">
          <div className="w-[55%]">
          </div>
          <div className="w-[45%]">
            <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              We believe that speed, precision, and adaptability are no longer optional; they are survival traits for the modern battlefield. The traditional defense industrial base moves too slowly and charges too much. Our answer: modular, scalable, mission-configurable autonomous systems that can be developed, deployed, and iterated faster than our adversaries can respond.
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mt-28 mx-auto bg-transparent">
          <img src={getImageUrl("/about/about-build.png")} 
          alt="What We Build" className="w-[60%] bg-transparent" />

        </div>

        <div className="w-full max-w-[1200px] mx-auto flex mt-16 gap-20">
          <div className="w-1/2">
            <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
            Unmanned United develops and manufactures next-generation autonomous aerial, ground, and maritime systems engineered for multi-domain operations. 
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              Our platforms features:
            </p>
            <div className="flex mt-3">
              <AimIcon />
              <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              Hybrid propulsion and extended flight duration
              </p>
            </div>
            <div className="flex mt-3">
              <AimIcon />
              <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              Redundant AI-based guidance and GPS-denied navigation
              </p>
            </div>
            <div className="flex mt-3">
              <AimIcon />
              <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              EW/ELINT suites for full-spectrum dominance
              </p>
            </div>
            <div className="flex mt-3">
              <AimIcon />
              <p className="text-xl font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '30px' }}>
              Mission-adaptable payloads including ISR, Mothership/Child drone, and C-UAS modules
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    
  );
}
