import { requireAdmin } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { count, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const [userCount] = await db.select({ count: count() }).from(schema.users).all()
  const [adminCount] = await db.select({ count: count() }).from(schema.users)
    .where(eq(schema.users.role, 'admin')).all()
  const [activeUserCount] = await db.select({ count: count() }).from(schema.users)
    .where(eq(schema.users.isActive, true)).all()
  const [keyCount] = await db.select({ count: count() }).from(schema.apiKeys).all()
  const [activeKeyCount] = await db.select({ count: count() }).from(schema.apiKeys)
    .where(eq(schema.apiKeys.isActive, true)).all()

  const recentUsers = await db.select({
    id: schema.users.id,
    name: schema.users.name,
    email: schema.users.email,
    role: schema.users.role,
    createdAt: schema.users.createdAt,
  }).from(schema.users)
    .orderBy(schema.users.createdAt)
    .limit(5)
    .all()

  return {
    success: true,
    data: {
      users: { total: userCount.count, admins: adminCount.count, active: activeUserCount.count },
      apiKeys: { total: keyCount.count, active: activeKeyCount.count },
      recentUsers,
    },
  }
})
