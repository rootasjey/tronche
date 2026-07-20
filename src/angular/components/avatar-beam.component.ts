import { Component, computed, input, booleanAttribute } from '@angular/core'
import { generateBeamData } from 'tronche'

const DESIGN_SIZE = 36

@Component({
  selector: 'tronche-beam',
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
        <rect [attr.width]="DESIGN_SIZE" [attr.height]="DESIGN_SIZE" [attr.fill]="data().backgroundColor" />
        <rect
          [attr.x]="0"
          [attr.y]="0"
          [attr.width]="DESIGN_SIZE"
          [attr.height]="DESIGN_SIZE"
          [attr.transform]="wrapperTransform()"
          [attr.fill]="data().wrapperColor"
          [attr.rx]="data().isCircle ? DESIGN_SIZE : DESIGN_SIZE / 6"
        />
        <g [attr.transform]="faceTransform()">
          @if (data().isMouthOpen) {
            <path [attr.d]="mouthOpenPath()" [attr.stroke]="data().faceColor" fill="none" stroke-linecap="round" />
          } @else {
            <path [attr.d]="mouthClosedPath()" [attr.fill]="data().faceColor" />
          }
          <rect [attr.x]="leftEyeX()" [attr.y]="14" [attr.width]="1.5" [attr.height]="2" [attr.rx]="1" stroke="none" [attr.fill]="data().faceColor" />
          <rect [attr.x]="rightEyeX()" [attr.y]="14" [attr.width]="1.5" [attr.height]="2" [attr.rx]="1" stroke="none" [attr.fill]="data().faceColor" />
        </g>
      </g>
    </svg>
  `,
})
export class TroncheBeam {
  readonly DESIGN_SIZE = DESIGN_SIZE

  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(36)

  readonly data = computed(() => generateBeamData(this.name(), this.colors()))
  readonly mid = DESIGN_SIZE / 2
  readonly maskUrl = computed(() => `url(#${this.data().maskId})`)
  readonly displaySize = computed(() => {
    const s = this.size()
    return typeof s === 'string' && s.endsWith('%') ? s : Number(s)
  })
  readonly wrapperTransform = computed(() => {
    const d = this.data()
    return `translate(${d.wrapperTranslateX} ${d.wrapperTranslateY}) rotate(${d.wrapperRotate} ${this.mid} ${this.mid}) scale(${d.wrapperScale})`
  })
  readonly faceTransform = computed(() => {
    const d = this.data()
    return `translate(${d.faceTranslateX} ${d.faceTranslateY}) rotate(${d.faceRotate} ${this.mid} ${this.mid})`
  })
  readonly mouthOpenPath = computed(() => `M15 ${19 + this.data().mouthSpread}c2 1 4 1 6 0`)
  readonly mouthClosedPath = computed(() => `M13,${19 + this.data().mouthSpread} a1,0.75 0 0,0 10,0`)
  readonly leftEyeX = computed(() => 14 - this.data().eyeSpread)
  readonly rightEyeX = computed(() => 20 + this.data().eyeSpread)
}
