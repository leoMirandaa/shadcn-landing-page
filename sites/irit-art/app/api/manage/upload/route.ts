import { saveImage } from "@/lib/store";

const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX = 4 * 1024 * 1024; // Vercel's request body limit is 4.5MB; the client downsizes first

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !TYPES.has(file.type)) return Response.json({ error: "unsupported file" }, { status: 400 });
  if (file.size > MAX) return Response.json({ error: "file too large" }, { status: 413 });
  try {
    const id = crypto.randomUUID();
    const src = await saveImage(id, Buffer.from(await file.arrayBuffer()), file.type);
    return Response.json({ id, src });
  } catch (e) {
    console.error("upload failed", e);
    return Response.json({ error: e instanceof Error ? e.message : "upload failed" }, { status: 500 });
  }
}
