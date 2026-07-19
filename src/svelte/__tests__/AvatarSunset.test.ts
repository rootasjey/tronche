import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import AvatarSunset from '../components/AvatarSunset.svelte'

describe('AvatarSunset', () => {
  it('renders an SVG element', () => {
    const { container } = render(AvatarSunset, { name: 'test' })
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders linearGradient defs', () => {
    const { container } = render(AvatarSunset, { name: 'test' })
    expect(container.querySelectorAll('linearGradient').length).toBe(2)
  })

  it('renders a mask with correct id', () => {
    const { container } = render(AvatarSunset, { name: 'test' })
    expect(container.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-sunset-/)
  })

  it('is deterministic: same name produces same mask ID', () => {
    const { container: c1 } = render(AvatarSunset, { name: 'Alice' })
    const { container: c2 } = render(AvatarSunset, { name: 'Alice' })
    expect(c1.querySelector('mask')!.getAttribute('id')).toBe(c2.querySelector('mask')!.getAttribute('id'))
  })
})
