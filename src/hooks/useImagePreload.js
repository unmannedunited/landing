import { useEffect, useState } from 'react';
import { getImageUrl } from '../lib/utils';

export function useImagePreload(imageUrls) {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;
    const loadedSet = new Set();

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedSet.add(url);
          loadedCount++;
          setLoadedImages(new Set(loadedSet));
          
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Error preloading image: ${url}`);
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = getImageUrl(url);
      });
    };

    // Preload todas las imágenes
    Promise.allSettled(imageUrls.map(preloadImage))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn('Some images failed to preload:', error);
        setIsLoading(false);
      });
  }, [imageUrls]);

  return { loadedImages, isLoading };
}

// Hook para preload de imágenes críticas del hero
export function useHeroImagePreload() {
  const criticalImages = [
    '/home/hero.png',
    '/home/hero-text.png',
    '/home/hero-text-sm.png',
    '/home/hero-logo.png'
  ];

  return useImagePreload(criticalImages);
}

