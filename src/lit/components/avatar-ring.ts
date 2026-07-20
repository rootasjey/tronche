import { LitElement, html } from 'lit'
import { generateRingData } from 'tronche'

const DESIGN_SIZE = 90

export class AvatarRing extends LitElement {
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
    this.size = 90
  }

  override render() {
    const data = generateRingData(this.name, this.colors)
    const displaySize = typeof this.size === 'string' && this.size.endsWith('%') ? this.size : Number(this.size)
    const half = DESIGN_SIZE / 2

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
          <path d="M0 0h${DESIGN_SIZE}v${half}H0z" fill="${data.colors[0]}" />
          <path d="M0 ${half}h${DESIGN_SIZE}v${half}H0z" fill="${data.colors[1]}" />
          <path d="M${DESIGN_SIZE - 7} ${half}a${half - 7} ${half - 7} 0 00-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z" fill="${data.colors[2]}" />
          <path d="M${DESIGN_SIZE - 7} ${half}a${half - 7} ${half - 7} 0 01-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z" fill="${data.colors[3]}" />
          <path d="M${DESIGN_SIZE - 13} ${half}a${half - 13} ${half - 13} 0 10-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z" fill="${data.colors[4]}" />
          <path d="M${DESIGN_SIZE - 13} ${half}a${half - 13} ${half - 13} 0 11-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z" fill="${data.colors[5]}" />
          <path d="M${DESIGN_SIZE - 19} ${half}a${half - 19} ${half - 19} 0 00-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z" fill="${data.colors[6]}" />
          <path d="M${DESIGN_SIZE - 19} ${half}a${half - 19} ${half - 19} 0 01-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z" fill="${data.colors[7]}" />
          <circle cx="${half}" cy="${half}" r="${half - 22}" fill="${data.colors[8]}" />
        </g>
      </svg>
    `
  }
}

customElements.define('tronche-ring', AvatarRing)
