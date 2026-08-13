import { eq } from 'drizzle-orm'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { createToken } from '../../utils/tokens'
import { sendPasswordResetEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event)
  const email = body.email?.trim().toLowerCase()
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Email is required' })

  const user = await db.select().from(schema.users).where(eq(schema.users.email, email)).get()
  if (user) {
    const reset = await createToken()
    await db.delete(schema.passwordResetTokens).where(eq(schema.passwordResetTokens.userId, user.id)).run()
    await db.insert(schema.passwordResetTokens).values({
      userId: user.id,
      tokenHash: reset.hash,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }).run()
    await sendPasswordResetEmail(event, user.email, reset.token)
  }

  return { success: true }
})
