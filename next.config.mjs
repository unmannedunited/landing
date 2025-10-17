/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';

const nextConfig = {
    // Configuración dinámica basada en el entorno
    basePath: process.env.BASE_PATH || '',
    assetPrefix: process.env.ASSET_PREFIX || '',
    
    // Configuración de imágenes
    images: {
        unoptimized: isGitHubPages,
        loader: isGitHubPages ? 'custom' : 'default',
        path: isGitHubPages ? `${process.env.ASSET_PREFIX || ''}/_next/image` : '/_next/image',
        // Configuración para optimización de imágenes
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    
    // Configuración de salida estática para GitHub Pages
    output: isGitHubPages ? 'export' : undefined,
    
    trailingSlash: isGitHubPages,
    
    // Configuración adicional para GitHub Pages
    ...(isGitHubPages && {
        distDir: 'out',
        generateBuildId: () => 'build',
    }),
    
    // Configuración de compresión y optimización
    compress: true,
    
    // Configuración de headers para cache
    async headers() {
        return [
            {
                source: '/public/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
