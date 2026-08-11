# Novixa Environment & Secrets Configuration

## Overview
Novixa uses `.env.local` as the single source of truth for local development and testing. Secret keys and server credentials are never exposed to client browser bundles or committed to version control.

## Required Environment Variables

### Client-Side (Public)
Available to browser runtime via Vite (`NEXT_PUBLIC_*` or `import.meta.env`):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Server-Side (Isolated Secrets)
Used strictly inside Node/Express endpoints (`/api/*`):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NOVIXA_CONTACT_EMAIL`

## Validation Module
`src/lib/env.ts` validates required variables on server startup and client runtime, returning safe presence flags without printing raw secret values.
