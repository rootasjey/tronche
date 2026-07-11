import { hashCode, getRandomColor } from '../utilities';
import type { AvatarOptions } from '../types';

const ELEMENTS = 4;
const SIZE = 80;

export interface SunsetData {
  colors: string[];
  nameWithoutSpace: string;
  maskId: string;
}

export function generateSunsetData(name: string, colors: string[]): SunsetData {
  const numFromName = hashCode(name);
  const range = colors.length;

  const colorList = Array.from({ length: ELEMENTS }, (_, i) =>
    getRandomColor(numFromName + i, colors, range),
  );

  return {
    colors: colorList,
    nameWithoutSpace: name.replace(/\s/g, ''),
    maskId: `tronche-mask-sunset-${numFromName}`,
  };
}

export function renderSunsetSvg(data: SunsetData, options?: { size?: number; square?: boolean; title?: string }): string {
  const displaySize = options?.size ?? SIZE;
  const square = options?.square ?? false;
  const rx = square ? '' : `rx="${SIZE * 2}"`;
  const half = SIZE / 2;
  const id = data.nameWithoutSpace;

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${displaySize}" height="${displaySize}">${options?.title ? `<title>${options.title}</title>` : ''}
<mask id="${data.maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" ${rx} fill="#FFFFFF"/></mask>
<g mask="url(#${data.maskId})">
<path fill="url(#gradient0_${id})" d="M0 0h${SIZE}v${half}H0z"/>
<path fill="url(#gradient1_${id})" d="M0 ${half}h${SIZE}v${half}H0z"/>
</g>
<defs>
<linearGradient id="gradient0_${id}" x1="${half}" y1="0" x2="${half}" y2="${half}" gradientUnits="userSpaceOnUse">
<stop stop-color="${data.colors[0]}"/>
<stop offset="1" stop-color="${data.colors[1]}"/>
</linearGradient>
<linearGradient id="gradient1_${id}" x1="${half}" y1="${half}" x2="${half}" y2="${SIZE}" gradientUnits="userSpaceOnUse">
<stop stop-color="${data.colors[2]}"/>
<stop offset="1" stop-color="${data.colors[3]}"/>
</linearGradient>
</defs>
</svg>`;
}

export function generateSunsetSvg(name: string, colors: string[], options?: { square?: boolean; size?: number; title?: string }): string {
  const data = generateSunsetData(name, colors);
  return renderSunsetSvg(data, options);
}
