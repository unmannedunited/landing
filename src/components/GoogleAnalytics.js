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
    return null;
  }

  // Solo cargar Google Analytics si el usuario ha dado su consentimiento
  // Si consent es 'rejected' o null, no cargar (GDPR compliant)
  if (!shouldLoad) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}

