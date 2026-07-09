# Juvida Tax Pro — Next.js

The Juvida Tax Pro site rebuilt on **Next.js (App Router) + TypeScript + Tailwind CSS**. The original navy/gold design is unchanged — the CSS is ported verbatim into `app/globals.css`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> The first `npm run build` / `dev` downloads the Playfair Display and DM Sans fonts via `next/font` (needs internet once). They are then self-hosted.

## Structure

```
app/
  layout.tsx          Root layout: fonts, metadata, <Nav> + <Footer>
  globals.css         Tailwind directives + the original design system (verbatim)
  page.tsx            Home (/)
  features/page.tsx   /features
  about/page.tsx      /about
  contact/page.tsx    /contact
components/
  Nav.tsx             Hamburger + active-link nav (client)
  Footer.tsx          Shared footer
  ContactForm.tsx     Validated, sanitized demo form (client)
next.config.mjs       Security headers / CSP
tailwind.config.ts    Brand palette; Tailwind preflight disabled
```

## What changed vs. the static version

- The four JS-toggled "pages" are now **real routes**, so each has its own URL and is statically prerendered (better SEO + sharing). The visual design is identical.
- Fonts load through `next/font` (self-hosted) instead of a Google Fonts `<link>`.
- Tailwind is compiled (no CDN). **Preflight is disabled** in `tailwind.config.ts` so utilities are available without touching the existing design. Brand tokens are exposed as `bg-navy`, `text-gold`, `font-display`, etc.
- The reusable component classes (`.btn-primary`, `.btn-outline`, `.nav-cta`, `.section-tag`, `.feature-icon`, `.plan-check`, `.contact-icon`, `.form-submit`) are built from Tailwind **`@apply`** in `app/globals.css`, using exact values so the compiled CSS is identical to the original. Decorative rules (gradients, `clamp()` type, `::before/::after`, animations, media queries) stay as plain CSS since Tailwind utilities can't express them without drifting the values.


## Contact form → PDF + email

Submitting the demo form POSTs to `app/api/contact/route.ts`, which:

1. Re-validates every field on the server (the client checks are UX only).
2. Builds a branded one-page **PDF** of the submission with `pdf-lib` (`lib/buildDemoPdf.ts`).
3. Emails it to your team via **nodemailer**, with the PDF attached and `reply-to` set to the requester.

The honeypot is also re-checked server-side and bot submissions are silently dropped.

### Setup

Copy `.env.example` to `.env.local` and fill in your SMTP details:

```bash
cp .env.example .env.local
```

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
CONTACT_FROM   # the "from" address
CONTACT_TO     # where demo requests + the PDF are delivered
```

Works with any SMTP provider (Gmail App Password, your host's mailbox, Resend SMTP, etc.). Until these are set, the form returns a clear "email not configured" message and nothing is sent. `.env.local` is gitignored — never commit credentials.

> Consider adding rate limiting (e.g. by IP) to the route before going live, so the endpoint can't be abused to send mail.


### Test it with Gmail

You can verify the whole pipeline before hooking up a real provider.

**1. Make a Gmail App Password** (Gmail blocks your normal password for SMTP):
- Enable 2-Step Verification on the Google account.
- Go to Google Account → Security → App passwords, create one, copy the 16 characters.

**2. Put it in `.env.local`:**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=you@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_FROM=you@gmail.com      # Gmail sends as the authenticated account
CONTACT_TO=you@gmail.com        # where the test lands
```

**3. Run a test:**

```bash
npm run test:email:dry     # builds the PDF + composes the email, sends nothing
npm run test:email         # actually sends via Gmail (verifies the connection first)
```

`test:email` prints `SMTP connection + auth OK` then a `messageId` on success; check the inbox for the email with `demo-request.pdf` attached. Send to a specific address with `TEST_TO=someone@example.com npm run test:email`.

