import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { listSubmissions } from "@/lib/db";
import { buildCsv, buildXlsx, buildListPdf } from "@/lib/exportData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const provided =
    req.headers.get("x-admin-token") ||
    new URL(req.url).searchParams.get("token") ||
    "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const format = (new URL(req.url).searchParams.get("format") || "xlsx").toLowerCase();
  const rows = listSubmissions();
  const stamp = new Date().toISOString().slice(0, 10);

  if (format === "csv") {
    return new Response(buildCsv(rows), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="submissions-${stamp}.csv"`,
      },
    });
  }

  if (format === "pdf") {
    const pdf = await buildListPdf(rows);
    return new Response(Buffer.from(pdf), {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="submissions-${stamp}.pdf"`,
      },
    });
  }

  // default: xlsx
  const xlsx = await buildXlsx(rows);
  return new Response(xlsx, {
    headers: {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="submissions-${stamp}.xlsx"`,
    },
  });
}
