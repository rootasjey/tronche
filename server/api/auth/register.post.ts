import { hashPassword } from '../../utils/password'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; name: string; password: string }>(event)

  if (!body.email || !body.name || !body.password || body.password.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid input. Password must be at least 8 characters.' })
  }

  const existing = await db.select().from(schema.users)
    .where(eq(schema.users.email, body.email))
    .get()

  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const hashed = await hashPassword(body.password)
  const now = new Date().toISOString()

  const result = await db.insert(schema.users).values({
    email: body.email,
    name: body.name,
    password: hashed,
    createdAt: now,
  }).returning().get()

  await setUserSession(event, {
    user: {
      id: result.id,
      email: result.email,
      name: result.name,
      role: result.role as 'user' | 'admin',
      is_active: !!result.isActive,
      email_verified: !!result.emailVerified,
      created_at: result.createdAt,
    },
  })

  return { success: true }
})
