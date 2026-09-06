import { Head } from 'vite-react-ssg';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getPostBySlug, getRelatedPosts, formatPostDate } from '@/lib/blog';
import { getLocalPagesInCity, MAIN_CITY } from '@/lib/local-pages';
import { SITE_URL, WHATSAPP_URL, OG_IMAGE, LOGO_IMAGE } from '@/lib/constants';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <>
        <Navbar />
        <section className="blog-post">
          <div className="wrap">
            <p>Post não encontrado.</p>
            <Link to="/blog" className="btn mono-btn">
              ← Voltar pro blog
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'pt-BR',
        articleSection: post.category,
        image: OG_IMAGE,
        author: { '@type': 'Organization', name: 'Zenbit Softhouse' },
        publisher: {
          '@type': 'Organization',
          name: 'Zenbit Softhouse',
          logo: { '@type': 'ImageObject', url: LOGO_IMAGE },
        },
        mainEntityOfPage: postUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{post.title} — Zenbit Softhouse</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="grid-bg" />
      <Navbar />

      <article className="blog-post">
        <div className="wrap">
          <div className="blog-post-header">
            <Link to="/blog" className="mono-dim">
              ← blog
            </Link>
            <div className="blog-post-meta">
              <span className="tech-tag">{post.category}</span>
              <span className="mono-dim">{formatPostDate(post.date)}</span>
              <span className="mono-dim">{post.readingTime} min de leitura</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="post-cta">
            <div>
              <span className="accent-label">// zenbit · teresina, pi</span>
              <h2>Tem um projeto parecido na mesa?</h2>
              <p>
                Somos uma software house em Teresina. Conversa de 30 minutos, sem proposta no fim da
                chamada — se a gente não for o time certo, dizemos e indicamos quem é.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn primary"
              >
                Falar no WhatsApp <span className="arrow">↗</span>
              </a>
            </div>
            <div className="post-cta-links">
              <span className="footer-col-label">O que fazemos</span>
              <ul>
                {getLocalPagesInCity(MAIN_CITY).map(page => (
                  <li key={page.slug}>
                    <Link to={`/${page.slug}/`}>
                      {page.serviceName} em {page.city} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="insights">
          <div className="wrap">
            <div className="services-header">
              <span className="section-label">// leia também</span>
              <h2>
                Outros textos <span className="muted">na mesma linha.</span>
              </h2>
              <Link to="/blog" className="mono-dim insights-see-all">
                Ver tudo ↗
              </Link>
            </div>
            <div className="insights-list">
              {related.map(item => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className="insight-row">
                  <span className="tech-tag insight-category">{item.category}</span>
                  <span className="insight-date mono-dim">{formatPostDate(item.date)}</span>
                  <span className="insight-title">{item.title}</span>
                  <span className="insight-read">{item.readingTime} min de leitura →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

export { BlogPost as Component };
