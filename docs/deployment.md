# Deployment Guidelines

## Overview

Novixa is configured for deployment on **Vercel** or any Node.js container host (e.g. Cloud Run, Docker).

## Build Commands

- **Production Build**: `npm run build`
  - Compiles Vite client assets into `dist/`
  - Bundles Express server into `dist/server.cjs` via `esbuild`
- **Start Production Server**: `npm run start` (`node dist/server.cjs`)
- **Lint Verification**: `npm run lint` (`tsc --noEmit`)

## Hosting Target: Vercel

When deploying to Vercel:
1. Connect the GitHub repository to your Vercel project.
2. Select Framework Preset: **Other** / **Node.js**.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Configure Environment Variables in Vercel Project Settings (refer to [`docs/vercel-environment-variables.md`](vercel-environment-variables.md)).

## Production Domain Strategy

- **Development/Testing Domain**: `localhost` / Vercel Preview Deployment URL
- **Future Production Domain**: `https://novixa.dev`
- **DNS / SSL**: Custom domain `novixa.dev` will be mapped to Vercel DNS after official credential rotation.
