'use client';

import { useEffect, useState } from 'react';

/**
 * Hook simple de parallax que funciona mejor en mobile
 */
export function useSimpleParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setOffsetY(scrollY * speed);
    };

    // Agregar listener inmediatamente
    handleScroll(); // Llamar una vez para establecer valor inicial
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return offsetY;
}

