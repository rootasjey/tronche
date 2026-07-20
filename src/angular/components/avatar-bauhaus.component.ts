import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generateBauhausData } from 'tronche'

const DESIGN_SIZE = 80

@Component({
  selector: 'tronche-bauhaus',
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
      <mask [attr.id]="data().maskId" maskUnits="userSpaceOnUse" [attr.x]="0" [attr.y]="0" [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE">
        <rect [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE" [attr.rx]="square() ? undefined : DESIGN_SIZE * 2" fill="#FFFFFF" />
      </mask>
      <g [attr.mask]="maskUrl()">
        <rect [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE" [attr.fill]="data().elements[0].color" />
        <rect
          [attr.x]="rectX()"
          [attr.y]="rectY()"
          [attr.width]="DESIGN_SIZE"
          [attr.height]="rectHeight()"
          [attr.fill]="data().elements[1].color"
          [attr.transform]="rectTransform()"
        />
        <circle
          [attr.cx]="mid"
          [attr.cy]="mid"
          [attr.fill]="data().elements[2].color"
          [attr.r]="DESIGN_SIZE / 5"
          [attr.transform]="circleTransform()"
        />
        <line
          [attr.x1]="0"
          [attr.y1]="mid"
          [attr.x2]="DESIGN_SIZE"
          [attr.y2]="mid"
          [attr.stroke-width]="2"
          [attr.stroke]="data().elements[3].color"
          [attr.transform]="lineTransform()"
        />
      </g>
    </svg>
  `,
})
export class TroncheBauhaus {
  readonly DESIGN_SIZE = DESIGN_SIZE

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(80)

  readonly data = computed(() => generateBauhausData(this.name(), this.colors()))
  readonly mid = DESIGN_SIZE / 2
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })
  readonly rectX = computed(() => (DESIGN_SIZE - 60) / 2)
  readonly rectY = computed(() => (DESIGN_SIZE - 20) / 2)
  readonly rectHeight = computed(() => this.data().elements[1].isSquare ? DESIGN_SIZE : DESIGN_SIZE / 8)
  readonly rectTransform = computed(() => {
    const el = this.data().elements[1]
    return `translate(${el.translateX} ${el.translateY}) rotate(${el.rotate} ${this.mid} ${this.mid})`
  })
  readonly circleTransform = computed(() => {
    const el = this.data().elements[2]
    return `translate(${el.translateX} ${el.translateY})`
  })
  readonly lineTransform = computed(() => {
    const el = this.data().elements[3]
    return `translate(${el.translateX} ${el.translateY}) rotate(${el.rotate} ${this.mid} ${this.mid})`
  })
}
