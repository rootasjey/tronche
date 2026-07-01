import { hashCode, getUnit, getRandomColor } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const ELEMENTS = 3
const SIZE = 80

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length

  const elements = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(num + i, options.colors, range),
    tx: getUnit(num * (i + 1), SIZE / 10, 1),
    ty: getUnit(num * (i + 1), SIZE / 10, 2),
    scale: 1.2 + getUnit(num * (i + 1), SIZE / 20) / 10,
    rotate: getUnit(num * (i + 1), 360, 1),
  }))

  const mid = SIZE / 2
  const maskId = `m-${num}`

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
    <rect width="${SIZE}" height="${SIZE}" fill="${elements[0].color}" />
    <path filter="url(#f_${maskId})" d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="${elements[1].color}" transform="translate(${elements[1].tx} ${elements[1].ty}) rotate(${elements[1].rotate} ${mid} ${mid}) scale(${elements[2].scale})" />
    <path filter="url(#f_${maskId})" style="mix-blend-mode: overlay" d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="${elements[2].color}" transform="translate(${elements[2].tx} ${elements[2].ty}) rotate(${elements[2].rotate} ${mid} ${mid}) scale(${elements[2].scale})" />
  </g>
  <defs>
    <filter id="f_${maskId}" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
      <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
    </filter>
  </defs>
</svg>`
}
