/** Mount path ("/irit-art" under ansora.io, "" on its own domain). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a site-local path (e.g. "/logo.png") with the mount path; absolute URLs pass through. */
export function asset(src: string): string {
  return /^(https?:)?\/\//.test(src) || src.startsWith("data:") ? src : BASE + src;
}
