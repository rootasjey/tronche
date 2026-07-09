import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))

  const key = await db.select().from(schema.apiKeys)
    .where(eq(schema.apiKeys.id, id))
    .get()

  if (!key) {
    throw createError({ statusCode: 404, statusMessage: 'API key not found' })
  }

  await db.delete(schema.apiKeys)
    .where(eq(schema.apiKeys.id, id))

  return { success: true }
})
