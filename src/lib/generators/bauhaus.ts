import { hashCode, getUnit, getRandomColor, getBoolean } from '../utilities';
import type { AvatarOptions } from '../types';

const ELEMENTS = 4;
const SIZE = 80;

export interface BauhausElement {
  color: string;
  translateX: number;
  translateY: number;
  rotate: number;
  isSquare: boolean;
}

export interface BauhausData {
  elements: BauhausElement[];
  maskId: string;
}

export function generateBauhausData(name: string, colors: string[]): BauhausData {
  const numFromName = hashCode(name);
  const range = colors.length;

  const elements = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 2 - (i + 17), 2),
    rotate: getUnit(numFromName * (i + 1), 360),
    isSquare: getBoolean(numFromName, 2),
  }));

  return { elements, maskId: `tronche-mask-bauhaus-${numFromName}` };
}

export function renderBauhausSvg(data: BauhausData, options?: { size?: number; square?: boolean; title?: string }): string {
  const displaySize = options?.size ?? SIZE;
  const square = options?.square ?? false;
  const rx = square ? '' : `rx="${SIZE * 2}"`;

  const [bg, rect1, circle, line] = data.elements;

  const rectHeight = rect1.isSquare ? SIZE : SIZE / 8;
  const rectTransform = `translate(${rect1.translateX} ${rect1.translateY}) rotate(${rect1.rotate} ${SIZE / 2} ${SIZE / 2})`;
  const circleTransform = `translate(${circle.translateX} ${circle.translateY})`;
  const lineTransform = `translate(${line.translateX} ${line.translateY}) rotate(${line.rotate} ${SIZE / 2} ${SIZE / 2})`;

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${displaySize}" height="${displaySize}">${options?.title ? `<title>${options.title}</title>` : ''}
<mask id="${data.maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" ${rx} fill="#FFFFFF"/></mask>
<g mask="url(#${data.maskId})">
<rect width="${SIZE}" height="${SIZE}" fill="${bg.color}"/>
<rect x="${(SIZE - 60) / 2}" y="${(SIZE - 20) / 2}" width="${SIZE}" height="${rectHeight}" fill="${rect1.color}" transform="${rectTransform}"/>
<circle cx="${SIZE / 2}" cy="${SIZE / 2}" fill="${circle.color}" r="${SIZE / 5}" transform="${circleTransform}"/>
<line x1="0" y1="${SIZE / 2}" x2="${SIZE}" y2="${SIZE / 2}" stroke-width="2" stroke="${line.color}" transform="${lineTransform}"/>
</g>
</svg>`;
}

export function generateBauhausSvg(name: string, colors: string[], options?: { square?: boolean; size?: number; title?: string }): string {
  const data = generateBauhausData(name, colors);
  return renderBauhausSvg(data, options);
}
