import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildDemoPdf, type DemoRequest } from "@/lib/buildDemoPdf";
import { createDownloadToken } from "@/lib/downloadToken";
import { insertSubmission } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max = 1000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — pretend success so bots don't learn anything.
  if (str(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  // Server-side validation — never trust the client.
  const data: DemoRequest = {
    firstName: str(body.firstName, 60),
    lastName: str(body.lastName, 60),
    businessName: str(body.businessName, 120),
    email: str(body.email, 120),
    phone: str(body.phone, 25),
    locations: str(body.locations, 40),
    volume: str(body.volume, 40),
    interest: str(body.interest, 80),
    message: str(body.message, 1000),
  };

  const errors: Record<string, string> = {};
  if (!data.firstName) errors.firstName = "Required.";
  if (!data.lastName) errors.lastName = "Required.";
  if (!data.email) errors.email = "Required.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Invalid email.";
  if (data.phone && !/^[0-9()+\-.\s]{7,25}$/.test(data.phone))
    errors.phone = "Invalid phone.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 1) Persist the submission to the database (the source of truth).
  try {
    insertSubmission(data);
  } catch (err) {
    console.error("Failed to store submission:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  // 2) Build the PDF of the submission (used as an email attachment).
  let pdfBytes: Uint8Array | null = null;
  try {
    pdfBytes = await buildDemoPdf(data);
  } catch (err) {
    console.error("PDF generation failed (continuing):", err);
  }

  // 3) Issue a one-time, short-lived download token (if configured).
  let downloadToken: string | null = null;
  let downloadUrl: string | null = null;
  try {
    if (process.env.DOWNLOAD_SECRET) {
      downloadToken = createDownloadToken(data.email);
      downloadUrl = buildDownloadUrl(req, downloadToken);
    }
  } catch (err) {
    console.warn("Download token not issued:", err);
  }

  // 4) Email it (best-effort — the lead is already saved regardless).
  await sendEmails(data, pdfBytes, downloadUrl).catch((err) =>
    console.warn("Email step failed (non-fatal):", err)
  );

  return NextResponse.json({ ok: true, downloadToken });
}

function buildDownloadUrl(req: Request, token: string): string | null {
  try {
    const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const forwardedHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || req.headers.get("host");
    if (forwardedHost) {
      const proto = forwardedProto || "https";
      return `${proto}://${forwardedHost}/api/download?token=${encodeURIComponent(token)}`;
    }

    const url = new URL(req.url);
    return `${url.origin}/api/download?token=${encodeURIComponent(token)}`;
  } catch {
    return null;
  }
}

async function sendEmails(data: DemoRequest, pdfBytes: Uint8Array | null, downloadUrl: string | null) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    CONTACT_FROM,
    CONTACT_TO,
    DEMO_EFIN,
    DEMO_VALIDATION_CODE,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.warn("Email skipped: SMTP_* / CONTACT_TO not set.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const attachments = pdfBytes
    ? [
        {
          filename: `demo-request-${data.lastName || "lead"}.pdf`,
          content: Buffer.from(pdfBytes),
          contentType: "application/pdf",
        },
      ]
    : [];

  // Support copy: the PDF of the submission.
  await transporter.sendMail({
    from: CONTACT_FROM || SMTP_USER,
    to: CONTACT_TO,
    replyTo: data.email,
    subject: `New demo request — ${fullName}${data.businessName ? ` (${data.businessName})` : ""}`,
    text: [
      `New demo request from ${fullName}.`,
      ``,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Business: ${data.businessName || "—"}`,
      `Locations: ${data.locations || "—"}`,
      `Volume: ${data.volume || "—"}`,
      `Interested in: ${data.interest || "—"}`,
      ``,
      `Message:`,
      data.message || "—",
      ``,
      attachments.length ? `Full details are attached as a PDF.` : ``,
    ].join("\n"),
    attachments,
  });

  // Customer copy: confirmation + the shared demo login (best-effort).
  const demoLines =
    DEMO_EFIN && DEMO_VALIDATION_CODE
      ? [
          `Demo login details:`,
          `    EFIN: ${DEMO_EFIN}`,
          `    Validation Code: ${DEMO_VALIDATION_CODE}`,
          ``,
        ]
      : [];
  const downloadLines = downloadUrl
    ? [
        `Download link: ${downloadUrl}`,
        `This link is valid for 24 hours.`,
        ``,
      ]
    : [];

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: data.email,
      subject: "Your Juvida Tax Pro demo — download & login",
      text: [
        `Hi ${data.firstName},`,
        ``,
        `Thanks for your interest in Juvida Tax Pro. Your demo is ready.`,
        ``,
        ...demoLines,
        ...downloadLines,
        `Next steps:`,
        `1. Download the software using the secure link above within 24 hours.`,
        `2. Sign in with the demo login above.`,
        `3. To e-file for real you'll use your own EFIN. Apply through the IRS e-file application: https://www.irs.gov/e-file-providers/become-an-authorized-e-file-provider`,
        `4. Questions? Reply to this email or contact ${CONTACT_TO}.`,
        ``,
        `— The Juvida Tax Pro team`,
      ].join("\n"),
    });
  } catch (custErr) {
    console.warn("Customer confirmation email failed (non-fatal):", custErr);
  }
}
