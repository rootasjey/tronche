import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Admin'],
    summary: 'Promote user to admin',
    description: 'Promote a user to admin role. Requires the admin secret key configured in the server.',
    operationId: 'promoteUser',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'secret'],
            properties: {
              email: { type: 'string', format: 'email', description: 'Email of the user to promote' },
              secret: { type: 'string', description: 'Admin secret key' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'User promoted to admin' },
      400: { description: 'Email and secret required' },
      403: { description: 'Invalid admin secret' },
      404: { description: 'User not found' },
    },
  },
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ email: string; secret: string }>(event)

  if (!body.email || !body.secret) {
    throw createError({ statusCode: 400, statusMessage: 'Email and secret required' })
  }

  if (body.secret !== config.adminSecret) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid admin secret' })
  }

  const user = await db.select().from(schema.users)
    .where(eq(schema.users.email, body.email))
    .get()

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  await db.update(schema.users)
    .set({ role: 'admin' })
    .where(eq(schema.users.email, body.email))

  return { success: true, data: { email: user.email, role: 'admin' } }
})
