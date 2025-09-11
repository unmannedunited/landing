/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración dinámica basada en el entorno
    basePath: process.env.BASE_PATH || '',
    assetPrefix: process.env.ASSET_PREFIX || '',
    
    // Configuración de imágenes
    images: {
        unoptimized: process.env.NODE_ENV === 'production' && process.env.BASE_PATH,
    },
    
    // Configuración de salida estática para GitHub Pages
    output: process.env.BASE_PATH ? 'export' : undefined,
    
    trailingSlash: !!process.env.BASE_PATH,
};

export default nextConfig;
