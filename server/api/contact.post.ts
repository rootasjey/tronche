import { sendContactEmail } from '../utils/email'
import { checkScopedRateLimit } from '../utils/rate-limit'

export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for') || getRequestIP(event) || 'unknown'
  const rateLimit = await checkScopedRateLimit('contact', ip, 5, 10 * 60 * 1000)
  setResponseHeader(event, 'X-RateLimit-Limit', '5')
  setResponseHeader(event, 'X-RateLimit-Remaining', String(rateLimit.remaining))
  setResponseHeader(event, 'X-RateLimit-Reset', String(Math.ceil(rateLimit.resetAt / 1000)))
  if (!rateLimit.allowed) {
    setResponseHeader(event, 'Retry-After', String(Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))))
    throw createError({ statusCode: 429, statusMessage: 'Too many contact messages. Please try again later.' })
  }

  const body = await readBody<{ name?: string; email?: string; subject?: string; message?: string }>(event)
  const name = body.name?.trim()
  const email = body.email?.trim().toLowerCase()
  const subject = body.subject?.trim()
  const message = body.message?.trim()

  if (!name || !subject || !message || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Name, valid email, subject and message are required' })
  }
  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    throw createError({ statusCode: 400, statusMessage: 'Contact message is too long' })
  }

  await sendContactEmail(event, email, name, subject, message)
  return { success: true }
})
