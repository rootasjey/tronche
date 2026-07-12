import { requireAuth } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq, and } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['API Keys'],
    summary: 'Delete an API key',
    description: 'Permanently delete an API key belonging to the authenticated user.',
    operationId: 'deleteApiKey',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'API key ID' },
    ],
    responses: {
      200: { description: 'API key deleted' },
      401: { description: 'Not authenticated' },
      404: { description: 'API key not found' },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))

  const existing = await db.select().from(schema.apiKeys)
    .where(and(eq(schema.apiKeys.id, id), eq(schema.apiKeys.userId, user.id)))
    .get()

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'API key not found' })
  }

  await db.delete(schema.apiKeys)
    .where(eq(schema.apiKeys.id, id))
    .run()

  return { success: true }
})
