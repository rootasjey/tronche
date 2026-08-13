import { eq } from 'drizzle-orm'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { requireAuth } from '../../utils/auth'
import { createToken } from '../../utils/tokens'
import { sendVerificationEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const account = await db.select().from(schema.users).where(eq(schema.users.id, user.id)).get()
  if (!account) throw createError({ statusCode: 404, statusMessage: 'User not found' })
  if (account.emailVerified) return { success: true }

  const verification = await createToken()
  await db.delete(schema.emailVerificationTokens).where(eq(schema.emailVerificationTokens.userId, account.id)).run()
  await db.insert(schema.emailVerificationTokens).values({
    userId: account.id,
    tokenHash: verification.hash,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }).run()
  await sendVerificationEmail(event, account.email, verification.token)
  return { success: true }
})
