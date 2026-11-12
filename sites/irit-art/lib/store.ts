import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { put, list } from "@vercel/blob";
import { defaultContent, sanitizeContent, type SiteContent } from "./content";

/**
 * Persistence. With BLOB_READ_WRITE_TOKEN set (production) content.json and the
 * uploaded images live in Vercel Blob; otherwise (local dev) they live on disk.
 */
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

/** On Vercel the disk is read-only, so saving without a Blob store can never work — say so clearly. */
function assertWritable() {
  if (!useBlob && process.env.VERCEL) {
    throw new Error("Blob storage is not connected: BLOB_READ_WRITE_TOKEN is missing (connect a Blob store to this Vercel project and redeploy)");
  }
}
const CONTENT_BLOB = "irit-art/content.json";
const dataFile = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  try {
    if (useBlob) {
      const { blobs } = await list({ prefix: CONTENT_BLOB, limit: 1 });
      const hit = blobs.find((b) => b.pathname === CONTENT_BLOB);
      if (!hit) return defaultContent;
      const res = await fetch(`${hit.url}?t=${Date.now()}`, { cache: "no-store" });
      return sanitizeContent(await res.json());
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
    await put(CONTENT_BLOB, body, {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
      addRandomSuffix: false,
    });
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
    const blob = await put(`irit-art/art/${id}.${ext}`, bytes, {
      access: "public",
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return blob.url;
  }
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${id}.${ext}`), bytes);
  return `/uploads/${id}.${ext}`;
}
