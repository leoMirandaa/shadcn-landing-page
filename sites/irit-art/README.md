# irit-art — artist gallery site

Self-contained Next.js app (own package.json) so it can move to its own repo as-is.

- `/` public gallery (Hebrew, RTL, dreamy). `/manage` editor, HTTP Basic auth via `MANAGE_USER` / `MANAGE_PASSWORD`.
- Theme (purple etc.): `lib/theme.ts`. Placeholder copy/gallery: `lib/content.ts`.
- Storage: Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set, else `./data` + `./public/uploads` (dev).
- `NEXT_PUBLIC_BASE_PATH=/irit-art` while mounted under ansora.io; empty on its own domain.
- `npm install && npm run dev` → http://localhost:3100 (see `.env.example`).
