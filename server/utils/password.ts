import { scryptAsync } from '@noble/hashes/scrypt'

function toBase64(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf))
}

function fromBase64(str: string): Uint8Array {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const derived = await scryptAsync(plain, salt, { N: 16384, r: 8, p: 1, dkLen: 64 })
  return `$scrypt$n=16384,r=8,p=1$${toBase64(salt)}$${toBase64(derived)}`
}

export async function verifyPassword(hashed: string, plain: string): Promise<boolean> {
  const parts = hashed.split('$')
  const params: Record<string, number> = {}
  for (const p of parts[2].split(',')) {
    const [k, v] = p.split('=')
    params[k] = Number(v)
  }
  const salt = fromBase64(parts[3])
  const hashBytes = fromBase64(parts[4])
  const derived = await scryptAsync(plain, salt, {
    N: params.n,
    r: params.r,
    p: params.p,
    dkLen: hashBytes.length,
  })
  return derived.length === hashBytes.length && derived.every((v, i) => v === hashBytes[i])
}
