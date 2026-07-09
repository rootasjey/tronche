import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user: admin } = await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))

  if (id === admin.id) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot delete yourself' })
  }

  const target = await db.select().from(schema.users)
    .where(eq(schema.users.id, id))
    .get()

  if (!target) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  await db.delete(schema.apiKeys)
    .where(eq(schema.apiKeys.userId, id))

  await db.delete(schema.users)
    .where(eq(schema.users.id, id))

  return { success: true }
})
