/**
 * Utilidad para manejar las rutas de fuentes con basePath dinámico
 * Funciona tanto en desarrollo como en producción con GitHub Pages
 */

// Función para obtener la ruta base correcta
export function getFontPath(fontPath) {
  // En desarrollo, no hay basePath
  if (process.env.NODE_ENV === 'development') {
    return fontPath;
  }
  
  // En producción, usar el basePath configurado
  const basePath = process.env.BASE_PATH || '';
  return `${basePath}${fontPath}`;
}

// Rutas de las fuentes
export const fontPaths = {
  thabit: {
    normal: getFontPath('/fonts/thabit/Thabit.ttf'),
    bold: getFontPath('/fonts/thabit/Thabit-Bold.ttf'),
    italic: getFontPath('/fonts/thabit/Thabit-Oblique.ttf'),
    boldItalic: getFontPath('/fonts/thabit/Thabit-BoldOblique.ttf'),
  },
  coulson: {
    normal: getFontPath('/fonts/Coulson/Coulson.otf'),
    italic: getFontPath('/fonts/Coulson/Coulson Italic.otf'),
    condensed: getFontPath('/fonts/Coulson/Coulson Condensed.otf'),
    condensedItalic: getFontPath('/fonts/Coulson/Coulson Condensed Italic.otf'),
  }
};

// Función para generar CSS de fuentes dinámicamente
export function generateFontCSS() {
  return `
    /* Fuentes Thabit */
    @font-face {
      font-family: 'Thabit';
      src: url('${fontPaths.thabit.normal}') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Thabit';
      src: url('${fontPaths.thabit.bold}') format('truetype');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Thabit';
      src: url('${fontPaths.thabit.italic}') format('truetype');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'Thabit';
      src: url('${fontPaths.thabit.boldItalic}') format('truetype');
      font-weight: bold;
      font-style: italic;
      font-display: swap;
    }

    /* Fuentes Coulson */
    @font-face {
      font-family: 'Coulson';
      src: url('${fontPaths.coulson.normal}') format('opentype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Coulson';
      src: url('${fontPaths.coulson.italic}') format('opentype');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'Coulson';
      src: url('${fontPaths.coulson.condensed}') format('opentype');
      font-weight: normal;
      font-style: normal;
      font-stretch: condensed;
      font-display: swap;
    }

    @font-face {
      font-family: 'Coulson';
      src: url('${fontPaths.coulson.condensedItalic}') format('opentype');
      font-weight: normal;
      font-style: italic;
      font-stretch: condensed;
      font-display: swap;
    }
  `;
}
