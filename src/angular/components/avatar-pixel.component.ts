import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generatePixelData } from 'tronche'

const DESIGN_SIZE = 80
const GRID = 8

@Component({
  selector: 'tronche-pixel',
  standalone: true,
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + DESIGN_SIZE + ' ' + DESIGN_SIZE"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="displaySize()"
      [attr.height]="displaySize()"
    >
      @if (title()) {
        <title>{{ name() }}</title>
      }
      <mask [attr.id]="data().maskId" mask-type="alpha" maskUnits="userSpaceOnUse" [attr.x]="0" [attr.y]="0" [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE">
        <rect [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE" [attr.rx]="square() ? undefined : DESIGN_SIZE * 2" fill="#FFFFFF" />
      </mask>
      <g [attr.mask]="maskUrl()">
        @for (color of data().colors; track $index) {
          <rect
            [attr.x]="pixelX($index)"
            [attr.y]="pixelY($index)"
            [attr.width]="cellSize"
            [attr.height]="cellSize"
            [attr.fill]="color"
          />
        }
      </g>
    </svg>
  `,
})
export class TronchePixel {
  readonly DESIGN_SIZE = DESIGN_SIZE
  readonly GRID = GRID
  readonly cellSize = DESIGN_SIZE / GRID

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(80)

  readonly data = computed(() => generatePixelData(this.name(), this.colors()))
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })

  pixelX(index: number): number {
    return (index % GRID) * this.cellSize
  }

  pixelY(index: number): number {
    return Math.floor(index / GRID) * this.cellSize
  }
}
