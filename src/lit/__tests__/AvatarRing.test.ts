import { describe, it, expect } from 'vitest'
import '../components/avatar-ring.js'

function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-ring') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  return el
}

describe('AvatarRing', () => {
  it('renders an SVG element', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('sets width and height from size prop', async () => {
    const el = createEl({ name: 'test', size: 180 })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('180')
    expect(svg.getAttribute('height')).toBe('180')
    el.remove()
  })

  it('accepts size as percentage string', async () => {
    const el = createEl({ name: 'test', size: '100%' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('width')).toBe('100%')
    el.remove()
  })

  it('renders a mask with ring prefix', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-ring-/)
    el.remove()
  })

  it('renders path elements for ring bands and a circle', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const root = el.shadowRoot!
    expect(root.querySelectorAll('path').length).toBeGreaterThanOrEqual(8)
    expect(root.querySelector('circle')).toBeTruthy()
    el.remove()
  })

  it('renders title when title prop is true', async () => {
    const el = createEl({ name: 'Ring', title: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')!.textContent).toBe('Ring')
    el.remove()
  })

  it('does not render title when title prop is false', async () => {
    const el = createEl({ name: 'Ring', title: false })
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

  it('accepts custom colors', async () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
    const el = createEl({ name: 'test', colors: customColors })
    await el.updateComplete
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    const fills = Array.from(el.shadowRoot!.querySelectorAll('g [fill]'))
      .map(e => e.getAttribute('fill'))
      .filter(Boolean) as string[]
    const anyFromDefault = fills.some(f => defaultColors.includes(f))
    const allFromCustom = fills.every(f => customColors.includes(f))
    expect(anyFromDefault).toBe(false)
    expect(allFromCustom).toBe(true)
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

  it('renders with special characters', async () => {
    const el = createEl({ name: 'Rîng 🌀' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })
})
