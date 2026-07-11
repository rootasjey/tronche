import { hashCode, getUnit, getRandomColor } from '../utilities';
import type { AvatarOptions } from '../types';

const ELEMENTS = 3;
const SIZE = 80;

export interface MarbleElement {
  color: string;
  translateX: number;
  translateY: number;
  scale: number;
  rotate: number;
}

export interface MarbleData {
  elements: MarbleElement[];
  maskId: string;
}

export function generateMarbleData(name: string, colors: string[]): MarbleData {
  const numFromName = hashCode(name);
  const range = colors.length;

  const elements = Array.from({ length: ELEMENTS }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return { elements, maskId: `tronche-mask-marble-${numFromName}` };
}

export function renderMarbleSvg(data: MarbleData, options?: { size?: number; square?: boolean; title?: string }): string {
  const displaySize = options?.size ?? SIZE;
  const square = options?.square ?? false;
  const rx = square ? '' : `rx="${SIZE * 2}"`;

  const paths = data.elements.map((el, i) => {
    if (i === 0) {
      return `<rect width="${SIZE}" height="${SIZE}" fill="${el.color}"/>`;
    }
    const d = i === 1
      ? 'M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z'
      : 'M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z';
    const blend = i === 2 ? ' style="mix-blend-mode:overlay"' : '';
    const transform = `translate(${el.translateX} ${el.translateY}) rotate(${el.rotate} ${SIZE / 2} ${SIZE / 2}) scale(${el.scale})`;
    return `<path${blend} d="${d}" fill="${el.color}" filter="url(#${data.maskId}Filter)" transform="${transform}"/>`;
  });

  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${displaySize}" height="${displaySize}">${options?.title ? `<title>${options.title}</title>` : ''}
<mask id="${data.maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" ${rx} fill="#FFFFFF"/></mask>
<g mask="url(#${data.maskId})">${paths.join('')}</g>
<defs><filter id="${data.maskId}Filter" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"/></filter></defs>
</svg>`;
}

export function generateMarbleSvg(name: string, colors: string[], options?: { square?: boolean; size?: number; title?: string }): string {
  const data = generateMarbleData(name, colors);
  return renderMarbleSvg(data, options);
}
