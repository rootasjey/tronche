import * as generators from '../../../generators'
import type { AvatarOptions } from '../../../generators/types'

const VALID_VARIANTS = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']
const DEFAULT_COLORS = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']

export default defineEventHandler((event) => {
  const { name } = getRouterParams(event)
  const query = getQuery(event)

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
