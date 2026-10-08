import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * The first production deploy failed before reaching the server:
 *
 *   invalid tag "ghcr.io/Novixa-dev/novixa:sha-…": repository name must be lowercase
 *
 * The workflow built the image name from `github.repository`, which keeps the
 * organisation's capital N, and Docker refuses upper case. The rehearsal had
 * used a lower-case organisation, so nothing caught it until the real run.
 *
 * Actions expressions have no lower-case function, so the name is lower-cased
 * in a shell step and handed from the build job to the deploy job. These
 * assertions fail if anyone goes back to interpolating the raw repository name
 * into the image reference, or lets the two jobs derive it separately.
 */

// Git checks files out with CRLF on Windows (`core.autocrlf`), LF on CI. The
// assertions below match line by line, so normalise first; otherwise the suite
// passes in CI and fails on a contributor's machine for no product reason.
const workflow = readFileSync(
  fileURLToPath(new URL('../.github/workflows/deploy.yml', import.meta.url)),
  'utf8'
).replace(/\r\n/g, '\n');

describe('deploy workflow image name', () => {
  it('never builds the image reference from the raw repository name', () => {
    expect(workflow).not.toMatch(/ghcr\.io\/\$\{\{\s*github\.repository\s*\}\}/);
  });

  it('lower-cases the repository name in a shell step', () => {
    expect(workflow).toMatch(/ghcr\.io\/\$\{GITHUB_REPOSITORY,,\}/);
  });

  it('pushes the lower-cased image and nothing else', () => {
    const tagsBlock = workflow.match(/tags: \|\n((?:\s+\$\{\{.*\n)+)/);
    expect(tagsBlock, 'the build step lists its tags').not.toBeNull();
    for (const line of tagsBlock![1].trim().split('\n')) {
      expect(line.trim()).toMatch(/^\$\{\{ steps\.tag\.outputs\.image \}\}:/);
    }
  });

  it('hands the same name from the build job to the deploy job', () => {
    expect(workflow).toMatch(/outputs:[\s\S]*image: \$\{\{ steps\.tag\.outputs\.image \}\}/);
    expect(workflow).toMatch(/IMAGE: \$\{\{ needs\.image\.outputs\.image \}\}/);
  });
});
