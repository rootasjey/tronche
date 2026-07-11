// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'

const addComponent = vi.fn()
const createResolver = vi.fn((path: string) => ({
  resolve: vi.fn(() => '/resolved/path/to/vue/index'),
}))

vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: vi.fn((def: any) => def),
  addComponent,
  createResolver,
}))

describe('tronche Nuxt module', () => {
  it('registers all 7 avatar components', async () => {
    const module = (await import('../src/module.ts')).default

    module.setup({ prefix: '' }, {} as any)

    const registered = addComponent.mock.calls.map(([args]) => args.name)
    expect(registered).toEqual([
      'Avatar',
      'AvatarMarble',
      'AvatarBeam',
      'AvatarPixel',
      'AvatarSunset',
      'AvatarRing',
      'AvatarBauhaus',
    ])
  })

  it('uses named exports from the Vue bundle', async () => {
    const module = (await import('../src/module.ts')).default

    addComponent.mockClear()
    module.setup({ prefix: '' }, {} as any)

    const exports = addComponent.mock.calls.map(([args]) => args.export)
    expect(exports).toEqual([
      'Avatar',
      'AvatarMarble',
      'AvatarBeam',
      'AvatarPixel',
      'AvatarSunset',
      'AvatarRing',
      'AvatarBauhaus',
    ])
  })

  it('resolves filePath to vue/index', async () => {
    const module = (await import('../src/module.ts')).default

    addComponent.mockClear()
    module.setup({ prefix: '' }, {} as any)

    const paths = addComponent.mock.calls.map(([args]) => args.filePath)
    paths.forEach(p => expect(p).toMatch(/vue\/index/))
  })

  it('applies prefix when configured', async () => {
    const module = (await import('../src/module.ts')).default

    addComponent.mockClear()
    module.setup({ prefix: 'T' }, {} as any)

    const prefix = addComponent.mock.calls.map(([args]) => args.name)
    expect(prefix).toEqual([
      'TAvatar',
      'TAvatarMarble',
      'TAvatarBeam',
      'TAvatarPixel',
      'TAvatarSunset',
      'TAvatarRing',
      'TAvatarBauhaus',
    ])
  })
})
