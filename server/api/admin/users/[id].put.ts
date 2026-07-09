import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user: admin } = await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ role?: 'user' | 'admin'; isActive?: boolean }>(event)

  const target = await db.select().from(schema.users)
    .where(eq(schema.users.id, id))
    .get()

  if (!target) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  if (target.id === admin.id && body.role === 'user') {
    throw createError({ statusCode: 400, statusMessage: 'Cannot demote yourself' })
  }

  const updates: Record<string, unknown> = {}
  if (body.role !== undefined && ['user', 'admin'].includes(body.role)) {
    updates.role = body.role
  }
  if (body.isActive !== undefined) {
    updates.isActive = body.isActive
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No valid fields to update' })
  }

  await db.update(schema.users)
    .set(updates)
    .where(eq(schema.users.id, id))

  return { success: true }
})
