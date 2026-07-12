defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Get current session',
    description: 'Returns the current authenticated user session, or null if not authenticated.',
    operationId: 'getSession',
    responses: {
      200: { description: 'Session data or null' },
    },
  },
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  return { success: true, data: { user: session.user || null } }
})
