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
      ['Avatar', './vue/components/Avatar.vue'],
      ['AvatarMarble', './vue/components/avatar-marble.vue'],
      ['AvatarBeam', './vue/components/avatar-beam.vue'],
      ['AvatarPixel', './vue/components/avatar-pixel.vue'],
      ['AvatarSunset', './vue/components/avatar-sunset.vue'],
      ['AvatarRing', './vue/components/avatar-ring.vue'],
      ['AvatarBauhaus', './vue/components/avatar-bauhaus.vue'],
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
