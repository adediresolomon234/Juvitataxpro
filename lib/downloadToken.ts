import { createHmac, timingSafeEqual, randomUUID } from "node:crypto";

/**
 * Short-lived, signed download tokens. A token authorises ONE download of the
 * configured installer for a limited time. It is stateless except for the
 * single-use check (see tokenStore.ts). Set DOWNLOAD_SECRET to a long random
 * string in your environment.
 */

export interface DownloadPayload {
  email: string;
  exp: number; // epoch ms
  jti: string; // unique id, used to enforce single-use
}

const SECRET = () => process.env.DOWNLOAD_SECRET || "";

export function createDownloadToken(
  email: string,
  ttlMs = 24 * 60 * 60 * 1000
): string {
  if (!SECRET()) throw new Error("DOWNLOAD_SECRET is not set");
  const payload: DownloadPayload = {
    email,
    exp: Date.now() + ttlMs,
    jti: randomUUID(),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", SECRET()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyDownloadToken(token: string): DownloadPayload | null {
  if (!SECRET() || !token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = createHmac("sha256", SECRET()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString()
    ) as DownloadPayload;
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
