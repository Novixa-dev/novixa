#!/usr/bin/env node
/**
 * Produce ADMIN_PASSWORD_HASH for the admin dashboard.
 *
 *   node scripts/hash-password.mjs              (prompts, input hidden)
 *   printf '%s' "$PW" | node scripts/hash-password.mjs --stdin
 *
 * Prints only the hash. Same algorithm and format as src/lib/auth/password.ts:
 * scrypt$N$r$p$salt$hash. The plaintext is never written anywhere.
 */
import { randomBytes, scrypt } from 'node:crypto';
import { createInterface } from 'node:readline';

const N = 16384, r = 8, p = 1, KEY_LENGTH = 64;

async function readPassword() {
  if (process.argv.includes('--stdin')) {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    return Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '');
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  rl._writeToOutput = (s) => { if (s.includes('Password')) process.stdout.write(s); };
  const answer = await new Promise((resolve) => rl.question('Password: ', resolve));
  rl.close();
  process.stdout.write('\n');
  return answer;
}

const password = await readPassword();
if (password.length < 12) {
  console.error('Refusing: use at least 12 characters.');
  process.exit(1);
}
const salt = randomBytes(16);
const derived = await new Promise((resolve, reject) =>
  scrypt(password, salt, KEY_LENGTH, { N, r, p, maxmem: 64 * 1024 * 1024 }, (e, d) => (e ? reject(e) : resolve(d)))
);
console.log(`scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${derived.toString('base64')}`);
