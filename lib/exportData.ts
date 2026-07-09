import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { Submission } from "@/lib/db";

const COLUMNS: Array<{ key: keyof Submission; header: string; width: number }> = [
  { key: "createdAt", header: "Submitted", width: 22 },
  { key: "firstName", header: "First name", width: 16 },
  { key: "lastName", header: "Last name", width: 16 },
  { key: "businessName", header: "Business", width: 26 },
  { key: "email", header: "Email", width: 28 },
  { key: "phone", header: "Phone", width: 18 },
  { key: "locations", header: "Locations", width: 16 },
  { key: "volume", header: "Volume", width: 16 },
  { key: "interest", header: "Interest", width: 24 },
  { key: "message", header: "Message", width: 40 },
];

/* ---------- CSV ---------- */
function csvCell(v: string): string {
  const s = v ?? "";
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCsv(rows: Submission[]): string {
  const header = COLUMNS.map((c) => c.header).join(",");
  const body = rows
    .map((r) => COLUMNS.map((c) => csvCell(String(r[c.key] ?? ""))).join(","))
    .join("\n");
  return `${header}\n${body}\n`;
}

/* ---------- XLSX ---------- */
export async function buildXlsx(rows: Submission[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "Juvida Tax Pro";
  const ws = wb.addWorksheet("Submissions");

  ws.columns = COLUMNS.map((c) => ({
    header: c.header,
    key: c.key as string,
    width: c.width,
  }));

  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  ws.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF0B1C3D" },
  };

  rows.forEach((r) => {
    const out: Record<string, string> = {};
    for (const c of COLUMNS) out[c.key as string] = String(r[c.key] ?? "");
    ws.addRow(out);
  });

  ws.views = [{ state: "frozen", ySplit: 1 }];
  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}

/* ---------- PDF (one block per submission) ---------- */
const NAVY = rgb(11 / 255, 28 / 255, 61 / 255);
const GOLD = rgb(200 / 255, 168 / 255, 75 / 255);
const INK = rgb(0.13, 0.15, 0.2);

export async function buildListPdf(rows: Submission[]): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageW = 612;
  const pageH = 792;
  const margin = 48;
  let page = pdf.addPage([pageW, pageH]);
  let y = pageH - margin;

  const title = `Juvida Tax Pro — Submissions (${rows.length})`;
  page.drawText(title, { x: margin, y, size: 16, font: bold, color: NAVY });
  y -= 28;

  const drawField = (label: string, value: string) => {
    if (y < margin + 40) {
      page = pdf.addPage([pageW, pageH]);
      y = pageH - margin;
    }
    page.drawText(label.toUpperCase(), { x: margin, y, size: 8, font: bold, color: GOLD });
    const wrapped = wrap(value || "—", font, 10, pageW - margin * 2 - 120);
    wrapped.forEach((line, i) => {
      page.drawText(line, { x: margin + 120, y: y - i * 12, size: 10, font, color: INK });
    });
    y -= Math.max(16, wrapped.length * 12 + 4);
  };

  rows.forEach((r, idx) => {
    if (y < margin + 60) {
      page = pdf.addPage([pageW, pageH]);
      y = pageH - margin;
    }
    page.drawRectangle({ x: margin, y: y - 2, width: pageW - margin * 2, height: 1, color: GOLD });
    y -= 16;
    page.drawText(`#${idx + 1} · ${r.createdAt}`, { x: margin, y, size: 9, font: bold, color: NAVY });
    y -= 18;
    drawField("Name", `${r.firstName} ${r.lastName}`.trim());
    drawField("Business", r.businessName);
    drawField("Email", r.email);
    drawField("Phone", r.phone);
    drawField("Locations / Volume", `${r.locations || "—"}  /  ${r.volume || "—"}`);
    drawField("Interest", r.interest);
    drawField("Message", r.message);
    y -= 8;
  });

  return pdf.save();
}

function wrap(
  text: string,
  font: import("pdf-lib").PDFFont,
  size: number,
  maxWidth: number
): string[] {
  const words = String(text).split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 6);
}
