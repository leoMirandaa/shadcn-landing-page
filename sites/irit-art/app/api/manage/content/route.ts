import { revalidatePath } from "next/cache";
import { sanitizeContent } from "@/lib/content";
import { getContent, saveContent } from "@/lib/store";

export async function GET() {
  return Response.json(await getContent());
}

export async function PUT(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }
  const content = sanitizeContent(raw);
  try {
    await saveContent(content);
  } catch (e) {
    console.error("save failed", e);
    return Response.json({ error: e instanceof Error ? e.message : "save failed" }, { status: 500 });
  }
  revalidatePath("/");
  return Response.json(content);
}
