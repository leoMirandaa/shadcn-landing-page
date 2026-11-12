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
  const talk = wa || (profile.phone ? `tel:${profile.phone}` : "#contact");
  const steps = [
    { n: "1", title: "שיחת כוונה אישית", body: "לפני שאירית ממליצה על ציור, היא שואלת אותך מה הכאב שלך, מה חסר לך ומה את רוצה לזמן לעצמך. רק מתוך ההיכרות הזו נבחר הציור, יחד איתך.", feel: "תרגישי שמישהי באמת שמעה אותך." },
    { n: "2", title: "שיטה שמסבירה למה זה עובד", body: "השיטה של אירית מחברת בין פשר חלומות יהודי לפשר חלומות פרוידיאני. שניהם מסבירים איך סמלים ויזואליים מעוררים את התת-מודע. כך הציור נבחר לפי משמעות, לא לפי טעם אסתטי או צבע הספה.", feel: "תביני למה דווקא הציור הזה ולא אחר." },
    { n: "3", title: "פעולה ממשית מול חוסר אונים", body: "הציור שנבחר אינו קישוט. הוא פעולת כוונה, שנועדה לעורר תהליך פנימי לכיוון מה שאת רוצה להגשים: זוגיות, בריאות, שפע, פרי בטן.", feel: "סוף סוף עושים משהו, לא רק מחכים." },
  ];

  return (
    <>
      <Dreamscape />

      <header className="nav">
        <a href="#top" className="nav-name">{profile.name}</a>
        <nav>
          <a href="#method">השיטה</a>
          <a href="#gallery">גלריה</a>
          <a href="#about">אודות</a>
          <a href="#contact">יצירת קשר</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-logo">
            <img src={asset("/logo.png")} alt={`${profile.name} — ${profile.tagline}`} width={955} height={747} />
          </div>
          {profile.heroLine && <h1 className="hero-line">{profile.heroLine}</h1>}
          {profile.heroSub && <p className="hero-sub">{profile.heroSub}</p>}
          <div className="cta-row">
            <a className="hero-cta" href={talk} {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}>לשיחת כוונה אישית</a>
            <a className="hero-cta ghost" href="#gallery">לצפייה בציורים</a>
          </div>
          <a className="scroll-cue" href="#gallery" aria-label="גלול למטה"><span /></a>
        </section>

        <section id="method" className="section">
          <h2 className="section-title">איך זה עובד</h2>
          <p className="section-sub">שלושה צעדים, מחוסר אונים לפעולה</p>
          <div className="steps">
            {steps.map((s, i) => (
              <article key={s.n} className="step glass reveal-on-scroll" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="step-feel">{s.feel}</p>
              </article>
            ))}
          </div>
        </section>

        {profile.story && (
          <section className="section story-sec">
            <figure className="story glass reveal-on-scroll">
              <span className="story-tag">סיפור אמיתי</span>
              <blockquote>{profile.story}</blockquote>
              <figcaption>הציור אינו תחליף לטיפול רפואי.</figcaption>
            </figure>
          </section>
        )}

        <section id="gallery" className="section">
          <h2 className="section-title">הגלריה</h2>
          <p className="section-sub">ציורים שנבחרים מתוך שיחה, לא מקטלוג</p>
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
          <h2 className="section-title">מוכנה לשיחת כוונה?</h2>
          <p className="section-sub">ספרי לי מה את רוצה לזמן לחיים שלך, ומשם נתחיל.</p>
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
