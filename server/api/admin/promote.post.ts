import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { eq } from 'drizzle-orm'

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
