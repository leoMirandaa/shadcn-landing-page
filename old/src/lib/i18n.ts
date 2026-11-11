/**
 * Landing-page i18n.
 *
 * Mirrors the shape of frontend/lib/i18n.ts (flat dot-namespaced keys, an
 * { en, he } pair per key, a useI18n() hook returning { lang, dir, t }) so
 * copy can move between the two without reformatting.
 *
 * The language is the URL: /old/ is Hebrew, /old/en/ is English (this site is served under /old). Each is prerendered
 * to its own static HTML file at build time (scripts/prerender.mjs), so search
 * engines index both versions and neither depends on a crawler's locale. The
 * "send this visitor to their language" decision is an inline script in
 * index.html's <head>, so it runs before anything paints.
 */

import { createContext, createElement, useCallback, useContext, type ReactNode } from "react";

export type Lang = "en" | "he";

/** Read by the inline redirect script in index.html — keep the two in sync. */
const STORAGE_KEY = "ansora_landing_lang";

export const SITE_URL = "https://ansora.io";
export const LANG_PATH: Record<Lang, string> = { he: "/old/", en: "/old/en/" };

export function langFromPath(pathname: string): Lang {
  return /^\/old\/en(\/|$)/.test(pathname) ? "en" : "he";
}

/** An explicit pick from the language switcher, honoured on later visits. */
export function rememberLang(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Safari private mode throws on localStorage access.
  }
}

const LangContext = createContext<Lang>("he");

export const LangProvider = ({ lang, children }: { lang: Lang; children: ReactNode }) =>
  createElement(LangContext.Provider, { value: lang }, children);

/** Where every CTA lands. The plan id is passed through so the funnel can be
 *  attributed even though /register/sb doesn't read it yet — see README. */
export const REGISTER_URL = "https://www.app.ansora.io/register/sb";
export const LOGIN_URL = "https://www.app.ansora.io/auth/login";

export function registerUrl(plan?: string): string {
  return plan ? `${REGISTER_URL}?plan=${encodeURIComponent(plan)}` : REGISTER_URL;
}

export function translate(lang: Lang, key: TranslationKey): string {
  return translations[key]?.[lang] ?? key;
}

export function useI18n() {
  const lang = useContext(LangContext);
  const t = useCallback((key: TranslationKey): string => translate(lang, key), [lang]);

  return {
    lang,
    dir: (lang === "he" ? "rtl" : "ltr") as "rtl" | "ltr",
    isHebrew: lang === "he",
    t,
  };
}

// ── Copy ─────────────────────────────────────────────────────────────────────

