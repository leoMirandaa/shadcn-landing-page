import { asset } from "@/lib/base";
import { getContent } from "@/lib/store";
import { Dreamscape } from "./_components/Dreamscape";
import { Gallery } from "./_components/Gallery";

// Content is edited at runtime from /manage, so render per request.
export const dynamic = "force-dynamic";

export default async function Page() {
  const { profile, gallery } = await getContent();
  const paragraphs = profile.about.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const wa = profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : "";

  return (
    <>
      <Dreamscape />

      <header className="nav">
        <a href="#top" className="nav-name">{profile.name}</a>
        <nav>
          <a href="#gallery">גלריה</a>
          <a href="#about">אודות</a>
          <a href="#contact">יצירת קשר</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-logo">
            <img src={asset("/logo.png")} alt={`${profile.name} — ${profile.tagline}`} width={286} height={216} />
          </div>
          {profile.heroLine && <h1 className="hero-line">{profile.heroLine}</h1>}
          <a className="hero-cta" href="#gallery">לצפייה בציורים</a>
          <a className="scroll-cue" href="#gallery" aria-label="גלול למטה"><span /></a>
        </section>

        <section id="gallery" className="section">
          <h2 className="section-title">הגלריה</h2>
          <p className="section-sub">חלומות שנוצקו לצבע</p>
          <Gallery items={gallery} />
        </section>

        <section id="about" className="section about">
          <h2 className="section-title">אודות</h2>
          <div className={`about-card glass reveal-on-scroll${profile.photo ? " has-photo" : ""}`}>
            {profile.photo && (
              <div className="about-photo">
                <img src={asset(profile.photo)} alt={profile.name} loading="lazy" />
              </div>
            )}
            <div className="about-text">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div className="about-sign">{profile.name}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2 className="section-title">בואו נדבר</h2>
          <p className="section-sub">רוצים ציור, או לפענח חלום? אשמח לשמוע.</p>
          <div className="contact-links">
            {wa && <a className="pill" href={wa} target="_blank" rel="noopener noreferrer">וואטסאפ</a>}
            {profile.phone && <a className="pill" href={`tel:${profile.phone}`} dir="ltr">{profile.phone}</a>}
            {profile.instagram && <a className="pill" href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer">אינסטגרם</a>}
            {profile.facebook && <a className="pill" href={profile.facebook} target="_blank" rel="noopener noreferrer">פייסבוק</a>}
            {profile.email && <a className="pill" href={`mailto:${profile.email}`}>אימייל</a>}
            {!wa && !profile.phone && !profile.instagram && !profile.facebook && !profile.email && <span className="muted">פרטי הקשר יתווספו בקרוב</span>}
          </div>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name} · נבנה ע״י <a href="https://ansora.io" target="_blank" rel="noopener noreferrer">Ansora</a>
      </footer>
    </>
  );
}
