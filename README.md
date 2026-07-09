# Juvida Tax Pro Frontend

Next.js App Router frontend for Juvida Tax Pro. This repository is frontend-only:
there are no Next.js API routes, local submission stores, PDF generators, or
email handlers in this app. The browser talks directly to the separate backend
configured by `NEXT_PUBLIC_API_BASE_URL`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SITE_URL=https://tax.myco.com.ng
NEXT_PUBLIC_API_BASE_URL=https://tax.myco.com.ng
```

## Routes

```text
/             Home
/features     Features
/about        About
/contact      Demo request form
/thank-you    Post-submit confirmation
/admin        Admin submissions UI
```

## Backend Calls

The contact form posts directly to:

```text
POST {NEXT_PUBLIC_API_BASE_URL}/contact
```

The admin page calls:

```text
POST {NEXT_PUBLIC_API_BASE_URL}/admin/login
GET  {NEXT_PUBLIC_API_BASE_URL}/users?page=1&per_page=20&sort_by=created_at&order=desc
GET  {NEXT_PUBLIC_API_BASE_URL}/users/pdf?id=<user_id>
```

Admin requests send:

```text
Authorization: Bearer <token>
```

## Structure

```text
app/
  admin/page.tsx      Admin UI
  layout.tsx          Root layout
  globals.css         Design system and page styles
  page.tsx            Home
  features/page.tsx
  about/page.tsx
  contact/page.tsx
  thank-you/page.tsx
components/
  ContactForm.tsx
  Footer.tsx
  Nav.tsx
next.config.mjs       Security headers / CSP
tailwind.config.ts
```

## Security Notes

- Backend credentials and secrets belong in the separate backend service, not in
  this frontend repo.
- `NEXT_PUBLIC_*` values are visible in the browser. Do not put secrets in them.
- `next.config.mjs` sets CSP and allows `connect-src` to the configured backend
  origin in production.
