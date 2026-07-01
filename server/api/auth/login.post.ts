import { verifyPassword } from '../../utils/password'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
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
})
