import { and, eq, gt } from 'drizzle-orm'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { hashToken } from '../../utils/tokens'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ token?: string }>(event)
  if (!body.token) throw createError({ statusCode: 400, statusMessage: 'Verification token is required' })

  const verification = await db.select().from(schema.emailVerificationTokens).where(and(
    eq(schema.emailVerificationTokens.tokenHash, await hashToken(body.token)),
    gt(schema.emailVerificationTokens.expiresAt, new Date().toISOString()),
  )).get()
  if (!verification) throw createError({ statusCode: 400, statusMessage: 'Invalid or expired verification link' })

  await db.update(schema.users).set({ emailVerified: true }).where(eq(schema.users.id, verification.userId)).run()
  await db.delete(schema.emailVerificationTokens).where(eq(schema.emailVerificationTokens.id, verification.id)).run()
  return { success: true }
})
