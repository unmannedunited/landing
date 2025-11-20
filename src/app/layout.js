import { Geist, Geist_Mono, Syncopate, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { getImageUrl } from "../lib/utils";
import FontLoader from "../components/FontLoader";
import CookieBanner from "./components/CookieBanner";
import LogoLoader from "../components/LogoLoader";
import GoogleAnalytics from "../components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


// Función para generar URLs absolutas para metadatos
function getAbsoluteUrl(path) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://new.unmannedunited.com' 
    : 'https://new.unmannedunited.com';
  const basePath = process.env.BASE_PATH || '';
  return `${baseUrl}${basePath}${path}`;
}

export const metadata = {
  title: "Unmanned United",
  description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions that redefine what's possible.",
  keywords: "drones, unmanned technology, autonomous systems, innovation, robotics",
  authors: [{ name: "Unmanned United" }],
  creator: "Unmanned United",
  publisher: "Unmanned United",
  robots: "index, follow",
  openGraph: {
    title: "Unmanned United",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Unmanned United",
    url: getAbsoluteUrl(""),
    images: [
      {
        url: getAbsoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Unmanned United - Leading the future of unmanned technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unmanned United - Unmanned, United, Unstoppable",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
    images: [getAbsoluteUrl("/og-image.png")],
  },
  icons: {
    icon: [
      { url: getImageUrl("/favicon.ico"), sizes: "any" },
      { url: getImageUrl("/favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { url: getImageUrl("/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    ],
    shortcut: getImageUrl("/favicon.ico"),
    apple: getImageUrl("/favicon-32x32.png"),
  },
  manifest: getImageUrl("/site.webmanifest"),
  alternates: {
    canonical: getAbsoluteUrl(""),
  },
};

export const viewport = {
  themeColor: "#174F94",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#174F94" />
        <meta name="msapplication-TileColor" content="#174F94" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Unmanned United" />
        <link rel="canonical" href="https://unmannedunited.com" />
        <link rel="preload" as="image" href="/landing/home/hero.png" />
        <link rel="preload" as="image" href="/landing/home/hero-mobile.png" />
        <link rel="preload" as="image" href="/landing/home/hero-text.png" />
        <link rel="preload" as="image" href="/landing/home/hero-text-sm.png" />
        <link rel="preload" as="image" href="/landing/home/hero-logo.png" />
        <link rel="preload" as="image" href="/landing/unmanned-logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} ${nunitoSans.variable} antialiased`}
      >
        <LogoLoader>
          <FontLoader />
          {children}
          <CookieBanner />
          <GoogleAnalytics />
        </LogoLoader>
      </body>
    </html>
  );
}
