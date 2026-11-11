# Ansora landing page

- `/` and `/en/` — the current landing page: Next.js (App Router), fully static (`output: "export"`),
  Hebrew first with an English version. Copy for both languages lives in `app/_content/content.ts`,
  markup in `app/_components/Landing.tsx`, styles in `app/landing.css`, images in `public/landing-assets/`.
- `/old` and `/old/en/` — the previous Vite + React site, kept in `old/` (its own `package.json`, built
  with `base: "/old/"`). See `old/` for its code.

```bash
npm install
npm run dev        # Next.js landing at http://localhost:3000 (the /old site is not served by next dev;
                   #   run `npm --prefix old install && npm --prefix old run dev` and open :5173/old/)
npm run build      # builds old/, then Next.js, then copies old/dist into out/old
npx serve out      # preview the complete site
```

Deploy: Vercel runs `npm run build` and serves `out/` (see `vercel.json`, which also redirects the
old `/landing` URLs to `/`). The analytics script (Umami) is included on both sites.
