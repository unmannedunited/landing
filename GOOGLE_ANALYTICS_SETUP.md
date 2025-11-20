# Configuración de Google Analytics

Este proyecto incluye Google Analytics para trackear eventos importantes del sitio web.

## ✅ GDPR Compliant

**Este sitio es completamente GDPR compliant**. Google Analytics solo se carga y trackea eventos cuando el usuario da su consentimiento explícito a través del banner de cookies. Si el usuario rechaza las cookies, Google Analytics NO se carga y NO se trackean eventos.

## Configuración

### 1. Obtener el ID de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad o selecciona una existente
3. Obtén tu **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2. Configurar la variable de entorno

Agrega la siguiente variable de entorno en tu archivo `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Reemplaza `G-XXXXXXXXXX` con tu Measurement ID real.

### 3. Verificar la instalación

Una vez configurado, Google Analytics se cargará automáticamente en todas las páginas del sitio.

## 🔍 Verificación en Tiempo Real (NO necesitas esperar 48 horas)

Puedes verificar que Google Analytics está funcionando **inmediatamente** usando estos métodos:

### Método 1: Consola del Navegador (Más Rápido)

1. Abre tu sitio en el navegador
2. **Acepta las cookies** (importante: GA solo se carga con consentimiento)
3. Abre las **DevTools** (F12 o clic derecho → Inspeccionar)
4. Ve a la pestaña **Console**
5. **Busca mensajes de debug** (si estás en modo desarrollo):
   - `🔍 GoogleAnalytics Debug:` - Muestra el estado del componente
   - `⚠️ NEXT_PUBLIC_GA_ID no está configurado` - Falta configurar el ID
   - `💡 Google Analytics no se carga porque:` - Razón por la que no se carga
   - `✅ Cargando Google Analytics con ID:` - Se está cargando correctamente
6. Escribe y ejecuta:

```javascript
// Verificar si gtag está cargado
typeof window.gtag

// Debería retornar: "function"

// Verificar el ID de Google Analytics
window.dataLayer

// Debería mostrar un array con datos de GA
```

**Si ves `"function"` y `dataLayer` con datos, Google Analytics está instalado correctamente.**

**Si ambos son `undefined`, revisa los mensajes de debug en la consola para ver qué está pasando.**

### Método 2: Network Tab (Ver las peticiones)

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Network**
3. Filtra por `gtag` o `analytics`
4. Recarga la página (después de aceptar cookies)
5. Deberías ver peticiones a:
   - `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
   - `https://www.google-analytics.com/g/collect?...`

**Si ves estas peticiones, Google Analytics está cargándose correctamente.**

### Método 3: Verificar en el DOM

1. Abre **DevTools** (F12)
2. Ve a la pestaña **Elements** (o **Inspeccionar**)
3. Busca en el `<head>` o `<body>`:
   - Scripts con `googletagmanager.com`
   - Scripts con `gtag`

**Si encuentras estos scripts, Google Analytics está instalado.**

### Método 4: Google Analytics en Tiempo Real (Ver eventos inmediatamente)

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad
3. Ve a **Informes** → **Tiempo real** (o **Reports** → **Realtime**)
4. Acepta las cookies en tu sitio
5. Navega por tu sitio y realiza acciones (enviar formulario, descargar PDF, etc.)
6. **Verás los eventos aparecer en tiempo real** (no necesitas esperar)

**Los eventos aparecen inmediatamente en la vista de Tiempo Real.**

### Método 5: Google Tag Assistant (Extensión de Chrome)

