'use client';

import { useEffect } from 'react';
import { generateFontCSS } from '@/lib/fonts';

/**
 * Componente que carga las fuentes dinámicamente
 * Asegura que las rutas funcionen tanto en desarrollo como en producción
 */
export default function FontLoader() {
  useEffect(() => {
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
