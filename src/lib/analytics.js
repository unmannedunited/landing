/**
 * Utilidad para trackear eventos en Google Analytics usando react-ga4
 * Solo funciona en el cliente (browser) y respeta el consentimiento de cookies (GDPR)
 */

import ReactGA from 'react-ga4';

// Verificar si estamos en el cliente
const isClient = typeof window !== 'undefined';

/**
 * Verifica si el usuario ha dado consentimiento para cookies
 * @returns {boolean} true si hay consentimiento, false en caso contrario
 */
function hasCookieConsent() {
  if (!isClient) return false;
  
  try {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) return false;
    
    const parsed = JSON.parse(savedConsent);
    const now = new Date().getTime();
    
    // Verificar que el consentimiento no haya expirado y sea 'accepted'
    if (parsed.expiry && parsed.expiry > now && parsed.value === 'accepted') {
      return true;
    }
  } catch (error) {
    // Si hay error al parsear, no hay consentimiento
    return false;
  }
  
  return false;
}

/**
 * Verifica si react-ga4 está inicializado
 * @returns {boolean} true si está inicializado, false en caso contrario
 */
function isGAInitialized() {
  if (!isClient) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [Analytics] No estamos en el cliente');
    }
    return false;
  }
  try {
    // react-ga4 expone gtag si está inicializado
    const isInitialized = typeof window.gtag === 'function';
    
    if (process.env.NODE_ENV === 'development') {
      if (!isInitialized) {
        console.warn('⚠️ [Analytics] gtag no está disponible. Verifica que GA esté inicializado.');
        console.log('   - Verifica que aceptaste las cookies');
        console.log('   - Verifica que NEXT_PUBLIC_GA_ID esté configurado');
        console.log('   - Verifica la consola para errores de inicialización');
      }
    }
    
    return isInitialized;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ [Analytics] Error al verificar inicialización:', error);
    }
    return false;
  }
}

/**
 * Trackea un evento en Google Analytics
 * Solo trackea si el usuario ha dado consentimiento (GDPR compliant)
 * @param {string} eventName - Nombre del evento (ej: 'form_submit', 'download')
 * @param {object} eventParams - Parámetros adicionales del evento
 */
export function trackEvent(eventName, eventParams = {}) {
  if (!isClient) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [Analytics] trackEvent llamado en servidor, ignorando');
    }
    return;
  }

  console.log('🔍 [Analytics] trackEvent llamado:', eventName, eventParams);

  // Verificar consentimiento antes de trackear (GDPR compliant)
  if (!hasCookieConsent()) {
    // No trackear si no hay consentimiento
    console.log('🚫 [Analytics] Evento bloqueado (sin consentimiento):', eventName, eventParams);
    return;
  }

  // Verificar si react-ga4 está inicializado
  if (!isGAInitialized()) {
    console.warn('⚠️ [Analytics] Evento NO trackeado (GA no inicializado):', eventName, eventParams);
    console.log('💡 [Analytics] Tips:');
    console.log('   1. Asegúrate de que aceptaste las cookies');
    console.log('   2. Verifica que NEXT_PUBLIC_GA_ID esté configurado');
    console.log('   3. Revisa la consola para errores de inicialización');
    return;
  }

  try {
    // Usar react-ga4 para trackear el evento
    ReactGA.event(eventName, eventParams);
    
    console.log('✅ [Analytics] Evento trackeado exitosamente:', eventName, eventParams);
    
    // Verificar que se envió correctamente
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        console.log('🔍 [Analytics] Verificando envío del evento...');
        // El evento debería estar en dataLayer
        if (window.dataLayer) {
          const lastEvent = window.dataLayer[window.dataLayer.length - 1];
          console.log('📊 [Analytics] Último evento en dataLayer:', lastEvent);
        }
      }, 500);
    }
  } catch (error) {
    console.error('❌ [Analytics] Error al trackear evento:', error);
    console.error('Stack:', error.stack);
  }
}

/**
 * Trackea el envío de un formulario de contacto
 * @param {string} formLocation - Ubicación del formulario (ej: 'home', 'about', 'overwatch')
 */
export function trackFormSubmit(formLocation) {
  trackEvent('form_submit', {
    event_category: 'Contact',
    event_label: formLocation,
    value: 1
  });
}

/**
 * Trackea la descarga de un documento PDF
 * @param {string} documentName - Nombre del documento descargado
 */
export function trackDownload(documentName) {
  trackEvent('download', {
    event_category: 'PDF Download',
    event_label: documentName,
    value: 1
  });
}

/**
 * Trackea un click en un botón importante
 * @param {string} buttonName - Nombre/identificador del botón
 * @param {string} location - Ubicación donde se hizo click
 */
export function trackButtonClick(buttonName, location = 'unknown') {
  trackEvent('button_click', {
    event_category: 'Engagement',
    event_label: buttonName,
    location: location,
    value: 1
  });
}

/**
 * Función de utilidad para verificar el estado completo de Google Analytics
 * Útil para debugging - se expone globalmente en desarrollo
 */
