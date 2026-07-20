import { LitElement, html } from 'lit'

export type AvatarVariant = 'marble' | 'bauhaus' | 'beam' | 'pixel' | 'ring' | 'sunset'

export class Avatar extends LitElement {
  static properties = {
    variant: {},
    name: {},
    colors: { attribute: false },
    title: { type: Boolean },
    square: { type: Boolean },
    size: {},
  }

  declare variant: AvatarVariant
  declare name: string
  declare colors: string[]
  declare title: boolean
  declare square: boolean
  declare size: number | string

  constructor() {
    super()
    this.variant = 'marble'
    this.name = 'Clara Barton'
    this.colors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    this.title = false
    this.square = false
    this.size = 80
  }

  override render() {
    const p = {
      name: this.name,
      colors: this.colors,
      title: this.title,
      square: this.square,
      size: this.size,
    }

    const tag = (variant: string) => {
      switch (variant) {
        case 'beam':
        case 'geometric':
          return 'tronche-beam'
        case 'bauhaus':
        case 'abstract':
          return 'tronche-bauhaus'
        case 'pixel':
          return 'tronche-pixel'
        case 'ring':
          return 'tronche-ring'
        case 'sunset':
          return 'tronche-sunset'
        default:
          return 'tronche-marble'
      }
    }

    const el = tag(this.variant)

    switch (el) {
      case 'tronche-beam':
        return html`<tronche-beam name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-beam>`
      case 'tronche-bauhaus':
        return html`<tronche-bauhaus name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-bauhaus>`
      case 'tronche-pixel':
        return html`<tronche-pixel name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-pixel>`
      case 'tronche-ring':
        return html`<tronche-ring name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-ring>`
      case 'tronche-sunset':
        return html`<tronche-sunset name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-sunset>`
      default:
        return html`<tronche-marble name="${p.name}" .colors=${p.colors} ?title=${p.title} ?square=${p.square} .size=${p.size}></tronche-marble>`
    }
  }
}

customElements.define('tronche-avatar', Avatar)
