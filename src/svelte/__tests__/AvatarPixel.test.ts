import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import AvatarPixel from '../components/AvatarPixel.svelte'

describe('AvatarPixel', () => {
  it('renders an SVG element', () => {
    const { container } = render(AvatarPixel, { name: 'test' })
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders 64 pixel rects', () => {
    const { container } = render(AvatarPixel, { name: 'test' })
    expect(container.querySelectorAll('rect').length).toBe(65)
  })

  it('renders a mask with correct id', () => {
    const { container } = render(AvatarPixel, { name: 'test' })
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-pixel-/)
  })

  it('is deterministic: same name produces same mask ID', () => {
    const { container: c1 } = render(AvatarPixel, { name: 'Alice' })
    const { container: c2 } = render(AvatarPixel, { name: 'Alice' })
    expect(c1.querySelector('mask')!.getAttribute('id')).toBe(c2.querySelector('mask')!.getAttribute('id'))
  })
})
