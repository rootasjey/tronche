import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generateRingData } from 'tronche'

const DESIGN_SIZE = 90

@Component({
  selector: 'tronche-ring',
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
        <path [attr.d]="path0()" [attr.fill]="data().colors[0]" />
        <path [attr.d]="path1()" [attr.fill]="data().colors[1]" />
        <path [attr.d]="path2()" [attr.fill]="data().colors[2]" />
        <path [attr.d]="path3()" [attr.fill]="data().colors[3]" />
        <path [attr.d]="path4()" [attr.fill]="data().colors[4]" />
        <path [attr.d]="path5()" [attr.fill]="data().colors[5]" />
        <path [attr.d]="path6()" [attr.fill]="data().colors[6]" />
        <path [attr.d]="path7()" [attr.fill]="data().colors[7]" />
        <circle [attr.cx]="mid" [attr.cy]="mid" [attr.r]="mid - 22" [attr.fill]="data().colors[8]" />
      </g>
    </svg>
  `,
})
export class TroncheRing {
  readonly DESIGN_SIZE = DESIGN_SIZE

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(90)

  readonly data = computed(() => generateRingData(this.name(), this.colors()))
  readonly mid = DESIGN_SIZE / 2
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })

  readonly path0 = computed(() => `M0 0h${DESIGN_SIZE}v${this.mid}H0z`)
  readonly path1 = computed(() => `M0 ${this.mid}h${DESIGN_SIZE}v${this.mid}H0z`)
  readonly path2 = computed(() => `M${DESIGN_SIZE - 7} ${this.mid}a${this.mid - 7} ${this.mid - 7} 0 00-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z`)
  readonly path3 = computed(() => `M${DESIGN_SIZE - 7} ${this.mid}a${this.mid - 7} ${this.mid - 7} 0 01-${DESIGN_SIZE - 14} 0h${DESIGN_SIZE - 14}z`)
  readonly path4 = computed(() => `M${DESIGN_SIZE - 13} ${this.mid}a${this.mid - 13} ${this.mid - 13} 0 10-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z`)
  readonly path5 = computed(() => `M${DESIGN_SIZE - 13} ${this.mid}a${this.mid - 13} ${this.mid - 13} 0 11-${DESIGN_SIZE - 26} 0h${DESIGN_SIZE - 26}z`)
  readonly path6 = computed(() => `M${DESIGN_SIZE - 19} ${this.mid}a${this.mid - 19} ${this.mid - 19} 0 00-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z`)
  readonly path7 = computed(() => `M${DESIGN_SIZE - 19} ${this.mid}a${this.mid - 19} ${this.mid - 19} 0 01-${DESIGN_SIZE - 38} 0h${DESIGN_SIZE - 38}z`)
}
