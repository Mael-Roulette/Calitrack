import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fonctionnalités de Calitrack - Suivi d'entraînements et objectifs personnalisés",
  description: "Explore toutes les fonctionnalités de Calitrack : crée tes entraînements, fixe tes objectifs personnalisés, suis tes statistiques et reste motivé grâce aux outils pensés pour toi.",
};

export default function Features () {
  return (
    <main>
      {/* Hero section */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper flex flex-col items-center">
          <h1 className="title-hero font-calsans mb-4 text-center">Nos <span>fonctionnalités</span></h1>
          <p className="text-center lg:max-w-2/3 mx-auto mb-4">Les fonctionnalités présentes posent les bases, mais Calitrack n&apos;est qu&apos;à c&apos;est début. Si jamais tu as des propositions à me faire n&apos;hésite pas à me les partager&nbsp;!</p>
          <Link href="/contact" aria-label="Contactez Calitrack" className='btn-secondary'>Me contacter</Link>
        </div>
      </section>

      {/* Présentation entrainements personnalisés */ }
      <section className="section-wrapper grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
        <div className="order-2 lg:order-1">
          <h2 className="title-section font-calsans mb-4">Entraînements <span>personnalisés</span></h2>
          <p className="mb-2">Ici, c&apos;est toi qui décides de la façon dont tu veux t&apos;entraîner. Tu construis tes séances comme tu l&apos;entends, en fonction de ton niveau, de tes envies et de tes objectifs.</p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li className="mb-2"><strong>Choisis librement tes exercices :</strong> sélectionne ceux qui correspondent le mieux à ton style ou à ta progression, que ce soit des bases solides ou des mouvements plus avancés.</li>
            <li className="mb-2"><strong>Planifie-les dans ta semaine :</strong> organise tes entraînements en fonction de ton emploi du temps, que tu t&apos;entraînes trois fois par semaine ou tous les jours.</li>
            <li><strong>Retrouve tout dans un calendrier :</strong> visualise clairement tes séances et garde une vue d&apos;ensemble pour mieux rester régulier et motivé.</li>
          </ul>
          <p>Ton entraînement devient vraiment personnel : tu adaptes l&apos;application à ta manière de progresser, pas l&apos;inverse.</p>
        </div>
        <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden order-1 lg:order-2'>
          <Image
            src={ '/images/trainings_mockup.webp' }
            alt='Des entraînements personnalisés'
            fill={ true }
            className='h-full w-full object-cover'
          />
        </div>
      </section>

      {/* Présentation objectifs personnalisés */ }
      <section className="section-wrapper mb-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-10 gap-y-6">
        <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '>
          <Image
            src={ '/images/goals_mockup.webp' }
            alt='Des objectifs personnalisés'
            fill={ true }
            className='h-full w-full object-cover'
          />
        </div>
        <div>
          <h2 className="title-section font-calsans mb-4"><span>Objectifs</span> et progression</h2>
          <p className="mb-2">Progresser devient beaucoup plus motivant quand tu sais exactement où tu vas. Avec Calitrack, tu te fixes des objectifs clairs et tu vois concrètement les résultats de tes efforts.</p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li className="mb-2"><strong>Fixe des objectifs 100% personnalisés :</strong> adapte-les à tes ambitions, que ce soit réussir une nouvelle figure, augmenter tes répétitions ou améliorer ton hold.</li>
            <li className="mb-2"><strong>Des objectifs reliés aux exercices :</strong> suis tes performances directement sur les mouvements qui comptent pour toi.</li>
            <li><strong>Statistiques dynamiques :</strong> visualise ta progression au fil du temps avec des statistiques sur la progression de tes objecitfs.</li>
          </ul>
          <p>Chaque entraînement compte, et Calitrack te le prouve en transformant tes efforts en résultats visibles.</p>
        </div>
      </section>

      {/* Section téléchargement */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper">
          <h2 className="title-section font-calsans text-center mb-2 lg:mb-4">Prêt à passer le cap ?</h2>
          <p className='text-center'>N&apos;attends pas plus et essaye la bêta !</p>
          <div className='flex flex-wrap gap-x-5 gap-y-3 justify-center items-center mt-5'>
            <Link href="/contact" aria-label="Télécharger l'application" className='btn-primary'>Tester la bêta</Link>
            <Link href="/features" aria-label="En découvrir plus sur l'application" className='btn-secondary'>En savoir plus</Link>
          </div>
        </div>
      </section>
    </main>
  )
}