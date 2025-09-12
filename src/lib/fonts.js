/**
 * Utilidad para manejar las rutas de fuentes con basePath dinámico
 * Funciona tanto en desarrollo como en producción con GitHub Pages
 */

// Función para detectar si estamos en GitHub Pages
function isGitHubPages() {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'unmannedunited.github.io';
}

// Función para obtener la ruta base correcta
export function getFontPath(fontPath) {
  if (typeof window === 'undefined') {
    // En el servidor, usar las variables de entorno
    const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';
    const assetPrefix = process.env.ASSET_PREFIX || '';
    const basePath = process.env.BASE_PATH || '';
    
    if (isGitHubPages) {
      return `${assetPrefix}${basePath}${fontPath}`;
    }
    return fontPath;
  }
  
  // En el cliente, detectar dinámicamente
  const isGitHub = isGitHubPages();
  
  if (isGitHub) {
    // Para GitHub Pages: https://unmannedunited.github.io/landing/
    const fullPath = `https://unmannedunited.github.io/landing${fontPath}`;
    console.log('Generated font path for GitHub Pages:', fullPath);
    return fullPath;
  }
  
  // Para desarrollo local
  return fontPath;
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
