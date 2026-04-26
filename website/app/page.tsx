import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Work } from '@/components/Work';
import { About } from '@/components/About';
import { BadgesMarquee } from '@/components/BadgesMarquee';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <BadgesMarquee />
        <About />
        <Contact />
      </main>
    </>
  );
}
