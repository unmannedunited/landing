// Función para manejar URLs de imágenes con basePath
export function getImageUrl(src) {
  // Si la imagen ya tiene el prefijo, no lo agregues de nuevo
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }

  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href; // URL completa
    
    // console.log('URL completa:', currentUrl);

      // Si estamos en GitHub Pages (con basePath), usar el assetPrefix
    const isGitHubPages = currentUrl?.includes('github');

    // console.log('isGitHubPages:', isGitHubPages);
    // console.log('normalizedSrc:', `/landing${src}`);
    
    return isGitHubPages && !src.includes('landing') ? `/landing${src}` : src;
  } else {
    return `/landing${src}`;
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
