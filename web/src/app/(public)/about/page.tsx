import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos de Calitrack - L'application de calisthenics pensée pour tous",
  description: "Découvre l'histoire de Calitrack, une application créée par un passionné de calisthenics pour aider débutants et confirmés à progresser, suivre leurs entraînements et rester motivés."
};

export default function About () {
  return (
    <main>
      {/* Hero section */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper">
          <h1 className="title-hero font-calsans mb-4 text-center">À propos de <span>Calitrack</span></h1>
          <p className="text-center lg:max-w-2/3 mx-auto">Calitrack est une application pensée pour tous ceux qui veulent progresser en calisthenics, du débutant au pratiquant confirmé. Simple, claire et motivante, elle t&apos;accompagne dans tes entraînements et te permet de suivre tes progrès pas à pas.</p>
        </div>
      </section>

      {/* Explication du projet */ }
      <section className="section-wrapper mb-8 grid items-center grid-cols-1 lg:grid-cols-[5fr_4fr] gap-x-10 gap-y-6">
        <div className="h-fit">
          <h2 className="title-section font-calsans mb-2">Pourquoi cette application ?</h2>
          <p>Quand j&apos;ai commencé la calisthenics, je me suis rapidement heurté à un problème : c&apos;est vraiment compliqué de suivre son évolution. On commence tous motivé à atteindre des figures comme le <strong>front lever</strong> ou la <strong>planche</strong> mais on finit aussi par stagner ou faire des progrès tellement lentement qu&apos;on en finit découragé. Moi le premier j&apos;ai connu cette frustration et après avoir essayé plusieurs choses (des tableurs excels, un carnet d&apos;entraînements, ...) où j&apos;ai toujours fini par perdre le fil, j&apos;ai eu l&apos;idée de <strong>Calitrack</strong>.</p>
          <p>L&apos;application est pensé pour donner à chaque pratiquant un outil simple pour <strong className="text-secondary">visualiser tes efforts, tes progrès et tes objectifs</strong>. Calitrack existe pour que tu puisses regarder en arrière et voir concrètement ton évolution, peu importe ton niveau de départ. Parce qu&apos;au fond, ce qui motive, ce n&apos;est pas seulement l&apos;entraînement du jour, mais la certitude que chaque séance t&apos;amène un peu plus loin.</p>
        </div>
        <div className='h-64 lg:h-full w-full lg:min-h-[400px] relative rounded-lg overflow-hidden '>
          <Image
            src={ '/images/general_mockup.jpg' }
            alt='Une application pensé pour la calisthenics'
            fill={ true }
            className='h-full w-full object-cover'
          />
        </div>
      </section>

      {/* Le but de l'application */ }
      <section className="bg-light-blue/10">
        <div className="section-wrapper mb-8 lg:max-w-3/5 mx-auto">
          <h2 className="title-section font-calsans mb-2">C&apos;est quoi son but ?</h2>
          <p>L&apos;ambition de Calitrack est de devenir bien plus qu&apos;un carnet numérique. L&apos;idée n&apos;est pas seulement de noter des entraînements, mais de proposer un véritable compagnon au quotidien. L&apos;application est là pour t&apos;aider à <strong>organiser tes séances</strong>, à <strong>fixer des objectifs</strong> et à construire une progression logique dans le temps.</p>
          <p>Que tu sois débutant et que tu découvres à peine les bases, ou pratiquant confirmé l&apos;application est faite pour toi. Elle propose des progressions d&apos;exercices pour tout niveau. L&apos;objectif final est simple : rendre l&apos;entraînement plus clair, plus motivant, et t&apos;aider à transformer ton travail en résultats visibles. Parce qu&apos;au fond, progresser en calisthenics, c&apos;est une histoire de patience mais aussi de plaisir à chaque étape.</p>
        </div>
      </section>

      {/* Le futur de l'application */ }
      <section className="section-wrapper mb-8 grid items-center grid-cols-1 lg:grid-cols-[5fr_4fr] gap-x-10 gap-y-6">
        <div>
          <h2 className="title-section font-calsans mb-2">Qu&apos;est ce que le <span>futur</span> nous réserve ?</h2>
          <p>Calitrack en est seulement à ses premiers pas et elle continuera de grandir. L&apos;application intégrera bientôt des outils pour créer des entraînements personnalisés avec une logique plus poussée, afin que chaque séance corresponde exactement à tes besoins et objectifs. Tu pourras <strong>créer tes propres combos</strong>, créer des séries d&apos;exercices ou encore choisir un nombre de répétition. Mais l&apos;application n&apos;évolue pas toute seul, elle a besoin de vos retours et idées afin de vous proposez une application qui vous correspond.</p>
          <p>À plus long terme, Calitrack a aussi pour vocation <strong>d&apos;accompagner les coachs</strong>. Une version leur permettra de gérer facilement leurs athlètes, de suivre leurs progrès et de proposer des programmes adaptés. L&apos;idée est d&apos;alléger leur quotidien pour qu&apos;ils puissent se concentrer sur l&apos;essentiel : faire progresser leurs élèves.</p>
        </div>
        <div className='h-64 lg:h-full w-full lg:min-h-[350px] relative rounded-lg overflow-hidden '>
          <Image
            src={ '/images/general_mockup-2.jpg' }
            alt='Une application voué à évoluer'
            fill={ true }
            className='h-full w-full object-cover'
          />
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