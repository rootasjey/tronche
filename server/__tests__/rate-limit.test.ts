import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '../utils/rate-limit';

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
});
