# Paxoi Villas

A modern, production-ready website for a luxury villa rental business in **Paxos, Greece** — featuring a collection of three villas, a Supabase-powered backend, full authentication, a favourites system, and a complete admin panel.

> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Supabase (Auth / Database / Storage) · Vercel

---

## ✨ Features

- **Cinematic home page** with hero, animated reveals, featured villas, experiences and a CTA section.
- **Villas listing & dynamic detail pages** with image gallery + lightbox, amenities, availability calendar and external booking buttons (Booking.com / Airbnb).
- **Supabase Auth** for users (sign up, sign in, session persistence).
- **Favourites system** — logged-in users can save and revisit villas, stored in the database with RLS.
- **Admin panel** at `/admin` (default credentials: **root / root**) with:
  - Dashboard overview
  - Create / edit / delete villas
  - Upload images to Supabase Storage **or** add by URL
  - Manage unavailable date ranges
  - Read incoming contact messages
- **Availability calendar** UI (read-only on the public page, editable in admin).
- **Contact form** that writes to Supabase.
- **Multi-language** (EN / GR) with a live switcher.
- **Mobile-first, glassmorphic luxury design** with Framer Motion animations.
- **SEO** ready (metadata, OG tags, sitemap-friendly routing).
- **No payment processing** — bookings redirect to Booking.com or Airbnb.

---

## 🚀 Quick start (local)

### 1. Clone and install

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [https://app.supabase.com](https://app.supabase.com) → **New project**.
2. Pick a region close to your guests (e.g. `eu-central-1`).
3. Wait for the project to provision (~1 minute).

### 3. Run the SQL schema and seed

Open **SQL Editor** in Supabase and run:

1. `supabase/schema.sql` — creates tables, RLS policies, storage bucket, triggers.
2. `supabase/seed.sql` — inserts the 3 demo villas with gallery images.

### 4. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable                          | Where to find it                                                  |
| --------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase → Project Settings → API → Project URL                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase → Project Settings → API → `anon public` key             |
| `SUPABASE_SERVICE_ROLE_KEY`       | Supabase → Project Settings → API → `service_role` (**secret**)   |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin panel credentials (default `root` / `root`)               |
| `ADMIN_SESSION_SECRET`            | Any long random string (≥ 32 chars)                               |
| `NEXT_PUBLIC_SITE_URL`            | `http://localhost:3000` for dev                                   |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_SESSION_SECRET` must **never** be exposed to the client. They are only read inside server actions.

### 5. Run the dev server

```bash
npm run dev
```

Visit:

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (login with `root` / `root`)

---

## 📁 Project structure

```
Paxoi/
├── src/
│   ├── app/
│   │   ├── (home + global layout)
│   │   ├── villas/                 # listing + [slug] detail
│   │   ├── login/  signup/         # Supabase auth pages
│   │   ├── favorites/              # protected favourites list
│   │   ├── contact/                # contact form page
│   │   ├── auth/callback/route.ts  # Supabase auth callback
│   │   └── admin/
│   │       ├── login/              # /admin login form (root / root)
│   │       ├── (protected)/        # auth-gated admin pages
│   │       │   ├── page.tsx        # dashboard
│   │       │   ├── villas/         # CRUD villas
│   │       │   └── messages/       # contact inbox
│   │       └── actions.ts          # server actions for admin
│   ├── components/                 # Hero, Navbar, VillaCard, etc.
│   ├── lib/
│   │   ├── supabase/               # browser, server, service-role clients
│   │   ├── admin-auth.ts           # signed cookie helper for /admin
│   │   ├── i18n/                   # EN/GR translations + provider
│   │   └── utils.ts
│   └── types/
├── supabase/
│   ├── schema.sql                  # database, RLS, storage
│   └── seed.sql                    # 3 demo villas
├── middleware.ts                   # refreshes Supabase auth cookies
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

---

## 🔐 Admin authentication

The `/admin` area is **separate** from Supabase user auth. It uses a tiny custom cookie:

1. The admin form posts username + password to a server action.
2. If they match `ADMIN_USERNAME` / `ADMIN_PASSWORD`, an HMAC-signed cookie (`paxoi_admin`) is set with an 8-hour expiry.
3. The `(protected)` layout reads the cookie on every request and redirects to `/admin/login` if invalid.
4. All write operations go through server actions that use the **service-role** Supabase client (bypassing RLS).

> Change the defaults in `.env.local` before deploying. Always set a long random `ADMIN_SESSION_SECRET`.

---

## ☁️ Deploy to Vercel

### Required: add environment variables before deploy

In **Vercel → your project → Settings → Environment Variables**, add these for **Production** and **Preview** (build will fail or show empty villas without them):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (admin only, secret) |
| `ADMIN_USERNAME` | `root` (or your choice) |
| `ADMIN_PASSWORD` | change from default |
| `ADMIN_SESSION_SECRET` | long random string (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

After saving, **redeploy** (Deployments → ⋯ → Redeploy) so the build picks up the new variables.

### 1. Push the project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-user>/paxoi.git
git push -u origin main
```

### 2. Import the repo into Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new) and import the repo.
2. Framework preset: **Next.js** (auto-detected).
3. Add the same env vars from `.env.local` under **Settings → Environment Variables** (for both Preview and Production).
4. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://paxoi.com`).
5. **Deploy.**

### 3. Configure Supabase Auth redirects

In Supabase → **Authentication → URL Configuration**:

- **Site URL:** `https://your-domain.com`
- **Redirect URLs:** add `https://your-domain.com/auth/callback`

This makes email confirmation links work in production.

### 4. (Recommended) Add a custom domain

In Vercel → **Settings → Domains**, add your domain and follow the DNS instructions.

---

## 🗄️ Database schema

| Table                       | Purpose                                              |
| --------------------------- | ---------------------------------------------------- |
| `villas`                    | The villas (name, description, amenities, links…)    |
| `villa_images`              | Gallery images per villa                             |
| `villa_unavailable_dates`   | Manual booked-date ranges (drives the calendar UI)   |
| `favorites`                 | Per-user saved villas (RLS protected)                |
| `contact_messages`          | Submissions from the contact + enquiry forms         |
| `auth.users` (Supabase)     | Authenticated end-users                              |

### Row-Level Security

- Villas, images and unavailable dates: **public read**.
- Favorites: users can only read / write their own rows.
- Contact messages: anyone can submit, nobody can read (except via admin).
- All admin writes happen server-side with the service-role key — no admin RLS policies required.

### Storage

A single public bucket `villa-images` is created automatically by `schema.sql`. Uploaded files are nested under `${villaId}/...`.

---

## 🌍 Multi-language

Translations live in `src/lib/i18n/translations.ts`. The language is stored client-side in `localStorage` and switched in the navbar (`EN` / `GR`).

To add a new language: add a key to the `translations` object and extend the `Locale` union.

---

## 🛠️ Customisation

- **Brand colours:** edit `tailwind.config.ts` (`sand`, `sea`, `ink` palettes).
- **Fonts:** Inter + Playfair Display (Google Fonts) are loaded in `src/app/layout.tsx`.
- **Hero image / About section / Experiences:** edit `src/components/Hero.tsx`, `AboutSection.tsx`, `Experiences.tsx`.
- **Admin nav:** `src/app/admin/(protected)/layout.tsx`.

---

## 🧪 Scripts

| Command         | What it does                  |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the local dev server    |
| `npm run build` | Production build              |
| `npm run start` | Start the production server   |
| `npm run lint`  | Run Next.js / ESLint checks   |

---

## 📝 License

MIT — feel free to use this as a starter for your own villa or boutique-hotel project.
