export type Artwork = {
  id: string;
  src: string; // "/uploads/x.jpg" (local), "/seed/x.svg", or an absolute Blob URL
  title: string;
  w: number;
  h: number;
};

export type Profile = {
  name: string;
  tagline: string;
  heroLine: string;
  about: string; // paragraphs separated by blank lines
  whatsapp: string; // digits incl. country code, e.g. 972501234567
  phone: string;
  instagram: string; // handle without @
  email: string;
  facebook: string; // full profile/page URL
  photo: string; // portrait shown in the about section ("" = none)
};

export type SiteContent = { profile: Profile; gallery: Artwork[] };

// NOTE: placeholder copy — replace with the artist's own text in /manage.
export const defaultContent: SiteContent = {
  profile: {
    name: "אירית אברהמוב",
    tagline: "פשר החלומות בציור",
    heroLine: "כל חלום מחכה לצבע שלו",
    about:
      "אני אירית, אמנית שמציירת חלומות.\n\nכל ציור מתחיל ברגע שקט, בין שינה להתעוררות, שבו תמונות ורגשות עולים מעצמם. אני אוספת אותם ונותנת להם צבע, צורה ומקום על הבד.\n\nהציורים שלי הם הזמנה להתבונן פנימה, לפענח ולהרגיש — ואולי למצוא בהם משהו מהחלום שלכם.",
    whatsapp: "",
    phone: "054-3453931",
    instagram: "",
    email: "lirazlior@gmail.com",
    facebook: "https://www.facebook.com/profile.php?id=100006808035232",
    photo: "/irit-profile.jpg",
  },
  gallery: [
    { id: "seed-1", src: "/seed/dream-1.svg", title: "ירח בשדה סגול", w: 800, h: 1000 },
    { id: "seed-2", src: "/seed/dream-2.svg", title: "מי החלום", w: 1000, h: 800 },
    { id: "seed-3", src: "/seed/dream-3.svg", title: "פרח אור", w: 800, h: 800 },
    { id: "seed-4", src: "/seed/dream-4.svg", title: "ענן זהב", w: 800, h: 1100 },
    { id: "seed-5", src: "/seed/dream-5.svg", title: "שמיים של בוקר", w: 1100, h: 800 },
    { id: "seed-6", src: "/seed/dream-6.svg", title: "עולם קטן", w: 800, h: 900 },
  ],
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) && v > 0 && v < 20000 ? Math.round(v) : d);

/** Site-local path or https URL only; anything else becomes "". */
const validSrc = (s: string) => ((s.startsWith("/") && !s.startsWith("//")) || s.startsWith("https://") ? s.slice(0, 600) : "");

/** Coerce untrusted JSON (from /manage or storage) into a valid SiteContent. */
export function sanitizeContent(raw: unknown): SiteContent {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, any>;
  const p = (r.profile && typeof r.profile === "object" ? r.profile : {}) as Record<string, unknown>;
  const profile: Profile = {
    name: str(p.name, 80) || defaultContent.profile.name,
    tagline: str(p.tagline, 120),
    heroLine: str(p.heroLine, 160),
    about: str(p.about, 5000),
    whatsapp: str(p.whatsapp, 20).replace(/\D/g, ""),
    phone: str(p.phone, 30),
    instagram: str(p.instagram, 60).replace(/^@/, ""),
    email: str(p.email, 120),
    facebook: str(p.facebook, 300).startsWith("https://") ? str(p.facebook, 300) : "",
    photo: typeof p.photo === "string" ? validSrc(p.photo) : defaultContent.profile.photo,
  };
  const gallery: Artwork[] = (Array.isArray(r.gallery) ? r.gallery : [])
    .slice(0, 200)
    .map((g: any) => ({
      id: str(g?.id, 60) || crypto.randomUUID(),
      src: str(g?.src, 600),
      title: str(g?.title, 120),
      w: num(g?.w, 800),
      h: num(g?.h, 800),
    }))
    // only site-local paths or https URLs
    .filter((g) => validSrc(g.src));
  return { profile, gallery };
}
