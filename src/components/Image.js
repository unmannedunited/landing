import Image from 'next/image';

export default function CustomImage({ src, alt, className, ...props }) {
  // Si estamos en GitHub Pages (con basePath), usar el assetPrefix
  const isGitHubPages = process.env.BASE_PATH && process.env.BASE_PATH !== '';
  const imageSrc = isGitHubPages ? `${process.env.ASSET_PREFIX || ''}${src}` : src;

  // Para GitHub Pages, usar img normal ya que Next.js Image no funciona bien con export estático
  if (isGitHubPages) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
