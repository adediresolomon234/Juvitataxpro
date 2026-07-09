/**
 * Tracks which download tokens have been used, to enforce single-use.
 *
 * NOTE: this is in-memory and only valid within a single running process.
 * On serverless / multi-instance hosting (e.g. Vercel) it will NOT be shared
 * across instances. For production, back this with Redis or your database —
 * the interface (isUsed / markUsed) stays the same.
 */
const used = new Map<string, number>();
const RETENTION_MS = 30 * 60 * 1000;

function purge() {
  const now = Date.now();
  used.forEach((ts, jti) => {
    if (now - ts > RETENTION_MS) used.delete(jti);
  });
}

export function isUsed(jti: string): boolean {
  purge();
  return used.has(jti);
}

export function markUsed(jti: string): void {
  used.set(jti, Date.now());
}
