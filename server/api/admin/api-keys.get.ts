import { requireAdmin } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq, inArray, sql, and, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const offset = (page - 1) * limit

  const total = await db.select({ count: count() }).from(schema.apiKeys).get()

  const keys = await db.select({
    id: schema.apiKeys.id,
    name: schema.apiKeys.name,
    key: schema.apiKeys.key,
    tier: schema.apiKeys.tier,
    isActive: schema.apiKeys.isActive,
    lastUsedAt: schema.apiKeys.lastUsedAt,
    createdAt: schema.apiKeys.createdAt,
    userId: schema.apiKeys.userId,
    userName: schema.users.name,
    userEmail: schema.users.email,
  }).from(schema.apiKeys)
    .leftJoin(schema.users, eq(schema.apiKeys.userId, schema.users.id))
    .orderBy(schema.apiKeys.createdAt)
    .limit(limit)
    .offset(offset)
    .all()

  const keyIds = keys.map(k => k.id)
  const today = new Date().toISOString().slice(0, 10)
  const startOfMonth = `${today.slice(0, 7)}-01`

  let usageMap = new Map<number, { daily: number; monthly: number }>()

  if (keyIds.length > 0) {
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

    usageMap = new Map(usageRows.map(r => [r.keyId, { daily: r.daily, monthly: r.monthly }]))
  }

  const { limits } = await import('../../utils/usage')

  return {
    success: true,
    data: keys.map(k => {
      const usage = usageMap.get(k.id) || { daily: 0, monthly: 0 }
      const tierLimits = limits[k.tier] || limits.free
      return {
        ...k,
        usage: {
          daily: usage.daily,
          dailyLimit: tierLimits.daily,
          monthly: usage.monthly,
          monthlyLimit: tierLimits.monthly,
        },
      }
    }),
    pagination: { page, limit, total: total?.count || 0 },
  }
})
