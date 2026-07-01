import { hashCode, getUnit, getRandomColor, getBoolean } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const SIZE = 80

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length

  const elements = Array.from({ length: 4 }, (_, i) => ({
    color: getRandomColor(num + i, options.colors, range),
    tx: getUnit(num * (i + 1), SIZE / 2 - (i + 17), 1),
    ty: getUnit(num * (i + 1), SIZE / 2 - (i + 17), 2),
    rotate: getUnit(num * (i + 1), 360),
    square: getBoolean(num, 2),
  }))

  const maskId = `h-${num}`
  const mid = SIZE / 2

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
    <rect width="${SIZE}" height="${SIZE}" fill="${elements[0].color}" />
    <rect x="${(SIZE - 60) / 2}" y="${(SIZE - 20) / 2}" width="${SIZE}" height="${elements[1].square ? SIZE : SIZE / 8}" fill="${elements[1].color}" transform="translate(${elements[1].tx} ${elements[1].ty}) rotate(${elements[1].rotate} ${mid} ${mid})" />
    <circle cx="${mid}" cy="${mid}" fill="${elements[2].color}" r="${SIZE / 5}" transform="translate(${elements[2].tx} ${elements[2].ty})" />
    <line x1="0" y1="${mid}" x2="${SIZE}" y2="${mid}" stroke-width="2" stroke="${elements[3].color}" transform="translate(${elements[3].tx} ${elements[3].ty}) rotate(${elements[3].rotate} ${mid} ${mid})" />
  </g>
</svg>`
}
