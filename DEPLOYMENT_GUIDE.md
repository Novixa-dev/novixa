# Novixa — Deployment Guide

How to run the site in production on each supported target, which variables it
needs and when, and how to confirm a deployment is actually correct. For what to
check after a release, see `docs/QA_RELEASE_CHECKLIST.md` §9.

**Last updated:** 2026-10-06

---

## 1. The one thing that goes wrong

Canonical URLs, `hreflang` alternates, `og:url`, `og:image`, the sitemap and
`robots.txt` are all resolved **at build time** from the site's origin. If the
build does not know the origin, every one of them points somewhere else — and
nothing looks broken in a browser.

This is not hypothetical. On 2026-10-06 the live production deployment
(`main`, at `novixa-cyan.vercel.app`) declared its canonical as
`https://novixa.dev/ar`, a URL that returns **404**, and carried no `og:image` at
all. Search engines were told the real page lives at a dead address. The fix is
on the `claude/practical-fermat-1avypc` branch (PR #1); the variable below is
what keeps it fixed.

**Set `NEXT_PUBLIC_SITE_URL` to the public origin, then build.** Changing it
afterwards needs a rebuild/redeploy, not a restart.

---

## 2. Environment variables

| Variable | Needed | When it is read | Effect if missing |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Build | Falls back to the platform hostname (Vercel production URL, then `RAILWAY_PUBLIC_DOMAIN`), then `http://localhost:3000` |
| `RESEND_API_KEY` | For the forms | Runtime | The contact API logs the submission and returns `delivered: false` — truthfully, so the visitor sees a failure, not a fake success |
| `RESEND_FROM_EMAIL` | For the forms | Runtime | Sending fails. Must be an address on a domain verified in Resend |
| `NOVIXA_CONTACT_EMAIL` | Recommended | Runtime | Enquiries go to the code's default address, which is not confirmed to be a working mailbox |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Build | The WhatsApp channel is hidden. Deliberate: no placeholder number ships |
| `NEXT_PUBLIC_VITALS_ENDPOINT` | No | Build | Real-visitor Core Web Vitals are collected and not sent anywhere |

Never commit real values. `.env*.local` is git- and docker-ignored.

---

## 3. Vercel (current production)

The project is already connected: every push to a branch builds a preview,
every push to `main` deploys production.

1. **Project → Settings → Environment Variables** — set the variables above for
   *Production*. `NEXT_PUBLIC_SITE_URL` should be the custom domain once one is
   attached; until then, the production `*.vercel.app` URL.
2. **Redeploy** after changing any `NEXT_PUBLIC_*` value.
3. **Custom domain** — Project → Settings → Domains → add it, then create the DNS
   records Vercel shows. Update `NEXT_PUBLIC_SITE_URL` and redeploy.

Notes:
- `next.config.ts` sets `distDir: 'dist'`; `scripts/sync-build-output.js` mirrors
  it to `.next` so builds succeed whichever output directory the project
  settings name. Leave the Vercel defaults alone.
- Branch previews sit behind Vercel Deployment Protection and send
  `x-robots-tag: noindex`, so they never compete with production in search.
  Their canonical points at the production host by design.

---

## 4. Railway

A Railway project is prepared: project **novixa**, service **web**, environment
**production**, public domain **`web-production-d2452.up.railway.app`**,
`NEXT_PUBLIC_SITE_URL` already set to that domain, healthcheck on `/ar`, restart
on failure.

**One step remains, and only the account owner can do it:** Railway's GitHub app
has no access to the `Novixa-dev` organisation yet, so the service cannot read the
repository.

1. In the Railway project canvas: **Add → GitHub Repository**. If your Railway
   account is not linked to GitHub yet, this prompts you to link it.
2. When GitHub asks where to install the Railway app, choose the **Novixa-dev**
   organisation and grant it the `novixa` repository. (Already installed? Change
   it at GitHub → Organization settings → GitHub Apps → Railway → Configure.)
3. Back in Railway, click **Refresh** in that same dialog so it sees the repo,
   then close it — do not create a second service.
4. Tell the agent, or in the **web** service: **Settings → Source → Connect
   Repo** → `Novixa-dev/novixa`, branch `claude/practical-fermat-1avypc` (switch
   to `main` once PR #1 is merged).

Autodeploy on push needs at least one project member whose connected GitHub
account has contributor access to the repository (Railway docs,
*Controlling GitHub Autodeploys*).

Railway builds with the repository's `Dockerfile` automatically.

**Why the Dockerfile declares `ARG`s.** Railway passes service variables into a
Dockerfile build *only* for names the Dockerfile declares with `ARG`. The
`NEXT_PUBLIC_*` values and `RAILWAY_PUBLIC_DOMAIN` are declared for that reason.
Add an `ARG` line for any new build-time variable, or it will silently be empty
in the build.

---

## 5. Docker (any host)

The image uses Next's standalone output: `node server.js`, ~79 MB of traced
dependencies instead of the full 716 MB `node_modules`.

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.example \
  -t novixa-web .

docker run -d --name novixa -p 3000:3000 --restart unless-stopped \
  -e RESEND_API_KEY=... \
  -e RESEND_FROM_EMAIL=... \
  -e NOVIXA_CONTACT_EMAIL=... \
  novixa-web
```

`NEXT_PUBLIC_*` values go in as **`--build-arg`**, not `-e`: they are inlined into
the build. Passing them only at runtime produces exactly the dead-origin failure
in §1. Runtime secrets (Resend) go in with `-e`.

**Why standalone.** The previous image ran `next start` in a stage with no
`src/`. The `/og` route reads its Arabic font from `src/app/og/` at request time,
so every social card a container served was a 500. Standalone output traces the
font in. Reproduced and verified by running the runner stage in an isolated
directory — `/og` went from 500 to `200 image/png`.

---

## 6. A plain VPS (Node 22 + a reverse proxy)

```bash
git clone https://github.com/Novixa-dev/novixa.git && cd novixa
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
PORT=3000 npm start          # or run it under pm2 / systemd
```

Put a reverse proxy with TLS (nginx + Let's Encrypt, or Caddy) in front of
`127.0.0.1:3000`, forwarding `Host` and `X-Forwarded-Proto`. The app already sends
HSTS, `nosniff`, frame-options, referrer and permissions policies — the proxy
does not need to add them.

---

## 7. Is this deployment correct?

Run these against the deployed URL, from a machine with normal internet access:

| Check | Expect |
|---|---|
| `curl -I <url>/` | `308` to `/ar` |
| `curl -I <url>/ar` and `/en` | `200` |
| `curl -I <url>/ar/does-not-exist` | `404` |
| View source on `/ar` | `canonical`, `og:url` and `og:image` all name **this** origin |
| Open the `og:image` URL | A PNG, not an error |
| `<url>/sitemap.xml`, `<url>/robots.txt` | This origin throughout |
| Response headers on `/ar` | `strict-transport-security`, `x-content-type-options`, `x-frame-options` |
| Submit the contact form | An email arrives at `NOVIXA_CONTACT_EMAIL` |

The full release gate is `docs/QA_RELEASE_CHECKLIST.md`.
