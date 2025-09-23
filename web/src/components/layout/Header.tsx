'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

// Liens de navigation
const navigationLinks = [
  { href: '/about', label: 'À propos' },
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' }
] as const;

// Configuration du logo
const LOGO_CONFIG = {
  src: '/images/logo.png',
  width: 60,
  height: 60,
  alt: 'Calitrack'
} as const;

export default function Header () {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState( false )

  // Mémoisation des handlers pour éviter les re-renders
  const openMobileMenu = useCallback( () => setMobileMenuOpen( true ), [] )
  const closeMobileMenu = useCallback( () => setMobileMenuOpen( false ), [] )

  return (
    <header className="bg-foreground">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */ }
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground rounded-lg"
            aria-label="Retour à l'accueil"
          >
            <Image
              src={ LOGO_CONFIG.src }
              width={ LOGO_CONFIG.width }
              height={ LOGO_CONFIG.height }
              alt={ LOGO_CONFIG.alt }
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>

        {/* Bouton menu mobile */ }
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={ openMobileMenu }
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-background hover:text-background/80 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground transition-colors"
            aria-label="Ouvrir le menu de navigation"
          >
            <Bars3Icon aria-hidden="true" className="h-10 w-10" />
          </button>
        </div>

        {/* Navigation desktop */ }
        <nav className="hidden lg:flex lg:gap-x-8" aria-label="Navigation principale">
          { navigationLinks.map( ( { href, label } ) => (
            <Link
              key={ href }
              href={ href }
              className="text-sm font-semibold leading-6 text-background hover:text-background/50 focus:outline-none focus:ring-2 focus:ring-background rounded-lg px-2 py-1 transition-colors"
            >
              { label }
            </Link>
          ) ) }
        </nav>

        {/* Lien de connexion desktop */ }
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/signin"
            className="btn-primary"
          >
            Se connecter
          </Link>
        </div>
      </nav>

      {/* Menu mobile */ }
      <Dialog
        open={ mobileMenuOpen }
        onClose={ closeMobileMenu }
        className="lg:hidden"
        aria-labelledby="mobile-menu-title"
      >
        <div className="fixed inset-0 z-50 bg-black/20" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-foreground px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* En-tête du menu mobile */ }
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground rounded-lg"
              onClick={ closeMobileMenu }
              aria-label="Retour à l'accueil"
            >
              <Image
                src={ LOGO_CONFIG.src }
                width={ LOGO_CONFIG.width }
                height={ LOGO_CONFIG.height }
                alt={ LOGO_CONFIG.alt }
                className="h-auto w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={ closeMobileMenu }
              className="-m-2.5 rounded-md p-2.5 text-background hover:text-background/80 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground transition-colors"
              aria-label="Fermer le menu de navigation"
            >
              <XMarkIcon aria-hidden="true" className="h-10 w-10" />
            </button>
          </div>

          {/* Contenu du menu mobile */ }
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-background/20">
              <nav className="space-y-2 py-6" aria-label="Navigation mobile">
                { navigationLinks.map( ( { href, label } ) => (
                  <Link
                    key={ href }
                    href={ href }
                    onClick={ closeMobileMenu }
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-background hover:bg-background/10 focus:outline-none focus:ring-2 focus:ring-background transition-colors"
                  >
                    { label }
                  </Link>
                ) ) }
              </nav>
              <div className="py-6">
                <Link
                  href="/signin"
                  onClick={ closeMobileMenu }
                  className="btn-primary"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}