import { hashCode, getRandomColor } from '../utilities';
import type { AvatarOptions } from '../types';

const SIZE = 90;
const COLORS = 5;

export interface RingData {
  colors: string[];
  maskId: string;
}

export function generateRingData(name: string, colors: string[]): RingData {
  const numFromName = hashCode(name);
  const range = colors.length;

  const colorsShuffle = Array.from({ length: COLORS }, (_, i) =>
    getRandomColor(numFromName + i, colors, range),
  );

  return {
    colors: [
      colorsShuffle[0], colorsShuffle[1], colorsShuffle[1], colorsShuffle[2],
      colorsShuffle[2], colorsShuffle[3], colorsShuffle[3], colorsShuffle[0], colorsShuffle[4],
    ],
    maskId: `tronche-mask-ring-${numFromName}`,
  };
}

export function renderRingSvg(data: RingData, options?: { size?: number; square?: boolean; title?: string }): string {
  const displaySize = options?.size ?? SIZE;
  const square = options?.square ?? false;
  const rx = square ? '' : `rx="${SIZE * 2}"`;
  const half = SIZE / 2;

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${displaySize}" height="${displaySize}">${options?.title ? `<title>${options.title}</title>` : ''}
<mask id="${data.maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" ${rx} fill="#FFFFFF"/></mask>
<g mask="url(#${data.maskId})">
<path d="M0 0h${SIZE}v${half}H0z" fill="${data.colors[0]}"/>
<path d="M0 ${half}h${SIZE}v${half}H0z" fill="${data.colors[1]}"/>
<path d="M${SIZE - 7} ${half}a${half - 7} ${half - 7} 0 00-${SIZE - 14} 0h${SIZE - 14}z" fill="${data.colors[2]}"/>
<path d="M${SIZE - 7} ${half}a${half - 7} ${half - 7} 0 01-${SIZE - 14} 0h${SIZE - 14}z" fill="${data.colors[3]}"/>
<path d="M${SIZE - 13} ${half}a${half - 13} ${half - 13} 0 10-${SIZE - 26} 0h${SIZE - 26}z" fill="${data.colors[4]}"/>
<path d="M${SIZE - 13} ${half}a${half - 13} ${half - 13} 0 11-${SIZE - 26} 0h${SIZE - 26}z" fill="${data.colors[5]}"/>
<path d="M${SIZE - 19} ${half}a${half - 19} ${half - 19} 0 00-${SIZE - 38} 0h${SIZE - 38}z" fill="${data.colors[6]}"/>
<path d="M${SIZE - 19} ${half}a${half - 19} ${half - 19} 0 01-${SIZE - 38} 0h${SIZE - 38}z" fill="${data.colors[7]}"/>
<circle cx="${half}" cy="${half}" r="${half - 22}" fill="${data.colors[8]}"/>
</g>
</svg>`;
}

export function generateRingSvg(name: string, colors: string[], options?: { square?: boolean; size?: number; title?: string }): string {
  const data = generateRingData(name, colors);
  return renderRingSvg(data, options);
}
