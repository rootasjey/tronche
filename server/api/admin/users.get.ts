import { requireAdmin } from '../../utils/auth'
import { db } from 'hub:db'
import * as schema from '../../db/schema'
import { count } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    tags: ['Admin'],
    summary: 'List all users',
    description: 'Paginated list of all registered users with their roles and status.',
    operationId: 'listUsers',
    parameters: [
      { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Page number' },
      { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 }, description: 'Items per page' },
    ],
    responses: {
      200: { description: 'Paginated user list' },
      401: { description: 'Not authenticated' },
      403: { description: 'Not an admin' },
    },
  },
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const offset = (page - 1) * limit

  const total = await db.select({ count: count() }).from(schema.users).get()
  const users = await db.select({
    id: schema.users.id,
    email: schema.users.email,
    name: schema.users.name,
    role: schema.users.role,
    isActive: schema.users.isActive,
    emailVerified: schema.users.emailVerified,
    createdAt: schema.users.createdAt,
  }).from(schema.users)
    .orderBy(schema.users.createdAt)
    .limit(limit)
    .offset(offset)
    .all()

  return {
    success: true,
    data: users,
    pagination: { page, limit, total: total?.count || 0 },
  }
})
