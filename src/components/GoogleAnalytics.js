'use client';

import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useCookieConsent } from '../hooks/useCookieConsent';

export default function GoogleAnalyticsComponent() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const { hasConsent, consent } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Inicializar Google Analytics cuando el usuario da consentimiento
  useEffect(() => {
    if (!mounted) {
      console.log('🔍 [GA Debug] Componente aún no montado');
      return;
    }

    if (!gaId) {
      console.error('❌ [GA Debug] NEXT_PUBLIC_GA_ID no está configurado');
      console.log('💡 Agrega NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX a tu archivo .env.local');
      return;
    }

    const hasAccepted = consent === 'accepted';

    console.log('🔍 [GA Debug] Estado actual:', {
      mounted,
      hasGaId: !!gaId,
      gaId: gaId ? `${gaId.substring(0, 3)}...` : 'undefined',
      consent,
      hasAccepted,
      initialized
    });

    if (hasAccepted && !initialized) {
      try {
        console.log('🚀 [GA Debug] Inicializando react-ga4 con ID:', gaId);
        
        // Inicializar react-ga4 SIN testMode para que realmente envíe datos
        ReactGA.initialize(gaId, {
          // testMode: false - no usar testMode para que envíe datos reales
        });

        setInitialized(true);

        // Esperar a que react-ga4 cargue completamente el script
        const checkAndSendPageview = (attempts = 0) => {
          const maxAttempts = 20;
          
          if (typeof window.gtag === 'function') {
            console.log('✅ [GA Debug] gtag está disponible, enviando pageview');
            
            try {
              // Enviar página inicial - react-ga4 trackea automáticamente pero podemos forzarlo
              ReactGA.send('pageview');
              
              // También enviar con gtag directamente para asegurar
              window.gtag('config', gaId, {
                page_path: window.location.pathname + window.location.search,
                page_title: document.title
              });
              
              console.log('✅ [GA Debug] Pageview enviado:', window.location.pathname);
              
              // Enviar un evento de prueba después de un momento
              setTimeout(() => {
                try {
                  ReactGA.event('ga_initialized', {
                    event_category: 'System',
                    event_label: 'GA4 Initialization',
                    value: 1
                  });
                  console.log('✅ [GA Debug] Evento de prueba enviado');
                  
                  // Verificar dataLayer
                  if (window.dataLayer) {
                    console.log('📊 [GA Debug] dataLayer tiene', window.dataLayer.length, 'eventos');
                    const lastEvents = window.dataLayer.slice(-3);
                    console.log('📊 [GA Debug] Últimos eventos:');
                    lastEvents.forEach((event, index) => {
                      if (Array.isArray(event)) {
                        const [command, ...args] = event;
                        console.log(`   ${index + 1}. ${command}:`, args.length > 0 ? args : '(sin parámetros)');
                      } else {
                        console.log(`   ${index + 1}.`, event);
                      }
                    });
                    
                    // Verificar si hay eventos config
                    const configEvents = window.dataLayer.filter(e => 
                      Array.isArray(e) && e[0] === 'config'
                    );
                    if (configEvents.length > 0) {
                      console.log('✅ [GA Debug] Eventos de configuración encontrados:', configEvents.length);
                    }
                    
                    // Verificar eventos de tipo event
                    const eventEvents = window.dataLayer.filter(e => 
                      Array.isArray(e) && e[0] === 'event'
                    );
                    if (eventEvents.length > 0) {
                      console.log('✅ [GA Debug] Eventos de tracking encontrados:', eventEvents.length);
                    }
                  }
                } catch (error) {
                  console.error('❌ [GA Debug] Error al enviar evento de prueba:', error);
                }
              }, 1000);
            } catch (error) {
              console.error('❌ [GA Debug] Error al enviar pageview:', error);
            }
          } else if (attempts < maxAttempts) {
            // Intentar de nuevo en 200ms
            setTimeout(() => checkAndSendPageview(attempts + 1), 200);
          } else {
            console.error('❌ [GA Debug] gtag no se hizo disponible después de', maxAttempts, 'intentos');
            console.log('💡 [GA Debug] Verifica:');
            console.log('   1. Que el ID de GA sea correcto (formato G-XXXXXXXXXX)');
            console.log('   2. Que no haya bloqueadores de anuncios activos');
            console.log('   3. La consola del navegador para errores de red');
          }
        };
        
        // Comenzar a verificar después de un breve delay
        setTimeout(() => checkAndSendPageview(), 300);

        console.log('✅ [GA Debug] Google Analytics inicializado correctamente');
      } catch (error) {
        console.error('❌ [GA Debug] Error al inicializar Google Analytics:', error);
        console.error('Stack:', error.stack);
      }
    } else if (!hasAccepted) {
      console.log('💡 [GA Debug] Google Analytics no se inicializa porque:', 
        consent === null ? 'No hay consentimiento (acepta las cookies)' :
        consent === 'rejected' ? 'El usuario rechazó las cookies' :
        'Consentimiento desconocido'
      );
    }
  }, [mounted, gaId, consent, initialized]);

  // Verificar estado de gtag periódicamente en desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && initialized) {
      const interval = setInterval(() => {
        if (typeof window.gtag === 'function') {
          console.log('✅ [GA Debug] gtag verificado y funcionando');
        } else {
          console.warn('⚠️ [GA Debug] gtag aún no está disponible');
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [initialized]);

  // No renderizar nada (react-ga4 no necesita un componente visual)
  return null;
}
