<template>
  <div>
    <section class="text-center px-5 pt-20 pb-15 max-w-240 mx-auto">
      <h1 class="text-5xl font-extrabold leading-tight tracking-tight mb-4">
        Des avatars<br />
        <span class="bg-gradient-to-r from-primary to-[#FF8A5C] bg-clip-text text-transparent">qui ont de la gueule</span>
      </h1>
      <p class="text-muted text-lg mb-10">Générez des avatars SVG uniques à partir d'un nom. Open source, API gratuite.</p>

      <div class="flex justify-center gap-5 flex-wrap mb-10 relative">
        <div v-for="s in samples" :key="`${s.name}-${s.variant}`" class="flex flex-col items-center gap-2">
          <img :src="`/api/avatar/${s.name}?variant=${s.variant}&size=80`" :alt="s.name" width="80" height="80" class="rounded-full bg-surface" />
          <span class="text-xs text-muted">{{ s.name }}</span>
        </div>
        <button class="absolute -right-2 top-0 w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-border text-muted cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)]" title="Nouveaux avatars" @click="reshuffle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
        </button>
      </div>

      <div class="flex justify-center gap-3">
        <a href="#playground" class="inline-flex items-center px-7 py-3 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-sm no-underline hover:bg-primary-600 transition-colors">Essayer</a>
        <a href="https://github.com/rootasjey/tronche" target="_blank" class="inline-flex items-center px-7 py-3 rounded-full border border-border text-muted font-semibold text-sm no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)] transition-colors">GitHub</a>
      </div>
    </section>

    <section id="playground" class="px-5 py-15 max-w-240 mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-2">Playground</h2>
        <p class="text-muted">Customisez votre avatar en direct</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div class="text-center sticky top-20">
          <div class="w-50 h-50 mx-auto mb-4">
            <img :src="previewUrl" alt="avatar" width="200" height="200" class="w-full h-full rounded-full bg-surface" />
          </div>
          <p class="text-muted text-sm mb-4">{{ name || '—' }}</p>
          <button class="inline-flex items-center px-5 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="download">Télécharger SVG</button>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">Nom</label>
            <input v-model="name" type="text" placeholder="Entrez un nom..." class="px-3.5 py-2.5 rounded-xl bg-surface border border-border text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">Variant</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="v in variants"
                :key="v"
                class="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface border-2 border-transparent cursor-pointer transition-colors"
                :class="variant === v ? '!border-primary' : 'hover:border-border'"
                @click="variant = v"
              >
                <img :src="`/api/avatar/${name}?variant=${v}&size=40`" :alt="v" width="40" height="40" class="rounded-full" />
                <span class="text-xs text-muted">{{ v }}</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">Taille : {{ size }}px</label>
            <input v-model.number="size" type="range" min="40" max="400" class="w-full accent-primary" />
          </div>

          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input v-model="square" type="checkbox" class="accent-primary" />
            Carré
          </label>
        </div>
      </div>
    </section>

    <section class="px-5 py-15 max-w-240 mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-2">API gratuite</h2>
        <p class="text-muted">Intégration simple, résultat immédiat</p>
      </div>

      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">&lt;img src="https://tronche.app/api/avatar/Maria%20Mitchell?variant=beam&amp;size=80" /&gt;</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copyCode">Copier</button>
      </div>

      <div class="flex flex-col gap-2">
        <div v-for="p in params" :key="p[0]" class="flex gap-3 text-sm p-3 rounded-lg bg-surface">
          <code class="text-primary font-mono min-w-20">{{ p[0] }}</code>
          <span class="text-muted">{{ p[1] }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const name = ref('Clara Barton')
const variant = ref('marble')
const size = ref(200)
const square = ref(false)

const allNames = [
  'Ada', 'Alice', 'Amélie', 'Anna', 'Arthur', 'Camille', 'Clara',
  'Chloé', 'Emma', 'Ethan', 'Gabriel', 'Hugo', 'Inès', 'Jade',
  'Jules', 'Léo', 'Léon', 'Liam', 'Louise', 'Lucas', 'Léa',
  'Manon', 'Marguerite', 'Marie', 'Mathis', 'Mila', 'Nathan',
  'Noah', 'Noémie', 'Pierre', 'Raphaël', 'Rose', 'Sacha', 'Sarah',
  'Simon', 'Tom', 'Zoé',
]

const variants = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const idx = arr.map((_, i) => ({ i, r: seededRandom(seed + i) }))
  idx.sort((a, b) => a.r - b.r)
  return idx.slice(0, n).map(({ i }) => arr[i])
}

const seed = ref(Date.now())

const samples = computed(() =>
  pick(allNames, 6, seed.value).map((name, i) => ({
    name,
    variant: variants[i % variants.length],
  })),
)

function reshuffle() {
  seed.value = Date.now()
}

const params = [
  ['variant', 'marble, beam, pixel, sunset, ring, bauhaus'],
  ['size', '16 – 512'],
  ['square', 'true | false'],
  ['colors', 'liste de couleurs hex séparées par des virgules'],
]

const previewUrl = computed(() => {
  const base = `/api/avatar/${encodeURIComponent(name.value || '?')}`
  const p = new URLSearchParams({ variant: variant.value })
  if (size.value !== 200) p.set('size', String(size.value))
  if (square.value) p.set('square', 'true')
  return `${base}?${p}`
})

function download() {
  const link = document.createElement('a')
  link.download = `tronche-${name.value || 'avatar'}.svg`
  link.href = previewUrl.value
  link.click()
}

function copyCode() {
  navigator.clipboard.writeText(`<img src="https://tronche.app/api/avatar/${encodeURIComponent(name.value || 'avatar')}?variant=${variant.value}&size=80" />`)
}
</script>
