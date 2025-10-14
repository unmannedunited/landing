'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Hook de parallax mejorado y más confiable
 */
export function useParallaxFixed({ 
  speed = 0.5, 
  enabled = true, 
  direction = 'up' 
} = {}) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    if (!enabled) return;

    // Obtener posición de scroll de manera más robusta
    const scrollY = Math.max(
      window.pageYOffset || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0
    );
    
    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up':
        y = -scrollY * speed;
        break;
      case 'down':
        y = scrollY * speed;
        break;
      case 'left':
        x = -scrollY * speed;
        break;
      case 'right':
        x = scrollY * speed;
        break;
      default:
        y = -scrollY * speed;
    }

    setTransform({ x, y });
  }, [speed, enabled, direction]);

  useEffect(() => {
    if (!enabled) return;

    // Ejecutar inmediatamente para establecer valor inicial
    handleScroll();

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, enabled]);

  return transform;
}

export default useParallaxFixed;
