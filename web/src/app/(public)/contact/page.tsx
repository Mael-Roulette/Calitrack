import Faq from "@/components/public/Faq";
import Link from "next/link";
import faqData from "@/data/public/faq.json";
import { BsMailbox } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';

export default function Contact () {
  return (
    <main>
      {/* Hero section */ }
      <section className="bg-secondary/12">
        <div className="section-wrapper flex flex-col items-center">
          <h1 className="title-hero font-calsans mb-4 text-center">Parlons-en !</h1>
          <p className="text-center lg:max-w-4/5 mx-auto mb-4">Un problème, une idée, une suggestion ? Peu importe, je lis tous vos messages, alors n&apos;hésite pas à m&apos;écrire ! Avant ça, tu peux aussi jeter un œil à notre FAQ, elle contient peut-être déjà la réponse que tu cherches.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="#faq" className="btn-primary">Voir la FAQ</Link>
            <Link href="#contact" className="btn-secondary">Me contacter</Link>
          </div>
        </div>
      </section>

      {/* section test beta */ }
      <section className="section-wrapper">
        <h2 className="title-section font-calsans">Tu veux tester la bêta de Calitrack ?</h2>
        <p>Si tu as envie de faire partie de l&apos;aventure et de tester cette application avant tout le monde, envoie moi un message sur insta ou par mail et je te donnerais accès à l&apos;application. Mais attention, les places sont limitées alors n&apos;attend pas trop !</p>
      </section>

      {/* section faq */ }
      <section className="section-wrapper" id="faq">
        <h2 className="title-section font-calsans">Besoin d&apos;une réponse rapidement ?</h2>
        <Faq faqs={ faqData } />
      </section>

      <section className="section-wrapper flex flex-col items-center" id="contact">
        <h2 className="title-section font-calsans text-center mb-4">Me contacter</h2>
        <p className="text-center max-w-4/5 mx-auto mb-6">Tu peux m&apos;envoyer un message sur Instagram ou par mail, je réponds rapidement dans les deux cas !</p>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-6 max-w-2/3">
          <div className="rounded-md border-2 border-secondary p-3">
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="h-fit w-fit p-4 rounded-full bg-secondary flex items-center justify-center">
                <BsMailbox size={ 30 } className="text-background" />
              </div>
              <p className="font-calsans text-xl">Mon email</p>
            </div>
            <Link href="mailto:calitrack@mael-roulette.fr" className="inline-block w-full text-center hover:text-secondary hover:underline">calitrack@mael-roulette.fr</Link>
          </div>

          <div className="rounded-md border-2 border-secondary p-3">
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="h-fit w-fit p-4 rounded-full bg-secondary flex items-center justify-center">
                <FaInstagram size={ 30 } className="text-background" />
              </div>
              <p className="font-calsans text-xl">Mon instagram</p>
            </div>
            <Link href="https://www.instagram.com/calitrack_app/" className="inline-block w-full text-center hover:text-secondary hover:underline">@calitrack_app</Link>
          </div>
        </div>
      </section>
    </main>
  )
}