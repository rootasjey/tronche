import { hashCode, getRandomColor } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const SIZE = 90

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length

  const s = Array.from({ length: 5 }, (_, i) =>
    getRandomColor(num + i, options.colors, range),
  )

  const c = [s[0], s[1], s[1], s[2], s[2], s[3], s[3], s[0], s[4]]
  const maskId = `r-${num}`

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
    <path d="M0 0h90v45H0z" fill="${c[0]}" />
    <path d="M0 45h90v45H0z" fill="${c[1]}" />
    <path d="M83 45a38 38 0 00-76 0h76z" fill="${c[2]}" />
    <path d="M83 45a38 38 0 01-76 0h76z" fill="${c[3]}" />
    <path d="M77 45a32 32 0 10-64 0h64z" fill="${c[4]}" />
    <path d="M77 45a32 32 0 11-64 0h64z" fill="${c[5]}" />
    <path d="M71 45a26 26 0 00-52 0h52z" fill="${c[6]}" />
    <path d="M71 45a26 26 0 01-52 0h52z" fill="${c[7]}" />
    <circle cx="45" cy="45" r="23" fill="${c[8]}" />
  </g>
</svg>`
}