export function checkGAStatus() {
  if (!isClient) {
    console.log('❌ [GA Status] No estamos en el cliente');
    return {
      isClient: false,
      hasConsent: false,
      isInitialized: false,
      gaId: null
    };
  }

  const status = {
    isClient: true,
    hasConsent: hasCookieConsent(),
    isInitialized: isGAInitialized(),
    gaId: process.env.NEXT_PUBLIC_GA_ID || null,
    gtagAvailable: typeof window.gtag === 'function',
    dataLayerExists: typeof window.dataLayer !== 'undefined',
    dataLayerLength: window.dataLayer ? window.dataLayer.length : 0
  };

  console.log('📊 [GA Status] Estado actual de Google Analytics:');
  console.table(status);

  if (window.dataLayer && window.dataLayer.length > 0) {
    console.log('📋 [GA Status] Últimos 5 eventos en dataLayer:');
    const lastEvents = window.dataLayer.slice(-5);
    lastEvents.forEach((event, index) => {
      console.log(`   ${index + 1}.`, event);
    });
    
    // Mostrar eventos de forma más legible
    console.log('\n📋 [GA Status] Eventos parseados:');
    lastEvents.forEach((event, index) => {
      if (Array.isArray(event)) {
        const [command, ...args] = event;
        console.log(`   ${index + 1}. ${command}:`, args);
      } else {
        console.log(`   ${index + 1}.`, event);
      }
    });
  }

  // Verificar requests a Google Analytics en Network
  console.log('\n💡 [GA Status] Para verificar que los eventos se envían:');
  console.log('   1. Abre la pestaña Network en DevTools');
  console.log('   2. Filtra por "google-analytics" o "collect"');
  console.log('   3. Deberías ver requests a google-analytics.com/g/collect');
  console.log('   4. También puedes usar: window.checkGANetwork()');

  return status;
}

/**
 * Función para verificar requests de red a Google Analytics
 * Útil para confirmar que los eventos realmente se están enviando
 */
export function checkGANetwork() {
  if (!isClient) {
    console.log('❌ [GA Network] No estamos en el cliente');
    return;
  }

  console.log('🌐 [GA Network] Verificando requests a Google Analytics...');
  console.log('💡 Abre la pestaña Network en DevTools y filtra por "google-analytics" o "collect"');
  console.log('💡 Deberías ver requests a: https://www.google-analytics.com/g/collect');
  
  // Intentar verificar si hay scripts de GA cargados
  const gaScripts = Array.from(document.querySelectorAll('script')).filter(script => {
    return script.src && (
      script.src.includes('google-analytics.com') ||
      script.src.includes('googletagmanager.com')
    );
  });

  if (gaScripts.length > 0) {
    console.log('✅ [GA Network] Scripts de Google Analytics encontrados:');
    gaScripts.forEach((script, index) => {
      console.log(`   ${index + 1}. ${script.src}`);
    });
  } else {
    console.warn('⚠️ [GA Network] No se encontraron scripts de Google Analytics en el DOM');
    console.log('   Esto puede ser normal si react-ga4 los carga dinámicamente');
  }

  // Verificar gtag
  if (typeof window.gtag === 'function') {
    console.log('✅ [GA Network] gtag está disponible');
    
    // Intentar hacer un test ping
    try {
      console.log('🧪 [GA Network] Enviando evento de prueba...');
      window.gtag('event', 'network_test', {
        event_category: 'Debug',
        event_label: 'Network Check',
        value: 1
      });
      console.log('✅ [GA Network] Evento de prueba enviado. Revisa Network tab en 1-2 segundos.');
    } catch (error) {
      console.error('❌ [GA Network] Error al enviar evento de prueba:', error);
    }
  } else {
    console.warn('⚠️ [GA Network] gtag no está disponible');
  }
}

// Exponer funciones de debugging globalmente en desarrollo
if (isClient && process.env.NODE_ENV === 'development') {
  window.checkGAStatus = checkGAStatus;
  window.checkGANetwork = checkGANetwork;
  console.log('💡 [Analytics] Funciones de debugging disponibles:');
  console.log('   - window.checkGAStatus() - Ver estado de GA');
  console.log('   - window.checkGANetwork() - Verificar requests de red');
}

/**
 * Trackea la visualización de una página
 * Solo trackea si el usuario ha dado consentimiento (GDPR compliant)
 * @param {string} pagePath - Ruta de la página
 * @param {string} pageTitle - Título de la página
 */
export function trackPageView(pagePath, pageTitle) {
  if (!isClient) {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [Analytics] trackPageView llamado en servidor, ignorando');
    }
    return;
  }

  console.log('🔍 [Analytics] trackPageView llamado:', pagePath, pageTitle);

  // Verificar consentimiento antes de trackear (GDPR compliant)
  if (!hasCookieConsent()) {
    console.log('🚫 [Analytics] Page view bloqueado (sin consentimiento)');
    return;
  }

  if (!isGAInitialized()) {
    console.warn('⚠️ [Analytics] Page view NO trackeado (GA no inicializado)');
    return;
  }

  try {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: pagePath,
      title: pageTitle
    });
    console.log('✅ [Analytics] Page view trackeado:', pagePath);
  } catch (error) {
    console.error('❌ [Analytics] Error al trackear page view:', error);
    console.error('Stack:', error.stack);
  }
}
