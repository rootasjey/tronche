import { LitElement, html } from 'lit'
import { generateMarbleData } from 'tronche'

const DESIGN_SIZE = 80

export class AvatarMarble extends LitElement {
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
    this.size = 80
  }

  override render() {
    const data = generateMarbleData(this.name, this.colors)
    const displaySize = typeof this.size === 'string' && this.size.endsWith('%') ? this.size : Number(this.size)
    const mid = DESIGN_SIZE / 2

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
          <rect width="${DESIGN_SIZE}" height="${DESIGN_SIZE}" fill="${data.elements[0].color}" />
          <path
            filter="url(#${data.maskId}Filter)"
            d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
            fill="${data.elements[1].color}"
            transform="translate(${data.elements[1].translateX} ${data.elements[1].translateY}) rotate(${data.elements[1].rotate} ${mid} ${mid}) scale(${data.elements[2].scale})"
          />
          <path
            filter="url(#${data.maskId}Filter)"
            style="mix-blend-mode: overlay"
            d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
            fill="${data.elements[2].color}"
            transform="translate(${data.elements[2].translateX} ${data.elements[2].translateY}) rotate(${data.elements[2].rotate} ${mid} ${mid}) scale(${data.elements[2].scale})"
          />
        </g>
        <defs>
          <filter id="${data.maskId}Filter" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>
    `
  }
}

customElements.define('tronche-marble', AvatarMarble)
