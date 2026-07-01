import { kv } from 'hub:kv'

const WINDOW_MS = 60_000
const MAX_REQUESTS = 100

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
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
