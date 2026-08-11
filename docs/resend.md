# Resend Email Integration (`src/lib/email/resend.ts`)

## Architecture
- Server-side email delivery using `resend` SDK.
- Secret `RESEND_API_KEY` accessed strictly in Express server context.
- Dispatches formatted HTML transactional messages from `RESEND_FROM_EMAIL` (`onboarding@resend.dev`) to `NOVIXA_CONTACT_EMAIL` (`ak01redwan@gmail.com`).
- Exposed via endpoint `POST /api/email/test`.
