import { and, eq, gt } from 'drizzle-orm'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { hashPassword } from '../../utils/password'
import { hashToken } from '../../utils/tokens'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ token?: string; password?: string }>(event)
  if (!body.token || !body.password || body.password.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'A valid token and an 8-character password are required' })
  }

  const reset = await db.select().from(schema.passwordResetTokens).where(and(
    eq(schema.passwordResetTokens.tokenHash, await hashToken(body.token)),
    gt(schema.passwordResetTokens.expiresAt, new Date().toISOString()),
  )).get()
  if (!reset) throw createError({ statusCode: 400, statusMessage: 'Invalid or expired reset link' })

  await db.update(schema.users).set({ password: await hashPassword(body.password) }).where(eq(schema.users.id, reset.userId)).run()
  await db.delete(schema.passwordResetTokens).where(eq(schema.passwordResetTokens.id, reset.id)).run()
  return { success: true }
})