const translations = {
  // <head> — titles and descriptions search results and link previews show
  "meta.title": {
    en: "Ansora: strategy and marketing for small businesses, from your phone",
    he: "Ansora, אסטרטגיה ושיווק לעסקים קטנים, מהנייד",
  },
  "meta.description": {
    en: "A short WhatsApp interview, and Ansora builds your marketing strategy: who your competitors are, where the gap in the market is, and what customers really say. Then a weekly work plan and posts that sound like you, on your phone.",
    he: "ראיון קצר בוואטסאפ, ו-Ansora בונה לכם אסטרטגיה שיווקית: מי המתחרים, איפה הפער בשוק ומה הלקוחות באמת אומרים. משם מקבלים לנייד תוכנית עבודה שבועית ופוסטים שנשמעים כמוכם. בעברית מלאה.",
  },
  "meta.share_description": {
    en: "A short WhatsApp interview, and Ansora builds your strategy and a weekly work plan, on your phone.",
    he: "ראיון קצר בוואטסאפ, ו-Ansora בונה לכם אסטרטגיה ותוכנית עבודה שבועית, מהנייד.",
  },
  "meta.org_description": {
    en: "AI marketing for small businesses.",
    he: "שיווק מבוסס AI לעסקים קטנים.",
  },

  // Navigation
  "nav.what": { en: "What is Ansora", he: "מה זה Ansora" },
  "nav.how": { en: "How it works", he: "איך זה עובד" },
  "nav.features": { en: "Features", he: "יכולות" },
  "nav.pricing": { en: "Pricing", he: "מחירים" },
  "nav.faq": { en: "FAQ", he: "שאלות נפוצות" },
  "nav.login": { en: "Sign in", he: "התחברות" },
  "nav.register": {
    en: "Get started",
    he: "בואו נתחיל",
  },
  "nav.menu": { en: "Open menu", he: "תפריט" },
  "nav.language": { en: "Language", he: "שפה" },
  "a11y.skip": { en: "Skip to content", he: "דילוג לתוכן" },

  // Hero
  "hero.eyebrow": {
    en: "AI marketing for small businesses",
    he: "שיווק ב-AI לעסקים קטנים",
  },
  "hero.badge": {
    en: "Start with strategy, then the posts",
    he: "מתחילים באסטרטגיה, ועוברים לפוסטים",
  },
  "hero.title_line1": {
    en: "Before writing a post,",
    he: "לפני שכותבים פוסט",
  },
  "hero.title_highlight": {
    en: "understand your business",
    he: "מבינים את העסק שלכם",
  },
  "hero.title_line2": {
    en: "and the market around it",
    he: "ואת השוק שסביבו",
  },
  "hero.subtitle": {
    en: "A short WhatsApp interview, and Ansora builds your strategy: who your competitors are, where the white space is, and what customers really say. From there, on your phone, you get a weekly work plan and posts and images that sound like you, ready to publish.",
    he: "ראיון קצר בוואטסאפ, ו-Ansora בונה לכם אסטרטגיה: מי המתחרים, איפה הפער בשוק, ומה הלקוחות באמת אומרים. משם, מהנייד, מקבלים תכנית עבודה שבועית ופוסטים ותמונות שנשמעים כמוכם, מוכנים לפרסום.",
  },
  "hero.cta_primary": {
    en: "Get started",
    he: "מתחילים עכשיו",
  },
  "hero.cta_secondary": { en: "See how it works", he: "לראות איך זה עובד" },
  "hero.proof_1": {
    en: "A short WhatsApp interview",
    he: "ראיון קצר בוואטסאפ",
  },
  "hero.proof_2": {
    en: "Work from your phone and computer",
    he: "עבודה מהנייד והמחשב",
  },
  "hero.proof_3": { en: "Hebrew and English", he: " ממשק בעברית ובאנגלית" },
  "hero.channels_label": { en: "Publish to", he: "מפרסמים אל" },

  "hero.whatsapp_alt": {
    en: "A WhatsApp conversation with Ansora, on a phone",
    he: "שיחת וואטסאפ עם Ansora, בנייד",
  },

  // What is Ansora
  "what.eyebrow": { en: "What is Ansora", he: "מה זה Ansora" },
  "what.title": {
    en: "A marketing strategy for your small business, without the agency",
    he: "אסטרטגיה שיווקית לעסק קטן, בלי להעסיק סוכנות",
  },
  "what.body": {
    en: "Small businesses know exactly what makes them good, but rarely have the time or budget to turn it into a strategy and keep showing up. Ansora gets to know you, studies your market, and then works with you week after week.",
    he: "עסקים קטנים יודעים בדיוק מה הופך אותם לטובים, אבל לרוב אין להם זמן או תקציב להפוך את זה לאסטרטגיה ולהמשיך להופיע. Ansora מכירה אתכם, לומדת את השוק, ואז עובדת איתכם שבוע אחר שבוע.",
  },
  "what.card1_title": {
    en: "Ansora gets to know you",
    he: "Ansora מכירה אתכם",
  },
  "what.card1_body": {
    en: "A short interview in your own words, then a memory of your business that keeps growing: your stories, your customers' lines, what you refuse to do.",
    he: "ראיון קצר במילים שלכם, ואחריו זיכרון עסקי שממשיך לגדול: הסיפורים שלכם, מה שלקוחות אומרים, ומה אתם מסרבים לעשות.",
  },
  "what.card2_title": {
    en: "Ansora maps your market",
    he: "Ansora ממפה את השוק",
  },
  "what.card2_body": {
    en: "Competitors, the white space nobody owns, what customers complain about, the news and the opinion leaders in your field.",
    he: "מתחרים, הפער בשוק שאף אחד עוד לא תפס, על מה לקוחות מתלוננים, והחדשות ומובילי הדעה בתחום שלכם.",
  },
  "what.card3_title": {
    en: "Ansora works with you every week",
    he: "Ansora עובדת איתכם כל שבוע",
  },
  "what.card3_body": {
    en: "A work plan for the week, a marketing assistant that knows your business, and posts, images and flyers ready to publish.",
    he: "תכנית עבודה לשבוע, עוזרת שיווקית שמכירה את העסק, ופוסטים, תמונות ופלאיירים מוכנים לפרסום.",
  },

  // How it works
  "how.eyebrow": { en: "How it works", he: "איך זה עובד" },
  "how.title": {
    en: "From one interview to a weekly marketing routine",
    he: "מראיון אחד לשגרת שיווק שבועית",
  },
  "how.subtitle": {
    en: "The interview happens in WhatsApp. Everything after it happens in the app, on your phone or your computer.",
    he: "הראיון קורה בוואטסאפ. כל מה שאחריו קורה באפליקציה, בנייד או במחשב.",
  },
  "how.step1_label": { en: "Step 1", he: "שלב 1" },
  "how.step1_title": {
    en: "Register and get interviewed",
    he: "נרשמים ומתראיינים",
  },
  "how.step1_body": {
    en: "Register in a minute, then answer a short interview on WhatsApp about your business, your customers and what sets you apart. Answer whenever you have a free minute.",
    he: "נרשמים בדקה, ואז עונים בוואטסאפ על ראיון קצר על העסק, הלקוחות ומה שמייחד אתכם. בזמנכם הפנוי.",
  },
  "how.step2_label": { en: "Step 2", he: "שלב 2" },
  "how.step2_title": {
    en: "Ansora analyses your competitors and market",
    he: "Ansora מנתחת את המתחרים והשוק",
  },
  "how.step2_body": {
    en: "Ansora analyses your competitors and your presence in the media. It analyses the data and looks for the white space they left open, and reads your own past posts to see what worked.",
    he: "Ansora מנתחת את המתחרים שלכם ואת הנוכחות שלכם במדיה. היא מנתחת את הנתונים ומחפשת את הפער בשוק שנותר פתוח",
  },
  "how.step3_label": { en: "Step 3", he: "שלב 3" },
  "how.step3_title": {
    en: "You get a strategy and a clear plan",
    he: "מקבלים אסטרטגיה ותכנית עבודה ברורה",
  },
  "how.step3_body": {
    en: "Ansora builds a strategy, a value proposition, a customer journey report, news feed and a weekly work plan. The plan updates automatically as you complete tasks.",
    he: "Ansora בונה מיצוב, הצעת ערך, דוח מסע לקוח, פיד חדשות ותכנית עבודה שבועית שמתעדכנת בהתאם למה שתבצעו. ",
  },
  "how.step4_label": { en: "Step 4", he: "שלב 4" },
  "how.step4_title": {
    en: "Create a post, approve it, publish it to social media",
    he: "יוצרים פוסט, מאשרים ומפרסמים ברשתות החברתיות",
  },
  "how.step4_body": {
    en: "Pick a task from the plan or a news item, talk it through with the assistant, add a photo or an AI image, then publish. From the phone, in a few minutes.",
    he: "בוחרים משימה מהתכנית או כתבה מהחדשות, מדברים עליה עם העוזרת, מוסיפים תמונה או תמונת AI, ומפרסמים. מהנייד, בכמה דקות.",
  },

  // Anywhere section
  "anywhere.eyebrow": { en: "Phone and desktop", he: "בנייד ובמחשב" },
  "anywhere.title": {
    en: "Run your social media from your phone, go deeper on your computer",
    he: "מנהלים את הרשתות החברתיות מהנייד, ומעמיקים במחשב",
  },
  "anywhere.body": {
    en: "Most of the work happens from your phone, between one customer and the next: a photo, a quick chat with the assistant, publish. When you want to sit down, the computer gives you the full picture: the strategy, the competitor arena and the customer journey report. Nothing to install.",
    he: "רוב העבודה קורית מהנייד, בין לקוח ללקוח: תמונה, שיחה קצרה עם העוזרת, פרסום. וכשרוצים לשבת, המחשב נותן את התמונה המלאה: האסטרטגיה, זירת המתחרים ודוח מסע הלקוח. בלי להתקין כלום.",
  },
  "anywhere.point1": {
    en: "Mobile-first, no app to install",
    he: "נבנה לנייד, בלי להתקין אפליקציה",
  },
  "anywhere.point2": {
    en: "Post in minutes, between customers",
    he: "פוסט בכמה דקות, בין לקוח ללקוח",
  },
  "anywhere.point3": {
    en: "Desktop for strategy and analysis",
    he: "מחשב לאסטרטגיה ולניתוח",
  },
  "anywhere.point4": { en: "Full right-to-left Hebrew", he: "עברית מלאה מימין לשמאל" },
  "anywhere.caption_desktop": { en: "The Workshop, on desktop", he: "בית המלאכה, במחשב" },
  "anywhere.caption_mobile": { en: "Publishing, on mobile", he: "פרסום, בנייד" },

  // Features
  "features.eyebrow": { en: "What you get", he: "מה מקבלים" },
  "features.title": {
    en: "Strategy, social media posts and market analysis, in one place",
    he: "אסטרטגיה, פוסטים לרשתות החברתיות וניתוח שוק, במקום אחד",
  },
  "features.f1_title": {
    en: "An AI marketing assistant that writes in your voice",
    he: "עוזרת שיווק AI שכותבת פוסטים בקול שלכם",
  },
  "features.f1_body": {
    en: "Describe an idea, send a photo or pick a news item. The assistant asks what's missing and writes in your voice, using what it remembers about your business.",
    he: "תארו רעיון, שלחו תמונה או בחרו כתבה. העוזרת שואלת מה חסר וכותבת בקול שלכם, לפי מה שהיא זוכרת על העסק.",
  },
  "features.f2_title": { en: "AI images and video", he: "תמונות וסרטונים ב-AI" },
  "features.f2_body": {
    en: "Generate an image for a post, or bring your own photos and let Ansora crop, arrange and caption them.",
    he: "אפשר לייצר תמונה לפוסט, או להביא תמונות משלכם ולתת ל-Ansora לחתוך, לסדר ולכתוב עליהן.",
  },
  "features.f3_title": {
    en: "Weekly marketing plan",
    he: "תוכנית שיווק שבועית",
  },
  "features.f3_body": {
    en: "What to do this week, based on your growth plan, with each task one tap away from a finished post.",
    he: "מה לעשות השבוע, על בסיס תוכנית הצמיחה שלכם, וכל משימה במרחק לחיצה מפוסט מוכן.",
  },
  "features.f4_title": {
    en: "News, inspiration and opinion leaders",
    he: "חדשות, השראה ומובילי דעה",
  },
  "features.f4_body": {
    en: "Everything happening in your world in one feed: industry news, your competitors and the voices worth following, each with a post angle ready to use.",
    he: "כל מה שקורה בעולם שלכם בפיד אחד: חדשות הענף, המתחרים והקולות ששווה לעקוב אחריהם, ולכל פריט זווית לפוסט.",
  },
  "features.f5_title": {
    en: "Competitor analysis and market gaps",
    he: "ניתוח מתחרים ופערים בשוק",
  },
  "features.f5_body": {
    en: "Who you're really up against, what they promise, and the white space nobody owns yet, so you take a position instead of fighting for one.",
    he: "מול מי אתם באמת מתמודדים, מה הם מבטיחים, ואיפה יש פער בשוק שאף אחד עוד לא תפס, כדי לתפוס מיצוב במקום להילחם עליו.",
  },
  "features.f6_title": {
    en: "Customer journey report",
    he: "דוח מסע לקוח",
  },
  "features.f6_body": {
    en: "See your business the way a new customer sees it: your real posts, profiles and reviews, scored by platform, with what's missing and what to fix first.",
    he: "רואים את העסק כמו שלקוח חדש רואה אותו: הפוסטים, הפרופילים והביקורות האמיתיים שלכם, עם ציון לכל פלטפורמה, מה חסר ומה לתקן קודם.",
  },

  // Pricing
  "pricing.eyebrow": { en: "Pricing", he: "מחירים" },
  "pricing.title": { en: "Pick a plan, change it whenever", he: "בוחרים מסלול, מחליפים מתי שרוצים" },
  "pricing.subtitle": {
    en: "Two plans. Prices are per business, not per user.",
    he: "שני מסלולים. המחיר הוא לעסק, לא למשתמש.",
  },
  "pricing.monthly": { en: "Monthly", he: "חודשי" },
  "pricing.annual": { en: "Annual", he: "שנתי" },
  "pricing.save": { en: "2 months free", he: "חודשיים חינם" },
  "pricing.per_month": { en: "/ month + VAT", he: "לחודש + מע״מ" },
  "pricing.billed_annually": { en: "billed annually", he: "בחיוב שנתי" },
  "pricing.popular": { en: "Most popular", he: "הכי פופולרי" },
  "pricing.custom": { en: "Custom", he: "בהתאמה" },
  "pricing.vat_note": { en: "All prices exclude VAT.", he: "כל המחירים אינם כוללים מע״מ." },


  "plan.growth_name": { en: "Growth", he: "צמיחה" },
  "plan.growth_desc": {
    en: "Strategy, content and market tracking, published on the spot.",
    he: "אסטרטגיה, תוכן ומעקב שוק, עם פרסום מיידי.",
  },
  "plan.growth_cta": { en: "Start Growth", he: "מתחילים בצמיחה" },
  "plan.growth_f1": {
    en: "WhatsApp interview and brand foundation",
    he: "ראיון וואטסאפ ובסיס מותג",
  },
  "plan.growth_f2": {
    en: "Unlimited posts and AI images, in Hebrew and English",
    he: "פוסטים ותמונות AI ללא הגבלה, בעברית ובאנגלית",
  },
  "plan.growth_f3": {
    en: "Facebook, Instagram, LinkedIn and TikTok",
    he: "פייסבוק, אינסטגרם, לינקדאין וטיקטוק",
  },
  "plan.growth_f4": {
    en: "Weekly work plan",
    he: "תכנית עבודה שבועית",
  },
  "plan.growth_f5": {
    en: "News, inspiration and opinion leaders",
    he: "חדשות, השראה ומובילי דעה",
  },
  "plan.growth_f6": {
    en: "Competitor arena, white space and customer journey report",
    he: "זירת מתחרים, פערים בשוק ודוח מסע לקוח",
  },
  "plan.growth_f7": {
    en: "Immediate publishing",
    he: "פרסום מיידי",
  },

  "plan.pro_name": { en: "Pro", he: "מקצועי" },
  "plan.pro_desc": {
    en: "Everything in Growth, plus scheduling and paid promotion.",
    he: "כל מה שבצמיחה, ובנוסף תזמון פוסטים וקידום ממומן.",
  },
  "plan.pro_cta": { en: "Start Pro", he: "מתחילים במקצועי" },
  "plan.pro_f1": {
    en: "Everything in Growth",
    he: "כל מה שבצמיחה",
  },
  "plan.pro_f2": {
    en: "Scheduled posts",
    he: "תזמון פוסטים",
  },
  "plan.pro_f3": {
    en: "Paid promotion",
    he: "פרסום ממומן",
  },

  // Sticky CTA
  "sticky.headline": { en: "Ready to start?", he: "מוכנים להתחיל?" },
  "sticky.sub": {
    en: "Two plans, priced per business",
    he: "שני מסלולים, מחיר לעסק",
  },
  "sticky.cta": { en: "Choose a plan", he: "בחירת מסלול" },
  "sticky.close": { en: "Close", he: "סגירה" },
  "sticky.pick": { en: "Pick your plan", he: "בחרו את המסלול שלכם" },

  // FAQ
  "faq.eyebrow": { en: "Questions", he: "שאלות" },
  "faq.title": { en: "Frequently asked questions", he: "שאלות נפוצות לפני שנרשמים" },
  "faq.q1": { en: "Do I need to install anything?", he: "צריך להתקין משהו?" },
  "faq.a1": {
    en: "No. Ansora talks to you in the WhatsApp you already have. The web app runs in a browser on your phone or computer, there's nothing to download.",
    he: "לא. Ansora מדברת איתכם בוואטסאפ שכבר יש לכם. האפליקציה רצה בדפדפן בנייד או במחשב, אין מה להוריד.",
  },
  "faq.q2": { en: "Does it really work in Hebrew?", he: "זה באמת עובד בעברית?" },
  "faq.a2": {
    en: "Yes, the interview, the posts and the whole interface are built for Hebrew, right-to-left, not translated after the fact. You can switch to English at any point.",
    he: "כן, הראיון, הפוסטים וכל הממשק בנויים לעברית מימין לשמאל, לא מתורגמים בדיעבד. אפשר לעבור לאנגלית בכל רגע.",
  },
  "faq.q3": { en: "Will the posts sound like a robot?", he: "הפוסטים יישמעו כמו רובוט?" },
  "faq.a3": {
    en: "That's what the interview is for. Ansora writes from your own answers, your positioning and your real market, and you see every draft before anything goes out.",
    he: "בדיוק בשביל זה הראיון. Ansora כותבת מהתשובות שלכם, מהמיצוב שלכם ומהשוק האמיתי שלכם, ואתם רואים כל טיוטה לפני שמשהו יוצא.",
  },
  "faq.q4": { en: "Which channels can it publish to?", he: "לאילו ערוצים אפשר לפרסם?" },
  "faq.a4": {
    en: "Facebook, Instagram, LinkedIn and TikTok. Ansora prepares the post and you publish it to any of them straight from your phone, through its native share.",
    he: "פייסבוק, אינסטגרם, לינקדאין וטיקטוק. Ansora מכינה את הפוסט, ואתם מפרסמים אותו לכל אחד מהם ישירות מהנייד, דרך השיתוף של המכשיר.",
  },
  "faq.q5": {
    en: "Will it message me out of nowhere?",
    he: "היא תשלח לי הודעות מיוזמתה?",
  },
  "faq.a5": {
    en: "WhatsApp is only for the interview, and Ansora never starts a WhatsApp conversation on her own. If you allow it, the app can send you notifications that nudge you to come back and post. You can turn them off at any time.",
    he: "וואטסאפ משמש רק לראיון, ו-Ansora אף פעם לא פותחת שיחת וואטסאפ מיוזמתה. אם תאשרו, האפליקציה תשלח לכם התראות שמעודדות להיכנס ולפרסם, ואפשר לבטל אותן בכל רגע.",
  },
  "faq.q6": { en: "What happens to my business data?", he: "מה קורה עם המידע של העסק שלי?" },
  "faq.a6": {
    en: "It's used to build your brand foundation and write your content, and nothing else. It isn't shared with other businesses and it isn't sold.",
    he: "הוא משמש לבניית בסיס המותג שלכם ולכתיבת התוכן שלכם, וזה הכול. הוא לא משותף עם עסקים אחרים ולא נמכר.",
  },

  // Final CTA
  "final.title": {
    en: "Start with one interview",
    he: "מתחילים בראיון אחד",
  },
  "final.body": {
    en: "Register, answer a few questions on WhatsApp, and let Ansora build the strategy and keep the content going.",
    he: "נרשמים, עונים על כמה שאלות בוואטסאפ, ו-Ansora בונה את האסטרטגיה ודואגת לתוכן השוטף.",
  },
  "final.cta": {
    en: "Get started",
    he: "מתחילים עכשיו",
  },

  // Footer
  "footer.tagline": {
    en: "AI marketing for small businesses.",
    he: "שיווק מבוסס AI לעסקים קטנים.",
  },
  "footer.product": { en: "Product", he: "המוצר" },
  "footer.company": { en: "Company", he: "החברה" },
  "footer.privacy": { en: "Privacy", he: "פרטיות" },
  "footer.contact": { en: "Contact", he: "צור קשר" },
  "footer.rights": { en: "All rights reserved.", he: "כל הזכויות שמורות." },
  "footer.back_to_top": { en: "Back to top", he: "חזרה למעלה" },
} satisfies Record<string, { en: string; he: string }>;

export type TranslationKey = keyof typeof translations;
