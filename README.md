# Novixa — Full Stack Enterprise AI & Cloud Engineering Platform

Novixa is an advanced digital platform and engineering suite providing high-performance software architecture, enterprise cloud solutions, and AI engine integrations.

## Overview

This repository contains the full-stack architecture for **Novixa**, configured for temporary end-to-end development, testing, and deployment validation.

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Dual-Language (Arabic/English) with RTL/LTR dynamic layout switching.
- **Backend / Express Server**: Integrated Node.js + Express API server (`server.ts`) proxying server-side logic and third-party integrations.
- **Database & Auth**: Client & Server Firebase Auth and Firestore with Firebase Admin SDK (`firebase-admin`).
- **AI Engine**: Google Gen AI SDK (`@google/genai`) using model `gemini-3.6-flash`.
- **Email Dispatch**: Resend Email API (`resend`) for server-side transactional emails.

---

## Documentation Index

Detailed engineering documentation is located in the `/docs` directory:

| Document | Description |
| :--- | :--- |
| [`docs/architecture.md`](docs/architecture.md) | High-level system architecture and proxy isolation topology |
| [`docs/environment.md`](docs/environment.md) | Centralized environment variable specifications and validation rules |
| [`docs/firebase.md`](docs/firebase.md) | Firebase Client SDK & Admin SDK setup and Firestore connectivity |
| [`docs/authentication.md`](docs/authentication.md) | Firebase Authentication integration and server-side token verification |
| [`docs/gemini.md`](docs/gemini.md) | Gemini AI SDK integration (@google/genai) and server endpoint proxy |
| [`docs/resend.md`](docs/resend.md) | Resend email gateway integration and HTML email dispatch |
| [`docs/security.md`](docs/security.md) | Security model, secret isolation, and CORS/CSRF boundaries |
| [`docs/development.md`](docs/development.md) | Local development workflow and integration test dashboard usage |
| [`docs/deployment.md`](docs/deployment.md) | Production build pipeline and Vercel hosting guidelines |
| [`docs/vercel-environment-variables.md`](docs/vercel-environment-variables.md) | Complete guide to Vercel environment variables configuration |

---

## Integration Test Dashboard

A dedicated development-only integration dashboard is available at:
`/#/en/dev_integration` or `/#/ar/dev_integration`

Use this page to manually test Firebase Auth, Firestore connectivity, Gemini AI generation, and Resend email delivery.

---

## Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Local Environment**:
   Copy `.env.example` to `.env.local` and populate development credentials.

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Build**:
   ```bash
   npm run lint
   npm run build
   ```
