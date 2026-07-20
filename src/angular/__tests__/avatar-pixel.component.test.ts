import { describe, it, expect } from 'vitest'
import { TronchePixel } from '../components/avatar-pixel.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TronchePixel', () => {
  function el() {
    return createFixture(TronchePixel).nativeElement as HTMLElement
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

  it('renders 64 pixel rects (8x8)', () => {
    expect(qsa(el(), 'g rect').length).toBe(64)
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with pixel prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-pixel-/)
  })

  it('has mask-type="alpha"', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('mask-type')).toBe('alpha')
  })
})
