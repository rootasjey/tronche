import { hashCode, getRandomColor } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const SIZE = 80

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length
  const colors = Array.from({ length: 4 }, (_, i) =>
    getRandomColor(num + i, options.colors, range),
  )

  const nid = name.replace(/\s/g, '')
  const maskId = `s-${num}`

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
    <path fill="url(#g0_${nid})" d="M0 0h80v40H0z" />
    <path fill="url(#g1_${nid})" d="M0 40h80v40H0z" />
  </g>
  <defs>
    <linearGradient id="g0_${nid}" x1="${SIZE / 2}" y1="0" x2="${SIZE / 2}" y2="${SIZE / 2}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${colors[0]}" />
      <stop offset="1" stop-color="${colors[1]}" />
    </linearGradient>
    <linearGradient id="g1_${nid}" x1="${SIZE / 2}" y1="${SIZE / 2}" x2="${SIZE / 2}" y2="${SIZE}" gradientUnits="userSpaceOnUse">
      <stop stop-color="${colors[2]}" />
      <stop offset="1" stop-color="${colors[3]}" />
    </linearGradient>
  </defs>
</svg>`
}
