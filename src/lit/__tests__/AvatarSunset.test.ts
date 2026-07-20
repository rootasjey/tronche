import { describe, it, expect } from 'vitest'
import '../components/avatar-sunset.js'

function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-sunset') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  return el
}

describe('AvatarSunset', () => {
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

  it('accepts size as percentage string', async () => {
    const el = createEl({ name: 'test', size: '100%' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')!.getAttribute('width')).toBe('100%')
    el.remove()
  })

  it('renders a mask with sunset prefix', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('mask')!.getAttribute('id')).toMatch(/^tronche-mask-sunset-/)
    el.remove()
  })

  it('renders defs with linearGradient elements', async () => {
    const el = createEl({ name: 'test' })
    await el.updateComplete
    const root = el.shadowRoot!
    expect(root.querySelectorAll('linearGradient').length).toBe(2)
    expect(root.querySelectorAll('stop').length).toBe(4)
    el.remove()
  })

  it('renders title when title prop is true', async () => {
    const el = createEl({ name: 'Sunset', title: true })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('title')!.textContent).toBe('Sunset')
    el.remove()
  })

  it('does not render title when title prop is false', async () => {
    const el = createEl({ name: 'Sunset', title: false })
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

  it('uses nameWithoutSpace in gradient IDs', async () => {
    const el = createEl({ name: 'Jane Doe' })
    await el.updateComplete
    const gradients = el.shadowRoot!.querySelectorAll('linearGradient')
    const id0 = gradients[0].getAttribute('id')
    const id1 = gradients[1].getAttribute('id')
    expect(id0).toMatch(/^gradient0_/)
    expect(id1).toMatch(/^gradient1_/)
    expect(id0).not.toContain(' ')
    expect(id1).not.toContain(' ')
    el.remove()
  })

  it('accepts custom colors', async () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
    const el = createEl({ name: 'test', colors: customColors })
    await el.updateComplete
    const defaultColors = ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F']
    const stops = el.shadowRoot!.querySelectorAll('stop')
    const stopColors = Array.from(stops).map(s => s.getAttribute('stop-color'))
    const allFromCustom = stopColors.every(c => c && customColors.includes(c))
    const anyFromDefault = stopColors.some(c => c && defaultColors.includes(c))
    expect(allFromCustom).toBe(true)
    expect(anyFromDefault).toBe(false)
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
    const el = createEl({ name: 'Sûnset 🌅' })
    await el.updateComplete
    expect(el.shadowRoot!.querySelector('svg')).toBeTruthy()
    el.remove()
  })
})
