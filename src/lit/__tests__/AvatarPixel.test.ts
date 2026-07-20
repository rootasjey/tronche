import { describe, it, expect } from 'vitest'
import '../components/avatar-pixel.js'

const GRID = 8

function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-pixel') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  return el
}

describe('AvatarPixel', () => {
  it('renders an SVG element', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('sets width and height from size prop', async () => {
    const el = createEl({ name: 'test', size: 160 })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('160')
    expect(svg.getAttribute('height')).toBe('160')
    el.remove()
  })

  it('accepts size as percentage string', async () => {
    const el = createEl({ name: 'test', size: '75%' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('width')).toBe('75%')
    el.remove()
  })

  it('renders a mask with pixel prefix', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-pixel-/)
    el.remove()
  })

  it('renders GRID*GRID pixel rects', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const rects = el.shadowRoot!.querySelectorAll('g rect')
    expect(rects.length).toBe(GRID * GRID)
    el.remove()
  })

  it('renders title when title prop is true', async () => {
    const el = createEl({ name: 'Pixel', title: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')!.textContent).toBe('Pixel')
    el.remove()
  })

  it('does not render title when title prop is false', async () => {
    const el = createEl({ name: 'Pixel', title: false })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')).toBeNull()
    el.remove()
  })

  it('applies square mask when square prop is true', async () => {
    const el = createEl({ name: 'test', square: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask rect')!.getAttribute('rx')).toBeFalsy()
    el.remove()
  })

  it('applies round mask by default', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask rect')!.getAttribute('rx')).toBeTruthy()
    el.remove()
  })

  it('is deterministic', async () => {
    const el1 = createEl({ name: 'Alice' })
    const el2 = createEl({ name: 'Alice' })
    await Promise.all([el1.updateComplete, el2.updateComplete])
    expect(el1.shadowRoot!.querySelector('mask')!.getAttribute('id'))
      .toBe(el2.shadowRoot!.querySelector('mask')!.getAttribute('id'))
    el1.remove()
    el2.remove()
  })

  it('different names produce different masks', async () => {
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

  it('renders with special characters', async () => {
    const el = createEl({ name: 'ピクセル 🎨' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })
})
