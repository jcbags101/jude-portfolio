# Lanante & Latido Systems (LLS) — Company Website

Production-ready marketing site for **Lanante & Latido Systems**, a software studio
that builds custom web apps, SaaS platforms, and business systems.

Built in the style of modern tech-company sites (Linear / Vercel / Stripe): dark
premium theme, gradient accents, bento-grid services, case studies, process, and a
working contact form.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme tokens in `globals.css`)
- **lucide-react** icons
- Fully static (SSG) — every route prerenders. ~111 kB first-load JS.

## Develop

```bash
npm install
npm run dev      # http://localhost:3007  (port set in repo .claude/launch.json)
npm run build    # production build
npm start        # serve the production build
```

## Editing content

All copy, brand details, services, case studies, stats, and contact info live in a
single file: **`src/lib/site.ts`**. Update that and the whole site follows.

Things to replace before launch (marked `TODO` in code):

- `site.contact` — real email, phone, location
- `site.domain` / `site.url` — real domain (used for SEO metadata, sitemap, JSON-LD)
- `site.social` — real GitHub / LinkedIn / X links
- `testimonials` — real, attributable client quotes
- `stats` — verify the numbers

## Structure

```
src/
  app/
    layout.tsx      # metadata, fonts, SEO
    page.tsx        # section assembly + JSON-LD structured data
    globals.css     # design system (tokens, utilities, animations)
    icon.svg        # favicon (LLS mark)
    sitemap.ts / robots.ts
  components/        # Navbar, Hero, AppWindow, Services, Work, Process,
                     # Values, Testimonials, Contact, Footer, ui (Reveal/Button)
  lib/site.ts        # ← all editable content/config
```

## Contact form

The form composes a `mailto:` to `site.contact.email` (no backend needed to ship).
To send server-side instead, swap the `handleSubmit` in `src/components/Contact.tsx`
for a Next.js route handler wired to an email provider (e.g. Resend).

## Deploy

Optimized for **Vercel** — push to a Git repo and import, or `vercel` from the CLI.
No environment variables required.
