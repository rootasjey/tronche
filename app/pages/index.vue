<template>
  <div>
    <section class="text-center px-5 pt-20 pb-15 max-w-240 mx-auto">
      <div class="animate-in" style="animation-delay: 0ms">
        <h1 class="text-5xl font-extrabold leading-tight tracking-tight mb-4">
          {{ $t('home.hero.title') }}<br />
          <span class="text-primary">{{ $t('home.hero.highlight') }}</span>
        </h1>
      </div>
      <div class="animate-in" style="animation-delay: 100ms">
        <p class="text-muted text-lg mb-10">{{ $t('home.hero.subtitle') }}</p>
      </div>

      <div class="flex justify-center items-center gap-5 flex-wrap mb-10 animate-in" style="animation-delay: 200ms">
        <button class="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-surface border border-border text-muted cursor-pointer transition-all hover:text-[var(--c-text)] hover:border-[var(--c-text)] hover:scale-105 active:scale-95" :title="$t('home.hero.reshuffle')" @click="reshuffle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
        </button>
        <div v-for="(s, i) in samples" :key="`${s.name}-${s.variant}`" class="flex flex-col items-center gap-2 avatar-sample" :style="{ animationDelay: `${300 + i * 80}ms` }">
          <img :src="avatarUrl(s.name, s.variant, 80, false, s.colors)" :alt="s.name" width="80" height="80" class="rounded-full bg-surface hover:scale-105 transition-transform duration-300" />
          <span class="text-xs text-muted">{{ s.name }}</span>
        </div>
      </div>

      <div class="animate-in" style="animation-delay: 600ms">
        <a href="#playground" class="inline-flex items-center px-7 py-3 rounded-full bg-primary text-white font-semibold text-sm no-underline hover:bg-primary-600 transition-all hover:scale-105 cursor-pointer" @click.prevent="scrollToPlayground">{{ $t('home.hero.try') }}</a>
      </div>
    </section>

    <section class="px-5 py-15 max-w-240 mx-auto">
      <div id="playground" class="rounded-2xl p-8 md:p-10" style="background: var(--c-surface); border: 1px solid var(--c-border);">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-2">{{ $t('home.playground.title') }}</h2>
        <p class="text-muted">{{ $t('home.playground.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div class="text-center lg:sticky lg:top-24">
          <div class="w-56 h-56 mx-auto mb-4 relative group">
            <Transition name="fade" mode="out-in">
              <img :key="previewUrl" :src="previewUrl" alt="avatar" width="224" height="224" :class="['w-full h-full bg-surface', square ? 'rounded-2xl' : 'rounded-full']" />
            </Transition>
            <div class="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" :class="square ? 'rounded-2xl' : 'rounded-full'" />
          </div>
          <p class="text-muted text-sm mb-4 min-h-5">{{ displayName }}</p>
          <button class="w-full max-w-56 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-all hover:scale-105 active:scale-95" @click="download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {{ $t('home.playground.download') }}
          </button>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">{{ $t('home.playground.name') }}</label>
            <div class="relative">
              <input v-model="name" type="text" :placeholder="$t('home.playground.namePlaceholder')" class="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-surface border border-border text-[var(--c-text)] text-sm outline-none transition-all focus:border-primary" />
              <button class="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-[var(--c-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer active:scale-90" :title="$t('home.playground.random')" @click="randomizeName">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">{{ $t('home.playground.variant') }}</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="v in variants"
                :key="v"
                class="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface border-2 border-transparent cursor-pointer transition-all"
                :class="variant === v ? '!border-primary' : 'hover:border-border'"
                @click="variant = v"
              >
                <img :src="avatarUrl(name, v, 40, square, activeColors.join(','))" :alt="v" width="40" height="40" :class="square ? '' : 'rounded-full'" />
                <span class="text-xs text-muted">{{ v }}</span>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">{{ $t('home.playground.colors') }}</label>
            <div class="flex flex-wrap gap-2 items-center">
              <button
                v-for="(palette, i) in palettes"
                :key="i"
                class="flex gap-0.5 p-1.5 rounded-lg border-2 cursor-pointer transition-all bg-surface"
                :class="activePalette === i && i < palettes.length - 1 ? '!border-primary' : 'border-transparent hover:border-border'"
                @click="activePalette = i"
              >
                <span v-for="c in palette" :key="c" class="w-4 h-4 rounded-sm" :style="{ background: c }" />
              </button>
              <button
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 cursor-pointer transition-all text-xs font-semibold bg-surface"
                :class="lastIsActive ? '!border-primary' : 'border-transparent hover:border-border'"
                @click="randomPalette"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
                {{ $t('home.playground.random') }}
              </button>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <label class="text-xs font-semibold text-muted uppercase tracking-wide">{{ $t('home.playground.shape') }}</label>
            <button
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border-2 cursor-pointer transition-all text-sm"
              :class="square ? '!border-primary' : 'border-transparent hover:border-border'"
              @click="square = !square"
            >
              <svg v-if="!square" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              {{ square ? $t('home.playground.square') : $t('home.playground.round') }}
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>

    <section class="px-5 py-15 max-w-240 mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-2">{{ $t('home.api.title') }}</h2>
        <p class="text-muted">{{ $t('home.api.subtitle') }}</p>
      </div>

      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">&lt;img src="https://tronche.app/api/avatar/Maria%20Mitchell?variant=beam&amp;size=80" /&gt;</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg text-white text-xs border-none cursor-pointer transition-all active:scale-95" :class="copied ? 'bg-[#22c55e]' : 'bg-primary hover:bg-primary-600'" @click="copyCode">{{ copyLabel }}</button>
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
const variant = ref('beam')
const square = ref(false)
const activePalette = ref(0)
const copied = ref(false)

const palettes = ref<string[][]>([
  ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'],
  ['#00B894', '#00CEC9', '#0984E3', '#6C5CE7', '#A29BFE'],
  ['#FF9FF3', '#F368E0', '#FF6B6B', '#48DBFB', '#FF9F43'],
  ['#2D3436', '#636E72', '#B2BEC3', '#DFE6E9', '#FDCB6E'],
  [],
])

const lastIsActive = computed(() => activePalette.value === palettes.value.length - 1)

const activeColors = computed(() => palettes.value[activePalette.value])

const displayName = computed(() => name.value || 'Enter a name to generate an avatar')

function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function randomPalette() {
  const h = Math.floor(Math.random() * 360)
  const s = 55 + Math.floor(Math.random() * 25)
  const l = 40 + Math.floor(Math.random() * 25)
  palettes.value[palettes.value.length - 1] = [
    hslToHex(h, s, l),
    hslToHex((h + 50) % 360, s - 5, l + 10),
    hslToHex((h + 140) % 360, s - 10, l + 5),
    hslToHex((h + 210) % 360, s + 5, l - 5),
    hslToHex((h + 290) % 360, s, l + 8),
  ]
  activePalette.value = palettes.value.length - 1
}

const allNames = [
  'Ada', 'Alice', 'Amélie', 'Anna', 'Arthur', 'Camille', 'Clara',
  'Chloé', 'Emma', 'Ethan', 'Gabriel', 'Hugo', 'Inès', 'Jade',
  'Jules', 'Léo', 'Léon', 'Liam', 'Louise', 'Lucas', 'Léa',
  'Manon', 'Marguerite', 'Marie', 'Mathis', 'Mila', 'Nathan',
  'Noah', 'Noémie', 'Pierre', 'Raphaël', 'Rose', 'Sacha', 'Sarah',
  'Simon', 'Tom', 'Zoé',
]

const variants = ['beam', 'pixel', 'sunset', 'ring', 'bauhaus', 'marble']

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const idx = arr.map((_, i) => ({ i, r: seededRandom(seed + i) }))
  idx.sort((a, b) => a.r - b.r)
  return idx.slice(0, n).map(({ i }) => arr[i])
}

const seed = useState('homepage-seed', () => Date.now())

const samples = computed(() =>
  pick(allNames, 6, seed.value).map((name, i) => ({
    name,
    variant: variants[i % variants.length],
    colors: palettes.value[i % palettes.value.length].join(','),
  })),
)

function reshuffle() {
  seed.value = Date.now()
}

function randomizeName() {
  name.value = allNames[Math.floor(Math.random() * allNames.length)]
}

function scrollToPlayground() {
  document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })
}

