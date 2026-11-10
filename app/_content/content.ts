export type Lang = "he" | "en";

export const REGISTER_URL = "https://app.ansora.io/register/sb";
export const SITE_URL = "https://ansora.io";

/** A heading split into lines; each entry renders on its own line. */
type Lines = string[];

export type Content = {
  meta: { title: string; description: string };
  nav: {
    skip: string;
    /** Section tabs in the top bar, in page order. `id` is the section's anchor. */
    tabs: { id: string; label: string }[];
    /** The highlighted tab that jumps to the launch offer. */
    launch: string;
    other: string;
    otherHref: string;
  };
  hero: {
    eyebrow: string;
    /** Rendered as three lines: line1 / line2 + <em>{em}</em> / line3. */
    title: { line1: string; line2: string; em: string; line3: string };
    lead: Lines;
    detail: string;
    cta: string;
    note: { before: string; strong: string; after: string };
    /** Caption beside the animated logo. */
    caption: { kicker: string; title: Lines; tags: string };
  };
  intro: { eyebrow: string; title: Lines; text: string; strong: string; after: string };
  work: {
    eyebrow: string;
    title: Lines;
    lead: string;
    items: { label: string; title: string; text: string }[];
    end: string;
  };
  knowledge: {
    eyebrow: string;
    title: Lines;
    paragraphs: string[];
    tags: string[];
    expLabel: string;
    years: string;
    yearsText: Lines;
    expTitle: string;
    expText: string;
    expNote: string;
  };
  personal: {
    eyebrow: string;
    title: string;
    titleEm: string;
    paragraphs: string[];
    flowLabel: string;
    steps: { title: string; text: string }[];
    bottom: string;
  };
  launch: {
    eyebrow: string;
    title: Lines;
    lead: string;
    pill: string;
    amount: string;
    currency: string;
    perMonth: string;
    description: Lines;
    cta: string;
    kicker: string;
    items: { title: string; text: string; value?: string }[];
  };
  faq: { eyebrow: string; title: Lines; items: { q: string; a: string }[] };
  closing: { kicker: string; title: Lines; cta: string };
  footer: { tagline: string };
};

