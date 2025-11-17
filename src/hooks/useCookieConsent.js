'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

/**
 * Hook para manejar el consentimiento de cookies según GDPR
 * @returns {Object} { consent, hasConsent, acceptCookies, rejectCookies, showBanner }
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar si ya existe un consentimiento guardado
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        const now = new Date().getTime();
        
        // Verificar si el consentimiento no ha expirado
        if (parsed.expiry && parsed.expiry > now) {
          setConsent(parsed.value);
          setShowBanner(false);
        } else {
          // Consentimiento expirado, mostrar banner nuevamente
          localStorage.removeItem(COOKIE_CONSENT_KEY);
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        setShowBanner(true);
      }
    } else {
      // No hay consentimiento guardado, mostrar banner
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (value) => {
    const expiry = new Date().getTime() + (COOKIE_CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    const consentData = {
      value,
      expiry,
      timestamp: new Date().getTime()
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
    setConsent(value);
    setShowBanner(false);
  };

  const acceptCookies = () => {
    saveConsent('accepted');
  };

  const rejectCookies = () => {
    saveConsent('rejected');
    // Si el usuario rechaza, eliminar datos de localStorage que no sean esenciales
    // Mantener solo el consentimiento mismo
    const downloadFormData = localStorage.getItem('downloadFormData');
    if (downloadFormData) {
      localStorage.removeItem('downloadFormData');
    }
  };

  const hasConsent = () => {
    return consent === 'accepted';
  };

  // No mostrar el banner hasta que el componente esté montado (evitar hidration mismatch)
  if (!mounted) {
    return {
      consent: null,
      hasConsent: () => false,
      acceptCookies,
      rejectCookies,
      showBanner: false
    };
  }

  return {
    consent,
    hasConsent: hasConsent,
    acceptCookies,
    rejectCookies,
    showBanner
  };
}

