import Faq from '@/components/global/Faq';
import FeatureCard from "@/components/public/FeaturesCard";
import Link from "next/link";
import calitrackFaqs from '@/data/faq.json';

export default function Home () {
  const featuresInfos = [
    {
      id: 1,
      icon: 'trainings.png',
      title: 'Entrainement personnalisés',
      description: 'Crée tes entraînements et planifie ta semaine comme un grand athlète'
    },
    {
      id: 2,
      icon: 'goals.png',
      title: 'Objectifs personnalisés',
      description: 'Fixe-toi tes objectifs et progresse à ton rythme'
    },
    {
      id: 3,
      icon: 'stats.png',
      title: 'Suivie de progression',
      description: 'Visualise tes progrès simplement grâce à des graphiques clairs'
    }
  ]

  return (
    <main>
      <section className="min-h-screen bg-radial-[at_50%_90%] from-[#4E63D7] to-foreground to-70% px-2">
        <h1 className="font-calsans text-background pt-16 lg:pt-24 mx-auto max-w-5xl text-center text-3xl lg:text-7xl">Tes objectifs, ta discipline Ton app, <span className="text-secondary">Calitrack</span></h1>
        <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-2xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
        <div className="mt-5 pb-20 flex justify-center items-center gap-4">
          <Link href="/contact" aria-label="Télécharger l'application" className="btn-primary">Tester la bêta</Link>
          <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-secondary">En savoir plus</Link>
        </div>
      </section>

      <section>
        <h2 className="title-section font-calsans mt-8 mb-6 lg:mt-12 lg:mb-10 text-center">Tout ce dont tu as besoin pour <span className="text-secondary">progresser</span></h2>

        <ul className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 mb-4">
          { featuresInfos.map( ( { id, icon, title, description } ) => {
            return (
              <li key={ id }>
                <FeatureCard icon={ icon } title={ title } description={ description } />
              </li>
            )
          } ) }
        </ul>

        <Link href="/features" className="underline inline-block w-full text-center mb-8">Découvrir toutes les fonctionnalités</Link>
      </section>

      <section className="bg-secondary/15">
        <div className="container mx-auto py-8 px-5 lg:px-0 grid lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="title-section font-calsans mb-2">Des questions ?</h2>
            <p> On a regroupé ici les questions les plus courantes. Mais si tu as encore un doute, n&apos;hésite pas à nous contacter !</p>
            <Faq
              faqs={ calitrackFaqs }
              allowMultipleOpen={ false }
            />
          </div>
        </div>
      </section>
    </main>

  );
}
