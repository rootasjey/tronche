import { describe, it, expect } from 'vitest'
import '../components/avatar.js'

async function createEl(props: Record<string, any> = {}) {
  const el = document.createElement('tronche-avatar') as any
  for (const [key, value] of Object.entries(props)) {
    el[key] = value
  }
  document.body.appendChild(el)
  await el.updateComplete
  return el
}

describe('Avatar', () => {
  it('renders marble variant by default', async () => {
    const el = await createEl({ name: 'test' })
    expect(el.shadowRoot!.querySelector('tronche-marble')).toBeTruthy()
    el.remove()
  })

  it('renders beam variant', async () => {
    const el = await createEl({ name: 'test', variant: 'beam' })
    expect(el.shadowRoot!.querySelector('tronche-beam')).toBeTruthy()
    el.remove()
  })

  it('renders pixel variant', async () => {
    const el = await createEl({ name: 'test', variant: 'pixel' })
    expect(el.shadowRoot!.querySelector('tronche-pixel')).toBeTruthy()
    el.remove()
  })

  it('renders sunset variant', async () => {
    const el = await createEl({ name: 'test', variant: 'sunset' })
    expect(el.shadowRoot!.querySelector('tronche-sunset')).toBeTruthy()
    el.remove()
  })

  it('renders ring variant', async () => {
    const el = await createEl({ name: 'test', variant: 'ring' })
    expect(el.shadowRoot!.querySelector('tronche-ring')).toBeTruthy()
    el.remove()
  })

  it('renders bauhaus variant', async () => {
    const el = await createEl({ name: 'test', variant: 'bauhaus' })
    expect(el.shadowRoot!.querySelector('tronche-bauhaus')).toBeTruthy()
    el.remove()
  })

  it('renders geometric alias as beam', async () => {
    const el = await createEl({ name: 'test', variant: 'geometric' })
    expect(el.shadowRoot!.querySelector('tronche-beam')).toBeTruthy()
    el.remove()
  })

  it('renders abstract alias as bauhaus', async () => {
    const el = await createEl({ name: 'test', variant: 'abstract' })
    expect(el.shadowRoot!.querySelector('tronche-bauhaus')).toBeTruthy()
    el.remove()
  })

  it('falls back to marble for unknown variant', async () => {
    const el = await createEl({ name: 'test', variant: 'unknown' as any })
    expect(el.shadowRoot!.querySelector('tronche-marble')).toBeTruthy()
    el.remove()
  })

  it('renders with defaults when no props given', async () => {
    const el = await createEl()
    expect(el.shadowRoot!.querySelector('tronche-marble')).toBeTruthy()
    el.remove()
  })
})
