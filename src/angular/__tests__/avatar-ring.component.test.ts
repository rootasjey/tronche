import { describe, it, expect } from 'vitest'
import { TroncheRing } from '../components/avatar-ring.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheRing', () => {
  function el() {
    return createFixture(TroncheRing).nativeElement as HTMLElement
  }

  it('renders an SVG element', () => {
    expect(qs(el(), 'svg')).toBeTruthy()
  })

  it('has default size 90', () => {
    const svg = qs(el(), 'svg')!
    expect(svg.getAttribute('width')).toBe('90')
    expect(svg.getAttribute('height')).toBe('90')
  })

  it('does not render title by default', () => {
    expect(qs(el(), 'title')).toBeNull()
  })

  it('renders 8 paths and 1 circle', () => {
    const root = el()
    expect(qsa(root, 'path').length).toBe(8)
    expect(qs(root, 'circle')).toBeTruthy()
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with ring prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-ring-/)
  })
})
