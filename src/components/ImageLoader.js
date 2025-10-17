'use client';

import { useState, useEffect } from 'react';

export default function ImageLoader({ children, fallback = null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    // Contar todas las imágenes en la página
    const images = document.querySelectorAll('img');
    setTotalImages(images.length);

    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      setLoadedImages(loadedCount);
      
      if (loadedCount === images.length) {
        // Pequeño delay para suavizar la transición
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    const handleImageError = () => {
      loadedCount++;
      setLoadedImages(loadedCount);
      
      if (loadedCount === images.length) {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    // Agregar event listeners a todas las imágenes
    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageError);
      }
    });

    // Cleanup
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageError);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          {fallback || (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white text-lg">Cargando...</p>
              {totalImages > 0 && (
                <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(loadedImages / totalImages) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return children;
}

