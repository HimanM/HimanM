import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Work } from '@/components/Work';
import { About } from '@/components/About';
import { BadgesMarquee } from '@/components/BadgesMarquee';
import { Contact } from '@/components/Contact';
import profileData from '@/data/profile.json';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://www.himanm.com/#profile',
    url: 'https://www.himanm.com/',
    name: `${profileData.name} · ${profileData.title}`,
    description: profileData.heroDescription,
    inLanguage: 'en',
    isPartOf: { '@id': 'https://www.himanm.com/#website' },
    mainEntity: { '@id': 'https://www.himanm.com/#person' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
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
