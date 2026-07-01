import { requireAuth } from '../utils/auth'
import { db } from 'hub:db'
import * as schema from '../db/schema'

function generateApiKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'tr_'
  for (let i = 0; i < 32; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }
  return key
}

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const body = await readBody<{ name: string }>(event)

  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required' })
  }

  const key = generateApiKey()
  const now = new Date().toISOString()

  await db.insert(schema.apiKeys).values({
    userId: user.id,
    key,
    name: body.name,
    createdAt: now,
  }).run()

  return { success: true, data: { key, name: body.name } }
})
