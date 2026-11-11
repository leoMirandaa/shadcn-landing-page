import { Fragment } from "react";
import { CONTENT, REGISTER_URL, type Lang } from "../_content/content";
import { NavTabs } from "./NavTabs";

/** Renders an array of strings as lines separated by <br />. */
const Lines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line, i) => (
      <Fragment key={line}>
        {i > 0 && <br />}
        {line}
      </Fragment>
    ))}
  </>
);

const pad = (n: number) => String(n).padStart(2, "0");

/* Our logo mark (dot + two thick arcs) drawn as SVG so it can animate: the dot
   pops in, the arcs draw themselves, then a soft "signal" pulse runs from the
   dot outward through the arcs and into two faint echo arcs beyond the mark.
   Geometry: arcs share the dot's centre (110,300) and span ±46°. */
const SignalLogo = ({ className = "" }: { className?: string }) => (
  <svg className={`sig ${className}`} viewBox="0 0 500 600" fill="none" aria-hidden="true">
    <path className="sig-echo sig-echo-2" d="M 544.2 -149.6 A 625 625 0 0 1 544.2 749.6" />
    <path className="sig-echo sig-echo-1" d="M 446.9 -48.9 A 485 485 0 0 1 446.9 648.9" />
    <path className="sig-arc sig-arc-2" pathLength={1} d="M 349.7 51.8 A 345 345 0 0 1 349.7 548.2" />
    <path className="sig-arc sig-arc-1" pathLength={1} d="M 252.4 152.5 A 205 205 0 0 1 252.4 447.5" />
    <circle className="sig-dot" cx="110" cy="300" r="100" />
  </svg>
);

