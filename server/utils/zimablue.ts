import type { H3Event } from 'h3'

interface VariantType {
  size: string
  width: number
  height: number
  pathname: string
}

interface ZimaImage {
  id: number
  name: string
  slug: string
  pathname: string
  variants: string | VariantType[]
  w: number
  h: number
  x: number
  y: number
  description?: string
  tags?: { id: number; name: string; slug: string; color: string }[]
}

const ZIMA_BLUE_BASE = 'https://zimablue.cc'

function imageUrl(pathname: string): string {
  return `${ZIMA_BLUE_BASE}/images/${pathname.replace(/^images\//, '')}`
}

function getBestVariant(variants: VariantType[], preferredSize: string = 'sm'): VariantType | undefined {
  return variants.find(v => v.size === preferredSize)
    || variants.find(v => v.size === 'xs')
    || variants.find(v => v.size === 'md')
    || variants[0]
}

function parseVariants(raw: string | VariantType[]): VariantType[] {
  if (Array.isArray(raw)) return raw
  try { return JSON.parse(raw) } catch { return [] }
}

export function getImageDisplayUrl(image: ZimaImage, preferredSize: string = 'sm'): string {
  const variants = parseVariants(image.variants)
  const variant = getBestVariant(variants, preferredSize)
  if (variant) return imageUrl(variant.pathname)
  return imageUrl(image.pathname)
}

export async function fetchRandomImages(event: H3Event, limit: number = 5): Promise<ZimaImage[]> {
  const config = useRuntimeConfig(event)
  const headers: Record<string, string> = {}
  if (config.zimaBlueApiKey) {
    headers['Authorization'] = `Bearer ${config.zimaBlueApiKey}`
  }

  const response = await fetch(`${ZIMA_BLUE_BASE}/api/images/random?limit=${limit}`, { headers })
  if (!response.ok) {
    console.error(`[zimablue] API error: ${response.status} ${response.statusText}`)
    return []
  }

  const data = await response.json()
  return Array.isArray(data) ? data : []
}
