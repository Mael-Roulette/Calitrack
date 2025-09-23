import Link from "next/link";

export default function Home () {
  return (
    <section className="min-h-full bg-radial-[at_50%_90%] from-[#4E63D7] to-foreground to-70% px-2">
      <h1 className="font-calsans text-background pt-16 lg:pt-24 mx-auto max-w-5xl text-center text-3xl lg:text-7xl">Tes objectifs, ta discipline Ton app, <span className="text-secondary">Calitrack</span></h1>
      <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-2xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
      <div>
        <Link href="/contact" aria-label="Télécharger l'application" className="btn-secondary">Tester la bêta</Link>
        <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-secondary">En savoir plus</Link>
      </div>
    </section>
  );
}
