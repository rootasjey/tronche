import { describe, it, expect } from 'vitest'
import '../components/avatar-beam.js'

function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-beam') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  return el
}

describe('AvatarBeam', () => {
  it('renders an SVG element', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })

  it('sets width and height from size prop', async () => {
    const el = createEl({ name: 'test', size: 72 })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('72')
    expect(svg.getAttribute('height')).toBe('72')
    el.remove()
  })

  it('accepts size as percentage string', async () => {
    const el = createEl({ name: 'test', size: '100%' })
    await el.updateComplete
    const svg = el.shadowRoot!.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('100%')
    el.remove()
  })

  it('renders a mask with beam prefix', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const mask = el.shadowRoot!.querySelector('mask')
    expect(mask!.getAttribute('id')).toMatch(/^tronche-mask-beam-/)
    el.remove()
  })

  it('renders title when title prop is true', async () => {
    const el = createEl({ name: 'Alice', title: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')!.textContent).toBe('Alice')
    el.remove()
  })

  it('does not render title when title prop is false', async () => {
    const el = createEl({ name: 'Alice', title: false })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')).toBeNull()
    el.remove()
  })

  it('renders rects and paths for face elements', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelectorAll('rect').length).toBeGreaterThanOrEqual(2)
    el.remove()
  })

  it('applies round mask when square prop is false', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask rect')!.getAttribute('rx')).toBeTruthy()
    el.remove()
  })

  it('applies square mask when square prop is true', async () => {
    const el = createEl({ name: 'test', square: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask rect')!.getAttribute('rx')).toBeFalsy()
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

  it('renders with special characters', async () => {
    const el = createEl({ name: 'Jérôme 🎉' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })
})
