interface EmailPayload {
  from: string | { email: string; name?: string }
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

interface EmailBinding {
  send(payload: EmailPayload): Promise<{ messageId: string }>
}

function getEmailBinding(): EmailBinding | undefined {
  return ((process.env as Record<string, unknown>).EMAIL
    || (globalThis as any).__env__?.EMAIL
    || (globalThis as any).EMAIL) as EmailBinding | undefined
}

function getSiteUrl(event: H3Event): string {
  const configured = useRuntimeConfig().public.siteUrl
  return (configured || getRequestURL(event).origin).replace(/\/$/, '')
}

function parseFromAddress(value: string): string | { email: string; name?: string } {
  const match = value.match(/^(.*?)\s*<([^>]+)>$/)
  return match?.[1] && match[2]
    ? { name: match[1].trim(), email: match[2].trim() }
    : value.trim()
}

export async function sendEmail(event: H3Event, payload: Omit<EmailPayload, 'from'>): Promise<void> {
  const binding = getEmailBinding()
  if (!binding) {
    if (import.meta.dev) {
      console.log(`[DEV] Email to ${payload.to}: ${payload.subject}\n${payload.text}`)
      return
    }
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  try {
    await binding.send({
      from: parseFromAddress(useRuntimeConfig().emailFromAddress || 'Tronche <noreply@tronche.cc>'),
      ...payload,
    })
  } catch (error) {
    console.error('[email]', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
  }
}

export async function sendWelcomeEmail(event: H3Event, to: string, name: string): Promise<void> {
  const url = `${getSiteUrl(event)}/dashboard`
  await sendEmail(event, {
    to,
    subject: 'Welcome to Tronche',
    text: `Welcome to Tronche, ${name}!\n\nYour account is ready. Visit ${url} to create an API key.`,
    html: `<h1>Welcome to Tronche, ${name}!</h1><p>Your account is ready.</p><p><a href="${url}">Open your dashboard</a> to create an API key.</p>`,
  })
}

export async function sendVerificationEmail(event: H3Event, to: string, token: string): Promise<void> {
  const url = `${getSiteUrl(event)}/verify-email?token=${encodeURIComponent(token)}`
  await sendEmail(event, {
    to,
    subject: 'Verify your Tronche email',
    text: `Verify your Tronche email address:\n${url}\n\nThis link expires in 24 hours.`,
    html: `<h1>Verify your email address</h1><p><a href="${url}">Verify your email</a></p><p>This link expires in 24 hours.</p>`,
  })
}

export async function sendPasswordResetEmail(event: H3Event, to: string, token: string): Promise<void> {
  const url = `${getSiteUrl(event)}/reset-password?token=${encodeURIComponent(token)}`
  await sendEmail(event, {
    to,
    subject: 'Reset your Tronche password',
    text: `Reset your Tronche password:\n${url}\n\nThis link expires in one hour.`,
    html: `<h1>Reset your password</h1><p><a href="${url}">Choose a new password</a></p><p>This link expires in one hour.</p>`,
  })
}

export async function sendContactEmail(event: H3Event, from: string, name: string, subject: string, message: string): Promise<void> {
  const contactEmail = useRuntimeConfig().contactEmail || 'support@tronche.cc'
  await sendEmail(event, {
    to: contactEmail,
    replyTo: from,
    subject: `[Contact] ${subject}`,
    text: `From: ${name} <${from}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} &lt;${from}&gt;</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  })
  await sendEmail(event, {
    to: from,
    subject: 'We received your message',
    text: `Hi ${name},\n\nWe received your message and will get back to you soon.`,
    html: `<p>Hi ${name},</p><p>We received your message and will get back to you soon.</p>`,
  })
}
