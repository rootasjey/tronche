import { requireAdmin } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq, count } from 'drizzle-orm'

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

  return {
    success: true,
    data: keys,
    pagination: { page, limit, total: total?.count || 0 },
  }
})
