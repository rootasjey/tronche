import { describe, it, expect } from 'vitest'
import { TroncheAvatar } from '../components/avatar.component'
import { createFixture, qs, qsa } from './test-utils'

describe('TroncheAvatar (dispatcher)', () => {
  function el() {
    return createFixture(TroncheAvatar).nativeElement as HTMLElement
  }

  it('renders an SVG element (defaults to marble)', () => {
    expect(qs(el(), 'svg')).toBeTruthy()
  })

  it('has default size 80', () => {
    const svg = qs(el(), 'svg')!
    expect(svg.getAttribute('width')).toBe('80')
    expect(svg.getAttribute('height')).toBe('80')
  })

  it('renders marble content by default (marble has paths)', () => {
    expect(qsa(el(), 'path').length).toBe(2)
  })
})