Note: Gmail is fine for testing and low volume (~500/day on personal accounts) but can flag automated mail — use a transactional provider for production.


## After submit: thank-you page & gated download

On a successful submission the flow is:

1. The server emails the PDF to your support inbox (`CONTACT_TO`) **and** a private confirmation to the customer.
2. It emails the customer a confirmation with the shared demo login (the `DEMO_EFIN` / `DEMO_VALIDATION_CODE` you configure). This is a single shared demo/sandbox account, so no per-customer key is generated.
3. It issues a **one-time, 15-minute signed download token** and the browser is redirected to `/thank-you?dl=<token>`.
4. The thank-you page shows a Download button that hits `app/api/download/route.ts`, which verifies the token (signature + expiry + single-use) and redirects to your installer.

### Required env

```
DOWNLOAD_SECRET=<long random string>   # signs download tokens
DOWNLOAD_URL=<your installer URL>       # ideally a short-lived signed storage URL
```

### Important — what this does NOT do

- It does **not** hand out a shared EFIN or a shared software activation code. Each customer uses their **own** IRS-issued EFIN; the thank-you page links them to the IRS e-file application. Distributing one EFIN to many users violates IRS e-file rules and is a known fraud pattern.
- Set `DOWNLOAD_URL` only to software you are **licensed to distribute**. The gate is a delivery mechanism, not a licence.
- Single-use is enforced by an in-memory store (`lib/tokenStore.ts`) that only works within one running process. For serverless / multi-instance hosting, back it with Redis or a database (same `isUsed` / `markUsed` interface).
- Add real payment or identity verification at the marked point in `app/api/contact/route.ts` before issuing downloads in production.


## Submissions database & export

Every valid submission is saved to a dedicated store before any email is sent, so no lead is lost even if email isn't configured.

- **Store:** `lib/db.ts` — an append-only `data/submissions.ndjson` file (no native build, runs anywhere). It exposes `insertSubmission` / `listSubmissions`; swap the body of those two functions for Postgres/MySQL/SQLite later and nothing else changes. The `data/` folder is gitignored.
- **Export:** `GET /api/admin/export?format=xlsx|csv|pdf` returns the whole table. Protected by `ADMIN_TOKEN` — pass `?token=...` or an `x-admin-token` header. Without it you get 401.

```bash
# examples (set ADMIN_TOKEN in .env.local first)
curl -OJ "http://localhost:3000/api/admin/export?format=xlsx&token=YOUR_ADMIN_TOKEN"
curl -OJ "http://localhost:3000/api/admin/export?format=csv&token=YOUR_ADMIN_TOKEN"
```

## Demo software login (optional)

If you set `DEMO_EFIN` and `DEMO_VALIDATION_CODE`, the thank-you page shows a "Demo Software Login" panel with those values after the customer submits.

These are displayed to everyone who reaches the page, so only put **genuine shareable demo / sandbox credentials** there. Never put a live EFIN used for real e-filing into these variables — sharing a live EFIN with multiple users violates IRS e-file rules. Likewise, point `DOWNLOAD_URL` only at software you're licensed to distribute.

## Security notes

- Security headers (CSP, `X-Frame-Options: DENY`, `nosniff`, referrer, permissions) are set as real HTTP response headers in `next.config.mjs`.
- The contact form validates and HTML-escapes input client-side, with a honeypot and double-submit guard. **This is UX only** — when you wire a real endpoint, the server must re-validate and re-escape every field, and that's where real security lives.
- The CSP is **dev-aware** (`next.config.mjs`): development adds `'unsafe-eval'` + websocket origins that Next's HMR/React Refresh require, while production stays strict (`script-src 'self' 'unsafe-inline'`). If you build a strict CSP and forget this, `npm run dev` renders unstyled because the dev runtime gets blocked.
- To tighten `script-src` further in production, add a `middleware.ts` that issues a per-request nonce — Next applies the nonce to its own scripts automatically.
