defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Sign out',
    description: 'Clear the current user session.',
    operationId: 'logout',
    responses: {
      200: { description: 'Logout successful' },
    },
  },
})

export default defineEventHandler(async (event) => {
  await clearUserSession(event)
  return { success: true }
})
