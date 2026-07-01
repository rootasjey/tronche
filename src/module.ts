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

    const components: [string, string][] = [
      ['Avatar', './runtime/components/Avatar.vue'],
      ['AvatarMarble', './runtime/components/avatar-marble.vue'],
      ['AvatarBeam', './runtime/components/avatar-beam.vue'],
      ['AvatarPixel', './runtime/components/avatar-pixel.vue'],
      ['AvatarSunset', './runtime/components/avatar-sunset.vue'],
      ['AvatarRing', './runtime/components/avatar-ring.vue'],
      ['AvatarBauhaus', './runtime/components/avatar-bauhaus.vue'],
    ]

    for (const [name, path] of components) {
      addComponent({
        name: options.prefix ? `${options.prefix}${name}` : name,
        export: 'default',
        filePath: resolver.resolve(path),
      })
    }
  },
})
