import { describe, it, expect } from 'vitest'
import { TroncheMarble } from '../components/avatar-marble.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheMarble', () => {
  function el() {
    return createFixture(TroncheMarble).nativeElement as HTMLElement
  }

  it('renders an SVG element', () => {
    expect(qs(el(), 'svg')).toBeTruthy()
  })

  it('has default size 80', () => {
    const svg = qs(el(), 'svg')!
    expect(svg.getAttribute('width')).toBe('80')
    expect(svg.getAttribute('height')).toBe('80')
  })

  it('does not render title by default', () => {
    expect(qs(el(), 'title')).toBeNull()
  })

  it('has rects and paths', () => {
    const root = el()
    expect(qsa(root, 'rect').length).toBeGreaterThanOrEqual(1)
    expect(qsa(root, 'path').length).toBe(2)
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with marble prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-marble-/)
  })

  it('has defs with filter element', () => {
    const defs = qs(el(), 'defs')!
    expect(defs).toBeTruthy()
    expect(qs(defs, 'filter')).toBeTruthy()
    expect(qsa(defs, 'feFlood').length).toBe(1)
    expect(qsa(defs, 'feGaussianBlur').length).toBe(1)
  })
})
