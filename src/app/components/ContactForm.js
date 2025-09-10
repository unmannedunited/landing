"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    message: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

    try {
      const response = await fetch('/api/contact', {
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
    <div id="contact-form" className="w-full relative bg-[#174F94] flex items-center py-40">
        <img src="/footer-text2.png" alt="Footer text" className="w-[30%] absolute right-[-10%] bottom-0 z-10 " style={{ transform: 'rotateY(180deg)' }} />
      <img src="/footer-text.png" alt="Footer text" className="w-[30%] absolute left-[-5%] top-0 z-10 " style={{ transform: 'rotateY(180deg)' }} />

      <div className="w-full max-w-6xl mx-auto px-8 flex flex-col lg:flex-row gap-16">
        <div className="flex-1 text-white space-y-8">
          <div className="space-y-4 mb-12">
          <img src="/contact-question.png" alt="Send us a message" className="h-3" />
          <div className="space-y-2 mt-12">
                <img src="/contact-message.png" alt="Send us a message" className="" />
            </div>
          </div>

          <div className="flex items-center gap-6">
              <img src="/contact-logo.png" alt="Send us a message" className="h-20 w-20" />

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
                className="w-full rounded-[1px] h-32 bg-white border placeholder:text-black/20 border-white/20 rounded-none px-4 py-3 focus:outline-none focus:border-white/60 resize-none"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 w-full rounded-[1px] border-white border uppercase px-24 cursor-pointer py-3 bg-transparent transition-all  hover:bg-foreground text-white text-sm font-regular tracking-[6.5px] font-syncopate`}
  
            //   className="w-full bg-[#2a3a4a] border border-white text-white uppercase tracking-wider py-4 px-8 hover:bg-white hover:text-[#1a2332] transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </button>

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
