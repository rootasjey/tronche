import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Admin'],
    summary: 'Update any API key',
    description: 'Admin-only. Update the name or active status of any API key in the system.',
    operationId: 'adminUpdateApiKey',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'API key ID' },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'New label' },
              isActive: { type: 'boolean', description: 'Enable or disable the key' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'API key updated' },
      400: { description: 'No valid fields to update' },
      401: { description: 'Not authenticated' },
      403: { description: 'Not an admin' },
      404: { description: 'API key not found' },
    },
  },
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ name?: string; isActive?: boolean }>(event)

  const key = await db.select().from(schema.apiKeys)
    .where(eq(schema.apiKeys.id, id))
    .get()

  if (!key) {
    throw createError({ statusCode: 404, statusMessage: 'API key not found' })
  }

  const updates: Record<string, unknown> = {}
  if (body.name !== undefined) updates.name = body.name
  if (body.isActive !== undefined) updates.isActive = body.isActive

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No valid fields to update' })
  }

  await db.update(schema.apiKeys)
    .set(updates)
    .where(eq(schema.apiKeys.id, id))

  return { success: true }
})
