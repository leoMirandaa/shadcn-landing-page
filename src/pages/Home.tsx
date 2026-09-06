import { lazy, Suspense } from 'react';
import { Head } from 'vite-react-ssg';
import { Navbar } from '@/components/Navbar';
import { MarqueeSection } from '@/components/MarqueeSection';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Testimonial } from '@/components/Testimonial';
import { FAQ } from '@/components/FAQ';
import { BlogPreview } from '@/components/BlogPreview';
import { CtaSection } from '@/components/CtaSection';
import { Footer } from '@/components/Footer';
import { SITE_URL, OG_IMAGE, LOGO_IMAGE } from '@/lib/constants';
import { faqList } from '@/lib/faq-data';

const Hero = lazy(() => import('@/components/Hero'));

const PAGE_TITLE = 'Software house em Teresina, PI — sistemas e apps sob medida | Zenbit';
const PAGE_DESCRIPTION =
  'Software house em Teresina, Piauí: desenvolvimento de sistemas, sites e aplicativos sob medida. Código no seu repositório, demo toda semana e orçamento em 1 dia útil.';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'Zenbit Softhouse',
  url: SITE_URL,
  image: OG_IMAGE,
  logo: LOGO_IMAGE,
  telephone: '+55 86 99420-1843',
  email: 'contato@zenbit.com.br',
  priceRange: '$$',
  areaServed: ['Teresina', 'Piauí', 'Brasil'],
  knowsLanguage: 'pt-BR',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Teresina',
    addressRegion: 'PI',
    addressCountry: 'BR',
  },
  description: PAGE_DESCRIPTION,
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqList.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export function Home() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="BR-PI" />
        <meta name="geo.placename" content="Teresina" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Head>

      <div className="grid-bg" />
      <Navbar />
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <MarqueeSection />
      <About />
      <Services />
      <Process />
      <Testimonial />
      <FAQ />
      <BlogPreview />
      <CtaSection />
      <Footer />
    </>
  );
}

export { Home as Component };
