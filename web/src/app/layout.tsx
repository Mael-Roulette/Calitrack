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

export const metadata: Metadata = {
  title: "Calitrack - L'application qui t'accompagne en calisthenics",
  description: "Calitrack est l'application mobile qui te permet de suivre ta progression en te fixant des objectifs et en créant tes propres entraînements.",
};

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
