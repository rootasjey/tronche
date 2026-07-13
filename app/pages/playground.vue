<template>
  <div class="px-5 pt-10 pb-20 max-w-240 mx-auto">
    <section class="text-center mb-12 animate-in" style="animation-delay: 0ms">
      <h1 class="font-heading text-4xl md:text-5xl font-700 tracking-tight mb-3">
        {{ $t('playground.title') }}
      </h1>
      <p class="text-muted text-lg max-w-lg mx-auto leading-relaxed">{{ $t('playground.subtitle') }}</p>
    </section>

    <div class="lg:flex lg:gap-12 lg:max-w-200 lg:mx-auto">
      <section class="lg:sticky lg:top-24 lg:self-start flex flex-col items-center gap-4 mb-10 lg:mb-0 lg:shrink-0 animate-in" style="animation-delay: 100ms">
        <div class="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg transition-all duration-300 shrink-0 flex items-center justify-center" :class="{ '!rounded-2xl': square }">
          <Avatar :name="name || '?'" :variant="variant as any" :colors="colors" :square="square" :size="size" class="w-full h-full block" />
        </div>
        <div class="flex items-center gap-0">
          <button class="flex items-center gap-1.5 pl-4 pr-3 py-2 rounded-l-xl rounded-r-none border border-r-0 border-border text-xs font-medium text-muted cursor-pointer hover:text-[var(--c-text)] hover:border-[var(--c-text)] hover:border-r hover:z-1 transition-colors" @click="downloadFile('svg')">
            <NIcon name="i-tabler-download" />
            {{ $t('playground.download') }}
          </button>
          <NDropdownMenu>
            <button class="flex items-center justify-center w-9 h-8.5 rounded-l-none rounded-r-xl border border-border text-muted cursor-pointer hover:text-[var(--c-text)] hover:border-[var(--c-text)] hover:z-1 transition-colors">
              <NIcon name="i-tabler-chevron-down" />
            </button>

            <template #items>
              <NDropdownMenuGroup>
                <NDropdownMenuItem
                  v-for="item in extraFormats"
                  :key="item.value"
                  @select="downloadFile(item.value)"
                >
                  {{ item.label }}
                </NDropdownMenuItem>
              </NDropdownMenuGroup>
            </template>
          </NDropdownMenu>
        </div>
      </section>

      <section class="flex-1 min-w-0 max-w-xl mx-auto lg:mx-0 space-y-8 animate-in" style="animation-delay: 200ms">
        <div>
          <input
            v-model="name"
            type="text"
            class="w-full px-5 py-3 rounded-xl bg-surface border border-border text-center lg:text-left text-lg outline-none transition-colors focus:border-primary"
            :placeholder="$t('playground.form.name')"
          />
          <p class="text-xs text-muted text-center lg:text-left mt-2">{{ $t('playground.form.nameHint') }}</p>
          <div class="flex items-center justify-center lg:justify-start gap-3 mt-3">
            <NSwitch v-model="square" size="sm" />
            <span class="text-sm font-semibold">{{ $t('playground.form.square') }}</span>
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-3 block text-center lg:text-left">{{ $t('playground.form.variant') }}</label>
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
                :src="`/api/avatar/Demo?variant=${v.name}&size=48${colorsParam}`"
                alt=""
                width="48"
                height="48"
                class="rounded-full hover:shadow-lg hover:scale-105 active:scale-99 active:shadow-none transition-[transform]"
              >
              <span class="text-xs font-medium" :class="variant === v.name ? 'text-primary' : 'text-muted'">{{ v.name }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-3 block text-center lg:text-left">{{ $t('playground.form.colors') }}</label>
          <div class="flex justify-center lg:justify-start gap-2 flex-wrap">
            <button
              v-for="(palette, i) in palettes"
              :key="i"
              class="flex gap-1 p-2 rounded-xl border transition-all cursor-pointer"
              :class="isActivePalette(palette) ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-[var(--c-text)]'"
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
              :title="$t('playground.form.random')"
            >
              <NIcon name="i-tabler-arrows-shuffle" />
              <span>{{ $t('playground.form.random') }}</span>
            </button>
          </div>
          <input
            v-model="customColors"
            type="text"
            :placeholder="$t('playground.form.colorsPlaceholder')"
            class="w-full px-4 py-2.5 mt-3 rounded-xl bg-surface border text-sm text-center lg:text-left outline-none font-mono transition-colors focus:border-primary text-muted"
            :class="customColors ? 'border-primary' : 'border-border'"
          />
        </div>

        <div>
          <label class="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block text-center lg:text-left">{{ $t('playground.form.size') }} &middot; {{ size }}px</label>
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
          <div class="mt-2 flex items-center gap-2 text-xs rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-center lg:text-left">
            <div class="py-.5 px-1 rounded-1 bg-primary/15"><NIcon name="i-tabler-pointer-exclamation" /></div>
            {{ $t('playground.form.sizeHint') }}
          </div>
        </div>
      </section>
    </div>

    <section class="max-w-200 mx-auto mt-12 animate-in" style="animation-delay: 300ms">
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
          <button class="copy-btn" :class="{ copied: copied === 'code' }" @click="copyCode($event)">{{ copied === 'code' ? 'Copied!' : $t('playground.copy') }}</button>
        </div>
        <div v-html="$highlight(activeCode, 'sh')"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Avatar from '../../src/vue/components/Avatar.vue'

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
  ['#1B4EF5', '#3874FF', '#5996FF', '#F4CEFF', '#9FA1FF'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FEEAA7'],
  ['#6B5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E27055'],
  ['#F5F5DC', '#FBC02D', '#FF8F00', '#C62828', '#F1DEC4'],
  ['#FF6B6B', '#EE5A24', '#F0932B', '#FFBE76', '#BADC58'],
  ['#FFCA95', '#FF7873', '#E22F80', '#8140DC', '#FBEFEF'],
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

function isActivePalette(palette: string[]) {
  return colors.value.length === palette.length && colors.value.every((c, i) => c === palette[i])
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

const colorsParam = computed(() => colors.value.length ? `&colors=${encodeURIComponent(colors.value.join(','))}` : '')

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

watch([name, variant, size, square, colors, customColors], syncUrl)

const downloadFormats = [
  { value: 'svg', label: 'SVG' },
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPEG' },
  { value: 'webp', label: 'WebP' },
]
const extraFormats = computed(() => downloadFormats.filter(f => f.value !== 'svg'))

async function downloadFile(format: string) {
  const url = liveUrl.value
  const filename = `${name.value || 'avatar'}-${variant.value}`
  if (format === 'svg') {
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.svg`
    a.click()
  } else {
    const mimeTypes: Record<string, string> = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' }
    const mime = mimeTypes[format]
    if (!mime) return
    const res = await fetch(url)
    const svg = await res.text()
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const blobUrl = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size.value
      canvas.height = size.value
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, size.value, size.value)
      canvas.toBlob((b) => {
        if (b) {
          const url = URL.createObjectURL(b)
          const a = document.createElement('a')
          a.href = url
          a.download = `${filename}.${format}`
          a.click()
          URL.revokeObjectURL(url)
        }
      }, mime, format === 'jpeg' ? 0.92 : undefined)
      URL.revokeObjectURL(blobUrl)
    }
    img.src = blobUrl
  }
}

function copyCode(e: Event) {
  navigator.clipboard.writeText(activeCode.value)
  copied.value = 'code'
  sparkle(e.target as HTMLElement)
  setTimeout(() => { copied.value = null }, 2000)
}

useHead({ title: 'Playground | Tronche' })
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
