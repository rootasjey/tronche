![Tronche](./public/images/tronche.jpeg)

# tronche

Avatars nothing like you.

Tronche generates unique SVG avatars from a name and a color palette. Available as a [vanilla JS package](#vanilla-usage) (no framework), a [Vue component](#vue-usage), a [Nuxt module](#nuxt-module), and a [REST API](#rest-api).

## Installation

```sh
npm install tronche
```

## Vanilla Usage

Use the core generators directly in any JavaScript environment — no framework required.

```ts
import { generateBeamSvg } from 'tronche'

const svg = generateBeamSvg('Clara Barton', ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'], {
  size: 120,
  square: false,
})
// svg is a string: '<svg viewBox="0 0 36 36"...'
document.body.innerHTML = svg
```

Each variant exports three functions:

| Function | Returns | Use case |
|----------|---------|----------|
| `generateMarbleData(name, colors)` | Data object | Feed into Vue template or custom renderer |
| `renderMarbleSvg(data, options)` | SVG string | Convert data to SVG with display options |
| `generateMarbleSvg(name, colors, options)` | SVG string | One-shot generation (calls both above) |

Replace `Marble` with `Beam`, `Pixel`, `Sunset`, `Ring`, or `Bauhaus` for other variants.

```ts
import {
  generateMarbleSvg, generateBeamSvg, generatePixelSvg,
  generateSunsetSvg, generateRingSvg, generateBauhausSvg,
} from 'tronche'
```

## Nuxt Module

Add the module to your `nuxt.config.ts` — components are auto-imported.

```ts
export default defineNuxtConfig({
  modules: ['tronche/module'],
})
```

```vue
<template>
  <Avatar name="Maria Mitchell" variant="beam" />
</template>
```

### Module options

```ts
tronche: {
  prefix: 'T',  // components become TAvatar, TAvatarBeam, etc.
}
```

## Vue Usage

```vue
<script setup>
import Avatar from 'tronche/vue/components/Avatar.vue'
// or individual variants:
// import AvatarMarble from 'tronche/vue/components/avatar-marble.vue'
</script>
<template>
  <Avatar
    name="Grace Hopper"
    :colors="['#fb6900', '#f63700', '#004853']"
    variant="marble"
    :size="120"
    square
  />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `Clara Barton` | Seed for deterministic generation |
| `variant` | `string` | `marble` | Avatar style: `marble`, `beam`, `pixel`, `sunset`, `ring`, `bauhaus` |
| `size` | `number` | `80` | Width/height in pixels |
| `square` | `boolean` | `false` | Square crop (otherwise rounded) |
| `colors` | `string[]` | built-in palette | Custom hex colors |
| `title` | `boolean` | `false` | Show title element |

## REST API

```
GET /api/avatar/:name
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `string` | `marble` | `marble`, `beam`, `pixel`, `sunset`, `ring`, `bauhaus` |
| `size` | `number` | `80` | Size in pixels (clamped 16–512) |
| `square` | `boolean` | `false` | Square crop |
| `colors` | `string` | default palette | Comma-separated hex colors (e.g. `FF6B6B,4ECDC4`) |

```sh
curl "https://tronche.app/api/avatar/Clara%20Barton?variant=beam"
curl "https://tronche.app/api/avatar/test?size=200&square=true&colors=FF6B6B,4ECDC4,45B7D1"
```

**Rate limit:** 100 requests/min per IP. [Create an account](https://tronche.app/register) for API key access with higher limits.

## Variants

| Variant | Style |
|---------|-------|
| marble | Soft blurred shapes |
| beam | Expressive faces |
| pixel | 8×8 pixel art |
| sunset | Color gradients |
| ring | Concentric circles |
| bauhaus | Geometric shapes |

## Stack

- **Core lib** — Framework-agnostic SVG generators (`src/lib/`)
- **Vue components** — Thin wrappers over the core lib (`src/vue/`)
- **Nuxt module** — Auto-import via `tronche/module` (`src/module.ts`)
- **Nuxt 4** — Frontend + API (Nitro)
- **@nuxthub/core** — Cloudflare deployment (D1, KV, R2)
- **nuxt-auth-utils** — Sessions and authentication
- **Drizzle ORM** — SQLite/D1 database
- **@noble/hashes** — Password hashing (scrypt)

## License

MIT
