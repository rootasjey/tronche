import { LitElement, html } from 'lit'
import { generateBeamData } from 'tronche'

const DESIGN_SIZE = 36

export class AvatarBeam extends LitElement {
  static properties = {
    name: {},
    colors: { attribute: false },
    title: { type: Boolean },
    square: { type: Boolean },
    size: {},
  }

  declare name: string
  declare colors: string[]
  declare title: boolean
  declare square: boolean
  declare size: number | string

  constructor() {
    super()
    this.name = 'Clara Barton'
    this.colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    this.title = false
    this.square = false
    this.size = 36
  }

  override render() {
    const data = generateBeamData(this.name, this.colors)
    const displaySize = typeof this.size === 'string' && this.size.endsWith('%') ? this.size : Number(this.size)
    const mid = DESIGN_SIZE / 2

    const wrapperTransform = `translate(${data.wrapperTranslateX} ${data.wrapperTranslateY}) rotate(${data.wrapperRotate} ${mid} ${mid}) scale(${data.wrapperScale})`
    const faceTransform = `translate(${data.faceTranslateX} ${data.faceTranslateY}) rotate(${data.faceRotate} ${mid} ${mid})`

    const mouth = data.isMouthOpen
      ? html`<path d="M15 ${19 + data.mouthSpread}c2 1 4 1 6 0" stroke="${data.faceColor}" fill="none" stroke-linecap="round" />`
      : html`<path d="M13,${19 + data.mouthSpread} a1,0.75 0 0,0 10,0" fill="${data.faceColor}" />`

    return html`
      <svg
        viewBox="0 0 ${DESIGN_SIZE} ${DESIGN_SIZE}"
        fill="none"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width="${displaySize}"
        height="${displaySize}"
      >
        ${this.title ? html`<title>${this.name}</title>` : ''}
        <mask id="${data.maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${DESIGN_SIZE}" height="${DESIGN_SIZE}">
          <rect width="${DESIGN_SIZE}" height="${DESIGN_SIZE}" rx="${this.square ? undefined : DESIGN_SIZE * 2}" fill="#FFFFFF" />
        </mask>
        <g mask="url(#${data.maskId})">
          <rect width="${DESIGN_SIZE}" height="${DESIGN_SIZE}" fill="${data.backgroundColor}" />
          <rect
            x="0" y="0"
            width="${DESIGN_SIZE}" height="${DESIGN_SIZE}"
            rx="${data.isCircle ? DESIGN_SIZE : DESIGN_SIZE / 6}"
            fill="${data.wrapperColor}"
            transform="${wrapperTransform}"
          />
          <g transform="${faceTransform}">
            ${mouth}
            <rect x="${14 - data.eyeSpread}" y="14" width="1.5" height="2" rx="1" fill="${data.faceColor}" />
            <rect x="${20 + data.eyeSpread}" y="14" width="1.5" height="2" rx="1" fill="${data.faceColor}" />
          </g>
        </g>
      </svg>
    `
  }
}

customElements.define('tronche-beam', AvatarBeam)
