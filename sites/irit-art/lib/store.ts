import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { put, get } from "@vercel/blob";
import { defaultContent, sanitizeContent, type SiteContent } from "./content";

/**
 * Persistence. With BLOB_READ_WRITE_TOKEN set (production) content.json and the
 * uploaded images live in Vercel Blob; otherwise (local dev) they live on disk.
 *
 * Works with both private and public Blob stores: the access mode is detected on
 * first use. Images are always served through /api/img/<name> (see app/api/img),
 * so a private store never exposes raw blob URLs.
 */
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const CONTENT_BLOB = "irit-art/content.json";
const IMAGE_PREFIX = "irit-art/art/";
const dataFile = path.join(process.cwd(), "data", "content.json");

type Access = "private" | "public";
let knownAccess: Access | null = null;

/** On Vercel the disk is read-only, so saving without a Blob store can never work — say so clearly. */
function assertWritable() {
  if (!useBlob && process.env.VERCEL) {
    throw new Error("Blob storage is not connected: BLOB_READ_WRITE_TOKEN is missing (connect a Blob store to this Vercel project and redeploy)");
  }
}

async function putBlob(pathname: string, body: string | Buffer, contentType: string) {
  const attempt = (access: Access) =>
    put(pathname, body, { access, contentType, allowOverwrite: true, addRandomSuffix: false });
  if (knownAccess) return attempt(knownAccess);
  try {
    const r = await attempt("private");
    knownAccess = "private";
    return r;
  } catch (e) {
    if (!/private access on a public store|public store/i.test(String((e as Error)?.message))) throw e;
    const r = await attempt("public");
    knownAccess = "public";
    return r;
  }
}

async function readBlob(pathname: string) {
  const order: Access[] = knownAccess ? [knownAccess] : ["private", "public"];
  for (const access of order) {
    try {
      const r = await get(pathname, { access, useCache: false });
      if (!r || r.statusCode !== 200) return null;
      knownAccess = access;
      return r;
    } catch {
      // wrong access mode for this store (or not found) — try the other
    }
  }
  return null;
}

export async function getContent(): Promise<SiteContent> {
  try {
    if (useBlob) {
      const r = await readBlob(CONTENT_BLOB);
      if (!r) return defaultContent;
      return sanitizeContent(JSON.parse(await new Response(r.stream).text()));
    }
    return sanitizeContent(JSON.parse(await fs.readFile(dataFile, "utf8")));
  } catch {
    return defaultContent; // nothing saved yet (or unreadable) → seeded defaults
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  assertWritable();
  const body = JSON.stringify(content, null, 2);
  if (useBlob) {
    await putBlob(CONTENT_BLOB, body, "application/json");
    return;
  }
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, body, "utf8");
}

/** Stores an image and returns the `src` to keep in the gallery. */
export async function saveImage(id: string, bytes: Buffer, contentType: string): Promise<string> {
  assertWritable();
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  if (useBlob) {
    await putBlob(`${IMAGE_PREFIX}${id}.${ext}`, bytes, contentType);
    return `/api/img/${id}.${ext}`;
  }
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${id}.${ext}`), bytes);
  return `/uploads/${id}.${ext}`;
}

/** Streams a stored image (used by /api/img/[name]). */
export async function readImage(name: string) {
  const r = await readBlob(`${IMAGE_PREFIX}${name}`);
  return r ? { stream: r.stream, contentType: r.blob.contentType } : null;
}
