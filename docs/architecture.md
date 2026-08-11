# System Architecture & Topology

## Architectural Blueprint

Novixa utilizes a hybrid Full-Stack architecture combining a client-side Single Page Application (React + Vite + Tailwind CSS) with a dedicated Express API server layer (`server.ts`).

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Browser / SPA                       │
│  (React 18, Tailwind CSS, Lucide Icons, Language State)         │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP / JSON API
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Express API Proxy Layer                     │
│                        (server.ts)                              │
├─────────────────────────────────────────────────────────────────┤
│  /api/env/status   ──> Validate Environment Configuration       │
│  /api/auth/verify   ──> Firebase Admin Token Verification       │
│  /api/firebase/test ──> Admin Firestore Read/Write/Delete Test  │
│  /api/ai/test       ──> Gemini AI Proxy (@google/genai)         │
│  /api/email/test    ──> Resend Transactional Email Dispatch     │
└──────────────┬──────────────────┬──────────────────┬────────────┘
               │                  │                  │
               ▼                  ▼                  ▼
┌──────────────────────┐ ┌──────────────────┐ ┌────────────────────┐
│   Firebase Admin     │ │  Gemini AI API   │ │   Resend Email     │
│   (Firestore/Auth)   │ │(gemini-3.6-flash)│ │   Gateway API      │
└──────────────────────┘ └──────────────────┘ └────────────────────┘
```

## Core Design Principles

1. **Strict Secret Isolation**:
   No third-party secret keys (Firebase Service Account Private Key, Gemini API Key, Resend API Key) are ever passed to or exposed in the browser bundle.

2. **Server-Side API Proxies**:
   All operations requiring privileged API keys execute inside Express endpoints on the server.

3. **Client-Side Auth Integration**:
   Client uses standard Firebase Web SDK for user login/session management, passing ID tokens in `Authorization: Bearer <token>` headers to the Express backend for server-side verification.

4. **Transient Test Operations**:
   Firestore database connectivity tests execute safe write-read-delete atomic transactions under `_dev_connectivity_test` without creating permanent business collections or schema bloat.
