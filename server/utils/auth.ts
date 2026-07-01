import type { User } from '#auth-utils'

export async function requireAuth(event: H3Event): Promise<{ user: User }> {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
  }
  return { user: session.user as User }
}

export async function requireAdmin(event: H3Event): Promise<{ user: User }> {
  const { user } = await requireAuth(event)
  if (user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
  }
  return { user }
}
