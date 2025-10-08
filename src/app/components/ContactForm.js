"use client";

import { useState } from "react";
import { getImageUrl, getLinkUrl } from "../../lib/utils";
import { useAdvancedParallax } from "../../hooks/useParallax";
import ActionButton from "./ActionButton";

export default function ContactForm({ scrollY = 0 }) {
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
    <div id="contact-form" className="w-full relative bg-[#174F94] flex items-center md:py-40 py-20 max-h-content overflow-hidden border-t border-dashed border-white">
        <img 
          src={getImageUrl("/footer-text2.png")} 
          alt="Footer text" 
          className="md:w-[30%] w-[50%] absolute md:right-[-5%] right-[0%] bottom-[-60%] md:bottom-[-200%] z-10" 
          style={{ 
            transform: `rotateY(180deg) translate3d(0px, ${parallaxFooterRight.y}px, 0)`,
            willChange: 'transform'
          }} 
        />
      <img 
        src={getImageUrl("/footer-text.png")} 
        alt="Footer text" 
        className="w-[30%] absolute left-[-5%] top-[-20%] z-10" 
        style={{ 
          transform: `rotateY(180deg) translate3d(0px, ${parallaxFooterLeft.y}px, 0)`,
          willChange: 'transform'
        }} 
      />

      <div className="w-full max-w-[1200px] md:p-0 p-12 mx-auto flex flex-col lg:flex-row md:gap-16 gap-8 z-30">
        <div className="flex-1 text-white space-y-8">
          <div className="space-y-4 mb-12">
              <p className="text-white text-[16px] md:text-[22px] uppercase font-thabit" style={{ lineHeight: '26px' }}>Got a question?</p>
          <div className="space-y-2 mt-12">
              <p className="hidden md:block text-white text-[78px] font-coulson" style={{ lineHeight: '88px' }}>Send us a message</p>
              <p className="block md:hidden text-white text-[46px] font-coulson" style={{ lineHeight: '50px' }}>Leave a message</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
              <img src={getImageUrl("/contact-logo.png")} alt="Send us a message" className="hidden md:block h-20 w-20" />

            <div className="flex-1">
              <p className="text-lg leading-sm text-white/90" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                We&apos;re here to help you with any inquiries about our projects, services, or documentation. 
                Just leave us a note and we&apos;ll respond promptly.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 relative">
          
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                style={{ fontFamily: 'var(--font-nunito-sans)', fontSize: '16px', lineHeight: '26px' }}
                className="w-full text-foreground rounded-[1px] h-32 bg-white border placeholder:text-black/20 border-white/20 rounded-none px-4 py-3 focus:outline-none focus:border-white/60 resize-none"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email..."
                style={{ fontFamily: 'var(--font-nunito-sans)', fontSize: '16px', lineHeight: '26px' }}
                className="w-full rounded-[1px] bg-white border placeholder:text-black/20 border-white/20 rounded-none px-4 py-3 text-black placeholder-black/60 focus:outline-none focus:border-white/60"
                required
              />
            </div>

            <ActionButton text={isSubmitting ? 'SENDING...' : 'SEND'} className="w-full" disabled={isSubmitting} type="submit"  onClick={handleSubmit} className="w-full" />
            {/* <button
              type="submit"
              
              className={`mt-8 bg-blue w-full rounded-[1px] border-white border uppercase px-24 cursor-pointer py-3  transition-all  hover:bg-foreground text-white text-sm font-regular tracking-[6.5px] font-syncopate`}
  
            //   className="w-full bg-[#2a3a4a] border border-white text-white uppercase tracking-wider py-4 px-8 hover:bg-white hover:text-[#1a2332] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            > */}
              
            {/* </button> */}

            {submitStatus === 'success' && (
              <p className="font-bold text-sm  text-white text-center" style={{ fontFamily: 'var(--font-nunito-sans)', fontSize: '16px', lineHeight: '26px' }}>
                Message sent successfully! We will reply soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="font-bold text-sm text-white text-center" style={{ fontFamily: 'var(--font-nunito-sans)', fontSize: '16px', lineHeight: '26px' }}>
                Error sending message. Please try again.
              </p>
            )}
          </form>

        {/* <img src="/footer-text.svg" alt="Contact form background" className="absolute bottom-0 right-0 w-4/5" /> */}
        </div>
      </div>

    </div>
  );
}
