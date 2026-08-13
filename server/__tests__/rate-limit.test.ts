import { describe, it, expect } from 'vitest';
import { checkRateLimit, checkScopedRateLimit } from '../utils/rate-limit';

describe('checkRateLimit (memory path)', () => {
  it('allows the first request', async () => {
    const result = await checkRateLimit('127.0.0.1');
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(999);
  });

  it('decrements remaining on subsequent requests', async () => {
    const ip = '10.0.0.1';
    const r1 = await checkRateLimit(ip);
    expect(r1.remaining).toBe(999);

    const r2 = await checkRateLimit(ip);
    expect(r2.remaining).toBe(998);
  });

  it('treats different IPs independently', async () => {
    const r1 = await checkRateLimit('ip-a');
    const r2 = await checkRateLimit('ip-b');
    expect(r1.remaining).toBe(999);
    expect(r2.remaining).toBe(999);
  });

  it('supports independent scoped limits', async () => {
    const scope = `contact-${Date.now()}`;
    const first = await checkScopedRateLimit(scope, 'ip-a', 2, 60_000);
    const second = await checkScopedRateLimit(scope, 'ip-a', 2, 60_000);
    const blocked = await checkScopedRateLimit(scope, 'ip-a', 2, 60_000);

    expect(first.remaining).toBe(1);
    expect(second.remaining).toBe(0);
    expect(blocked.allowed).toBe(false);
  });
});
