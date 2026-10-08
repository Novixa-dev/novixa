import { describe, it, expect } from 'vitest';
import { interpretHealth } from '@/lib/system-status';

describe('interpretHealth', () => {
  it('reads a healthy answer as operational and keeps the measured round trip', () => {
    const view = interpretHealth(
      200,
      { status: 'ok', version: '3047496a7184', database: 'ok', store: 'postgres', mail: 'smtp' },
      143.6
    );
    expect(view).toEqual({ state: 'operational', ms: 144, version: '3047496a7184', database: 'connected' });
  });

  it('reads a degraded answer as degraded, never as operational', () => {
    const view = interpretHealth(503, { status: 'degraded', version: 'abcdef1', database: 'unavailable' }, 90);
    expect(view).toMatchObject({ state: 'degraded', database: 'unavailable' });
  });

  it('does not call a 200 operational when the body says otherwise', () => {
    expect(interpretHealth(200, { status: 'degraded', database: 'ok' }, 10)).toMatchObject({ state: 'degraded' });
  });

  it('treats anything that is not a health document as unreachable', () => {
    for (const body of [null, undefined, 'ok', 42, [], {}, { status: 'fine' }]) {
      expect(interpretHealth(200, body, 5)).toEqual({ state: 'unreachable' });
    }
  });

  it('never renders text the endpoint chose: unknown values collapse to safe ones', () => {
    const view = interpretHealth(
      200,
      { status: 'ok', version: '<script>alert(1)</script>', database: 'postgres://user:pw@host/db' },
      5
    );
    expect(view).toMatchObject({ state: 'operational', version: null, database: 'unknown' });
  });

  it('never reports a negative time', () => {
    expect(interpretHealth(200, { status: 'ok', database: 'ok' }, -4)).toMatchObject({ ms: 0 });
  });
});
