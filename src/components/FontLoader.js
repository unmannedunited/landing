'use client';

import { useEffect } from 'react';

/**
 * Componente que carga las fuentes dinámicamente
 * Asegura que las rutas funcionen tanto en desarrollo como en producción
 */
export default function FontLoader() {
  useEffect(() => {
    // Función para generar CSS de fuentes dinámicamente en el cliente
    const generateFontCSS = () => {
      const isGitHub = window.location.hostname === 'unmannedunited.github.io';
      const baseUrl = isGitHub ? 'https://unmannedunited.github.io/landing' : '';
      
      console.log('FontLoader: Detected environment:', { isGitHub, baseUrl });
      
      return `
        /* Fuentes Thabit */
        @font-face {
          font-family: 'Thabit';
          src: url('${baseUrl}/fonts/thabit/Thabit.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Thabit';
          src: url('${baseUrl}/fonts/thabit/Thabit-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Thabit';
          src: url('${baseUrl}/fonts/thabit/Thabit-Oblique.ttf') format('truetype');
          font-weight: normal;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'Thabit';
          src: url('${baseUrl}/fonts/thabit/Thabit-BoldOblique.ttf') format('truetype');
          font-weight: bold;
          font-style: italic;
          font-display: swap;
        }

        /* Fuentes Coulson */
        @font-face {
          font-family: 'Coulson';
          src: url('${baseUrl}/fonts/Coulson/Coulson.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Coulson';
          src: url('${baseUrl}/fonts/Coulson/Coulson Italic.otf') format('opentype');
          font-weight: normal;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'Coulson';
          src: url('${baseUrl}/fonts/Coulson/Coulson Condensed.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-stretch: condensed;
          font-display: swap;
        }

        @font-face {
          font-family: 'Coulson';
          src: url('${baseUrl}/fonts/Coulson/Coulson Condensed Italic.otf') format('opentype');
          font-weight: normal;
          font-style: italic;
          font-stretch: condensed;
          font-display: swap;
        }
      `;
    };

    // Crear un elemento style para inyectar las fuentes
    const styleElement = document.createElement('style');
    styleElement.textContent = generateFontCSS();
    
    // Agregar al head del documento
    document.head.appendChild(styleElement);
    
    // Cleanup: remover el elemento cuando el componente se desmonte
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return null; // Este componente no renderiza nada
}
