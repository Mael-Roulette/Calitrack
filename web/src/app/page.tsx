import Faq from '@/components/public/Faq';
import FeatureCard from "@/components/public/FeaturesCard";
import Roadmap from '@/components/public/Roadmap';
import calitrackFaqs from '@/data/public/faq.json';
import featuresInfos from "@/data/public/features.json";
import milestones from "@/data/public/milestones.json";
import Image from 'next/image';
import Link from "next/link";
import { FaChevronDown } from 'react-icons/fa6';

export default function Home () {
  return (
    <main>
      {/* Section hero */ }
      <section className="relative min-h-[calc(100dvh-88px)] bg-gradient-to-t lg:bg-radial-[at_50%_90%] from-[#4E63D7] from-3% to-foreground to-80% lg:to-70% px-2">
        <h1 className="font-calsans text-background pt-16 lg:pt-24 mx-auto max-w-5xl text-center text-3xl lg:text-7xl">Tes objectifs, ta discipline Ton app, <span>Calitrack</span></h1>
        <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
        <div className="mt-5 pb-20 flex flex-wrap justify-center items-center gap-4">
          <Link href="/contact" aria-label="Télécharger l'application" className="btn-primary">Tester la bêta</Link>
          <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-secondary">En savoir plus</Link>
        </div>

        <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
          <a href="#features" className='text-background font-sora font-semibold flex flex-col items-center justify-center gap-1 transition-transform duration-300 hover:translate-y-2'>
            <span>En savoir plus</span>
            <FaChevronDown size={ 32 } className='text-background' />
          </a>
        </div>
      </section>

      {/* Section features */ }
      <section id='features'>
        <h2 className="title-section font-calsans mt-8 mb-6 lg:mt-16 lg:mb-10 text-center">Tout ce dont tu as besoin pour <span>progresser</span></h2>

        <ul className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 mb-8">
          { featuresInfos.map( ( { id, icon, title, description } ) => {
            return (
              <li key={ id }>
                <FeatureCard id={ id } icon={ icon } title={ title } description={ description } />
              </li>
            )
          } ) }
        </ul>

        <div className='flex justify-center items-center'>
          <Link href="/features" aria-label="Découvrir toutes les fonctionnalités" className="underline text-center mb-16">Découvrir toutes les fonctionnalités</Link>
        </div>
      </section>

      {/* Section à propos */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-x-10 gap-y-6">
          <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '>
            <Image
              src={ '/images/home_mockup.jpg' }
              alt='Page d&apos;acceuil de l&apos;application Calitrack'
              fill={ true }
              className='h-full w-full object-cover'
            />
          </div>
          <div>
            <h2 className='title-section font-calsans mb-4'>Progresser n&apos;a jamais été aussi <span>simple</span></h2>
            <p className='mb-3'>Calitrack est né d&apos;une idée simple : rendre l&apos;entraînement en calisthenics <strong>plus simple</strong> et <strong>plus accessible</strong> à tous. Quand on pratique ce sport, on se rend vite compte qu&apos;il est difficile de suivre ses progrès et de rester motivé sur le long terme. J&apos;ai donc voulu créer une appli pensée par un pratiquant, pour les pratiquants.</p>
            <p className='mb-3'>Avec Calitrack, tu peux <strong>organiser tes entraînements</strong>, <strong>suivre tes objectifs</strong> et voir concrètement tes avancées au fil du temps.</p>
            <p className='mb-3'>Le but est de proposer plus qu&apos;une simple appli de suivi : Calitrack a pour objectif de t&apos;accompagner dans tes entraînements et de t&apos;aider à rester motivé. Et ce n&apos;est que le début : de nouvelles fonctionnalités sont en préparation pour les pratiquants comme pour les coachs.</p>
            <p className='font-semibold mb-6'>Ce n&apos;est que le début, l&apos;aventure Calitrack ne fait que commencer.</p>
            <div className='flex flex-wrap gap-4'>
              <Link href="/about" aria-label="En découvrir plus sur l'application" className='btn-primary'>En savoir plus</Link>
              <Link href="/contact" aria-label="Télécharger l'application" className='btn-secondary'>Tester la bêta</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section roadmap */ }
      <section className="section-wrapper">
        <h2 className='title-section mb-2 text-center font-calsans'>Ce qui arrive bientôt</h2>
        <p className='text-center mb-10 text-lg'>Tout comme votre progression en calisthenics, Calitrack avance pas à pas.</p>
        <Roadmap milestones={ milestones } />
        <div className='mt-8 flex flex-col justify-center items-center gap-4'>
          <p className='font-semibold'>Tu as quelques choses à proposer ? N&apos;hésite pas à me le partager !</p>
          <Link href="/contact" aria-label="Contactez Calitrack" className='btn-secondary'>Me contacter</Link>
        </div>
      </section>

      {/* Section FAQ */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper grid lg:grid-cols-[3fr_2fr] gap-y-6 gap-x-12">
          <div>
            <h2 className="title-section font-calsans mb-2">Des questions ?</h2>
            <p>J&apos;ai regroupé ici les questions les plus courantes. Mais si tu as encore un doute, n&apos;hésite pas à me contacter !</p>
            <Faq
              faqs={ calitrackFaqs }
              allowMultipleOpen={ false }
            />
            <Link href="/contact" aria-label="Contactez Calitrack" className='btn-tertiary mt-6'>Contact-moi !</Link>
          </div>
          <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '>
            <Image
              src={ '/images/trainings_goals_mockup.jpg' }
              alt='Entraînements & objectifs'
              fill={ true }
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </section>

      {/* Section téléchargement */ }
      <section className="section-wrapper">
        <h2 className="title-section font-calsans text-center mb-2 lg:mb-4">Prêt à passer le cap ?</h2>
        <p className='text-center'>N&apos;attends pas plus et essaye la bêta !</p>
        <div className='flex flex-wrap gap-x-5 gap-y-3 justify-center items-center mt-5'>
          <Link href="/contact" aria-label="Télécharger l'application" className='btn-primary'>Tester la bêta</Link>
          <Link href="/features" aria-label="En découvrir plus sur l'application" className='btn-secondary'>En savoir plus</Link>
        </div>
      </section>
    </main>
  );
}
