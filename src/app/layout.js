import { Geist, Geist_Mono, Syncopate } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Unmanned United -",
  description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions that redefine what's possible.",
  keywords: "drones, unmanned technology, autonomous systems, innovation, robotics",
  authors: [{ name: "Unmanned United" }],
  creator: "Unmanned United",
  publisher: "Unmanned United",
  robots: "index, follow",
  openGraph: {
    title: "Unmanned United - Unstoppable Innovation",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Unmanned United",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unmanned United - Unstoppable Innovation",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
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
        <link rel="canonical" href="https://unmanned-united.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
