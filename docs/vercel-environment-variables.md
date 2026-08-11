# Vercel Environment Variables Configuration Guide

This document lists all environment variables required to deploy Novixa on **Vercel** (or any cloud hosting platform).

---

## Environment Variables Reference Table

| Variable Name | Exposure | Required | Description / Example Value |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Public (Client) | Yes | Firebase Web SDK API Key (`AIzaSy...`) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Public (Client) | Yes | `novixa-9f902.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Public (Client) | Yes | `novixa-9f902` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Public (Client) | Yes | `novixa-9f902.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Public (Client) | Yes | `737254921794` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Public (Client) | Yes | `1:737254921794:web:280d139bc2989282347fdb` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Public (Client) | Yes | `G-8GVSC2YVNN` |
| `FIREBASE_PROJECT_ID` | Secret (Server) | Yes | `novixa-9f902` |
| `FIREBASE_CLIENT_EMAIL` | Secret (Server) | Yes | `firebase-adminsdk-fbsvc@novixa-9f902.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Secret (Server) | Yes | Service Account Private Key (`"-----BEGIN PRIVATE KEY-----\n..."`) |
| `GEMINI_API_KEY` | Secret (Server) | Yes | Google Gemini API Key (`AQ.Ab8RN6...`) |
| `RESEND_API_KEY` | Secret (Server) | Yes | Resend API Key (`re_jPkPK...`) |
| `RESEND_FROM_EMAIL` | Secret (Server) | Yes | Sender Email (`onboarding@resend.dev` or `noreply@novixa.dev`) |
| `NOVIXA_CONTACT_EMAIL` | Secret (Server) | Yes | Contact Notification Recipient (`ak01redwan@gmail.com`) |

---

## How to Add Variables in Vercel Dashboard

1. Log in to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Select your **Novixa** project.
3. Navigate to **Settings** > **Environment Variables**.
4. Add each key and value pair from the table above.
5. Select environments: **Production**, **Preview**, and **Development**.
6. Click **Save**.

---

## Important Handling Notes for Vercel

### 1. `FIREBASE_PRIVATE_KEY` Formatting in Vercel
When pasting `FIREBASE_PRIVATE_KEY` into Vercel's UI:
- Enclose the key in double quotes (`"..."`) or paste raw newline string `\n`.
- The application automatically handles replacing `\\n` with real newline characters:
  ```typescript
  privateKey = privateKey.replace(/\\n/g, '\n');
  ```

### 2. Client vs. Server Exposure
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser client during Vite build time.
- Variables **without** `NEXT_PUBLIC_` (such as `FIREBASE_PRIVATE_KEY`, `GEMINI_API_KEY`, `RESEND_API_KEY`) remain strictly on the Vercel Node.js server runtime and are never sent to the browser.

### 3. Credential Rotation
After initial testing is completed, replace all temporary key values in Vercel with your newly generated production credentials.
