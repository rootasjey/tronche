# Tronche

Des avatars qui ont de la gueule.

Tronche génère des avatars SVG uniques à partir d'un nom et d'une palette de couleurs. Proposé sous forme de librairie Vue.js/Nuxt.js, d'API REST gratuite, et de service d'API key pour plus de volume.

## Utilisation rapide

**Module Nuxt :**

```ts
// nuxt.config.ts
modules: ['tronche/module'],
```

```vue
<Avatar name="Maria Mitchell" variant="beam" />
```

**API REST :**

```
GET /api/avatar/Clara%20Barton?variant=beam&size=200
```

## Variants

| Variant | Style |
|---------|-------|
| marble | Formes organiques floues |
| beam | Visages avec expressions |
| pixel | Pixel art 8×8 |
| sunset | Dégradés de couleurs |
| ring | Cercles concentriques |
| bauhaus | Formes géométriques |

## Stack

- **Nuxt 4** — Site vitrine + API (Nitro)
- **@nuxthub/core** — Déploiement Cloudflare (D1, KV, R2)
- **nuxt-auth-utils** — Sessions et authentification
- **Drizzle ORM** — Base de données SQLite/D1
- **@noble/hashes** — Password hashing (scrypt)

## Licence

MIT
