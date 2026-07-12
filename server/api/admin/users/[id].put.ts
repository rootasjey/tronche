import { requireAdmin } from '../../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../../db/schema'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Admin'],
    summary: 'Update a user',
    description: 'Update a user\'s role or active status. Cannot demote yourself from admin.',
    operationId: 'updateUser',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'User ID' },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              role: { type: 'string', enum: ['user', 'admin'], description: 'New role' },
              isActive: { type: 'boolean', description: 'Activate or deactivate the user' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'User updated' },
      400: { description: 'Cannot demote yourself or no valid fields' },
      401: { description: 'Not authenticated' },
      403: { description: 'Not an admin' },
      404: { description: 'User not found' },
    },
  },
})

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
