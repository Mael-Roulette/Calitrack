import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Calitrack",
  description: "Politique de confidentialité de Calitrack, découvrez comment nous protégeons vos données.",
  alternates: {
    canonical: "https://calitrack.fr/privacy-policy",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy () {
  return (
    <main className="section-wrapper">
      <h1 className="title-hero font-calsans mb-6">Politique de confidentialité</h1>
      <p>Dernière mise à jour : 26/09/2025</p>

      {/* Introduction */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">1. Introduction</h2>
        <p className="mb-2">Ce site est un site de présentation d&apos;application mobile, destiné à présenter les différentes fonctionnalités de celle-ci. Le respect de votre vie privée est une priorité. Cette politique de confidentialité vise à vous informer de manière claire et transparente sur les données personnelles qui peuvent être collectées et utilisées via ce site.</p>
      </section>

      {/* Données collectées */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">2. Données collectées</h2>
        <p className="mb-2">Aucune donnée personnelle n&apos;est collectée automatiquement lors de votre navigation sur ce site.</p>
      </section>

      {/* Cookie */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">3. Cookie</h2>
        <p className="mb-2">Ce site n&apos;utilise aucun cookie et ne fait appel à aucun service tiers de suivi ou d&apos;analyse (comme Google Analytics).</p>
      </section>

      {/* Vos droits */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">4. Vos droits</h2>
        <p className="mb-2">Bien que ce site ne récolte aucune donnée, si vous pensez qu&apos;il y a une erreur par rapport à l&apos;utilisation de vos données. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression ou d&apos;opposition concernant vos données.</p>
        <p className="mb-2">Pour exercer ces droits, vous pouvez me contacter à l&apos;adresse suivante : calitrack@mael-roulette.fr .</p>
      </section>

      {/* Responsable traitement */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">5. Responsable du traitement</h2>
        <ul>
          <li><span className="font-bold">Nom :</span> Maël Roulette</li>
          <li><span className="font-bold">Email :</span> calitrack@mael-roulette.fr</li>
          <li><span className="font-bold">Site internet :</span> mael-roulette.fr</li>
        </ul>
      </section>

      {/* Modification */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">6. Modification de la politique de confidentialité</h2>
        <p className="mb-2">Cette politique peut être modifiée à tout moment pour refléter des changements législatifs ou techniques. La date de mise à jour sera toujours précisée en haut de cette page.</p>
      </section>
    </main>
  )
}