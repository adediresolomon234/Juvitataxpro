import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface DemoRequest {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  locations: string;
  volume: string;
  interest: string;
  message: string;
}

const NAVY = rgb(11 / 255, 28 / 255, 61 / 255);
const GOLD = rgb(200 / 255, 168 / 255, 75 / 255);
const INK = rgb(0.13, 0.15, 0.2);
const MUTED = rgb(0.42, 0.45, 0.5);

/** Build a branded one-page PDF summarising a demo request. */
export async function buildDemoPdf(data: DemoRequest): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Header band
  page.drawRectangle({ x: 0, y: height - 96, width, height: 96, color: NAVY });
  page.drawRectangle({ x: 0, y: height - 100, width, height: 4, color: GOLD });

  // Logo mark
  page.drawRectangle({ x: 48, y: height - 74, width: 34, height: 34, color: GOLD });
  page.drawText("JT", {
    x: 56,
    y: height - 66,
    size: 16,
    font: bold,
    color: NAVY,
  });
  page.drawText("Juvida Tax Pro", {
    x: 94,
    y: height - 58,
    size: 18,
    font: bold,
    color: rgb(1, 1, 1),
  });
  page.drawText("Demo Request", {
    x: 94,
    y: height - 76,
    size: 11,
    font,
    color: GOLD,
  });

  const submitted = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  page.drawText(`Submitted ${submitted}`, {
    x: width - 48 - font.widthOfTextAtSize(`Submitted ${submitted}`, 9),
    y: height - 70,
    size: 9,
    font,
    color: rgb(0.8, 0.82, 0.86),
  });

  // Fields
  const rows: Array<[string, string]> = [
    ["Name", `${data.firstName} ${data.lastName}`.trim()],
    ["Business", data.businessName || "—"],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Number of locations", data.locations || "—"],
    ["Annual return volume", data.volume || "—"],
    ["Interested in", data.interest || "—"],
  ];

  let y = height - 150;
  const labelX = 48;
  const valueX = 220;

  for (const [label, value] of rows) {
    page.drawText(label.toUpperCase(), {
      x: labelX,
      y,
      size: 9,
      font: bold,
      color: GOLD,
    });
    page.drawText(value, { x: valueX, y, size: 12, font, color: INK });
    // separator line
    page.drawRectangle({
      x: labelX,
      y: y - 12,
      width: width - 96,
      height: 0.6,
      color: rgb(0.9, 0.91, 0.93),
    });
    y -= 34;
  }

  // Message block (wrapped)
  page.drawText("MESSAGE", { x: labelX, y, size: 9, font: bold, color: GOLD });
  y -= 18;
  const message = data.message?.trim() || "—";
  for (const line of wrapText(message, font, 12, width - 96)) {
    page.drawText(line, { x: labelX, y, size: 12, font, color: INK });
    y -= 18;
  }

  // Footer
  page.drawText(
    "Generated automatically by the Juvida Tax Pro website. Reply to the requester directly.",
    { x: labelX, y: 48, size: 8, font, color: MUTED }
  );

  return pdf.save();
}

function wrapText(
  text: string,
  font: import("pdf-lib").PDFFont,
  size: number,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 12); // cap height
}
