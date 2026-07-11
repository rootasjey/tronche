import {
  defineNuxtModule,
  addComponent,
  createResolver,
} from '@nuxt/kit'

export interface ModuleOptions {
  prefix?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'tronche',
    configKey: 'tronche',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
  },
  setup(options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    const entry = resolver.resolve('./vue/index.js')

    const components: [string, string][] = [
      ['Avatar', 'Avatar'],
      ['AvatarMarble', 'AvatarMarble'],
      ['AvatarBeam', 'AvatarBeam'],
      ['AvatarPixel', 'AvatarPixel'],
      ['AvatarSunset', 'AvatarSunset'],
      ['AvatarRing', 'AvatarRing'],
      ['AvatarBauhaus', 'AvatarBauhaus'],
    ]

    for (const [name, exportName] of components) {
      addComponent({
        name: options.prefix ? `${options.prefix}${name}` : name,
        export: exportName,
        filePath: entry,
      })
    }
  },
})
