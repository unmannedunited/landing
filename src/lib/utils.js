// Función para manejar URLs de imágenes con basePath
export function getImageUrl(src) {
  // Si la imagen ya tiene el prefijo, no lo agregues de nuevo
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }


  // Asegurar que src comience con /
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;

  // Obtener información de la URL actual (solo en el cliente)
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href; // URL completa
    const currentPath = window.location.pathname; // Solo la ruta
    const currentOrigin = window.location.origin; // Solo el dominio
    
    console.log('URL completa:', currentUrl);
    console.log('Ruta actual:', currentPath);
    console.log('Origen:', currentOrigin);


      // Si estamos en GitHub Pages (con basePath), usar el assetPrefix
    const isGitHubPages = currentUrl?.includes('github');
    const assetPrefix = process.env.ASSET_PREFIX || '';
    
    return isGitHubPages ? `${assetPrefix}${normalizedSrc}` : normalizedSrc;
  } else {
    return normalizedSrc;
  }
  

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
