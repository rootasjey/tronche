const WINDOW_MS = 60_000
const MAX_REQUESTS = 1000

const memory = new Map<string, { count: number; resetAt: number }>()

type RateLimitResult = { allowed: boolean; remaining: number; resetAt: number }

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  return checkScopedRateLimit('api', ip, MAX_REQUESTS, WINDOW_MS)
}

export async function checkScopedRateLimit(
  scope: string,
  identifier: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  try {
    const { kv } = await import('hub:kv').catch(() => ({ kv: null }))
    if (kv) return await kvRateLimit(scope, identifier, maxRequests, windowMs)
  } catch { /* ignore */ }
  return memoryRateLimit(scope, identifier, maxRequests, windowMs)
}

async function kvRateLimit(
  scope: string,
  identifier: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const { kv } = await import('hub:kv')
  const now = Date.now()
  const bucket = Math.floor(now / windowMs)
  const key = `ratelimit:${scope}:${identifier}:${bucket}`
  const windowEnd = (bucket + 1) * windowMs

  const current = await kv.get<number>(key)

  if (!current) {
    await kv.set(key, 1, { expirationTtl: Math.ceil((windowEnd - now) / 1000) + 60 })
    return { allowed: true, remaining: maxRequests - 1, resetAt: windowEnd }
  }

  if (current >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: windowEnd }
  }

  await kv.set(key, current + 1, { expirationTtl: Math.ceil((windowEnd - now) / 1000) + 60 })
  return { allowed: true, remaining: maxRequests - current - 1, resetAt: windowEnd }
}

function memoryRateLimit(
  scope: string,
  identifier: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  const key = `${scope}:${identifier}`
  const entry = memory.get(key)

  if (!entry || now > entry.resetAt) {
    memory.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs }
  }

  entry.count++

  if (entry.count > maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt }
}
