import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generateSunsetData } from 'tronche'

const DESIGN_SIZE = 80

@Component({
  selector: 'tronche-sunset',
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
        <path [attr.fill]="gradient0Url()" [attr.d]="pathTop()" />
        <path [attr.fill]="gradient1Url()" [attr.d]="pathBottom()" />
      </g>
      <defs>
        <linearGradient [attr.id]="'gradient0_' + data().nameWithoutSpace" [attr.x1]="mid" [attr.y1]="0" [attr.x2]="mid" [attr.y2]="mid" gradientUnits="userSpaceOnUse">
          <stop [attr.stop-color]="data().colors[0]" />
          <stop offset="1" [attr.stop-color]="data().colors[1]" />
        </linearGradient>
        <linearGradient [attr.id]="'gradient1_' + data().nameWithoutSpace" [attr.x1]="mid" [attr.y1]="mid" [attr.x2]="mid" [attr.y2]="DESIGN_SIZE" gradientUnits="userSpaceOnUse">
          <stop [attr.stop-color]="data().colors[2]" />
          <stop offset="1" [attr.stop-color]="data().colors[3]" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class TroncheSunset {
  readonly DESIGN_SIZE = DESIGN_SIZE

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(80)

  readonly data = computed(() => generateSunsetData(this.name(), this.colors()))
  readonly mid = DESIGN_SIZE / 2
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly gradient0Url = computed(() => `url(#gradient0_${this.data().nameWithoutSpace})`)
  readonly gradient1Url = computed(() => `url(#gradient1_${this.data().nameWithoutSpace})`)
  readonly pathTop = computed(() => `M0 0h${DESIGN_SIZE}v${this.mid}H0z`)
  readonly pathBottom = computed(() => `M0 ${this.mid}h${DESIGN_SIZE}v${this.mid}H0z`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })
}
