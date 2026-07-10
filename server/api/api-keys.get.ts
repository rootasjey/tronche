import { requireAuth } from '../utils/auth'
import { db } from 'hub:db'
import * as schema from '../db/schema'
import { eq, inArray, sql, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  const keys = await db.select().from(schema.apiKeys)
    .where(eq(schema.apiKeys.userId, user.id))
    .all()

  if (keys.length === 0) {
    return { success: true, data: [] }
  }

  const keyIds = keys.map(k => k.id)
  const today = new Date().toISOString().slice(0, 10)
  const startOfMonth = `${today.slice(0, 7)}-01`

  const usageRows = await db.select({
    keyId: schema.apiUsageDaily.keyId,
    daily: sql<number>`COALESCE(SUM(CASE WHEN ${schema.apiUsageDaily.date} = ${today} THEN ${schema.apiUsageDaily.count} ELSE 0 END), 0)`,
    monthly: sql<number>`COALESCE(SUM(${schema.apiUsageDaily.count}), 0)`,
  }).from(schema.apiUsageDaily)
    .where(and(
      inArray(schema.apiUsageDaily.keyId, keyIds),
      sql`${schema.apiUsageDaily.date} >= ${startOfMonth}`,
    ))
    .groupBy(schema.apiUsageDaily.keyId)
    .all()

  const usageMap = new Map(usageRows.map(r => [r.keyId, { daily: r.daily, monthly: r.monthly }]))

  const { limits } = await import('../utils/usage')

  return {
    success: true,
    data: keys.map(k => {
      const usage = usageMap.get(k.id) || { daily: 0, monthly: 0 }
      const tierLimits = limits[k.tier] || limits.free
      return {
        id: k.id,
        name: k.name,
        tier: k.tier,
        isActive: k.isActive,
        lastUsedAt: k.lastUsedAt,
        createdAt: k.createdAt,
        usage: {
          daily: usage.daily,
          dailyLimit: tierLimits.daily,
          monthly: usage.monthly,
          monthlyLimit: tierLimits.monthly,
        },
      }
    }),
  }
})
