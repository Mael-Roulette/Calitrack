import type { Metadata } from "next";
import { Sora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const calSans = localFont( {
  src: [
    {
      path: "../../public/fonts/cal-sans/CalSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-cal-sans",
  display: 'swap',
  adjustFontFallback: 'Arial',
  preload: false
} );

const sora = Sora( {
  variable: '--font-sora',
  subsets: [ "latin" ],
  display: 'swap',
  preload: false
} );

export const metadata: Metadata = {
  metadataBase: new URL( 'https://calitrack.fr' ),
  title: {
    default: "Calitrack - L'application qui t'accompagne en calisthenics",
    template: "%s | Calitrack"
  },
  description: "Calitrack est l'application mobile qui te permet de suivre ta progression en calisthenics.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://calitrack.fr',
    siteName: 'Calitrack',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'google-site-verification': 'bK73iHcAHxBshCSS6BscrL4OZR0Lmf0wUKQ8xrZIxtw',
  },
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body
        className={ `${calSans.variable} ${sora.variable} font-sora antialiased` }
      >
        <Header />
        { children }
        <Footer />
      </body>
    </html>
  );
}
