# syntax=docker/dockerfile:1
# ==============================================================================
# Novixa — production container (Next.js standalone, multi-stage)
#
# Why standalone: the previous image copied the build output and ran
# `next start` in a stage with no `src/`. `/og` reads its Arabic font from
# `src/app/og/` at request time, so every social card a container served was a
# 500 (reproduced: ENOENT on the .ttf). Standalone output traces the font in.
# It also ships only the traced subset of node_modules instead of all of it,
# devDependencies included, which the old runner stage copied wholesale.
#
# Railway (and any Docker host) passes service variables into the build only
# for names declared with ARG. NEXT_PUBLIC_* values are inlined at build time,
# so they must be declared here or the client bundle is built without them.
# ==============================================================================

ARG NODE_VERSION=22-alpine

# ── 1. Dependencies ─────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ── 2. Build ────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time inputs. Canonical, hreflang, sitemap and OG URLs are resolved
# during the build, so the origin has to be known here, not only at runtime.
ARG NEXT_PUBLIC_SITE_URL
ARG RAILWAY_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_VITALS_ENDPOINT
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    RAILWAY_PUBLIC_DOMAIN=$RAILWAY_PUBLIC_DOMAIN \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_VITALS_ENDPOINT=$NEXT_PUBLIC_VITALS_ENDPOINT \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production \
    NEXT_OUTPUT=standalone

RUN npm run build

# ── 3. Runtime ──────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# The commit this image was built from: shown in the admin and reported by
# /api/health, so a deploy can prove the new build is the one answering.
ARG GIT_SHA=""
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    BUILD_SHA=$GIT_SHA

# Lets the VPS prune old Novixa images without touching anyone else's.
LABEL dev.novixa.app="true"

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# The standalone tree holds server.js, the traced node_modules subset, the
# compiled server under dist/, and the OG font at src/app/og/. Static assets and
# public/ are not traced and are copied alongside it.
COPY --from=builder --chown=nextjs:nodejs /app/dist/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/static ./dist/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Readiness, not just liveness: /api/health is 503 when a configured database
# is unreachable. Node 22's global fetch, so the image needs no curl.
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]

# Railway sets PORT; server.js honours it and HOSTNAME.
CMD ["node", "server.js"]
