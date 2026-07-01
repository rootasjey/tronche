import { hashCode, getRandomColor } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const SIZE = 80

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length
  const maskId = `p-${num}`

  const pixels = Array.from({ length: 64 }, (_, i) =>
    getRandomColor(num % (i + 1), options.colors, range),
  )

  const rects = pixels.map((c, i) =>
    `    <rect x="${(i % 8) * 10}" y="${Math.floor(i / 8) * 10}" width="10" height="10" fill="${c}" />`,
  ).join('\n')

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
${rects}
  </g>
</svg>`
}
