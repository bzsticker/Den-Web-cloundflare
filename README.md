# เด่นโมดิฟายระยอง / Den Modify Rayong Landing Page

Modern bilingual landing page for Den Modify Rayong, an automotive electrical system and car modification shop in Rayong, Thailand.

Thai documentation is available in [README_TH.md](README_TH.md).

## Documentation Policy

When editing documentation, visible website copy, translations, setup guides, or deployment instructions, update both Thai and English versions together.

## Project Overview

- Clean SaaS-style landing page for เด่นโมดิฟายระยอง / Den Modify Rayong
- React + Vite + Tailwind CSS
- Thai / English language switcher
- Dark mode / Light mode
- Supabase booking form
- Cloudflare Pages deployment-ready

## Tech Stack

- React
- Vite
- Tailwind CSS
- lucide-react
- Supabase JavaScript client

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create a local `.env` file from `.env.example` when testing Supabase locally:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never commit `.env`. Only commit `.env.example`.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run the SQL file:

```bash
supabase/schema.sql
```

4. Go to Project Settings / API Keys.
5. Copy the Project URL.
6. Copy the anon key or publishable key.
7. Add both values to Cloudflare Pages environment variables.

The booking form writes to the `bookings` table, including the customer's preferred branch in the `branch` column. Row Level Security is enabled. Public users can insert booking requests only; public select, update, and delete are not allowed.

## Cloudflare Pages Setup

1. Push this project to a GitHub repository.
2. In Cloudflare Pages, connect the GitHub repository.
3. Use these build settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18 or newer

This repository also includes `wrangler.toml` with `pages_build_output_dir = "dist"` so Cloudflare Pages deploys the built Vite output instead of the repository root.

4. Add environment variables in Cloudflare Pages:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Redeploy after adding or changing environment variables.

## GitHub Setup

1. Push the project source code to GitHub.
2. Do not commit `.env`.
3. Commit `.env.example`.
4. Keep Supabase `service_role` keys out of the repository and frontend code.

## Security Notes

- Frontend code must use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Never expose a Supabase `service_role` key in frontend code.
- Customer booking data is written to Supabase and is not displayed publicly on the website.
