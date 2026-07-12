import * as generators from '../../../generators'
import type { AvatarOptions } from '../../../generators/types'
import { checkRateLimit } from '../../../utils/rate-limit'

defineRouteMeta({
  openAPI: {
    tags: ['Avatar'],
    summary: 'Generate an avatar',
    description: 'Generate a custom SVG avatar for any username. Supports 6 visual variants with configurable size, shape, and color palette. IP rate-limited to 1000 requests/minute.',
    operationId: 'generateAvatar',
    parameters: [
      { name: 'name', in: 'path', required: true, schema: { type: 'string' }, description: 'Username to generate an avatar for' },
      { name: 'variant', in: 'query', schema: { type: 'string', enum: ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'], default: 'marble' }, description: 'Visual style variant' },
      { name: 'size', in: 'query', schema: { type: 'integer', minimum: 16, maximum: 512, default: 80 }, description: 'Avatar size in pixels (width and height)' },
      { name: 'square', in: 'query', schema: { type: 'boolean', default: false }, description: 'If true, removes border-radius for a square avatar' },
      { name: 'colors', in: 'query', schema: { type: 'string' }, description: 'Comma-separated hex color values (e.g. "FF6B6B,4ECDC4,45B7D1")' },
    ],
    responses: {
      200: { description: 'SVG image', content: { 'image/svg+xml': { schema: { type: 'string', format: 'binary' } } } },
      400: { description: 'Invalid variant or parameters' },
      429: { description: 'Rate limit exceeded' },
    },
  },
})

const VALID_VARIANTS = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']
const DEFAULT_COLORS = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']

export default defineEventHandler(async (event) => {
  const { name } = getRouterParams(event)
  const query = getQuery(event)

  const ip = getRequestHeader(event, 'x-forwarded-for') || getRequestIP(event) || 'unknown'
  const rl = await checkRateLimit(ip)
  if (!rl.allowed) {
    setResponseStatus(event, 429)
    setHeader(event, 'Retry-After', String(Math.ceil((rl.resetAt - Date.now()) / 1000)))
    return { error: 'rate_limit_exceeded', message: 'Too many requests. Please try again later.' }
  }

  const variant = (query.variant as string) || 'marble'
  if (!VALID_VARIANTS.includes(variant)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid variant. Must be one of: ${VALID_VARIANTS.join(', ')}`,
    })
  }

  const size = Math.min(Math.max(Number(query.size) || 80, 16), 512)
  const square = query.square === 'true'
  const colors = query.colors
    ? String(query.colors).split(',').map((c) => c.trim()).filter(Boolean)
    : DEFAULT_COLORS

  const options: AvatarOptions = { size, square, colors }

  const generator = (generators as Record<string, (name: string, options: AvatarOptions) => string>)[variant]
  if (!generator) {
    throw createError({ statusCode: 500, statusMessage: 'Generator not found' })
  }

  const svg = generator(name, options)

  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return svg
})
