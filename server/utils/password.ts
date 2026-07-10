const encoder = new TextEncoder()

function toBase64(buf: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < buf.length; i++) {
    binary += String.fromCharCode(buf[i])
  }
  return btoa(binary)
}

function fromBase64(str: string): Uint8Array {
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(plain),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const derived = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 600000,
      hash: 'SHA-256',
    },
    keyMaterial,
    512,
  )
  const hashBytes = new Uint8Array(derived)
  return `$pbkdf2$i=600000,h=SHA-256$${toBase64(salt)}$${toBase64(hashBytes)}`
}

export async function verifyPassword(hashed: string, plain: string): Promise<boolean> {
  const parts = hashed.split('$')
  const scheme = parts[1]

  if (scheme === 'scrypt') {
    const params: Record<string, number> = {}
    for (const p of parts[2].split(',')) {
      const [k, v] = p.split('=')
      params[k] = Number(v)
    }
    const salt = fromBase64(parts[3])
    const hashBytes = fromBase64(parts[4])
    const { scryptAsync } = await import('@noble/hashes/scrypt')
    const derived = await scryptAsync(plain, salt, {
      N: params.n,
      r: params.r,
      p: params.p,
      dkLen: hashBytes.length,
    })
    return derived.length === hashBytes.length && derived.every((v, i) => v === hashBytes[i])
  }

  if (scheme === 'pbkdf2') {
    const params: Record<string, string> = {}
    for (const p of parts[2].split(',')) {
      const [k, v] = p.split('=')
      params[k] = v
    }
    const salt = fromBase64(parts[3])
    const hashBytes = fromBase64(parts[4])
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(plain),
      'PBKDF2',
      false,
      ['deriveBits'],
    )
    const derived = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: Number(params.i),
        hash: params.h as 'SHA-256' | 'SHA-512',
      },
      keyMaterial,
      hashBytes.length * 8,
    )
    const derivedBytes = new Uint8Array(derived)
    return derivedBytes.length === hashBytes.length && derivedBytes.every((v, i) => v === derivedBytes[i])
  }

  return false
}
