export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  return { success: true, data: { user: session.user || null } }
})
