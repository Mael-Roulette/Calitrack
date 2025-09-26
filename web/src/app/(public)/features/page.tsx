import Link from "next/link";

export default function Features () {
  return (
    <main>
      <section className="section-wrapper">
        <h1 className="title-hero font-calsans mb-2">Nos fonctionnalités</h1>
        <p className="mb-4 max-w-1/2">Les fonctionnalités présentes posent les bases, mais Calitrack en est qu&apos;à c&apos;est début. Si jamais tu as des propositions à me faire n&apos;hésite pas à me les partager&nbsp;!</p>
        <Link href="/contact" aria-label="Contactez Calitrack" className='btn-secondary'>Me contacter</Link>
      </section>
    </main>
  )
}