import { describe, it, expect } from 'vitest'
import { mount } from 'svelte'
import * as Svelte from '../dist/svelte/index.js'

describe('Svelte bundle integrity', () => {
  const components = ['Avatar', 'AvatarMarble', 'AvatarBeam', 'AvatarBauhaus', 'AvatarPixel', 'AvatarRing', 'AvatarSunset']

  it('exports all 7 components', () => {
    for (const name of components) {
      expect(Svelte).toHaveProperty(name)
    }
  })

  it.each(components)('%s is a function', (name) => {
    expect(typeof (Svelte as Record<string, unknown>)[name]).toBe('function')
  })

  describe('rendering', () => {
    it.each(components)('%s renders an SVG element', (name) => {
      const Component = (Svelte as Record<string, Record<string, unknown>>)[name]
      const target = document.createElement('div')
      expect(() => mount(Component as any, { target, props: { name: 'test' } })).not.toThrow()
      expect(target.querySelector('svg')).toBeTruthy()
    })

    it('AvatarMarble accepts custom colors', () => {
      const target = document.createElement('div')
      mount(Svelte.AvatarMarble as any, {
        target,
        props: { name: 'test', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] },
      })
      const paths = target.querySelectorAll('path')
      expect(paths.length).toBe(2)
    })

    it('AvatarMarble passes through class attribute', () => {
      const target = document.createElement('div')
      mount(Svelte.AvatarMarble as any, {
        target,
        props: { name: 'test', class: 'my-custom-class' },
      })
      const svg = target.querySelector('svg')!
      expect(svg.getAttribute('class')).toBe('my-custom-class')
    })

    it('Avatar is deterministic', () => {
      const target1 = document.createElement('div')
      mount(Svelte.AvatarMarble as any, { target: target1, props: { name: 'Alice' } })
      const id1 = target1.querySelector('mask')!.getAttribute('id')!

      const target2 = document.createElement('div')
      mount(Svelte.AvatarMarble as any, { target: target2, props: { name: 'Alice' } })
      const id2 = target2.querySelector('mask')!.getAttribute('id')!

      expect(id1).toBe(id2)
    })
  })
})
