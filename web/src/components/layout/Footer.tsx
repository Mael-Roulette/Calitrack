'use-client'

import Image from "next/image";
import Link from "next/link";

export default function Footer () {
  // Liens rapides
  const quickLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/features', label: 'Fonctionnalités' },
    { href: '/pricing', label: 'Tarifs' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/contact', label: 'Contact' }
  ] as const;

  // Liens légaux
  const legalLinks = [
    { href: '/legal-notices', label: 'Mentions légales' },
    { href: '/privacy-policy', label: 'Politique de confidentialité' },
    { href: '/support', label: 'Support' }
  ] as const;

  return (
    <footer className="flex flex-wrap gap-10 bg-radial-[at_50%_10%] from-[#4E63D7] to-foreground to-70%">
      <div className="max-w-7xl">
        <div>
          <Link
            href="/"
            className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground rounded-lg"
            aria-label="Retour à l'accueil"
          >
            <Image
              src={ '/images/logo.png' }
              width={ 80 }
              height={ 80 }
              alt={ 'Calitrack' }
              priority
              className="h-auto w-auto"
            />
          </Link>
          <p className="font-calsans text-background">Calitrack,<br />Tu vas aimer t&apos;entrainer</p>
        </div>
        <div>
          <p className="text-background font">Liens rapides</p>
          <nav className="hidden lg:flex lg:flex-col lg:gap-x-8" aria-label="Navigation principale">
            { quickLinks.map( ( { href, label } ) => (
              <Link
                key={ href }
                href={ href }
                className="text-sm font-semibold leading-6 text-background hover:text-background/50 focus:outline-none focus:ring-2 focus:ring-background rounded-lg px-2 py-1 transition-colors"
              >
                { label }
              </Link>
            ) ) }
          </nav>
        </div>
        <div>
          <p>Légals & Infos pratiques</p>
          <nav className="hidden lg:flex lg:flex-col lg:gap-x-8" aria-label="Navigation principale">
            { legalLinks.map( ( { href, label } ) => (
              <Link
                key={ href }
                href={ href }
                className="text-sm font-semibold leading-6 text-background hover:text-background/50 focus:outline-none focus:ring-2 focus:ring-background rounded-lg px-2 py-1 transition-colors"
              >
                { label }
              </Link>
            ) ) }
          </nav>
        </div>
      </div>
    </ footer>
  )
}