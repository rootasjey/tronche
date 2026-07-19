import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/svelte'
import AvatarMarble from '../components/AvatarMarble.svelte'

describe('AvatarMarble', () => {
  it('renders an SVG element', () => {
    const { container } = render(AvatarMarble, { name: 'test' })
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('sets width and height from size prop', () => {
    const { container } = render(AvatarMarble, { name: 'test', size: 120 })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('120')
    expect(svg.getAttribute('height')).toBe('120')
  })

  it('accepts size as string', () => {
    const { container } = render(AvatarMarble, { name: 'test', size: '120' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('120')
  })

  it('renders a mask with the correct id', () => {
    const { container } = render(AvatarMarble, { name: 'test' })
    const mask = container.querySelector('mask')
    expect(mask).toBeTruthy()
    expect(mask!.getAttribute('id')).toMatch(/^tronche-mask-marble-/)
  })

  it('renders title when title prop is true', () => {
    const { container } = render(AvatarMarble, { name: 'Alice', title: true })
    const title = container.querySelector('title')
    expect(title).toBeTruthy()
    expect(title!.textContent).toBe('Alice')
  })

  it('does not render title when title prop is false', () => {
    const { container } = render(AvatarMarble, { name: 'Alice', title: false })
    expect(container.querySelector('title')).toBeNull()
  })

  it('renders correct number of rects and paths', () => {
    const { container } = render(AvatarMarble, { name: 'test' })
    expect(container.querySelectorAll('rect').length).toBeGreaterThanOrEqual(1)
    expect(container.querySelectorAll('path').length).toBe(2)
  })

  it('applies square mask when square prop is true', () => {
    const { container } = render(AvatarMarble, { name: 'test', square: true })
    const rect = container.querySelector('mask rect')!
    expect(rect.getAttribute('rx')).toBeFalsy()
  })

  it('applies round mask by default', () => {
    const { container } = render(AvatarMarble, { name: 'test' })
    const rect = container.querySelector('mask rect')!
    expect(rect.getAttribute('rx')).toBeTruthy()
  })

  it('accepts custom colors', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    const { container } = render(AvatarMarble, { name: 'test', colors: customColors })
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    const fills = Array.from(container.querySelectorAll('g [fill]')).map(el => el.getAttribute('fill'))
    const allFromCustom = fills.every(f => f && customColors.includes(f))
    const anyFromDefault = fills.some(f => f && defaultColors.includes(f))
    expect(allFromCustom).toBe(true)
    expect(anyFromDefault).toBe(false)
  })

  it('passes through class attribute to SVG', () => {
    const { container } = render(AvatarMarble, { name: 'test', class: 'my-avatar' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('class')).toBe('my-avatar')
  })

  it('triggers onclick event handler', () => {
    const handleClick = vi.fn()
    const { container } = render(AvatarMarble, { name: 'test', onclick: handleClick })
    container.querySelector('svg')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes through style attribute to SVG', () => {
    const { container } = render(AvatarMarble, { name: 'test', style: 'display: block' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('style')).toMatch(/^display:\s*block/)
  })

  it('passes through data-* attributes to SVG', () => {
    const { container } = render(AvatarMarble, { name: 'test', 'data-testid': 'avatar-marble' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('data-testid')).toBe('avatar-marble')
  })

  it('passes through aria-* attributes to SVG', () => {
    const { container } = render(AvatarMarble, { name: 'test', 'aria-label': 'Avatar of test' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('aria-label')).toBe('Avatar of test')
  })

  it('accepts size as percentage string', () => {
    const { container } = render(AvatarMarble, { name: 'test', size: '100%' })
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('100%')
    expect(svg.getAttribute('height')).toBe('100%')
  })

  it('is deterministic: same name produces same mask ID', () => {
    const { container: c1 } = render(AvatarMarble, { name: 'Alice' })
    const { container: c2 } = render(AvatarMarble, { name: 'Alice' })
    expect(c1.querySelector('mask')!.getAttribute('id')).toBe(c2.querySelector('mask')!.getAttribute('id'))
  })

  it('different names produce different mask IDs', () => {
    const { container: c1 } = render(AvatarMarble, { name: 'Alice' })
    const { container: c2 } = render(AvatarMarble, { name: 'Bob' })
    expect(c1.querySelector('mask')!.getAttribute('id')).not.toBe(c2.querySelector('mask')!.getAttribute('id'))
  })

  it('renders with empty name', () => {
    const { container } = render(AvatarMarble, { name: '' })
    expect(container.querySelector('svg')).toBeTruthy()
    expect(container.querySelector('title')).toBeNull()
  })

  it('renders with very long name', () => {
    const longName = 'A'.repeat(1000)
    const { container } = render(AvatarMarble, { name: longName })
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders with special characters (accents, emojis)', () => {
    const { container } = render(AvatarMarble, { name: 'Jérôme 🎉 日本語' })
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders with name containing only whitespace', () => {
    const { container } = render(AvatarMarble, { name: '   ' })
    expect(container.querySelector('svg')).toBeTruthy()
  })
})
