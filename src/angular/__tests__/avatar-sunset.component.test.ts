import { describe, it, expect } from 'vitest'
import { TroncheSunset } from '../components/avatar-sunset.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheSunset', () => {
  function el() {
    return createFixture(TroncheSunset).nativeElement as HTMLElement
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

  it('renders 2 paths', () => {
    expect(qsa(el(), 'path').length).toBe(2)
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with sunset prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-sunset-/)
  })

  it('has defs with 2 linearGradients', () => {
    const defs = qs(el(), 'defs')!
    expect(defs).toBeTruthy()
    expect(qsa(defs, 'linearGradient').length).toBe(2)
  })
})
