'use client';

import { useCookieConsent } from '../../hooks/useCookieConsent';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  // Animación de entrada
  useEffect(() => {
    if (showBanner) {
      // Pequeño delay para la animación
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [showBanner]);

  if (!showBanner) return null;

  const handleAccept = () => {
    setIsVisible(false);
    setTimeout(() => {
      acceptCookies();
    }, 300);
  };

  const handleReject = () => {
    setIsVisible(false);
    setTimeout(() => {
      rejectCookies();
    }, 300);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-dashed border-foreground shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ fontFamily: 'var(--font-nunito-sans)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-blue font-bold text-base sm:text-lg mb-2">
              Cookie Consent
            </h3>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept All", you consent to our use of cookies. You can also choose to reject non-essential cookies.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-6 py-2.5 text-sm font-semibold text-blue border-2 border-blue bg-white hover:bg-blue/5 transition-colors duration-200 rounded-sm uppercase tracking-wider"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue hover:bg-blue/90 transition-colors duration-200 rounded-sm uppercase tracking-wider shadow-md"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

