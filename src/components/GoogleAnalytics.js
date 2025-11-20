'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function GoogleAnalyticsComponent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const { hasConsent, consent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Actualizar cuando cambia el consentimiento (para cargar GA si el usuario acepta después)
  useEffect(() => {
    if (mounted && gaId) {
      // Solo cargar si el consentimiento es explícitamente 'accepted'
      const hasAccepted = consent === 'accepted';
      setShouldLoad(hasAccepted);
      
      // Debug logging en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 GoogleAnalytics Debug:', {
          mounted,
          hasGaId: !!gaId,
          gaId: gaId ? `${gaId.substring(0, 3)}...` : 'undefined',
          consent,
          hasAccepted,
          shouldLoad: hasAccepted
        });
        
        if (!gaId) {
          console.warn('⚠️ NEXT_PUBLIC_GA_ID no está configurado. Agrega NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX a tu archivo .env.local');
        }
        
        if (mounted && gaId && consent !== 'accepted') {
          console.log('💡 Google Analytics no se carga porque:', 
            consent === null ? 'No hay consentimiento (acepta las cookies)' :
            consent === 'rejected' ? 'El usuario rechazó las cookies' :
            'Consentimiento desconocido'
          );
        }
      }
    } else {
      setShouldLoad(false);
    }
  }, [mounted, gaId, consent]);

  // No renderizar hasta que el componente esté montado (evitar hydration mismatch)
  if (!mounted) {
    return null;
  }

  // No cargar Google Analytics si no hay ID configurado
  if (!gaId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Google Analytics no se carga: NEXT_PUBLIC_GA_ID no está configurado');
    }
    return null;
  }

  // Solo cargar Google Analytics si el usuario ha dado su consentimiento
  // Si consent es 'rejected' o null, no cargar (GDPR compliant)
  if (!shouldLoad) {
    return null;
  }

  // Debug: confirmar que se está cargando
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Cargando Google Analytics con ID:', gaId);
  }

  return <GoogleAnalytics gaId={gaId} />;
}

