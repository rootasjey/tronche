import { describe, it, expect } from 'vitest'
import * as Lit from '../dist/lit/index.js'

describe('Lit bundle integrity', () => {
  const components = ['Avatar', 'AvatarMarble', 'AvatarBeam', 'AvatarBauhaus', 'AvatarPixel', 'AvatarRing', 'AvatarSunset']

  it('exports all 7 components', () => {
    for (const name of components) {
      expect(Lit).toHaveProperty(name)
    }
  })

  it('each export is a class (LitElement constructor)', () => {
    for (const name of components) {
      const exp = (Lit as Record<string, unknown>)[name]
      expect(typeof exp).toBe('function')
      expect(exp.toString()).toMatch(/^class /)
    }
  })

  it('all custom elements are registered', () => {
    const tags = ['tronche-avatar', 'tronche-marble', 'tronche-beam', 'tronche-bauhaus', 'tronche-pixel', 'tronche-ring', 'tronche-sunset']
    for (const tag of tags) {
      expect(customElements.get(tag)).toBeTruthy()
    }
  })

  describe('rendering', () => {
    const variantTags = ['tronche-marble', 'tronche-beam', 'tronche-bauhaus', 'tronche-pixel', 'tronche-ring', 'tronche-sunset']

    it.each(variantTags)('%s renders an SVG element', async (tag) => {
      const el = document.createElement(tag) as any
      el.name = 'test'
      document.body.appendChild(el)
      await el.updateComplete
      expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
      el.remove()
    })

    it('tronche-avatar renders the correct child variant element', async () => {
      const el = document.createElement('tronche-avatar') as any
      el.variant = 'pixel'
      el.name = 'test'
      document.body.appendChild(el)
      await el.updateComplete
      expect(el.shadowRoot!.querySelector('tronche-pixel')).toBeTruthy()
      el.remove()
    })
  })
})
