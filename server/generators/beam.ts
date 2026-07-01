import { hashCode, getUnit, getBoolean, getRandomColor, getContrast } from '../../src/lib/utilities'
import type { AvatarOptions } from './types'

const SIZE = 36

export function generate(name: string, options: AvatarOptions): string {
  const num = hashCode(name)
  const range = options.colors.length
  const wc = getRandomColor(num, options.colors, range)
  const px = getUnit(num, 10, 1)
  const wtx = px < 5 ? px + SIZE / 9 : px
  const py = getUnit(num, 10, 2)
  const wty = py < 5 ? py + SIZE / 9 : py

  const d = {
    wc,
    fc: getContrast(wc),
    bg: getRandomColor(num + 13, options.colors, range),
    wtx,
    wty,
    wr: getUnit(num, 360),
    ws: 1 + getUnit(num, SIZE / 12) / 10,
    open: getBoolean(num, 2),
    circle: getBoolean(num, 1),
    es: getUnit(num, 5),
    ms: getUnit(num, 3),
    fr: getUnit(num, 10, 3),
    ftx: wtx > SIZE / 6 ? wtx / 2 : getUnit(num, 8, 1),
    fty: wty > SIZE / 6 ? wty / 2 : getUnit(num, 7, 2),
  }

  const maskId = `b-${num}`
  const mid = SIZE / 2
  const mouth = d.open
    ? `<path d="M15 ${19 + d.ms}c2 1 4 1 6 0" stroke="${d.fc}" fill="none" stroke-linecap="round" />`
    : `<path d="M13,${19 + d.ms} a1,0.75 0 0,0 10,0" fill="${d.fc}" />`

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${options.size ?? SIZE}" height="${options.size ?? SIZE}">
  <title>${name}</title>
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" ${options.square ? '' : `rx="${SIZE * 2}"`} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
    <rect width="${SIZE}" height="${SIZE}" fill="${d.bg}" />
    <rect x="0" y="0" width="${SIZE}" height="${SIZE}" transform="translate(${d.wtx} ${d.wty}) rotate(${d.wr} ${mid} ${mid}) scale(${d.ws})" fill="${d.wc}" rx="${d.circle ? SIZE : SIZE / 6}" />
    <g transform="translate(${d.ftx} ${d.fty}) rotate(${d.fr} ${mid} ${mid})">
      ${mouth}
      <rect x="${14 - d.es}" y="14" width="1.5" height="2" rx="1" stroke="none" fill="${d.fc}" />
      <rect x="${20 + d.es}" y="14" width="1.5" height="2" rx="1" stroke="none" fill="${d.fc}" />
    </g>
  </g>
</svg>`
}