const he: Content = {
  meta: {
    title: "אנסורה – גם לעסק קטן מגיע מוח עסקי של עסק גדול",
    description:
      "הידע, החשיבה והעשייה של צוות שיווק, בתוכנה אחת שלומדת את העסק שלכם: אסטרטגיה, מסעות לקוח, תוכן, עיצוב ותוכנית עבודה. מחיר השקה: 247 ₪ לחודש + מע״מ.",
  },
  nav: {
    skip: "דילוג לתוכן",
    tabs: [
      { id: "intro", label: "למה אנסורה" },
      { id: "work", label: "מה אנסורה עושה" },
      { id: "knowledge", label: "הידע שמאחוריה" },
      { id: "personal", label: "איך זה עובד" },
      { id: "faq", label: "שאלות נפוצות" },
    ],
    launch: "מבצע ההשקה",
    other: "English",
    otherHref: "/en/",
  },
  hero: {
    eyebrow: "אסטרטגיה ושיווק לעסקים קטנים",
    title: { line1: "גם לעסק קטן", line2: "מגיע ", em: "מוח עסקי", line3: "של עסק גדול." },
    lead: ["הידע, החשיבה והעשייה של צוות שיווק.", "בתוכנה אחת שלומדת את העסק שלכם."],
    detail:
      "אנסורה מגבשת אסטרטגיה, בונה מסעות לקוח, כותבת ומעצבת תוכן ומחברת הכול לתוכנית עבודה. בהתאמה לעסק. בקול שלכם.",
    cta: "אני רוצה להכיר את אנסורה",
    note: { before: "מחיר השקה: ", strong: "247 ₪ לחודש", after: " + מע״מ" },
    caption: {
      kicker: "העסק שלכם. הסגנון שלכם.",
      title: ["חשיבה מקצועית.", "עשייה יומיומית."],
      tags: "אסטרטגיה · מסע לקוח · תוכן · עיצוב",
    },
  },
  intro: {
    eyebrow: "01 / מקום לצמוח",
    title: ["מה שעוד לא למדתם בשיווק,", "כבר לא צריך לעצור את העסק."],
    text: "אתם יודעים לעשות את העבודה שלכם. אבל כדי להביא לקוחות, צריך גם להבין מה מניע אותם, איך לבנות אמון ומה לומר בכל שלב. ואז למצוא זמן לכתוב, לעצב ולהתמיד.",
    strong: "אנסורה מביאה את הידע הזה אל העסק והופכת אותו לעבודה שמתבצעת.",
    after: " אתם מביאים את המומחיות, מכוונים ומאשרים. היא מחברת בין ההיכרות איתכם לבין מה שהשיווק שלכם צריך לעשות.",
  },
  work: {
    eyebrow: "02 / מהחשיבה לעשייה",
    title: ["צוות של יכולות.", "כיוון אחד: העסק שלכם."],
    lead: "העבודה שהייתם מצפים לראות מצוות שיווק, בצורה מותאמת באמת לאסטרטגיה ולקול הייחודי שלכם ובלי לשלם ולנהל ספקים.",
    items: [
      {
        label: "אסטרטגיה",
        title: "מחדדת למה הלקוחות יבחרו דווקא בכם",
        text: "אנסורה לומדת את העסק, מבררת מה חשוב ללקוחות ומגבשת את הערך שיש לכם להציע להם.",
      },
      {
        label: "מסע לקוח",
        title: "מחברת בין היכרות ראשונה לפנייה לעסק",
        text: "היא ממפה את השלבים בדרך לקנייה ומציעה את המסרים והפעולות המתאימים לכל שלב.",
      },
      {
        label: "תוכן ועיצוב",
        title: "הופכת את החשיבה לתוכן שאפשר לפרסם",
        text: "רעיונות, ניסוח ועיצוב לרשתות החברתיות, מתוך האסטרטגיה של העסק ובסגנון האישי שלכם.",
      },
      {
        label: "תוכנית עבודה",
        title: "עוזרת לדעת מה עושים היום",
        text: "תוכנית מעשית שמחברת את הפעולות השוטפות למטרות העסק ועוזרת להתמיד גם בתוך יום עמוס.",
      },
    ],
    end: "הבחירות השיווקיות נבנות סביב הלקוחות, המטרות והאופי של העסק שלכם. יש לכם מקום לבחור דרך שמתאימה לכם.",
  },
  knowledge: {
    eyebrow: "03 / מקצועיות בתוך הטכנולוגיה",
    title: ["מאחורי כל פעולה,", "יש חשיבה עסקית."],
    paragraphs: [
      "אנסורה נשענת על ידע עסקי מעמיק ועל שיטות המבוססות על מדעי ההתנהגות: איך אנשים מקבלים החלטות, מה יוצר עבורם ערך ואיך נבנה אמון לאורך מסע הלקוח.",
      "הידע הזה מכוון את התוכנה בבחירת המסרים, הרעיונות והפעולות שמתאימים לעסק שלכם.",
    ],
    tags: ["ערך לקוח", "קבלת החלטות", "בניית אמון", "מסע לקוח"],
    expLabel: "הניסיון שמאחורי השיטה",
    years: "20+",
    yearsText: ["שנות ניסיון בייעוץ,", "ניהול וצמיחה עסקית"],
    expTitle: "ידע ושיטות שכבר תרמו לצמיחה במאות מיליוני שקלים.",
    expText:
      "הבסיס המקצועי של אנסורה נשען על הניסיון של אלון בייעוץ עסקי וארגוני, בניהול ובשיווק, ועל השכלתו במדעי ההתנהגות ובסוציולוגיה של ארגונים.",
    expNote: "היקף הצמיחה מתייחס לניסיון המצטבר בעבודה עם עסקים, שעליו נשענות השיטות.",
  },
  personal: {
    eyebrow: "04 / היכרות שעושה את ההבדל",
    title: "לומדת את העסק.",
    titleEm: "מכירה את הקול שלכם.",
    paragraphs: [
      "מה אתם מוכרים, למי, במה אתם טובים ואיך אתם אוהבים להתבטא. ההיכרות הזאת היא נקודת המוצא לעבודה של אנסורה.",
      "ככל שאתם משתפים אותה בעוד מידע, דוגמאות והעדפות, נבנית תמונה עשירה יותר של העסק ושל הסגנון האישי שלכם. כך התוכן יכול להישמע כמוכם, והעשייה יכולה להתאים לכם.",
    ],
    flowLabel: "מהשיחה אל העבודה",
    steps: [
      { title: "מספרים לה על העסק", text: "על הלקוחות, ההצעה שלכם, המטרות והסגנון." },
      { title: "מקבלים כיוון ותוכנית", text: "ערך לקוח, מסעות לקוח ופעולות שאפשר להתחיל לבצע." },
      { title: "יוצרים, מדייקים ומתקדמים", text: "אנסורה מציעה, כותבת ומעצבת. אתם מכוונים ומאשרים." },
    ],
    bottom: "הכול מתחיל בשיחה על העסק שלכם.",
  },
  launch: {
    eyebrow: "05 / יוצאים לדרך יחד",
    title: ["תוכנה שעובדת איתכם.", "ליווי שעוזר להתחיל."],
    lead: "לכבוד ההשקה, מצטרפים לאנסורה עם הדרכה וליווי אישי.",
    pill: "מחיר השקה",
    amount: "247",
    currency: "₪",
    perMonth: "לחודש + מע״מ",
    description: ["אסטרטגיה ושיווק לעסק שלכם,", "עם ליווי אישי בתחילת הדרך."],
    cta: "אני רוצה להצטרף לאנסורה",
    kicker: "כל אלה כלולים במבצע ההשקה",
    items: [
      {
        title: "שימוש באנסורה",
        text: "חשיבה אסטרטגית, מסעות לקוח, תוכן, עיצוב ותוכנית עבודה בהתאמה לעסק ולסגנון שלכם.",
      },
      { title: "הדרכה חיה בזום", text: "מכירים את המערכת יחד, בזמן אמת, ולומדים איך לעבוד איתה ביום יום." },
      {
        title: "3 פגישות ליווי אישיות",
        text: "פיצוח ויישום עם יועץ בעל יותר מ־20 שנות ניסיון.",
        value: "בשווי 2,700 ₪ + מע״מ",
      },
    ],
  },
  faq: {
    eyebrow: "לפני שמתחילים",
    title: ["כמה דברים", "שכדאי לדעת."],
    items: [
      {
        q: "צריך לדעת שיווק כדי לעבוד עם אנסורה?",
        a: "אנסורה נבנתה כדי להביא את הידע העסקי והשיווקי לתוך העבודה שלכם. אתם משתפים במה שאתם יודעים על העסק, והיא עוזרת לגבש כיוון ולהפוך אותו לתוכן ולפעולות. הדרכת הזום והפגישות האישיות נועדו לעזור בהתחלה.",
      },
      {
        q: "מה נשאר לי לעשות?",
        a: "להביא את הידע המקצועי שלכם, לשתף במה שקורה בעסק, לבחור, לכוון ולאשר את התוצרים. אנסורה מבצעת חלק גדול מהחשיבה והיצירה, וההיכרות שלכם עם העסק ממשיכה להיות חשובה.",
      },
      {
        q: "איך התוכן מקבל את הסגנון שלי?",
        a: "משתפים את אנסורה בדוגמאות, בהעדפות ובמידע על העסק. ההכוונה שלכם עוזרת לה לדייק את השפה ואת התוכן לפי האופי האישי והמקצועי שלכם.",
      },
      {
        q: "מה כוללת הטבת ההשקה?",
        a: "מחיר השקה של 247 ₪ לחודש בתוספת מע״מ, הדרכה חיה בזום ושלוש פגישות ליווי אישיות לפיצוח וליישום, בשווי 2,700 ₪ בתוספת מע״מ.",
      },
    ],
  },
  closing: {
    kicker: "את הידע המקצועי שלכם כבר יש לכם.",
    title: ["עכשיו תנו לעסק", "גם מוח עסקי."],
    cta: "בואו להכיר את אנסורה",
  },
  footer: { tagline: "אסטרטגיה ושיווק לעסקים קטנים" },
};

