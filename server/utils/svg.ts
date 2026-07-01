export function svg(
  content: string,
  size: number,
  square: boolean,
  rx: number,
  maskId: string,
): string {
  const rxAttr = square ? '' : `rx="${rx}"`
  return `<svg viewBox="0 0 ${size} ${size}" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" ${rxAttr} fill="white" />
  </mask>
  <g mask="url(#${maskId})">
${content}
  </g>
</svg>`
}

export function mask(size: number, square: boolean, maskId: string): string {
  const rxAttr = square ? '' : `rx="${size * 2}"`
  return `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" ${rxAttr} fill="white" />
  </mask>`
}
