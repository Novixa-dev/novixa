#!/usr/bin/env node
/**
 * Write the app's runtime environment for the VPS from the deploy job's env.
 *
 *   node deploy/scripts/render-app-env.mjs <out-file>
 *
 * Runs in GitHub Actions, where the values arrive as secrets/variables. Only
 * variable NAMES are printed — this repository is public and so are its
 * Actions logs. The admin password is hashed here, on the runner, so only the
 * scrypt hash ever reaches the server.
 *
 * Output is a Compose env_file with single-quoted values, which Compose reads
 * literally: the scrypt hash is full of `$` and must not be interpolated.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = process.argv[2];
if (!out) {
  console.error('usage: render-app-env.mjs <out-file>');
  process.exit(2);
}

const env = process.env;
const errors = [];
const lines = [];

function put(name, value, { required = false } = {}) {
  const v = (value ?? '').trim();
  if (!v) {
    if (required) errors.push(`${name} is required`);
    return;
  }
  if (/['\r\n]/.test(v)) {
    errors.push(`${name} must not contain a single quote or a line break`);
    return;
  }
  lines.push(`${name}='${v}'`);
}

// ── Site ───────────────────────────────────────────────────────────────────
put('NEXT_PUBLIC_SITE_URL', env.SITE_URL || 'https://novixa.dev');

// ── Admin ──────────────────────────────────────────────────────────────────
put('ADMIN_EMAIL', (env.ADMIN_EMAIL || '').toLowerCase(), { required: true });
let hash = (env.ADMIN_PASSWORD_HASH || '').trim();
if (!hash && env.ADMIN_PASSWORD) {
  if (env.ADMIN_PASSWORD.length < 12) {
    errors.push('ADMIN_PASSWORD must be at least 12 characters');
  } else {
    const script = join(dirname(fileURLToPath(import.meta.url)), '../../scripts/hash-password.mjs');
    hash = execFileSync(process.execPath, [script, '--stdin'], { input: env.ADMIN_PASSWORD }).toString().trim();
  }
}
if (hash && !/^scrypt\$\d+\$\d+\$\d+\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/.test(hash)) {
  errors.push('ADMIN_PASSWORD_HASH is not in the scrypt$N$r$p$salt$hash format');
}
put('ADMIN_PASSWORD_HASH', hash, { required: true });

// ── Mail ───────────────────────────────────────────────────────────────────
put('NOVIXA_CONTACT_EMAIL', env.CONTACT_EMAIL);
put('MAIL_FROM', env.MAIL_FROM);
put('RESEND_API_KEY', env.RESEND_API_KEY);
put('SMTP_HOST', env.SMTP_HOST);
put('SMTP_PORT', env.SMTP_PORT);
put('SMTP_SECURE', env.SMTP_SECURE);
put('SMTP_USER', env.SMTP_USER);
put('SMTP_PASSWORD', env.SMTP_PASSWORD);
if (!env.RESEND_API_KEY && !env.SMTP_HOST) {
  console.warn('::warning::Neither RESEND_API_KEY nor SMTP_HOST is set — enquiries will be stored but not emailed.');
}
if (env.SMTP_HOST && !env.MAIL_FROM) {
  errors.push('MAIL_FROM is required with SMTP (an address the SMTP user may send as)');
}

if (errors.length) {
  for (const e of errors) console.error(`::error::${e}`);
  process.exit(1);
}

writeFileSync(out, lines.join('\n') + '\n', { mode: 0o600 });
console.log(`app.env: ${lines.map((l) => l.slice(0, l.indexOf('='))).join(', ')}`);
