// Función para manejar URLs de imágenes con basePath
export function getImageUrl(src) {
  // Si la imagen ya tiene el prefijo, no lo agregues de nuevo
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // Normalizar la ruta de la imagen (asegurar que empiece con /)
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Detectar si estamos en GitHub Pages basándose en la URL actual
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
    
    // Si estamos en localhost, usar ruta normal
    if (window.location.hostname === 'localhost') {
      return normalizedSrc;
    }
    
    // Si estamos en GitHub Pages (unmannedunited.github.io), agregar /landing
    if (currentUrl.includes('unmannedunited.github.io')) {
      return `/landing${normalizedSrc}`;
    }
  }
  
  // Fallback: asumir que estamos en GitHub Pages
  return `/landing${normalizedSrc}`;
}

// Función alternativa más simple para GitHub Pages
export function getImageUrlSimple(src) {
  // Si la imagen ya tiene el prefijo, no lo agregues de nuevo
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  // Normalizar la ruta de la imagen (asegurar que empiece con /)
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Siempre agregar /landing para GitHub Pages
  return `/landing${normalizedSrc}`;
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
