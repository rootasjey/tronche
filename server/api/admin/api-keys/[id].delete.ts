import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Admin'],
    summary: 'Delete any API key',
    description: 'Admin-only. Permanently delete any API key from the system.',
    operationId: 'adminDeleteApiKey',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'API key ID' },
    ],
    responses: {
      200: { description: 'API key deleted' },
      401: { description: 'Not authenticated' },
      403: { description: 'Not an admin' },
      404: { description: 'API key not found' },
    },
  },
})

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
