import { requireAuth } from '../utils/auth'
import { db } from 'hub:db'
import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)

  const keys = await db.select().from(schema.apiKeys)
    .where(eq(schema.apiKeys.userId, user.id))
    .all()

  return { success: true, data: keys.map((k) => ({
    id: k.id,
    name: k.name,
    tier: k.tier,
    isActive: k.isActive,
    lastUsedAt: k.lastUsedAt,
    createdAt: k.createdAt,
  })) }
})
