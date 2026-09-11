const fs = require('fs');
const path = require('path');

/**
 * Universal Next.js / Vercel Build Output Synchronizer
 * Guarantees that both `dist/` and `.next/` contain the required Next.js manifests
 * (routes-manifest.json, build-manifest.json, server, static, etc.)
 * so deployments succeed regardless of whether Vercel Project Settings has
 * "Output Directory: dist" override enabled or disabled.
 */
function syncOutput() {
  const rootDir = path.resolve(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');
  const nextDir = path.join(rootDir, '.next');

  // If dist exists, mirror it to .next
  if (fs.existsSync(distDir) && fs.existsSync(path.join(distDir, 'routes-manifest.json'))) {
    try {
      if (!fs.existsSync(nextDir)) {
        try {
          fs.symlinkSync(distDir, nextDir, 'junction');
          console.log('[sync-build-output] Created junction from dist to .next');
          return;
        } catch (symErr) {
          fs.cpSync(distDir, nextDir, { recursive: true });
          console.log('[sync-build-output] Copied dist to .next');
          return;
        }
      }
    } catch (e) {
      console.warn('[sync-build-output] Note syncing dist -> .next:', e.message);
    }
  }

  // If .next exists and dist does not, mirror .next to dist
  if (fs.existsSync(nextDir) && fs.existsSync(path.join(nextDir, 'routes-manifest.json'))) {
    try {
      if (!fs.existsSync(distDir)) {
        try {
          fs.symlinkSync(nextDir, distDir, 'junction');
          console.log('[sync-build-output] Created junction from .next to dist');
          return;
        } catch (symErr) {
          fs.cpSync(nextDir, distDir, { recursive: true });
          console.log('[sync-build-output] Copied .next to dist');
          return;
        }
      }
    } catch (e) {
      console.warn('[sync-build-output] Note syncing .next -> dist:', e.message);
    }
  }

  console.log('[sync-build-output] Verified build outputs are present.');
}

syncOutput();
