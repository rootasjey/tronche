import { requireAuth } from '../utils/auth'
import { db } from 'hub:db'
import * as schema from '../db/schema'

defineRouteMeta({
  openAPI: {
    tags: ['API Keys'],
    summary: 'Create an API key',
    description: 'Create a new API key for avatar API access. Returns the full `tr_...` key once. Keys are tiered: Free (500 req/day) or Pro (50000 req/day).',
    operationId: 'createApiKey',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string', description: 'A label to identify this API key' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'API key created', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' } } } } } } } },
      400: { description: 'Name is required' },
      401: { description: 'Not authenticated' },
    },
  },
})

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
