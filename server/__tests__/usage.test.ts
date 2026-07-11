import { describe, it, expect } from 'vitest';

describe('usage limits constant', () => {
  it('exports free tier with daily 500 and monthly 5000', async () => {
    const { limits } = await import('../utils/usage');
    expect(limits.free).toEqual({ daily: 500, monthly: 5000 });
  });

  it('exports pro tier with daily 50000 and monthly 500000', async () => {
    const { limits } = await import('../utils/usage');
    expect(limits.pro).toEqual({ daily: 50000, monthly: 500000 });
  });
});
