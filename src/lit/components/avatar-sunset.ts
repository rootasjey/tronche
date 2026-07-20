import { LitElement, html } from 'lit'
import { generateSunsetData } from 'tronche'

const DESIGN_SIZE = 80

export class AvatarSunset extends LitElement {
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
    const data = generateSunsetData(this.name, this.colors)
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
          <path fill="url(#gradient0_${data.nameWithoutSpace})" d="M0 0h${DESIGN_SIZE}v${half}H0z" />
          <path fill="url(#gradient1_${data.nameWithoutSpace})" d="M0 ${half}h${DESIGN_SIZE}v${half}H0z" />
        </g>
        <defs>
          <linearGradient id="gradient0_${data.nameWithoutSpace}" x1="${half}" y1="0" x2="${half}" y2="${half}" gradientUnits="userSpaceOnUse">
            <stop stop-color="${data.colors[0]}" />
            <stop offset="1" stop-color="${data.colors[1]}" />
          </linearGradient>
          <linearGradient id="gradient1_${data.nameWithoutSpace}" x1="${half}" y1="${half}" x2="${half}" y2="${DESIGN_SIZE}" gradientUnits="userSpaceOnUse">
            <stop stop-color="${data.colors[2]}" />
            <stop offset="1" stop-color="${data.colors[3]}" />
          </linearGradient>
        </defs>
      </svg>
    `
  }
}

customElements.define('tronche-sunset', AvatarSunset)
