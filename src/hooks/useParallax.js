'use client';

import { useEffect, useState } from 'react';

/**
 * Hook personalizado para crear efectos de parallax
 * @param {number} speed - Velocidad del parallax (0.1 = lento, 0.5 = normal, 1.0 = rápido)
 * @param {boolean} enabled - Si el parallax está habilitado
 * @returns {number} - Valor de transformación para aplicar al elemento
 */
export function useParallax(speed = 0.5, enabled = true) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffsetY(scrollY * speed);
    };

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, enabled]);

  return offsetY;
}

/**
 * Hook para parallax con diferentes velocidades para elementos
 * @param {Object} config - Configuración de parallax
 * @param {number} config.speed - Velocidad base
 * @param {boolean} config.enabled - Si está habilitado
 * @param {string} config.direction - Dirección del movimiento ('up', 'down', 'left', 'right')
 * @returns {Object} - Objeto con valores de transformación
 */
export function useAdvancedParallax({ 
  speed = 0.5, 
  enabled = true, 
  direction = 'up' 
} = {}) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Múltiples métodos para obtener scrollY para mejor compatibilidad
          const scrollY = window.pageYOffset || 
                         document.documentElement.scrollTop || 
                         document.body.scrollTop || 
                         window.scrollY || 0;
          
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
            case 'up-left':
              x = -scrollY * speed * 0.5;
              y = -scrollY * speed;
              break;
            case 'up-right':
              x = scrollY * speed * 0.5;
              y = -scrollY * speed;
              break;
            case 'down-left':
              x = -scrollY * speed * 0.5;
              y = scrollY * speed;
              break;
            case 'down-right':
              x = scrollY * speed * 0.5;
              y = scrollY * speed;
              break;
            default:
              y = -scrollY * speed;
          }

          setTransform({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Agregar listeners con mejor compatibilidad
    const options = { passive: true };
    
    window.addEventListener('scroll', handleScroll, options);
    document.addEventListener('scroll', handleScroll, options);
    
    // Para dispositivos móviles
    if ('ontouchstart' in window) {
      window.addEventListener('touchmove', handleScroll, options);
    }
    
    // Llamar una vez para establecer el valor inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if ('ontouchstart' in window) {
        window.removeEventListener('touchmove', handleScroll);
      }
    };
  }, [speed, enabled, direction]);

  return transform;
}
