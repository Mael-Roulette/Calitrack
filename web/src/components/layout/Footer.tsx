'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer () {
  const pathname = usePathname();

  // Liens rapides
  const quickLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/features', label: 'Fonctionnalités' },
  ] as const;

  // Liens légaux
  const legalLinks = [
    { href: '/legal-notices', label: 'Mentions légales' },
    { href: '/privacy-policy', label: 'Politique de confidentialité' },
    // { href: '/roadmap', label: 'Roadmap' },
    { href: '/contact', label: 'Contact' }
  ] as const;

  return (
    <footer>
      <div className="bg-gradient-to-b lg:bg-radial-[at_50%_-50%] from-[#4E63D7] from-1% lg:from-10% to-foreground to-50% lg:to-70%">
        <div className="mx-auto container flex flex-row flex-wrap gap-x-32 gap-y-12 py-14 px-5">
          <div>
            <Link
              href="/"
              className="rounded-lg inline-block mb-4"
              aria-label="Retour à l'accueil"
            >
              <Image
                src={ '/images/logo.png' }
                width={ 108 }
                height={ 60 }
                alt={ 'Calitrack' }
                priority
              />
            </Link>
            <p className="font-calsans text-background text-xl">Calitrack,<br />Tu vas aimer t&apos;entrainer</p>
          </div>
          <div>
            <p className="text-background font-calsans text-xl">Liens rapides</p>
            <nav className="flex flex-col gap-x-8" aria-label="Navigation principale">
              <ul className="list-disc list-inside mt-2 text-background">
                { quickLinks.map( ( { href, label } ) => (
                  <li key={ href }>
                    <Link
                      href={ href }
                      className={ `hover:text-background/50 rounded-lg px-2 py-1 transition-colors  ${pathname === href ? 'text-secondary' : ''}` }
                    >
                      { label }
                    </Link>
                  </li>
                ) ) }
              </ul>
            </nav>
          </div>
          <div>
            <p className="text-background font-calsans text-xl">Légals & Infos pratiques</p>
            <nav className="flex flex-col gap-x-8" aria-label="Navigation principale">
              <ul className="list-disc list-inside mt-2 text-background">
                { legalLinks.map( ( { href, label } ) => (
                  <li key={ href }>
                    <Link
                      href={ href }
                      className={ `hover:text-background/50 rounded-lg px-2 py-1 transition-colors  ${pathname === href ? 'text-secondary' : ''}` }
                    >
                      { label }
                    </Link>
                  </li>
                ) ) }
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="text-md font-calsans text-center">© 2025 Calitrack - Tous droits réservés</p>
        <p className="text-sm text-center">Une création signée Maël Roulette</p>
      </div>
    </ footer>
  )
}