const en: Content = {
  meta: {
    title: "Ansora – Even a small business deserves the business brain of a big one",
    description:
      "The knowledge, thinking and execution of a marketing team, in one piece of software that learns your business: strategy, customer journeys, content, design and a work plan. Launch price: 247 NIS a month + VAT.",
  },
  nav: {
    skip: "Skip to content",
    tabs: [
      { id: "intro", label: "Why Ansora" },
      { id: "work", label: "What Ansora does" },
      { id: "knowledge", label: "The knowledge behind it" },
      { id: "personal", label: "How it works" },
      { id: "faq", label: "FAQ" },
    ],
    launch: "Launch offer",
    other: "עברית",
    otherHref: "/",
  },
  hero: {
    eyebrow: "Strategy and marketing for small businesses",
    title: { line1: "Even a small business", line2: "deserves ", em: "the business brain", line3: "of a big one." },
    lead: ["The knowledge, thinking and execution of a marketing team.", "In one piece of software that learns your business."],
    detail:
      "Ansora shapes your strategy, builds customer journeys, writes and designs content, and ties it all into a work plan. Fitted to your business. In your voice.",
    cta: "I want to get to know Ansora",
    note: { before: "Launch price: ", strong: "247 NIS a month", after: " + VAT" },
    caption: {
      kicker: "Your business. Your style.",
      title: ["Professional thinking.", "Everyday execution."],
      tags: "Strategy · Customer journey · Content · Design",
    },
  },
  intro: {
    eyebrow: "01 / Room to grow",
    title: ["What you haven't learned about marketing yet", "no longer has to hold your business back."],
    text: "You know how to do your work. But bringing in customers also means understanding what drives them, how to build trust and what to say at every stage. And then finding the time to write, design and keep at it.",
    strong: "Ansora brings that knowledge into your business and turns it into work that gets done.",
    after: " You bring the expertise, steer and approve. She connects what she learns about you with what your marketing needs to do.",
  },
  work: {
    eyebrow: "02 / From thinking to doing",
    title: ["A team of capabilities.", "One direction: your business."],
    lead: "The work you would expect from a marketing team, truly fitted to your strategy and your unique voice, without paying for and managing suppliers.",
    items: [
      {
        label: "Strategy",
        title: "Sharpens why customers should choose you",
        text: "Ansora learns your business, finds out what matters to your customers and shapes the value you have to offer them.",
      },
      {
        label: "Customer journey",
        title: "Connects a first encounter to a customer reaching out",
        text: "She maps the stages on the way to a purchase and suggests the right messages and actions for each one.",
      },
      {
        label: "Content & design",
        title: "Turns the thinking into content you can publish",
        text: "Ideas, copy and design for social media, built on your business strategy and in your personal style.",
      },
      {
        label: "Work plan",
        title: "Helps you know what to do today",
        text: "A practical plan that ties day-to-day actions to your business goals and helps you keep going, even on a busy day.",
      },
    ],
    end: "Your marketing choices are built around your customers, your goals and the character of your business. There is room to choose the path that suits you.",
  },
  knowledge: {
    eyebrow: "03 / Expertise built into the technology",
    title: ["Behind every action,", "there is business thinking."],
    paragraphs: [
      "Ansora rests on deep business knowledge and on methods grounded in behavioral science: how people make decisions, what creates value for them and how trust is built along the customer journey.",
      "That knowledge guides the software in choosing the messages, ideas and actions that fit your business.",
    ],
    tags: ["Customer value", "Decision making", "Building trust", "Customer journey"],
    expLabel: "The experience behind the method",
    years: "20+",
    yearsText: ["years of experience in consulting,", "management and business growth"],
    expTitle: "Knowledge and methods that have already contributed to hundreds of millions of shekels in growth.",
    expText:
      "Ansora's professional foundation rests on Alon's experience in business and organizational consulting, management and marketing, and on his education in behavioral science and the sociology of organizations.",
    expNote: "The growth figure refers to the cumulative experience of working with businesses, on which the methods are based.",
  },
  personal: {
    eyebrow: "04 / Getting to know you makes the difference",
    title: "Learns your business.",
    titleEm: "Knows your voice.",
    paragraphs: [
      "What you sell, to whom, what you're good at and how you like to express yourself. That understanding is where Ansora's work begins.",
      "The more information, examples and preferences you share, the richer the picture of your business and your personal style becomes. That way the content can sound like you, and the work can fit you.",
    ],
    flowLabel: "From the conversation to the work",
    steps: [
      { title: "Tell her about your business", text: "Your customers, your offer, your goals and your style." },
      { title: "Get a direction and a plan", text: "Customer value, customer journeys and actions you can start on." },
      { title: "Create, refine and move forward", text: "Ansora suggests, writes and designs. You steer and approve." },
    ],
    bottom: "It all starts with a conversation about your business.",
  },
  launch: {
    eyebrow: "05 / Setting out together",
    title: ["Software that works with you.", "Guidance that helps you start."],
    lead: "To celebrate the launch, you join Ansora with training and personal guidance.",
    pill: "Launch price",
    amount: "247",
    currency: "₪",
    perMonth: "a month + VAT",
    description: ["Strategy and marketing for your business,", "with personal guidance at the start."],
    cta: "I want to join Ansora",
    kicker: "All of this is included in the launch offer",
    items: [
      {
        title: "Using Ansora",
        text: "Strategic thinking, customer journeys, content, design and a work plan, fitted to your business and your style.",
      },
      { title: "Live training on Zoom", text: "Get to know the system together, in real time, and learn how to work with it day to day." },
      {
        title: "3 personal guidance sessions",
        text: "Cracking it and putting it into practice with a consultant with more than 20 years of experience.",
        value: "Worth 2,700 NIS + VAT",
      },
    ],
  },
  faq: {
    eyebrow: "Before you start",
    title: ["A few things", "worth knowing."],
    items: [
      {
        q: "Do I need to know marketing to work with Ansora?",
        a: "Ansora was built to bring business and marketing knowledge into your work. You share what you know about your business, and she helps shape a direction and turn it into content and actions. The Zoom training and the personal sessions are there to help you get started.",
      },
      {
        q: "What's left for me to do?",
        a: "Bring your professional knowledge, share what is happening in the business, choose, steer and approve the output. Ansora does a large part of the thinking and creating, and your understanding of the business stays important.",
      },
      {
        q: "How does the content get my style?",
        a: "Share examples, preferences and information about your business with Ansora. Your guidance helps her fine-tune the language and the content to your personal and professional character.",
      },
      {
        q: "What does the launch offer include?",
        a: "A launch price of 247 NIS a month plus VAT, live training on Zoom and three personal guidance sessions to crack it and put it into practice, worth 2,700 NIS plus VAT.",
      },
    ],
  },
  closing: {
    kicker: "You already have the professional knowledge.",
    title: ["Now give your business", "a business brain too."],
    cta: "Come meet Ansora",
  },
  footer: { tagline: "Strategy and marketing for small businesses" },
};

export const CONTENT: Record<Lang, Content> = { he, en };
