import { Geist, Geist_Mono, Syncopate, Nunito_Sans } from "next/font/google";
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

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata = {
  title: "Unmanned United",
  description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions that redefine what's possible.",
  keywords: "drones, unmanned technology, autonomous systems, innovation, robotics",
  authors: [{ name: "Unmanned United" }],
  creator: "Unmanned United",
  publisher: "Unmanned United",
  robots: "index, follow",
  openGraph: {
    title: "Unmanned United - Unmanned, United, Unstoppable",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Unmanned United",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unmanned United - Unmanned, United, Unstoppable",
    description: "Leading the future of unmanned technology. Discover cutting-edge drones and autonomous solutions.",
  },
  icons: {
    icon: [
      { url: "/unmanned/favicon.ico", sizes: "any" },
      { url: "/unmanned/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/unmanned/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/unmanned/favicon.ico",
    apple: "/unmanned/favicon-32x32.png",
  },
  manifest: "/unmanned/site.webmanifest",
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
        className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
