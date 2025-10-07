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
} );

const sora = Sora( {
  variable: '--font-sora',
  subsets: [ "latin" ],
} );

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="fr">
      <body
        className={ `${calSans.variable} ${sora.variable} antialiased` }
      >
        <Header />
        { children }
        <Footer />
      </body>
    </html>
  );
}
