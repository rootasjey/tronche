import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))

  const user = await db.select().from(schema.users)
    .where(eq(schema.users.id, id))
    .get()

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const [keyCount] = await db.select({ count: count() }).from(schema.apiKeys)
    .where(eq(schema.apiKeys.userId, id)).all()

  const keys = await db.select({
    id: schema.apiKeys.id,
    name: schema.apiKeys.name,
    tier: schema.apiKeys.tier,
    isActive: schema.apiKeys.isActive,
    lastUsedAt: schema.apiKeys.lastUsedAt,
    createdAt: schema.apiKeys.createdAt,
  }).from(schema.apiKeys)
    .where(eq(schema.apiKeys.userId, id))
    .all()

  return {
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      apiKeys: { total: keyCount.count, items: keys },
    },
  }
})
