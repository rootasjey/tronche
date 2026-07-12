import { verifyPassword } from '../../utils/password'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Sign in',
    description: 'Authenticate with email and password. Sets a session cookie on success.',
    operationId: 'login',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: { type: 'string', format: 'email' },
              password: { type: 'string' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'Login successful' },
      400: { description: 'Email and password required' },
      401: { description: 'Invalid credentials' },
    },
  },
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ email: string; password: string }>(event)

    if (!body.email || !body.password) {
      throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
    }

    const user = await db.select().from(schema.users)
      .where(eq(schema.users.email, body.email))
      .get()

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const valid = await verifyPassword(user.password, body.password)
    if (!valid) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as 'user' | 'admin',
        is_active: !!user.isActive,
        email_verified: !!user.emailVerified,
        created_at: user.createdAt,
      },
    })

    return { success: true }
  } catch (err: any) {
    console.error('[login]', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || 'Server Error',
      message: err.message || 'An unexpected error occurred',
      data: err.data || undefined,
    })
  }
})
