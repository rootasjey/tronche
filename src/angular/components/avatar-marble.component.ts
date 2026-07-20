import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generateMarbleData } from 'tronche'

const DESIGN_SIZE = 80

@Component({
  selector: 'tronche-marble',
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
        <path
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          [attr.fill]="data().elements[1].color"
          [style.filter]="filterUrl()"
          [attr.transform]="transform1()"
        />
        <path
          style="mix-blend-mode: overlay"
          [style.filter]="filterUrl()"
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          [attr.fill]="data().elements[2].color"
          [attr.transform]="transform2()"
        />
      </g>
      <defs>
        <filter [attr.id]="filterId()" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  `,
})
export class TroncheMarble {
  readonly DESIGN_SIZE = DESIGN_SIZE

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(80)

  readonly data = computed(() => generateMarbleData(this.name(), this.colors()))
  readonly mid = DESIGN_SIZE / 2
  readonly filterId = computed(() => `${this.data().maskId}Filter`)
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly filterUrl = computed(() => `url(#${this.filterId()})`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })
  readonly transform1 = computed(() => {
    const el = this.data().elements[1]
    return `translate(${el.translateX} ${el.translateY}) rotate(${el.rotate} ${this.mid} ${this.mid}) scale(${this.data().elements[2].scale})`
  })
  readonly transform2 = computed(() => {
    const el = this.data().elements[2]
    return `translate(${el.translateX} ${el.translateY}) rotate(${el.rotate} ${this.mid} ${this.mid}) scale(${el.scale})`
  })
}
