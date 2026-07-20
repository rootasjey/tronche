import { describe, it, expect } from 'vitest'
import { TroncheBauhaus } from '../components/avatar-bauhaus.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheBauhaus', () => {
  function el() {
    return createFixture(TroncheBauhaus).nativeElement as HTMLElement
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

  it('has rects, circle and line', () => {
    const root = el()
    expect(qsa(root, 'rect').length).toBeGreaterThanOrEqual(1)
    expect(qs(root, 'circle')).toBeTruthy()
    expect(qs(root, 'line')).toBeTruthy()
  })

  it('has round mask by default', () => {
    const r = qs(el(), 'mask rect')!
    expect(r.getAttribute('rx')).toBeTruthy()
  })

  it('renders a mask id with bauhaus prefix', () => {
    const mask = qs(el(), 'mask')!
    expect(mask.getAttribute('id')).toMatch(/^tronche-mask-bauhaus-/)
  })
})
