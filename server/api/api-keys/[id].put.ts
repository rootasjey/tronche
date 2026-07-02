import { requireAuth } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ name?: string; isActive?: boolean }>(event)

  const existing = await db.select().from(schema.apiKeys)
    .where(and(eq(schema.apiKeys.id, id), eq(schema.apiKeys.userId, user.id)))
    .get()

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'API key not found' })
  }

  const updateData: Record<string, any> = {}
  if (body.name !== undefined) updateData.name = body.name
  if (body.isActive !== undefined) updateData.isActive = body.isActive

  if (Object.keys(updateData).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No fields to update' })
  }

  await db.update(schema.apiKeys)
    .set(updateData)
    .where(eq(schema.apiKeys.id, id))
    .run()

  return { success: true }
})
