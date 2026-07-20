import { describe, it, expect, vi } from 'vitest'
import '../components/avatar-marble.js'

function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-marble') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  return el
}

describe('AvatarMarble', () => {
  it('renders an SVG element', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('sets width and height from size prop', async () => {
    const el = createEl({ name: 'test', size: 120 })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('120')
    expect(svg.getAttribute('height')).toBe('120')
    el.remove()
  })

  it('accepts size as string', async () => {
    const el = createEl({ name: 'test', size: '120' })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('120')
    el.remove()
  })

  it('accepts size as percentage string', async () => {
    const el = createEl({ name: 'test', size: '100%' })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('100%')
    expect(svg.getAttribute('height')).toBe('100%')
    el.remove()
  })

  it('renders a mask with the correct id', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const mask = el.shadowRoot!.querySelector('mask')
    expect(mask).toBeTruthy()
    expect(mask!.getAttribute('id')).toMatch(/^tronche-mask-marble-/)
    el.remove()
  })

  it('renders title when title prop is true', async () => {
    const el = createEl({ name: 'Alice', title: true })
    await el.updateComplete
    const title = el.shadowRoot!.querySelector('title')
    expect(title).toBeTruthy()
    expect(title!.textContent).toBe('Alice')
    el.remove()
  })

  it('does not render title when title prop is false', async () => {
    const el = createEl({ name: 'Alice', title: false })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')).toBeNull()
    el.remove()
  })

  it('renders correct number of rects and paths', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelectorAll('rect').length).toBeGreaterThanOrEqual(1)
    expect(el.shadowRoot!.querySelectorAll('path').length).toBe(2)
    el.remove()
  })

  it('applies square mask when square prop is true', async () => {
    const el = createEl({ name: 'test', square: true })
    await el.updateComplete
    const rect = el.shadowRoot!.querySelector('mask rect')!
    expect(rect.getAttribute('rx')).toBeFalsy()
    el.remove()
  })

  it('applies round mask by default', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const rect = el.shadowRoot!.querySelector('mask rect')!
    expect(rect.getAttribute('rx')).toBeTruthy()
    el.remove()
  })

  it('accepts custom colors', async () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    const el = createEl({ name: 'test', colors: customColors })
    await el.updateComplete
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    const fills = Array.from(el.shadowRoot!.querySelectorAll('g [fill]')).map(e => e.getAttribute('fill'))
    const allFromCustom = fills.every(f => f && customColors.includes(f))
    const anyFromDefault = fills.some(f => f && defaultColors.includes(f))
    expect(allFromCustom).toBe(true)
    expect(anyFromDefault).toBe(false)
    el.remove()
  })

  it('triggers click event on element', async () => {
    const handleClick = vi.fn()
    const el = createEl({ name: 'test' })
    await el.updateComplete
    el.addEventListener('click', handleClick)
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(handleClick).toHaveBeenCalledTimes(1)
    el.remove()
  })

  it('is deterministic: same name produces same mask ID', async () => {
    const el1 = createEl({ name: 'Alice' })
    const el2 = createEl({ name: 'Alice' })
    await Promise.all([el1.updateComplete, el2.updateComplete])
    expect(el1.shadowRoot!.querySelector('mask')!.getAttribute('id'))
      .toBe(el2.shadowRoot!.querySelector('mask')!.getAttribute('id'))
    el1.remove()
    el2.remove()
  })

  it('different names produce different mask IDs', async () => {
    const el1 = createEl({ name: 'Alice' })
    const el2 = createEl({ name: 'Bob' })
    await Promise.all([el1.updateComplete, el2.updateComplete])
    expect(el1.shadowRoot!.querySelector('mask')!.getAttribute('id'))
      .not.toBe(el2.shadowRoot!.querySelector('mask')!.getAttribute('id'))
    el1.remove()
    el2.remove()
  })

  it('renders with empty name', async () => {
    const el = createEl({ name: '' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('renders with very long name', async () => {
    const el = createEl({ name: 'A'.repeat(1000) })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('renders with special characters (accents, emojis)', async () => {
    const el = createEl({ name: 'Jérôme 🎉 日本語' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('renders with name containing only whitespace', async () => {
    const el = createEl({ name: '   ' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })
})
