import { LitElement, html } from 'lit'
import { generateBauhausData } from 'tronche'

const DESIGN_SIZE = 80

export class AvatarBauhaus extends LitElement {
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
    const data = generateBauhausData(this.name, this.colors)
    const displaySize = typeof this.size === 'string' && this.size.endsWith('%') ? this.size : Number(this.size)
    const mid = DESIGN_SIZE / 2
    const [bg, rect1, circle, line] = data.elements

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
          <rect width="${DESIGN_SIZE}" height="${DESIGN_SIZE}" fill="${bg.color}" />
          <rect
            x="${(DESIGN_SIZE - 60) / 2}"
            y="${(DESIGN_SIZE - 20) / 2}"
            width="${DESIGN_SIZE}"
            height="${rect1.isSquare ? DESIGN_SIZE : DESIGN_SIZE / 8}"
            fill="${rect1.color}"
            transform="translate(${rect1.translateX} ${rect1.translateY}) rotate(${rect1.rotate} ${mid} ${mid})"
          />
          <circle
            cx="${mid}"
            cy="${mid}"
            fill="${circle.color}"
            r="${DESIGN_SIZE / 5}"
            transform="translate(${circle.translateX} ${circle.translateY})"
          />
          <line
            x1="0"
            y1="${mid}"
            x2="${DESIGN_SIZE}"
            y2="${mid}"
            stroke-width="2"
            stroke="${line.color}"
            transform="translate(${line.translateX} ${line.translateY}) rotate(${line.rotate} ${mid} ${mid})"
          />
        </g>
      </svg>
    `
  }
}

customElements.define('tronche-bauhaus', AvatarBauhaus)
