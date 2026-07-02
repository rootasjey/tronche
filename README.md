# Tronche

Avatars nothing like you.

Tronche generates unique SVG avatars from a name and a color palette. Available as a [Nuxt module](#nuxt-module), a [standalone Vue component](#vue-usage), and a [free REST API](#rest-api).

## Installation

```sh
npm install tronche
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
import Avatar from 'tronche/src/runtime/components/Avatar.vue'
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

- **Nuxt 4** — Frontend + API (Nitro)
- **@nuxthub/core** — Cloudflare deployment (D1, KV, R2)
- **nuxt-auth-utils** — Sessions and authentication
- **Drizzle ORM** — SQLite/D1 database
- **@noble/hashes** — Password hashing (scrypt)

## License

MIT
