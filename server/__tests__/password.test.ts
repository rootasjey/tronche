import { describe, it, expect } from 'vitest';
import { scryptAsync } from '@noble/hashes/scrypt.js';
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

  it('verifyPassword accepts legacy scrypt hashes', async () => {
    const password = 'legacy-secret';
    const salt = new Uint8Array(16).fill(1);
    const options = { N: 16, r: 1, p: 1, dkLen: 32 };
    const derived = await scryptAsync(password, salt, options);
    const saltBase64 = Buffer.from(salt).toString('base64');
    const hashBase64 = Buffer.from(derived).toString('base64');
    const hashed = `$scrypt$n=16,r=1,p=1$${saltBase64}$${hashBase64}`;

    await expect(verifyPassword(hashed, password)).resolves.toBe(true);
    await expect(verifyPassword(hashed, 'wrong-password')).resolves.toBe(false);
  });

  it('verifyPassword returns false for an unknown scheme', async () => {
    const result = await verifyPassword('$unknown$salt$hash', 'pw');
    expect(result).toBe(false);
  });
});
