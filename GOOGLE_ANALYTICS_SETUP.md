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

