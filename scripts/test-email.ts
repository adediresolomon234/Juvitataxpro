/**
 * Test the contact PDF + email pipeline.
 *
 *   npm run test:email        → real send via your .env.local SMTP (e.g. Gmail)
 *   npm run test:email:dry    → builds PDF + composes the message, sends nothing
 *
 * Send to a specific address:  TEST_TO=me@gmail.com npm run test:email
 */
import nodemailer from "nodemailer";
import { writeFileSync } from "node:fs";
import { buildDemoPdf, type DemoRequest } from "../lib/buildDemoPdf";

const DRY = process.argv.includes("--dry");

const sample: DemoRequest = {
  firstName: "Test",
  lastName: "Lead",
  businessName: "Coleman Tax Services",
  email: "test.lead@example.com",
  phone: "(404) 555-0100",
  locations: "2–5 locations",
  volume: "500–2,000",
  interest: "Pricing & plans",
  message:
    "This is a test submission from the test:email script. If you received this with the PDF attached, the pipeline works end to end.",
};

async function main() {
  // 1) PDF
  const pdf = await buildDemoPdf(sample);
  console.log(`✓ PDF built: ${pdf.length} bytes`);
  writeFileSync("test-demo-request.pdf", Buffer.from(pdf));
  console.log("  saved a copy to ./test-demo-request.pdf");

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    CONTACT_FROM,
    CONTACT_TO,
    TEST_TO,
  } = process.env;

  const to = TEST_TO || CONTACT_TO || SMTP_USER || "you@example.com";
  const from = CONTACT_FROM || SMTP_USER || "test@example.com";

  const mail = {
    from,
    to,
    subject: "Juvida Tax Pro — test demo request",
    text: "Test email from test:email. The full submission is attached as a PDF.",
    attachments: [
      {
        filename: "demo-request.pdf",
        content: Buffer.from(pdf),
        contentType: "application/pdf",
      },
    ],
  };

  // 2) Dry run — compose without sending (no network, no credentials needed)
  if (DRY || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (!DRY) {
      console.log("\n⚠  No SMTP credentials in env — running DRY (nothing sent).");
    }
    const transport = nodemailer.createTransport({ jsonTransport: true });
    const info = await transport.sendMail(mail);
    console.log("\n✓ Message composed (dry run):");
    console.log("  from:   ", info.envelope.from);
    console.log("  to:     ", info.envelope.to.join(", "));
    console.log("  subject:", mail.subject);
    console.log("  attach: ", `${mail.attachments[0].filename} (${pdf.length} bytes)`);
    console.log("\nProvide SMTP_* + CONTACT_TO in .env.local and run `npm run test:email` to send for real.");
    return;
  }

  // 3) Real send
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  console.log(`\n→ Verifying connection to ${SMTP_HOST}:${SMTP_PORT ?? 587} ...`);
  await transporter.verify();
  console.log("✓ SMTP connection + auth OK");

  const info = await transporter.sendMail(mail);
  console.log(`✓ Email sent to ${to}`);
  console.log("  messageId:", info.messageId);
  console.log("  response: ", info.response);
}

main().catch((err) => {
  console.error("\n✗ Test failed:\n", err?.message || err);
  process.exit(1);
});
