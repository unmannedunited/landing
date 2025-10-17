// Función para manejar URLs de imágenes con basePath
export function getImageUrl(src) {
  // Si la imagen ya tiene el prefijo, no lo agregues de nuevo
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // Normalizar la ruta de la imagen (asegurar que empiece con /)
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Usar variables de entorno para determinar el prefijo
  const basePath = process.env.BASE_PATH || '';
  const assetPrefix = process.env.ASSET_PREFIX || '';
  
  // En desarrollo local, usar la ruta normal
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return normalizedSrc;
  }
  
  // Para GitHub Pages, usar el assetPrefix
  if (basePath || assetPrefix) {
    return `${assetPrefix}${normalizedSrc}`;
  }
  
  // Fallback para otros entornos
  return normalizedSrc;
}

// Función para manejar URLs de enlaces
export function getLinkUrl(href) {
  // Si el enlace ya tiene el prefijo, no lo agregues de nuevo
  if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) {
    return href;
  }
  
  // Si estamos en GitHub Pages (con basePath), usar el basePath
  const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';
  const basePath = process.env.BASE_PATH || '';
  
  // Asegurar que href comience con /
  const normalizedHref = href.startsWith('/') ? href : `/${href}`;
  
  return isGitHubPages ? `${basePath}${normalizedHref}` : normalizedHref;
}
