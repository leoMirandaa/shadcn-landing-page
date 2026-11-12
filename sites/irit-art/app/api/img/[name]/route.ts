import { readImage } from "@/lib/store";

// Public: serves gallery images from Blob storage (works for private stores too).
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(name)) return new Response("Not found", { status: 404 });
  const img = await readImage(name);
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(img.stream, {
    headers: {
      "Content-Type": img.contentType,
      // ids are unique per upload (a replaced image gets a new id), so this is safe to cache hard
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
