import { db } from 'hub:db'
import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'
import { checkAndIncrement, limits } from '../utils/usage'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  if (!path.startsWith('/api/v1/')) return

  const authHeader = getRequestHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Missing or invalid API key' })
  }

  const key = authHeader.slice(7)
  const apiKey = await db.select().from(schema.apiKeys)
    .where(eq(schema.apiKeys.key, key))
    .get()

  if (!apiKey || !apiKey.isActive) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or inactive API key' })
  }

  const usage = await checkAndIncrement(apiKey.id, apiKey.tier)

  setResponseHeaders(event, {
    'X-Daily-Limit': String(limits[apiKey.tier]?.daily ?? limits.free.daily),
    'X-Daily-Remaining': String(usage.dailyRemaining),
    'X-Monthly-Limit': String(limits[apiKey.tier]?.monthly ?? limits.free.monthly),
    'X-Monthly-Remaining': String(usage.monthlyRemaining),
  })

  if (!usage.allowed) {
    throw createError({ statusCode: 429, statusMessage: 'API rate limit exceeded' })
  }

  await db.update(schema.apiKeys)
    .set({ lastUsedAt: new Date().toISOString() })
    .where(eq(schema.apiKeys.id, apiKey.id))
    .run()

  event.context.apiKey = apiKey
})
