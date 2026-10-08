import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * `docs/AI_WORKING_RULES.md` §1 forbids inventing "security guarantees, SLAs,
 * or deployment counts". A review of the live site after launch found them
 * anyway, in the places people read last: the footer on every page, the nav
 * bar, the hero, the team page and an "edge telemetry" dialog that listed
 * datacentres in Riyadh, Dubai and Jeddah with latencies, a 90-day uptime and
 * an incident count. The site runs on one VPS and had been live for hours.
 *
 * Each pattern below is a claim that was once shipped and removed. The test
 * reads every source file a visitor can see, so reintroducing one fails the
 * build rather than waiting for the next review to notice.
 */

const SRC = fileURLToPath(new URL('../src', import.meta.url));

function* sourceFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* sourceFiles(path);
    else if (/\.(ts|tsx)$/.test(entry)) yield path;
  }
}

const FORBIDDEN: Array<{ claim: string; pattern: RegExp }> = [
  { claim: 'an availability percentage (99.9x%)', pattern: /99\.9+\s*%/ },
  { claim: 'an SLA presented with a number', pattern: /SLA\s*99/i },
  { claim: 'a named cloud region or datacentre we do not run', pattern: /me-central\d|eu-central\d|Riyadh \(|Dubai \(|Jeddah \(|Frankfurt \(/ },
  { claim: 'a measured-looking uptime or incident readout', pattern: /90d Uptime|Active Incidents|Live latency and availability telemetry/ },
  { claim: 'a "production ready" or "verified" architecture stamp', pattern: /PRODUCTION READY|Verified GCC|معمارية معتمدة/ },
  { claim: 'a team location we cannot show', pattern: /GCC-Based Engineering|مقره الخليج/ },
  { claim: 'a regional compliance or data-sovereignty promise', pattern: /Sovereign Cloud|سيادة البيانات والاستضافة|full compliance with local regulatory/i },
  { claim: 'an encryption-at-rest or zero-trust claim', pattern: /AES-256|Zero-trust architecture/i },
];

describe('visitor-facing source makes no unverifiable claims', () => {
  const files = [...sourceFiles(SRC)];

  it('found the source tree', () => {
    expect(files.length).toBeGreaterThan(100);
  });

  for (const { claim, pattern } of FORBIDDEN) {
    it(`contains no ${claim}`, () => {
      const hits = files
        .map((file) => ({ file, lines: readFileSync(file, 'utf8').split(/\r?\n/) }))
        .flatMap(({ file, lines }) =>
          lines
            .map((line, index) => ({ line, at: `${relative(SRC, file)}:${index + 1}` }))
            .filter(({ line }) => pattern.test(line))
            .map(({ at, line }) => `${at}  ${line.trim().slice(0, 100)}`)
        );
      expect(hits, `remove or substantiate:\n${hits.join('\n')}`).toEqual([]);
    });
  }
});
