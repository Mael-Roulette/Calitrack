import { Cal_Sans, Sora } from "next/font/google";
import "./globals.css";

const calSans = Cal_Sans( {
  weight: '400',
  variable: '--font-cal-sans',
  subsets: [ 'latin' ],
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
        <header>Header</header>
        { children }
        <footer>Footer</footer>
      </body>
    </html>
  );
}
