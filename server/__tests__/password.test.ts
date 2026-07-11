import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../utils/password';

describe('password utils', () => {
  it('hashPassword produces a pbkdf2 hash string', async () => {
    const hashed = await hashPassword('correct-horse-battery-staple');
    expect(hashed).toMatch(/^\$pbkdf2\$/);
  });

  it('verifyPassword returns true for the correct password', async () => {
    const hashed = await hashPassword('my-secret');
    const result = await verifyPassword(hashed, 'my-secret');
    expect(result).toBe(true);
  });

  it('verifyPassword returns false for an incorrect password', async () => {
    const hashed = await hashPassword('my-secret');
    const result = await verifyPassword(hashed, 'wrong-password');
    expect(result).toBe(false);
  });

  it('verifyPassword returns false for an unknown scheme', async () => {
    const result = await verifyPassword('$unknown$salt$hash', 'pw');
    expect(result).toBe(false);
  });
});
