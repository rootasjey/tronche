<template>
  <div class="px-5 pt-10 pb-20 max-w-240 mx-auto">
    <section class="text-center mb-12 animate-in" style="animation-delay: 0ms">
      <h1 class="font-heading text-4xl md:text-5xl font-700 tracking-tight mb-3">
        {{ $t('api.title') }}
      </h1>
      <p class="text-muted text-lg max-w-lg mx-auto leading-relaxed">{{ $t('api.subtitle') }}</p>
    </section>

    <div class="lg:flex lg:gap-12 lg:max-w-200 lg:mx-auto">
      <section class="lg:sticky lg:top-24 lg:self-start flex justify-center mb-10 lg:mb-0 lg:shrink-0 animate-in" style="animation-delay: 100ms">
        <div class="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg transition-all duration-300 shrink-0" :class="{ '!rounded-2xl': square }">
          <img :src="liveUrl" :alt="name" width="200" height="200" class="w-full h-full block" />
        </div>
      </section>

      <section class="flex-1 min-w-0 max-w-xl mx-auto lg:mx-0 space-y-8 animate-in" style="animation-delay: 200ms">
        <div>
          <input
            v-model="name"
            type="text"
            class="w-full px-5 py-3 rounded-xl bg-surface border border-border text-center lg:text-left text-lg outline-none transition-colors focus:border-primary"
            :placeholder="$t('api.form.name')"
          />
          <div class="flex items-center justify-center lg:justify-start gap-3 mt-3">
            <NSwitch v-model="square" size="sm" />
            <span class="text-sm font-semibold">{{ $t('api.form.square') }}</span>
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-3 block text-center lg:text-left">{{ $t('api.form.variant') }}</label>
          <div class="flex justify-center lg:justify-start gap-3 flex-wrap">
            <button
              v-for="v in variants"
              :key="v.name"
              class="flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all cursor-pointer"
              :class="variant === v.name
                ? 'bg-primary/10 border-primary shadow-sm'
                : 'bg-surface border-border hover:border-[var(--c-text)]'"
              @click="variant = v.name"
            >
              <img
                :src="`/api/avatar/Demo?variant=${v.name}&size=48`"
                alt=""
                width="48"
                height="48"
                class="rounded-full"
              />
              <span class="text-xs font-medium" :class="variant === v.name ? 'text-primary' : 'text-muted'">{{ v.name }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-3 block text-center lg:text-left">{{ $t('api.form.colors') }}</label>
          <div class="flex justify-center lg:justify-start gap-2 flex-wrap">
            <button
              v-for="(palette, i) in palettes"
              :key="i"
              class="flex gap-1 p-2 rounded-xl border transition-all cursor-pointer"
              :class="colors === palette ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-[var(--c-text)]'"
              @click="colors = palette; customColors = ''"
            >
              <span
                v-for="c in palette"
                :key="c"
                class="w-5 h-5 rounded-full block"
                :style="{ backgroundColor: c }"
              />
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs text-muted transition-all cursor-pointer hover:text-[var(--c-text)] hover:border-[var(--c-text)]"
              @click="randomColors"
              :title="$t('api.form.random')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5"><path d="M17.5 6.5L21 3M21 3h-4M21 3v4"/><path d="M3 7l2.5 2.5M3 7l2.5-2.5M3 7h6"/><path d="M17.5 17.5L21 21M21 21h-4M21 21v-4"/><path d="M3 17l2.5 2.5M3 17l2.5-2.5M3 17h6"/></svg>
              <span>{{ $t('api.form.random') }}</span>
            </button>
          </div>
          <input
            v-model="customColors"
            type="text"
            :placeholder="$t('api.form.colorsPlaceholder')"
            class="w-full px-4 py-2.5 mt-3 rounded-xl bg-surface border border-border text-sm text-center lg:text-left outline-none font-mono transition-colors focus:border-primary text-muted"
          />
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block text-center lg:text-left">{{ $t('api.form.size') }} &middot; {{ size }}px</label>
          <input
            v-model.number="size"
            type="range"
            min="16"
            max="512"
            class="w-full accent-primary"
          />
          <div class="flex justify-between text-xs text-muted mt-1">
            <span>16</span>
            <span>512</span>
          </div>
          <p class="text-xs text-muted/60 mt-2 text-center lg:text-left">{{ $t('api.form.sizeHint') }}</p>
        </div>
      </section>
    </div>

    <section class="max-w-2xl mx-auto mt-12 animate-in" style="animation-delay: 300ms">
      <div class="code-block">
        <div class="code-block-header">
          <div class="flex gap-0">
            <button
              v-for="tab in codeTabs"
              :key="tab.id"
              class="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-md transition-all cursor-pointer"
              :class="activeTab === tab.id
                ? 'text-[var(--c-text)] bg-surface'
                : 'text-muted hover:text-[var(--c-text)]'"
              @click="activeTab = tab.id"
            >{{ tab.label }}</button>
          </div>
          <button class="copy-btn" :class="{ copied: copied === 'code' }" @click="copyCode">{{ copied === 'code' ? 'Copied!' : $t('api.copy') }}</button>
        </div>
        <div v-html="$highlight(activeCode, 'sh')"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const router = useRouter()
const copied = ref<string | null>(null)
const activeTab = ref<'url' | 'curl'>('url')

const name = ref((route.query.name as string) || 'Clara Barton')
const variant = ref((route.query.variant as string) || 'beam')
const size = ref(Number(route.query.size) || 200)
const square = ref(route.query.square === 'true')
const customColors = ref((route.query.colors as string) || '')

const palettes = [
  ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'],
  ['#5b1d99', '#0074b4', '#00b34c', '#ffd41f', '#fc6e3d'],
  ['#ff6b6b', '#ee5a24', '#f0932b', '#ffbe76', '#badc58'],
  ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
]

const colors = ref(
  customColors.value
    ? customColors.value.split(',').map(c => c.trim()).filter(Boolean)
    : palettes[0]
)

watch(customColors, (val) => {
  if (val.trim()) {
    const parsed = val.split(',').map(c => c.trim()).filter(Boolean)
    if (parsed.length >= 2) colors.value = parsed
  }
})

function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function randomColors() {
  const hue = Math.random() * 360
  const goldenAngle = 137.508
  const palette = Array.from({ length: 5 }, (_, i) => {
    const h = (hue + i * goldenAngle) % 360
    const s = 50 + Math.floor(Math.random() * 25)
    const l = 35 + Math.floor(Math.random() * 30)
    return hslToHex(h, s, l)
  })
  colors.value = palette
  customColors.value = palette.join(',')
}

const variants = [
  { name: 'beam' },
  { name: 'pixel' },
  { name: 'sunset' },
  { name: 'ring' },
  { name: 'bauhaus' },
  { name: 'marble' },
]

const codeTabs = [
  { id: 'url', label: 'URL' },
  { id: 'curl', label: 'cURL' },
]

const liveUrl = computed(() => {
  const base = `/api/avatar/${encodeURIComponent(name.value || 'test')}`
  const p = new URLSearchParams({ variant: variant.value, size: String(size.value) })
  if (square.value) p.set('square', 'true')
  if (colors.value.length) p.set('colors', colors.value.join(','))
  return `${base}?${p}`
})

const activeCode = computed(() => {
  return activeTab.value === 'url' ? liveUrl.value : `curl "${liveUrl.value}"`
})

function syncUrl() {
  const query: Record<string, string> = {}
  if (name.value && name.value !== 'Clara Barton') query.name = name.value
  if (variant.value !== 'beam') query.variant = variant.value
  if (size.value !== 200) query.size = String(size.value)
  if (square.value) query.square = 'true'
  if (colors.value.length) query.colors = colors.value.join(',')
  router.replace({ query })
}

watch([name, variant, size, square], syncUrl)
watch(customColors, syncUrl)

function copyCode() {
  navigator.clipboard.writeText(activeCode.value)
  copied.value = 'code'
  setTimeout(() => { copied.value = null }, 2000)
}

useHead({ title: 'API Playground | Tronche' })
</script>

<style scoped>
.animate-in {
  animation: animate-in 0.6s ease forwards;
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
</style>
