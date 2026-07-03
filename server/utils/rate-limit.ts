const WINDOW_MS = 60_000
const MAX_REQUESTS = 1000

const memory = new Map<string, { count: number; resetAt: number }>()

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  try {
    const { kv } = await import('hub:kv').catch(() => ({ kv: null }))
    if (kv) return await kvRateLimit(ip)
  } catch {}
  return memoryRateLimit(ip)
}

async function kvRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const { kv } = await import('hub:kv')
  const now = Date.now()
  const bucket = Math.floor(now / WINDOW_MS)
  const key = `ratelimit:${ip}:${bucket}`
  const windowEnd = (bucket + 1) * WINDOW_MS

  const current = await kv.get<number>(key)

  if (!current) {
    await kv.set(key, 1, { expirationTtl: Math.ceil((windowEnd - now) / 1000) + 60 })
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: windowEnd }
  }

  if (current >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: windowEnd }
  }

  await kv.set(key, current + 1, { expirationTtl: Math.ceil((windowEnd - now) / 1000) + 60 })
  return { allowed: true, remaining: MAX_REQUESTS - current - 1, resetAt: windowEnd }
}

function memoryRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = memory.get(ip)

  if (!entry || now > entry.resetAt) {
    memory.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS }
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetAt: entry.resetAt }
}