export function Landing({ lang }: { lang: Lang }) {
  const c = CONTENT[lang];
  const dir = lang === "he" ? "rtl" : "ltr";
  const arrow = lang === "he" ? "←" : "→";
  const Arrow = () => <span aria-hidden="true">{arrow}</span>;

  return (
    <div dir={dir} lang={lang} className="lp" id="top">
      <a href="#main" className="lp-skip">
        {c.nav.skip}
      </a>

      <NavTabs nav={c.nav} arrow={arrow} lang={lang} />

      <main id="main">
        {/* Hero */}
        <section className="lp-hero">
          <div className="lp-wrap lp-hero-grid">
            <div className="lp-hero-copy">
              <p className="lp-eyebrow lp-hero-eyebrow">
                <span aria-hidden="true" />
                {c.hero.eyebrow}
              </p>
              <h1 className="lp-h1">
                {c.hero.title.line1}
                <br />
                {c.hero.title.line2}
                <em>{c.hero.title.em}</em>
                <br />
                {c.hero.title.line3}
              </h1>
              <p className="lp-hero-lead">
                <Lines lines={c.hero.lead} />
              </p>
              <p className="lp-hero-detail">{c.hero.detail}</p>
              <a href="#launch" className="lp-btn-gold">
                {c.hero.cta} <Arrow />
              </a>
              <p className="lp-hero-note">
                {c.hero.note.before}
                <strong>{c.hero.note.strong}</strong>
                {c.hero.note.after}
              </p>
            </div>
            <div className="lp-hero-visual">
              <SignalLogo />
              <div className="lp-sig-caption">
                <span>{c.hero.caption.kicker}</span>
                <strong>
                  <Lines lines={c.hero.caption.title} />
                </strong>
                <i className="lp-sig-rule" aria-hidden="true" />
                <p>{c.hero.caption.tags}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 01 — Room to grow */}
        <section id="intro" className="lp-intro">
          <div className="lp-wrap lp-intro-grid">
            <p className="lp-eyebrow">{c.intro.eyebrow}</p>
            <div>
              <h2 className="lp-h2">
                <Lines lines={c.intro.title} />
              </h2>
              <p>{c.intro.text}</p>
              <p>
                <strong>{c.intro.strong}</strong>
                {c.intro.after}
              </p>
            </div>
          </div>
        </section>

        {/* 02 — What Ansora does */}
        <section id="work" className="lp-section lp-work">
          <div className="lp-wrap">
            <div className="lp-section-heading">
              <div>
                <p className="lp-eyebrow">{c.work.eyebrow}</p>
                <h2 className="lp-h2">
                  <Lines lines={c.work.title} />
                </h2>
              </div>
              <p>{c.work.lead}</p>
            </div>
            <div className="lp-capabilities">
              {c.work.items.map((item, i) => (
                <article className="lp-capability" key={item.label}>
                  <span className="lp-number">{pad(i + 1)}</span>
                  <span className="lp-cap-label">{item.label}</span>
                  <div>
                    <h3 className="lp-h3">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <span className="lp-cap-mark" aria-hidden="true">
                    {arrow}
                  </span>
                </article>
              ))}
            </div>
            <p className="lp-work-end">{c.work.end}</p>
          </div>
        </section>

        {/* 03 — The knowledge behind it */}
        <section id="knowledge" className="lp-section lp-knowledge">
          <div className="lp-wrap lp-knowledge-grid">
            <div>
              <p className="lp-eyebrow lp-eyebrow-light">{c.knowledge.eyebrow}</p>
              <h2 className="lp-h2">
                <Lines lines={c.knowledge.title} />
              </h2>
              {c.knowledge.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="lp-tags">
                {c.knowledge.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <aside className="lp-experience">
              <span className="lp-experience-label">{c.knowledge.expLabel}</span>
              <div className="lp-years">
                <strong dir="ltr">{c.knowledge.years}</strong>
                <span>
                  <Lines lines={c.knowledge.yearsText} />
                </span>
              </div>
              <h3 className="lp-h3">{c.knowledge.expTitle}</h3>
              <p>{c.knowledge.expText}</p>
              <p className="lp-experience-note">{c.knowledge.expNote}</p>
            </aside>
          </div>
        </section>

        {/* 04 — How it works */}
        <section id="personal" className="lp-section lp-personal">
          <div className="lp-wrap lp-personal-grid">
            <div>
              <p className="lp-eyebrow">{c.personal.eyebrow}</p>
              <h2 className="lp-h2">
                {c.personal.title}
                <em>{c.personal.titleEm}</em>
              </h2>
              {c.personal.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="lp-conversation">
              <span className="lp-conversation-label">{c.personal.flowLabel}</span>
              {c.personal.steps.map((s, i) => (
                <div className="lp-conversation-row" key={s.title}>
                  <span>{pad(i + 1)}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
              <strong className="lp-conversation-bottom">{c.personal.bottom}</strong>
            </div>
          </div>
        </section>

        {/* 05 — Launch offer */}
        <section id="launch" className="lp-section lp-launch">
          <div className="lp-wrap">
            <div className="lp-launch-title">
              <p className="lp-eyebrow">{c.launch.eyebrow}</p>
              <h2 className="lp-h2">
                <Lines lines={c.launch.title} />
              </h2>
              <p>{c.launch.lead}</p>
            </div>
            <div className="lp-offer">
              <div className="lp-price-panel">
                <span className="lp-pill">{c.launch.pill}</span>
                <div className="lp-price" dir="ltr">
                  <strong>{c.launch.amount}</strong>
                  <span>{c.launch.currency}</span>
                </div>
                <p className="lp-per-month">{c.launch.perMonth}</p>
                <p className="lp-price-description">
                  <Lines lines={c.launch.description} />
                </p>
                <a className="lp-btn-gold" href={REGISTER_URL} target="_blank" rel="noopener">
                  {c.launch.cta} <Arrow />
                </a>
              </div>
              <div className="lp-offer-details">
                <p className="lp-offer-kicker">{c.launch.kicker}</p>
                {c.launch.items.map((item, i) => (
                  <article key={item.title}>
                    <span className="lp-offer-num" aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <div>
                      <h3 className="lp-h3">{item.title}</h3>
                      <p>{item.text}</p>
                      {item.value && <span className="lp-value">{item.value}</span>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="lp-section lp-faq">
          <div className="lp-wrap lp-faq-grid">
            <div>
              <p className="lp-eyebrow">{c.faq.eyebrow}</p>
              <h2 className="lp-h2">
                <Lines lines={c.faq.title} />
              </h2>
            </div>
            <div className="lp-questions">
              {c.faq.items.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="lp-closing">
          <div className="lp-wrap">
            <p>{c.closing.kicker}</p>
            <h2 className="lp-h2">
              <Lines lines={c.closing.title} />
            </h2>
            <a className="lp-btn-gold" href={REGISTER_URL} target="_blank" rel="noopener">
              {c.closing.cta} <Arrow />
            </a>
          </div>
          <SignalLogo className="sig-closing" />
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-inner">
          <a href="#top" dir="ltr" className="lp-logo" aria-label="Ansora">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/landing-assets/logo.png" alt="" className="lp-logo-mark" />
            <span>Ansora</span>
          </a>
          <p>{c.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
