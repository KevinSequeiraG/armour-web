# Armour Web

> No-code web page builder that lets users create, customize, and publish multi-page websites with drag-and-drop sections, product catalogs, and social media integration.

🔗 **Live demo:** https://armour-web.vercel.app

## Overview

ArmourWeb is a SaaS-style platform where users can build and publish their own websites without writing code. Each user manages their own pages, products, and categories, with a live preview and shareable public URL per site.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **Backend/DB:** Firebase (Firestore + Auth + Storage)
- **Drag & Drop:** dnd-kit
- **i18n:** react-i18next (English / Spanish)
- **Email:** Nodemailer
- **Export:** xlsx, file-saver
- **Deployment:** Vercel

## Features

- **Page builder** — drag-and-drop sections (text, images, cards) with per-page layout controls (padding, background, navbar config)
- **Multi-page support** — create and reorder multiple pages per website
- **Product & category management** — CRUD for products and categories with quantity controls and a sales cart modal
- **Public webpage viewer** — each published site is accessible at `/aw/[slug]`
- **Social media links** — attach and track redirects to Facebook, Twitter, LinkedIn, Instagram
- **Reports & analytics** — per-user reports on social network traffic, product/category data, and webpage stats; exportable to Excel
- **Contact Us page** — built-in contact form with email delivery via Nodemailer
- **Authentication** — register, login, email verification, password reset
- **i18n** — full English / Spanish interface

## Architecture

```
pages/          # Next.js routes (UI pages + API routes)
components/     # UI components grouped by feature
context/        # UserContext — global auth state
helpers/        # Firestore CRUD abstractions (users, webpage, products, categories, reports)
lib/            # Firebase client + admin SDK config
```

- `context/` holds auth state consumed app-wide via `UserContext`.
- `helpers/` abstracts all Firestore reads/writes — components never call Firebase directly.
- `pages/api/` handles server-side operations: email sending, user creation, Excel export.

## Running locally

```bash
git clone https://github.com/KevinSequeiraG/armour-web.git
cd armour-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env.local` file with your Firebase credentials and email config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
```
