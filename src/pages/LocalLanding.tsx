import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQ } from '@/components/FAQ';
import { CtaSection } from '@/components/CtaSection';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SITE_URL, WHATSAPP_URL, OG_IMAGE } from '@/lib/constants';
import {
  getLocalPageBySlug,
  getLocalPagesInCity,
  getCityHighlights,
  localPageUrl,
} from '@/lib/local-pages';
import { getPostBySlug, formatPostDate } from '@/lib/blog';

export function LocalLanding() {
  const { service, city } = useParams<{ service: string; city: string }>();
  const page = service && city ? getLocalPageBySlug(`${service}/${city}`) : undefined;

  if (!page) {
    return (
      <>
        <Navbar />
        <section className="blog-post">
          <div className="wrap">
            <p>Página não encontrada.</p>
            <Link to="/" className="btn mono-btn">
              ← Voltar pra home
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const pageUrl = localPageUrl(page.slug);
  const relatedPosts = page.relatedPosts
    .map(slug => getPostBySlug(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const sameCityPages = getLocalPagesInCity(page.city, page.slug);
  const otherCityPages = getCityHighlights(page.city, page.serviceName);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${pageUrl}#business`,
        name: 'Zenbit Softhouse',
        url: pageUrl,
        image: OG_IMAGE,
        telephone: '+55 86 99420-1843',
        email: 'contato@zenbit.com.br',
        priceRange: '$$',
        areaServed: [page.city, 'Piauí'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: page.city,
          addressRegion: page.region,
          addressCountry: 'BR',
        },
        description: page.description,
      },
      {
        '@type': 'Service',
        name: `${page.serviceName} em ${page.city}`,
        serviceType: page.serviceName,
        provider: { '@id': `${pageUrl}#business` },
        areaServed: {
          '@type': 'City',
          name: page.city,
          containedInPlace: { '@type': 'State', name: 'Piauí' },
        },
        description: page.description,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${page.serviceName} em ${page.city}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={pageUrl} />
        <meta name="geo.region" content={`BR-${page.region}`} />
        <meta name="geo.placename" content={page.city} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="grid-bg" />
      <Navbar />

      <section className="hero local-hero">
        <div className="hero-glow" />
        <div className="wrap rel">
          <div className="hero-meta">
            <span>{page.kicker}</span>
            <span>resposta em ≤ 1 dia útil</span>
          </div>

          <div className="hero-tags">
            {page.tags.map(tag => (
              <span key={tag} className="tag">
                <span className="tag-dot" />
                {tag}
              </span>
            ))}
          </div>

          <h1>
            {page.h1} <em>{page.h1Accent}</em>
          </h1>

          <div className="hero-sub">
            <p>{page.heroLead}</p>
            <div className="hero-ctas">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn primary"
              >
                Pedir orçamento no WhatsApp <span className="arrow">↗</span>
              </a>
              <a href="#perguntas" className="btn mono-btn">
                Ver perguntas frequentes
              </a>
            </div>
          </div>

          <div className="local-stats">
            {page.stats.map(stat => (
              <div key={stat.label} className="local-stat">
                <div className="local-stat-value">{stat.value}</div>
                <div className="local-stat-label">{stat.label}</div>
                <span className="mono-dim">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="local-block">
        <div className="wrap">
          <div className="section-header">
            <span className="section-label">// 01 — contexto</span>
            <h2>{page.problemsTitle}</h2>
          </div>
          <div className="local-cards">
            {page.problems.map(problem => (
              <div key={problem.label} className="local-card">
                <span className="mono-dim">{problem.label}</span>
                <h3>{problem.title}</h3>
                <p>{problem.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services local-block" id="servicos">
        <div className="wrap">
          <div className="section-header">
            <span className="section-label">// 02 — entrega</span>
            <h2>{page.deliverablesTitle}</h2>
          </div>
          <div className="services-list">
            {page.deliverables.map(item => (
              <div key={item.n} className="service-row">
                <span className="service-n">{item.n}</span>
                <div className="service-title">{item.title}</div>
                <p className="service-copy">{item.copy}</p>
                <div className="service-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="local-block">
        <div className="wrap">
          <div className="section-header">
            <span className="section-label">// 03 — por aqui</span>
            <h2>{page.localTitle}</h2>
          </div>
          <div className="local-prose">
            {page.localParagraphs.map(paragraph => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        label="// 04 — perguntas"
        heading={`Perguntas sobre ${page.serviceName.toLowerCase()} em ${page.city}`}
        items={page.faq.map((item, i) => ({
          value: `faq-${i}`,
          question: item.q,
          answer: item.a,
        }))}
      />

      {relatedPosts.length > 0 && (
        <section className="insights local-block">
          <div className="wrap">
            <div className="services-header">
              <span className="section-label">// 05 — leia antes de decidir</span>
              <h2>
                Sobre esse assunto, <span className="muted">no nosso blog.</span>
              </h2>
              <Link to="/blog" className="mono-dim insights-see-all">
                Ver tudo ↗
              </Link>
            </div>
            <div className="insights-list">
              {relatedPosts.map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="insight-row">
                  <span className="tech-tag insight-category">{post.category}</span>
                  <span className="insight-date mono-dim">{formatPostDate(post.date)}</span>
                  <span className="insight-title">{post.title}</span>
                  <span className="insight-read">{post.readingTime} min de leitura →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {sameCityPages.length > 0 && (
        <section className="local-block">
          <div className="wrap">
            <div className="section-header">
              <span className="section-label">// 06 — também fazemos</span>
              <h2>
                Outros serviços <span className="muted">em {page.city}.</span>
              </h2>
            </div>
            <div className="local-links">
              {sameCityPages.map(other => (
                <Link key={other.slug} to={`/${other.slug}/`} className="local-link">
                  <span className="local-link-title">
                    {other.serviceName} em {other.city}
                  </span>
                  <span className="mono-dim">{other.tags.slice(0, 3).join(' · ')}</span>
                  <span className="insight-read">ver página →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {otherCityPages.length > 0 && (
        <section className="local-block">
          <div className="wrap">
            <div className="section-header">
              <span className="section-label">// 07 — onde atendemos</span>
              <h2>
                Também atendemos <span className="muted">estas cidades.</span>
              </h2>
            </div>
            <div className="local-links">
              {otherCityPages.map(other => (
                <Link key={other.slug} to={`/${other.slug}/`} className="local-link">
                  <span className="local-link-title">
                    {other.serviceName} em {other.city}
                  </span>
                  <span className="mono-dim">{other.tags.slice(0, 3).join(' · ')}</span>
                  <span className="insight-read">ver página →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export { LocalLanding as Component };
