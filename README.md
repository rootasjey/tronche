# Tronche

Tronche generates custom, SVG-based avatars from any username and color palette. Vue.js/Nuxt.js library with a free API tier.

## Install

```bash
npm install tronche
```

## Usage

### Vue.js / Nuxt.js

```vue
<template>
  <Avatar name="Maria Mitchell" />
</template>

<script setup>
import Avatar from 'tronche/src/lib/components/Avatar.vue'
</script>
```

### Props

| Prop    | Type                                                         | Default                                                   |
|---------|--------------------------------------------------------------|-----------------------------------------------------------|
| size    | number or string                                             | `80`                                                      |
| square  | boolean                                                      | `false`                                                   |
| title   | boolean                                                      | `false`                                                   |
| name    | string                                                       | `Clara Barton`                                            |
| variant | `marble`, `beam`, `pixel`, `sunset`, `ring`, `bauhaus`       | `marble`                                                  |
| colors  | string[]                                                     | `['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']` |

## Variants

- **marble** — organic blobs with blur
- **beam** — faces with expressions
- **pixel** — 8x8 pixel art
- **sunset** — gradient landscapes
- **ring** — concentric rings
- **bauhaus** — geometric shapes

## Features

- 6 unique avatar styles
- Deterministic: same name always generates the same avatar
- Customizable colors
- Vue 3 & Nuxt 3
- TypeScript support
- Free API tier (coming soon)

## License

MIT
