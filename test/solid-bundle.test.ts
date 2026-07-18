import { describe, it, expect } from 'vitest'
import { render } from '@solidjs/testing-library'
import * as Solid from '../dist/solid/index.js'

describe('Solid bundle integrity', () => {
  const components = ['Avatar', 'AvatarMarble', 'AvatarBeam', 'AvatarBauhaus', 'AvatarPixel', 'AvatarRing', 'AvatarSunset']

  it('exports all 7 components as functions', () => {
    for (const name of components) {
      expect(Solid).toHaveProperty(name)
      expect(typeof (Solid as Record<string, unknown>)[name]).toBe('function')
    }
  })

  it.each(components)('%s renders an SVG element', (name) => {
    const Component = (Solid as Record<string, (...args: unknown[]) => unknown>)[name] as (props: Record<string, unknown>) => unknown
    const { container } = render(() => Component({ name: 'test' }))
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
