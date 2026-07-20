import { Component, signal, effect } from '@angular/core'
import { TroncheMarble, TroncheBeam, TroncheBauhaus, TronchePixel, TroncheRing, TroncheSunset } from 'tronche/angular'

type Theme = 'light' | 'dark' | 'system'

const PALETTES = [
  ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'],
  ['#5b1d99', '#0074b4', '#00b34c', '#ffd41f', '#fc6e3d'],
]

const VARIANTS = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'] as const

const THEME_LABELS: Record<Theme, string> = { light: '☀️ Light', dark: '🌙 Dark', system: '💻 System' }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TroncheMarble, TroncheBeam, TroncheBauhaus, TronchePixel, TroncheRing, TroncheSunset],
  template: `
    <div>
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap">
        <div style="position: relative">
          <button
            (click)="menuOpen.set(!menuOpen())"
            style="padding: .5rem 1rem; background: var(--btn-bg); color: var(--text); border: 1px solid var(--border); border-radius: .5rem; cursor: pointer; font-size: .875rem"
          >
            {{ THEME_LABELS[theme()] }}
          </button>
          @if (menuOpen()) {
            <div style="position: absolute; top: 100%; left: 0; margin-top: .25rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: .5rem; box-shadow: 0 4px 12px rgba(0,0,0,.15); overflow: hidden; z-index: 10">
              @for (t of lightDarkSystem; track t) {
                <button
                  (click)="theme.set(t); menuOpen.set(false)"
                  style="display: block; width: 100%; padding: .5rem 1rem; background: {{ theme() === t ? 'var(--accent-bg)' : 'transparent' }}; color: var(--text); border: none; cursor: pointer; font-size: .875rem; text-align: left; white-space: nowrap"
                >
                  {{ THEME_LABELS[t] }}
                </button>
              }
            </div>
          }
        </div>

        <button
          (click)="palette.set((palette() + 1) % PALETTES.length)"
          style="padding: .5rem 1rem; background: var(--btn-bg); color: var(--text); border: 1px solid var(--border); border-radius: .5rem; cursor: pointer; font-size: .875rem"
        >
          Change palette
        </button>

        <button
          (click)="square.set(!square())"
          style="padding: .5rem 1rem; background: var(--btn-bg); color: var(--text); border: 1px solid var(--border); border-radius: .5rem; cursor: pointer; font-size: .875rem"
        >
          {{ square() ? '■ Square' : '▢ Round' }}
        </button>

        <input
          [value]="avatarName()"
          (input)="avatarName.set($any($event.target).value)"
          placeholder="Enter a name"
          style="padding: .5rem .75rem; background: var(--btn-bg); color: var(--text); border: 1px solid var(--border); border-radius: .5rem; font-size: .875rem; width: 200px; outline: none"
        />
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1rem">
        @for (v of VARIANTS; track v) {
          <div style="display: flex; flex-direction: column; align-items: center; gap: .5rem">
            @switch (v) {
              @case ('marble') {
                <tronche-marble [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
              @case ('beam') {
                <tronche-beam [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
              @case ('bauhaus') {
                <tronche-bauhaus [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
              @case ('pixel') {
                <tronche-pixel [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
              @case ('ring') {
                <tronche-ring [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
              @case ('sunset') {
                <tronche-sunset [name]="avatarName()" [colors]="PALETTES[palette()]" [size]="100" [square]="square()" />
              }
            }
            <span style="font-size: .75rem; color: var(--muted)">{{ v }}</span>
          </div>
        }
      </div>
    </div>
  `,
})
export class App {
  readonly PALETTES = PALETTES
  readonly VARIANTS = VARIANTS
  readonly THEME_LABELS = THEME_LABELS
  readonly lightDarkSystem: Theme[] = ['light', 'dark', 'system']

  readonly palette = signal(0)
  readonly theme = signal<Theme>('system')
  readonly menuOpen = signal(false)
  readonly avatarName = signal('Clara Barton')
  readonly square = signal(false)

  constructor() {
    effect(() => {
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = this.theme() === 'dark' || (this.theme() === 'system' && prefersDark)
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    })
  }
}
