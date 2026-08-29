# Magnanimous Electrical Services — Website

Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: `npm install` needs internet access the first time, so Next can
> download the native SWC binary for your platform (this is why the build
> couldn't be verified inside the sandboxed environment this was built in —
> it has no network access). On your machine or in CI this is automatic.

## What's implemented (Phase 1)

- Design system: colors, type (Space Grotesk / Inter / IBM Plex Mono) in
  `src/app/globals.css`
- Business data centralized in `src/lib/site-config.ts` — edit this file to
  change phone/email/location/services copy sitewide
- Product catalogue in `src/data/products.ts` (27 real products + photos)
- Pages: Home, `/services`, `/shop` (filter + search, real products),
  `/about`, `/contact` (service-request form that opens a prefilled
  WhatsApp message), `/our-work` (honest placeholder — no fake photos)
- `robots.ts` / `sitemap.ts`, per-page metadata

## Not yet built (Phase 2 — needs your decisions first)

These need a hosting/database choice before they can be built for real,
rather than guessed at:

- **Cart & checkout** with **Paystack test-mode payments** (needs a database
  for orders + where the app is hosted, since payment verification must run
  server-side)
- **Blog / CMS** (needs a database or headless CMS choice)
- **Admin dashboard** (orders, blog, products — needs auth + database)

Once you pick a database (e.g. Postgres via Supabase/Neon/Vercel Postgres)
and confirm you have real Paystack **test** API keys, the checkout flow,
webhook handling, and admin area can be built against them properly.

## Checking your work

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Editing content

- Contact info, tagline, nav links, services list → `src/lib/site-config.ts`
- Products, prices, categories → `src/data/products.ts`
- Branding images → `public/images/branding/`

## Production platform features

This project now includes a production architecture for:

- Prisma + PostgreSQL data model for products, customers, orders, blog and admin users.
- Secure admin sessions using HTTP-only signed cookies.
- Product and blog SEO metadata, canonical URLs, sitemap and robots rules.
- Organization, Product-ready and Article JSON-LD patterns.
- Persistent browser cart, checkout and server-side order creation.
- Paystack **TEST MODE** initialization, callback verification and signed webhook handling.
- Server-side amount verification. Browser prices are never trusted for payment amounts.
- Admin order management and order-status history.
- Admin blog drafts/publishing/deletion and per-post SEO fields.
- Admin product management and per-product SEO fields.
- Search/filter UI for products and blog content.

### Setup

1. Copy `.env.example` to `.env` and fill in your PostgreSQL and Paystack TEST credentials.
2. Run `npm install`.
3. Run `npx prisma generate`.
4. Run `npx prisma migrate dev --name init`.
5. Run `npm run db:seed` to create the admin user and import the existing catalogue/blog starter content.
6. Run `npm run dev`.

The seeded admin email/password are controlled by `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Change them before deployment.

### Paystack TEST

Use only `pk_test_...` and `sk_test_...` values while testing. The secret key stays server-side. Paystack receives the server-calculated order amount in pesewas. The callback page calls the server verification route, and the webhook independently verifies `charge.success`. Payment updates are idempotent: an already-paid order remains paid.

Set the Paystack webhook URL to:

`https://YOUR-DOMAIN/api/paystack/webhook`

### Google Search Console

1. Deploy the site on its final domain and set `NEXT_PUBLIC_SITE_URL`.
2. Add the domain in Google Search Console and complete Google’s ownership verification.
3. Submit `https://YOUR-DOMAIN/sitemap.xml`.
4. Request indexing for the homepage and important service/product pages.
5. Check the Search Console Page Indexing and Enhancements reports periodically.

### Deployment

Vercel can host the Next.js application, but use a managed PostgreSQL provider for production. Set every `.env.example` value in Vercel Project Settings → Environment Variables. Never commit `.env` or any Paystack secret key.

### Image uploads

The admin upload endpoint is intentionally storage-provider-dependent for production scalability. Configure Cloudinary or another object storage provider before enabling direct production uploads; local filesystem writes are not durable on serverless deployments. Existing product images remain served from `public/images`.
