import { describe, it, expect } from 'vitest'
import { TroncheBeam } from '../components/avatar-beam.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheBeam', () => {
  function el() {
    return createFixture(TroncheBeam).nativeElement as HTMLElement
  }

  it('renders an SVG element', () => {
    expect(qs(el(), 'svg')).toBeTruthy()
  })

  it('has default size 36', () => {
    const svg = qs(el(), 'svg')!
    expect(svg.getAttribute('width')).toBe('36')
    expect(svg.getAttribute('height')).toBe('36')
  })

  it('does not render title by default', () => {
    expect(qs(el(), 'title')).toBeNull()
  })

  it('has rects and paths', () => {
    const root = el()
    expect(qsa(root, 'rect').length).toBeGreaterThanOrEqual(1)
    expect(qsa(root, 'path').length).toBeGreaterThanOrEqual(1)
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with beam prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-beam-/)
  })

  it('has a face wrapper group', () => {
    const g = qsa(el(), 'g')
    expect(g.length).toBeGreaterThanOrEqual(2)
  })
})
