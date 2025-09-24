import Link from "next/link";

export default function Home () {
  return (
    <main>
      <section className="min-h-full bg-radial-[at_50%_90%] from-[#4E63D7] to-foreground to-70% px-2">
        <h1 className="font-calsans text-background pt-16 lg:pt-24 mx-auto max-w-5xl text-center text-3xl lg:text-7xl">Tes objectifs, ta discipline Ton app, <span className="text-secondary">Calitrack</span></h1>
        <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-2xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
        <div className="mt-5 pb-20 flex justify-center items-center gap-4">
          <Link href="/contact" aria-label="Télécharger l'application" className="btn-primary">Tester la bêta</Link>
          <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-secondary">En savoir plus</Link>
        </div>
      </section>

      <section>
        <h2 className="title-section font-calsans my-8 lg:my-12 text-center">Tout ce dont tu as besoin pour <span className="text-secondary">progresser</span></h2>
      </section>
    </main>

  );
}
