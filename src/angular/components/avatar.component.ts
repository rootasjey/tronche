import { Component, input, booleanAttribute } from '@angular/core'
import { TroncheMarble } from './avatar-marble.component'
import { TroncheBeam } from './avatar-beam.component'
import { TroncheBauhaus } from './avatar-bauhaus.component'
import { TronchePixel } from './avatar-pixel.component'
import { TroncheRing } from './avatar-ring.component'
import { TroncheSunset } from './avatar-sunset.component'

type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'

@Component({
  selector: 'tronche-avatar',
  standalone: true,
  imports: [TroncheMarble, TroncheBeam, TroncheBauhaus, TronchePixel, TroncheRing, TroncheSunset],
  template: `
    @switch (variant()) {
      @case ('beam') {
        <tronche-beam [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('bauhaus') {
        <tronche-bauhaus [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('pixel') {
        <tronche-pixel [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('ring') {
        <tronche-ring [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('sunset') {
        <tronche-sunset [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('geometric') {
        <tronche-beam [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @case ('abstract') {
        <tronche-bauhaus [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
      @default {
        <tronche-marble [name]="name()" [colors]="colors()" [title]="title()" [square]="square()" [size]="size()" />
      }
    }
  `,
})
export class TroncheAvatar {
  readonly variant = input<AvatarVariant | 'geometric' | 'abstract'>('marble')
  readonly name = input('Clara Barton')
  readonly colors = input(['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'])
  readonly title = input(false, { transform: booleanAttribute })
  readonly square = input(false, { transform: booleanAttribute })
  readonly size = input<number | string>(80)
}