function avatarUrl(n: string, v: string, s: number, sq: boolean, colors?: string): string {
  const base = `/api/avatar/${encodeURIComponent(n || '?')}`
  const p = new URLSearchParams({ variant: v, size: String(s) })
  if (sq) p.set('square', 'true')
  if (colors) p.set('colors', colors)
  return `${base}?${p}`
}

const previewUrl = computed(() =>
  avatarUrl(name.value, variant.value, 200, square.value, activeColors.value.join(',')),
)

const { $t } = useI18n()

const params = computed(() => [
  ['variant', 'marble, beam, pixel, sunset, ring, bauhaus'],
  ['size', '16 – 512'],
  ['square', 'true | false'],
  ['colors', $t('home.api.paramColors')],
])

const copyLabel = computed(() => copied.value ? 'Copied!' : $t('home.api.copy'))

function download() {
  const link = document.createElement('a')
  link.download = `tronche-${name.value || 'avatar'}.svg`
  link.href = previewUrl.value
  link.click()
}

async function copyCode() {
  await navigator.clipboard.writeText(`<img src="https://tronche.app/api/avatar/${encodeURIComponent(name.value || 'avatar')}?variant=${variant.value}&size=80" />`)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.animate-in {
  animation: animate-in 0.6s ease forwards;
  opacity: 0;
}

.avatar-sample {
  animation: animate-in 0.5s ease forwards;
  opacity: 0;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
