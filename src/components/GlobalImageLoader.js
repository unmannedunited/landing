'use client';

import { useState, useEffect, useRef } from 'react';

export default function GlobalImageLoader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const loadingStarted = useRef(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (loadingStarted.current) return;
    
    // Función para encontrar todas las imágenes en el DOM
    const findAllImages = () => {
      const images = [];
      const sources = new Set();
      
      // Buscar todas las etiquetas img
      const imgElements = document.querySelectorAll('img');
      imgElements.forEach(img => {
        const src = img.src || img.getAttribute('src') || img.getAttribute('data-src');
        if (src && !sources.has(src)) {
          sources.add(src);
          images.push(img);
        }
      });
      
      return images;
    };

    // Esperar a que el DOM esté listo
    const checkImages = () => {
      const images = findAllImages();
      
      if (images.length === 0) {
        // Si no hay imágenes, esperar un poco más por si se cargan dinámicamente
        setTimeout(() => {
          const retry = findAllImages();
          if (retry.length === 0) {
            setIsLoading(false);
          } else {
            setTotalImages(retry.length);
            startLoading(retry);
          }
        }, 500);
        return;
      }

      setTotalImages(images.length);
      startLoading(images);
    };

    const startLoading = (images) => {
      loadingStarted.current = true;
      let loadedCount = 0;
      const total = images.length;
      const listeners = [];

      const handleImageLoad = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
        
        if (loadedCount >= total) {
          // Pequeño delay para suavizar la transición
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        }
      };

      const handleImageError = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
        
        if (loadedCount >= total) {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
        }
      };

      // Agregar event listeners a todas las imágenes
      images.forEach(img => {
        // Si la imagen ya está cargada
        if (img.complete && img.naturalHeight !== 0) {
          handleImageLoad();
        } else {
          img.addEventListener('load', handleImageLoad, { once: true });
          img.addEventListener('error', handleImageError, { once: true });
          listeners.push({ img, load: handleImageLoad, error: handleImageError });
        }
      });

      // Timeout de seguridad: si después de 10 segundos no se han cargado todas, mostrar de todas formas
      const safetyTimeout = setTimeout(() => {
        if (loadedCount < total) {
          console.warn(`Some images didn't load within timeout. Loaded: ${loadedCount}/${total}`);
          setIsLoading(false);
        }
      }, 10000);

      cleanupRef.current = () => {
        clearTimeout(safetyTimeout);
        listeners.forEach(({ img, load, error }) => {
          img.removeEventListener('load', load);
          img.removeEventListener('error', error);
        });
      };
    };

    // Esperar a que el componente esté montado
    if (typeof window !== 'undefined') {
      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        setTimeout(checkImages, 100);
      });
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background z-[9998] flex items-center justify-center">
        <div className="text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-foreground text-lg font-semibold" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
              Loading...
            </p>
            {totalImages > 0 && (
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div 
                  className="bg-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((loadedImages / totalImages) * 100, 100)}%` }}
                ></div>
              </div>
            )}
            {totalImages > 0 && (
              <p className="text-foreground text-sm" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                {loadedImages} / {totalImages} images
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return children;
}

