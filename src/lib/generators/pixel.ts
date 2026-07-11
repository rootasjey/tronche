import { hashCode, getRandomColor } from '../utilities';
import type { AvatarOptions } from '../types';

const ELEMENTS = 64;
const SIZE = 80;
const GRID = 8;
const CELL = SIZE / GRID;

export interface PixelData {
  colors: string[];
  maskId: string;
}

export function generatePixelData(name: string, colors: string[]): PixelData {
  const numFromName = hashCode(name);
  const range = colors.length;

  const colorList = Array.from({ length: ELEMENTS }, (_, i) =>
    getRandomColor(numFromName % (i + 1), colors, range),
  );

  return { colors: colorList, maskId: `tronche-mask-pixel-${numFromName}` };
}

export function renderPixelSvg(data: PixelData, options?: { size?: number; square?: boolean; title?: string }): string {
  const displaySize = options?.size ?? SIZE;
  const square = options?.square ?? false;
  const rx = square ? '' : `rx="${SIZE * 2}"`;

  const rects = data.colors.map((color, i) =>
    `<rect x="${(i % GRID) * CELL}" y="${Math.floor(i / GRID) * CELL}" width="${CELL}" height="${CELL}" fill="${color}"/>`
  ).join('');

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${displaySize}" height="${displaySize}">${options?.title ? `<title>${options.title}</title>` : ''}
<mask id="${data.maskId}" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" ${rx} fill="#FFFFFF"/></mask>
<g mask="url(#${data.maskId})">${rects}</g>
</svg>`;
}

export function generatePixelSvg(name: string, colors: string[], options?: { square?: boolean; size?: number; title?: string }): string {
  const data = generatePixelData(name, colors);
  return renderPixelSvg(data, options);
}
