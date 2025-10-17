'use client';

import { useState, useEffect } from 'react';
import { getImageUrl } from '../lib/utils';

export default function LogoLoader({ children, logoPath = "/unmanned-logo.png" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    // Contar todas las imágenes en la página
    const images = document.querySelectorAll('img');
    setTotalImages(images.length);

    if (images.length === 0) {
      // Si no hay imágenes, mostrar loading por un tiempo mínimo
      setTimeout(() => setIsLoading(false), 1200);
      return;
    }

    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      setLoadedImages(loadedCount);
      
      if (loadedCount === images.length) {
        // Delay para suavizar la transición
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    const handleImageError = () => {
      loadedCount++;
      setLoadedImages(loadedCount);
      
      if (loadedCount === images.length) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
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
        <div className="text-center space-y-8">
          {/* Logo con animación elegante */}
          <div className="relative">
          <svg className="w-32 h-32 mx-auto" width="2224" height="2317" viewBox="0 0 2224 2317" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="animate-loading3">
            <path d="M1232.74 1899.56L1624.7 1559.57V1119.51L1369.12 1155.42L1232.74 1899.56Z" fill="#B9B9B9"/>
            <path d="M599.365 1119.51V1559.57L991.17 1899.46L854.89 1155.36L599.365 1119.51Z" fill="#B9B9B9"/>
            <path d="M454.421 1371.9L551.24 1455.88V1112.7L454.421 1099.12V1371.9Z" fill="#B9B9B9"/>
            <path d="M1672.83 1451.25L1769.65 1367.26V1099.12L1672.83 1112.7V1451.25Z" fill="#B9B9B9"/>
            <path d="M1438.39 625.721L1438.5 625.613L1624.7 599.467V151.544L1244.75 0.655273L1246.8 651.543L1438.39 625.721Z" fill="#B9B9B9"/>
            <path d="M972.564 0.53125L599.358 150.881V599.451L785.557 625.597L785.665 625.705L974.613 651.149L972.564 0.53125Z" fill="#B9B9B9"/>
            <path d="M1769.66 299.449L1672.85 261.013V592.656L1769.66 579.071V299.449Z" fill="#B9B9B9"/>
            <path d="M454.429 579.085L551.248 592.67V265.231L454.429 304.207V579.085Z" fill="#B9B9B9"/>

            </g>
            <g className="animate-loading2">
            <path d="M1398.48 995.03L1376.59 1114.6L1787.48 1056.86L1902.63 924.194L1398.48 995.03Z" fill="#B9B9B9"/>
            <path d="M825.521 995.014L321.479 924.179L436.573 1056.85L847.462 1114.58L825.521 995.014Z" fill="#B9B9B9"/>
            <path d="M1320 843.45L1375.74 951.051L1949.27 870.458L2064.42 737.844L1320.91 842.264L1320 843.45Z" fill="#B9B9B9"/>
            <path d="M848.253 951.034L903.941 843.433L903.078 842.247L159.63 737.827L274.724 870.441L848.253 951.034Z" fill="#B9B9B9"/>
            <path d="M18.2722 557.552L764.146 662.35H764.2L865.062 792.969L116.223 687.741L13.7978 569.79L0.442871 554.246L18.2722 557.552Z" fill="#B9B9B9"/>
            <path d="M1459.83 662.35L2205.76 557.552L2223.31 554.77L2210.23 569.79L2107.86 687.741L1358.97 792.969L1459.83 662.35Z" fill="#B9B9B9"/>
            </g>
            <g className="animate-loading">
            <path d="M1268.46 838.738L1352.88 1001.81L1111.85 2316.47L871.154 1001.81L952.34 844.937L953.849 842.08L955.574 838.738L829.645 675.666L1033.85 703.159L1111.91 513.024L1190.18 703.159L1394.39 675.666L1268.46 838.738Z" fill="#B9B9B9"/>
            </g>
          </svg>

          </div>
        </div>
      </div>
    );
  }

  return children;
}
