import Image from 'next/image';

export default function CustomImage({ src, alt, className, ...props }) {
  // Si estamos en GitHub Pages (con basePath), usar el assetPrefix
  const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';
  const imageSrc = isGitHubPages ? `${process.env.ASSET_PREFIX || ''}${src}` : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      unoptimized={isGitHubPages}
      {...props}
    />
  );
}
