export default function PrivacyPolicy () {
  return (
    <main className="section-wrapper">
      <h1 className="title-hero font-calsans mb-6">Mentions légales</h1>
      <p>En vigueur au 26 septembre 2025</p>

      {/* Editeur du site */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">1. Éditeur du site</h2>
        <ul>
          <li><span className="font-bold">Nom :</span> Maël Roulette</li>
          <li><span className="font-bold">Statut :</span> Étudiant en développement web / Alternant chez Portobello Communication</li>
          <li><span className="font-bold">Email :</span> calitrack@mael-roulette.fr</li>
          <li><span className="font-bold">Site internet :</span> mael-roulette.fr</li>
        </ul>
      </section>

      {/* Hébergement */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">2. Hébergement</h2>
        <p className="mb-2">Le site est hébergé par :</p>
        <ul>
          <li className="font-bold">Infomaniak Network SA</li>
          <li><span className="font-bold">Adresse :</span> Rue Eugène-Marziano 25, 1227 Les Acacias (GE), Suisse</li>
          <li><span className="font-bold">Site web :</span> https://www.infomaniak.com</li>
          <li><span className="font-bold">Téléphone :</span> +41 22 820 35 44</li>
        </ul>
      </section>

      {/* Propriété intélectuelle */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">3. Propriété intellectuelle</h2>
        <p className="mb-2">Tous les contenus présents sur ce site (textes, images, code, logo, etc.) sont la propriété exclusive de Maël Roulette, sauf mention contraire. Toute reproduction, représentation ou diffusion, même partielle, sans autorisation écrite préalable est interdite.</p>
      </section>

      {/* Responsabilité */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">4. Responsabilité</h2>
        <p className="mb-2">Ce site a pour but de présenter l&apos;application mobile Calitrack, application mobile réalisée et maintenu par Maël Roulette.</p>
        <p className="mb-2">L&apos;éditeur ne saurait être tenu responsable des erreurs ou des éventuelles interruptions d&apos;accès.</p>
      </section>

      {/* Données personnelles */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">5. Données personnelles</h2>
        <p className="mb-2">Aucune donnée n&apos;est collecté sur ce site internet.</p>
      </section>

      {/* Cookie */ }
      <section>
        <h2 className="title-section font-calsans mb-2 mt-6">6. Cookie</h2>
        <p className="mb-2">Aucun cookie n&apos;est déposé sur votre ordinateur via ce site.</p>
      </section>
    </main>
  )
}