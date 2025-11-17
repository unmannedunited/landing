/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';

const nextConfig = {
    // Configuración dinámica basada en el entorno
    // basePath: process.env.BASE_PATH || '',
    // assetPrefix: process.env.ASSET_PREFIX || '',
    
    // Configuración de imágenes
    images: {
        unoptimized: isGitHubPages,
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000, // 1 año de cache
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    
    // Configuración de salida estática para GitHub Pages
    // output: isGitHubPages ? 'export' : undefined,
    
    // trailingSlash: isGitHubPages,
    
    // Configuración adicional para GitHub Pages
    // ...(isGitHubPages && {
    //     distDir: 'out',
    //     generateBuildId: () => 'build',
    // }),
    
    // Configuración de compresión y optimización
    compress: true,
    
    // Configuración de headers para cache
    async headers() {
        return [
            {
                source: '/:path*\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
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
