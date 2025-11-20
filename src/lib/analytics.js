/**
 * Utilidad para trackear eventos en Google Analytics
 * Solo funciona en el cliente (browser) y respeta el consentimiento de cookies (GDPR)
 */

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
 * Trackea un evento en Google Analytics
 * Solo trackea si el usuario ha dado consentimiento (GDPR compliant)
 * @param {string} eventName - Nombre del evento (ej: 'form_submit', 'download')
 * @param {object} eventParams - Parámetros adicionales del evento
 */
export function trackEvent(eventName, eventParams = {}) {
  if (!isClient) return;

  // Verificar consentimiento antes de trackear (GDPR compliant)
  if (!hasCookieConsent()) {
    // No trackear si no hay consentimiento
    return;
  }

  // Verificar si gtag está disponible
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    // Fallback: log en consola solo en desarrollo (no trackear sin consentimiento)
    if (process.env.NODE_ENV === 'development') {
      console.log('GA Event (consent required):', eventName, eventParams);
    }
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
 * Trackea la visualización de una página
 * Solo trackea si el usuario ha dado consentimiento (GDPR compliant)
 * @param {string} pagePath - Ruta de la página
 * @param {string} pageTitle - Título de la página
 */
export function trackPageView(pagePath, pageTitle) {
  if (!isClient) return;

  // Verificar consentimiento antes de trackear (GDPR compliant)
  if (!hasCookieConsent()) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
}