1. Instala la extensión [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abre tu sitio
3. Acepta las cookies
4. Haz clic en el ícono de Tag Assistant
5. Haz clic en **Enable**
6. Recarga la página
7. Verás un resumen de todas las etiquetas, incluyendo Google Analytics

### Método 6: Verificar Eventos en la Consola

1. Abre **DevTools** → **Console**
2. Acepta las cookies en tu sitio
3. Realiza una acción (envía un formulario, descarga un PDF)
4. En la consola, ejecuta:

```javascript
// Ver todos los eventos enviados
window.dataLayer

// Ver el último evento
window.dataLayer[window.dataLayer.length - 1]
```

**Verás los eventos con sus parámetros en tiempo real.**

### Método 7: Debug Mode (Modo Desarrollo)

Para ver más detalles en la consola, puedes habilitar el modo debug temporalmente. Edita `src/components/GoogleAnalytics.js` y agrega `debug_mode: true`:

```javascript
// Temporalmente, para debugging
return <GoogleAnalytics gaId={gaId} />;
```

Luego en la consola verás logs detallados de cada evento.

### ✅ Checklist de Verificación

- [ ] Acepté las cookies en el sitio
- [ ] `typeof window.gtag` retorna `"function"` en la consola
- [ ] Veo peticiones a `googletagmanager.com` en Network tab
- [ ] Veo scripts de GA en el DOM
- [ ] Los eventos aparecen en Google Analytics → Tiempo Real
- [ ] `window.dataLayer` contiene eventos cuando realizo acciones

### 🐛 Problemas Comunes

**No veo gtag en la consola:**
- ¿Aceptaste las cookies? GA solo se carga con consentimiento
- ¿Está configurado `NEXT_PUBLIC_GA_ID` en `.env.local`?
- Recarga la página después de aceptar cookies

**Los eventos no aparecen en Google Analytics:**
- Verifica que aceptaste las cookies
- Espera 1-2 minutos y revisa **Tiempo Real** (no Informes normales)
- Verifica que el ID de GA es correcto
- Revisa la consola por errores

**Veo errores en la consola:**
- Verifica que el `NEXT_PUBLIC_GA_ID` tiene el formato correcto (`G-XXXXXXXXXX`)
- Asegúrate de que no hay bloqueadores de anuncios activos

### 🚀 Script de Verificación Rápida (Mejorado)

Copia y pega este script en la consola del navegador para verificar todo de una vez:

```javascript
// Script de verificación de Google Analytics (Mejorado)
console.log('🔍 Verificando Google Analytics...\n');

// 0. Verificar variable de entorno (solo visible en build, pero podemos intentar)
console.log('0️⃣ Verificando configuración...');
console.log('   (Nota: NEXT_PUBLIC_GA_ID solo es visible en el código compilado)');
console.log('');

// 1. Verificar gtag
const hasGtag = typeof window.gtag === 'function';
console.log(hasGtag ? '✅ gtag está cargado' : '❌ gtag NO está cargado');
console.log('   Tipo:', typeof window.gtag);
if (!hasGtag) {
  console.log('   ⚠️ Esto significa que Google Analytics NO se ha cargado');
}
console.log('');

// 2. Verificar dataLayer
const hasDataLayer = Array.isArray(window.dataLayer) && window.dataLayer.length > 0;
console.log(hasDataLayer ? '✅ dataLayer tiene datos' : '❌ dataLayer vacío o no existe');
if (hasDataLayer) {
  console.log('   Eventos en dataLayer:', window.dataLayer.length);
  console.log('   Último evento:', window.dataLayer[window.dataLayer.length - 1]);
} else {
  console.log('   ⚠️ dataLayer no existe o está vacío');
}
console.log('');

// 3. Verificar consentimiento
console.log('3️⃣ Verificando consentimiento de cookies...');
try {
  const consent = localStorage.getItem('cookie-consent');
  if (consent) {
    const parsed = JSON.parse(consent);
    console.log('✅ Consentimiento encontrado:', parsed.value);
    console.log('   Expira:', new Date(parsed.expiry).toLocaleString());
    
    if (parsed.value !== 'accepted') {
      console.log('   ⚠️ PROBLEMA: El consentimiento NO es "accepted"');
      console.log('   💡 Solución: Acepta las cookies y recarga la página');
    }
  } else {
    console.log('❌ No hay consentimiento guardado');
    console.log('   💡 Solución: Acepta las cookies en el banner');
  }
} catch (e) {
  console.log('❌ Error al leer consentimiento:', e);
}
console.log('');

// 4. Verificar scripts de GA en el DOM
console.log('4️⃣ Buscando scripts de Google Analytics en el DOM...');
const gaScripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="gtag"], script[src*="google-analytics"]');
if (gaScripts.length > 0) {
  console.log(`✅ ${gaScripts.length} script(s) de GA encontrado(s)`);
  gaScripts.forEach((script, i) => {
    console.log(`   Script ${i + 1}:`, script.src || 'inline');
  });
} else {
  console.log('❌ No se encontraron scripts de GA en el DOM');
  console.log('   ⚠️ Esto confirma que Google Analytics NO se está cargando');
}
console.log('');

// 5. Verificar si el componente está en el DOM
console.log('5️⃣ Verificando si el componente React está renderizado...');
// No podemos verificar directamente el componente React, pero podemos verificar el resultado
console.log('   (El componente GoogleAnalytics se renderiza condicionalmente)');
console.log('');

// 6. Resumen y diagnóstico
console.log('📊 RESUMEN Y DIAGNÓSTICO:');
const isWorking = hasGtag && hasDataLayer;
console.log('   Estado:', isWorking ? '✅ FUNCIONANDO' : '❌ NO FUNCIONANDO');
console.log('');

if (!isWorking) {
  console.log('🔧 POSIBLES CAUSAS Y SOLUCIONES:');
  console.log('');
  
  const consent = localStorage.getItem('cookie-consent');
  const parsed = consent ? JSON.parse(consent) : null;
  
  if (!consent || parsed?.value !== 'accepted') {
    console.log('1️⃣ ❌ No has aceptado las cookies');
    console.log('   ✅ Solución: Haz clic en "Accept All" en el banner de cookies');
    console.log('   ✅ Luego recarga la página (F5)');
    console.log('');
  }
  
  if (gaScripts.length === 0) {
    console.log('2️⃣ ❌ NEXT_PUBLIC_GA_ID probablemente no está configurado');
    console.log('   ✅ Solución:');
    console.log('      a) Crea/edita el archivo .env.local en la raíz del proyecto');
    console.log('      b) Agrega: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX');
    console.log('      c) Reemplaza G-XXXXXXXXXX con tu ID real de Google Analytics');
    console.log('      d) Reinicia el servidor de desarrollo (npm run dev)');
    console.log('');
  }
  
  if (consent && parsed?.value === 'accepted' && gaScripts.length === 0) {
    console.log('3️⃣ ⚠️ Consentimiento aceptado pero scripts no cargados');
    console.log('   ✅ Esto indica que falta NEXT_PUBLIC_GA_ID');
    console.log('   ✅ Verifica que el archivo .env.local existe y tiene el ID correcto');
    console.log('');
  }
  
  console.log('💡 TIPS:');
  console.log('   - Los mensajes de debug aparecen en la consola en modo desarrollo');
  console.log('   - Busca mensajes que empiecen con 🔍, ⚠️, o ✅');
  console.log('   - Si ves "NEXT_PUBLIC_GA_ID no está configurado", ese es el problema');
}
```

**Ejecuta este script en la consola después de aceptar las cookies para ver un diagnóstico completo.**

## Eventos que se trackean

El sitio trackea los siguientes eventos automáticamente:

### 1. Envíos de Formulario (`form_submit`)
- **Cuándo**: Cuando un usuario envía exitosamente un formulario de contacto
- **Parámetros**:
  - `event_category`: "Contact"
  - `event_label`: Ubicación del formulario ("home", "about", "overwatch", "about_whatwe")
  - `value`: 1

### 2. Descargas de PDF (`download`)
- **Cuándo**: Cuando un usuario descarga un documento PDF
- **Parámetros**:
  - `event_category`: "PDF Download"
  - `event_label`: Nombre del documento descargado
  - `value`: 1

### 3. Clicks en Botones (`button_click`)
- **Cuándo**: Cuando un usuario hace click en botones importantes
- **Parámetros**:
  - `event_category`: "Engagement"
  - `event_label`: Nombre del botón ("Contact Us", "Learn More", "Download Button")
  - `location`: Ubicación donde se hizo el click
  - `value`: 1

### 4. Visualizaciones de Página (`page_view`)
- **Cuándo**: Automáticamente cuando se carga una página
- **Parámetros**: Ruta y título de la página

## Ver eventos en Google Analytics

1. Ve a tu panel de Google Analytics
2. Navega a **Eventos** en el menú lateral
3. Verás todos los eventos trackeados con sus parámetros

## Funciones de tracking disponibles

Si necesitas agregar tracking personalizado, puedes usar las siguientes funciones desde `src/lib/analytics.js`:

```javascript
import { trackEvent, trackFormSubmit, trackDownload, trackButtonClick } from '@/lib/analytics';

// Evento personalizado
trackEvent('custom_event', {
  event_category: 'Custom',
  event_label: 'Custom Label',
  value: 1
});

// Envío de formulario
trackFormSubmit('location_name');

// Descarga de archivo
trackDownload('document_name.pdf');

// Click en botón
trackButtonClick('Button Name', 'page_location');
```

## Notas importantes

- **GDPR Compliant**: Google Analytics solo se carga si el usuario acepta las cookies
- Si el usuario rechaza las cookies, Google Analytics NO se carga y NO se trackean eventos
- Google Analytics solo se carga si `NEXT_PUBLIC_GA_ID` está configurado
- Los eventos se trackean solo en el cliente (navegador) y solo con consentimiento
- Si Google Analytics no está disponible, los eventos se registran en la consola del navegador solo en modo desarrollo (y solo si hay consentimiento)

## Cumplimiento GDPR

El sistema de tracking está diseñado para cumplir con GDPR:

1. **Consentimiento explícito**: El usuario debe aceptar explícitamente las cookies
2. **Sin tracking sin consentimiento**: Si el usuario rechaza, no se carga Google Analytics
3. **Verificación en cada evento**: Cada función de tracking verifica el consentimiento antes de enviar datos
4. **Carga condicional**: El script de Google Analytics solo se carga si hay consentimiento
5. **Respeto a la decisión del usuario**: Si el usuario cambia de opinión (rechaza después de aceptar), el sistema respeta la nueva decisión

