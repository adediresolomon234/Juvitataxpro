import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/downloadToken";
import { isUsed, markUsed } from "@/lib/tokenStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || "";

  const payload = verifyDownloadToken(token);
  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "This download link is invalid or has expired." },
      { status: 403 }
    );
  }

  if (isUsed(payload.jti)) {
    return NextResponse.json(
      { ok: false, error: "This download link has already been used. Contact support for a new one." },
      { status: 410 }
    );
  }

  // Point this at software you are licensed to distribute. Ideally a
  // short-lived signed storage URL (e.g. a presigned S3 link) rather than a
  // permanent public file.
  const target = process.env.DOWNLOAD_URL;
  if (!target) {
    return NextResponse.json(
      { ok: false, error: "Download is not configured on the server yet." },
      { status: 503 }
    );
  }

  markUsed(payload.jti);
  return NextResponse.redirect(target, 302);
}
