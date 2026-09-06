import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getAllPosts, formatPostDate } from '@/lib/blog';
import { localPages } from '@/lib/local-pages';
import { SITE_URL, OG_IMAGE } from '@/lib/constants';

const title = 'Blog sobre desenvolvimento de software — Zenbit, Teresina (PI)';
const description =
  'Artigos sobre desenvolvimento de sistemas sob medida, criação de sites, processo de engenharia e o mercado de software em Teresina e no Piauí.';

export function Blog() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        name: 'Blog da Zenbit Softhouse',
        url: `${SITE_URL}/blog`,
        inLanguage: 'pt-BR',
        description,
        publisher: { '@type': 'Organization', name: 'Zenbit Softhouse', url: SITE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="grid-bg" />
      <Navbar />

      <section className="blog-index">
        <div className="wrap">
          <div className="section-header">
            <span className="section-label">// blog</span>
            <h1 className="blog-index-title">
              Insights sobre <span className="muted">software sob medida.</span>
            </h1>
          </div>

          <p className="blog-index-lead">
            O que aprendemos construindo sistemas, sites e aplicativos para empresas — escrito pelo
            time da Zenbit, software house em Teresina, Piauí.
          </p>

          <div className="insights-list">
            {posts.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="insight-row">
                <span className="tech-tag insight-category">{post.category}</span>
                <span className="insight-date mono-dim">{formatPostDate(post.date)}</span>
                <span className="insight-title">{post.title}</span>
                <span className="insight-read">{post.readingTime} min de leitura →</span>
              </Link>
            ))}
          </div>

          <div className="local-links blog-index-services">
            {localPages.map(page => (
              <Link key={page.slug} to={`/${page.slug}/`} className="local-link">
                <span className="local-link-title">
                  {page.serviceName} em {page.city}
                </span>
                <span className="mono-dim">{page.tags.slice(0, 3).join(' · ')}</span>
                <span className="insight-read">ver página →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export { Blog as Component };
