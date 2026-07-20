import { LitElement, html, svg } from 'lit'
import { generatePixelData } from 'tronche'

const DESIGN_SIZE = 80
const GRID = 8
const CELL = DESIGN_SIZE / GRID

export class AvatarPixel extends LitElement {
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
    const data = generatePixelData(this.name, this.colors)
    const displaySize = typeof this.size === 'string' && this.size.endsWith('%') ? this.size : Number(this.size)

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
          ${data.colors.map((color, i) => svg`
            <rect
              x="${(i % GRID) * CELL}"
              y="${Math.floor(i / GRID) * CELL}"
              width="${CELL}"
              height="${CELL}"
              fill="${color}"
            />
          `)}
        </g>
      </svg>
    `
  }
}

customElements.define('tronche-pixel', AvatarPixel)
