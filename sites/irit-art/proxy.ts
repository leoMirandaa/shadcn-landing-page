import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * HTTP Basic auth in front of /manage and /api/manage/*. Credentials come from
 * MANAGE_USER / MANAGE_PASSWORD; if they are not set we fail closed (503).
 */
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

function decodeBasic(header: string): [string, string] | null {
  try {
    // atob yields a binary string; re-decode as UTF-8 so non-ASCII passwords work.
    const bin = atob(header.slice(6));
    const text = new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
    const i = text.indexOf(":");
    return i < 0 ? null : [text.slice(0, i), text.slice(i + 1)];
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const user = process.env.MANAGE_USER;
  const pass = process.env.MANAGE_PASSWORD;
  const header = request.headers.get("authorization") ?? "";

  if (!user || !pass) return new NextResponse("Manager login is not configured", { status: 503 });

  const creds = header.startsWith("Basic ") ? decodeBasic(header) : null;
  if (creds && safeEqual(creds[0], user) && safeEqual(creds[1], pass)) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Robots-Tag", "noindex");
    return res;
  }
  return new NextResponse("נדרשת הזדהות", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Manage", charset="UTF-8"' },
  });
}

export const config = { matcher: ["/manage/:path*", "/api/manage/:path*"] };
