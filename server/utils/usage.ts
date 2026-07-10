import { db } from 'hub:db'
import * as schema from '../db/schema'
import { eq, sql, and } from 'drizzle-orm'

export const limits: Record<string, { daily: number; monthly: number }> = {
  free: { daily: 500, monthly: 5000 },
  pro: { daily: 50000, monthly: 500000 },
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function getStartOfMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`
}

export async function checkAndIncrement(keyId: number, tier: string): Promise<{
  allowed: boolean
  dailyRemaining: number
  monthlyRemaining: number
}> {
  const today = getToday()
  const startOfMonth = getStartOfMonth()
  const tierLimits = limits[tier] || limits.free

  const result = await db.transaction(async (tx) => {
    const usage = await tx.select({
      dailyCount: sql<number>`COALESCE(SUM(CASE WHEN ${schema.apiUsageDaily.date} = ${today} THEN ${schema.apiUsageDaily.count} ELSE 0 END), 0)`,
      monthlyCount: sql<number>`COALESCE(SUM(${schema.apiUsageDaily.count}), 0)`,
    }).from(schema.apiUsageDaily)
      .where(and(
        eq(schema.apiUsageDaily.keyId, keyId),
        sql`${schema.apiUsageDaily.date} >= ${startOfMonth}`,
      ))
      .get()

    const dailyCount = usage?.dailyCount ?? 0
    const monthlyCount = usage?.monthlyCount ?? 0

    if (dailyCount >= tierLimits.daily) {
      return { allowed: false, dailyRemaining: 0, monthlyRemaining: Math.max(0, tierLimits.monthly - monthlyCount) } as const
    }

    if (monthlyCount >= tierLimits.monthly) {
      return { allowed: false, dailyRemaining: Math.max(0, tierLimits.daily - dailyCount), monthlyRemaining: 0 } as const
    }

    await tx.insert(schema.apiUsageDaily).values({
      keyId,
      date: today,
      count: 1,
    }).onConflictDoUpdate({
      target: [schema.apiUsageDaily.keyId, schema.apiUsageDaily.date],
      set: { count: sql`count + 1` },
    }).run()

    return {
      allowed: true,
      dailyRemaining: tierLimits.daily - dailyCount - 1,
      monthlyRemaining: tierLimits.monthly - monthlyCount - 1,
    } as const
  })

  return result
}

export async function getUsageStats(keyId: number): Promise<{ daily: number; monthly: number }> {
  const today = getToday()
  const startOfMonth = getStartOfMonth()

  const usage = await db.select({
    daily: sql<number>`COALESCE(SUM(CASE WHEN ${schema.apiUsageDaily.date} = ${today} THEN ${schema.apiUsageDaily.count} ELSE 0 END), 0)`,
    monthly: sql<number>`COALESCE(SUM(${schema.apiUsageDaily.count}), 0)`,
  }).from(schema.apiUsageDaily)
    .where(and(
      eq(schema.apiUsageDaily.keyId, keyId),
      sql`${schema.apiUsageDaily.date} >= ${startOfMonth}`,
    ))
    .get()

  return { daily: usage?.daily ?? 0, monthly: usage?.monthly ?? 0 }
}
