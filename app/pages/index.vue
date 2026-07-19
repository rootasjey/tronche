<template>
  <div class="relative overflow-x-hidden">
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>

    <section class="text-center px-5 pt-20 pb-12 max-w-240 mx-auto">
      <div class="animate-in" style="animation-delay: 0ms">
        <div class="inline-flex items-center gap-1.5 bg-primary/10 text-sm font-semibold px-3.5 py-1.5 rounded-full mb-8 tracking-wide">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
            <mask id="logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
              <rect width="36" height="36" rx="72" fill="white" />
            </mask>
            <g mask="url(#logo-mask)">
              <rect width="36" height="36" fill="#45B7D1" />
              <rect x="0" y="0" width="36" height="36" transform="translate(8 8) rotate(94 18 18) scale(1.1)" fill="#FFEAA7" rx="6" />
              <g transform="translate(4 4) rotate(-4 18 18)">
                <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000" />
                <rect x="10" y="14" width="1.5" height="2" rx="1" fill="#000000" />
                <rect x="24" y="14" width="1.5" height="2" rx="1" fill="#000000" />
              </g>
            </g>
          </svg>
          <span class="font-heading text-base font-bold tracking-tight">tronche</span>
        </div>
        <h1 class="font-heading text-5xl md:text-6xl leading-tight tracking-tight mb-5 font-600">
          {{ $t('home.hero.prefix') }}<span class="text-primary italic font-600">{{ $t('home.hero.highlight') }}</span>{{ $t('home.hero.suffix') }}
        </h1>
      </div>
      <div class="animate-in" style="animation-delay: 100ms">
        <p class="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">{{ $t('home.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="px-5 pb-14 max-w-240 mx-auto">
      <div class="flex justify-center items-start gap-6 flex-wrap animate-in" style="animation-delay: 200ms">
        <div v-for="(v, i) in variants" :key="v" class="flex flex-col items-center gap-3 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]" @click="goToPlayground(v, variantColors[i])">
          <div class="w-[72px] h-[72px] rounded-full overflow-hidden shadow-lg transition-transform duration-200 hover:scale-110">
            <img :src="avatarUrl('Clara Barton', v, 72, false, variantColors[i])" :alt="`${v} avatar preview`" width="72" height="72" class="w-full h-full block" />
          </div>
          <span class="text-xs font-medium text-muted capitalize">{{ v }}</span>
        </div>
      </div>
    </section>

    <section class="px-5 pb-14 max-w-240 mx-auto">
      <div class="code-block max-w-160 mx-auto animate-in" style="animation-delay: 300ms">
        <div class="code-block-header">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full" style="background: #ff5f57"></span>
            <span class="w-2.5 h-2.5 rounded-full" style="background: #febc2e"></span>
            <span class="w-2.5 h-2.5 rounded-full" style="background: #28c840"></span>
            <div class="flex gap-0 ml-3">
              <button
                v-for="tab in codeTabs"
                :key="tab.id"
                class="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md transition-all cursor-pointer inline-flex items-center gap-1"
                :class="activeTab === tab.id
                  ? 'text-[var(--c-text)] bg-surface'
                  : 'text-muted hover:text-[var(--c-text)]'"
                @click="activeTab = tab.id"
              >
                <NIcon v-if="tab.icon" :name="tab.icon" class="text-sm" />
                <span v-if="activeTab === tab.id">{{ tab.label }}</span>
              </button>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button
              class="copy-btn"
              @click="openStackBlitz(activeTab as any)"
            >
              <NIcon name="i-tabler-bolt-filled" class="mr-2" />
              <span>Run in StackBlitz</span>
            </button>
            <NTooltip :content="activeCopied ? 'Copied!' : 'Copy'">
              <NButton
                btn="soft-gray"
                class="copy-btn"
                :class="{ copied: activeCopied }"
                icon
                :label="activeCopied ? 'i-lucide-clipboard-check' : 'i-lucide-clipboard'"
                @click="copyCode($event)"
              />
            </NTooltip>
          </div>
        </div>
        <div ref="codeContentRef" class="code-content-wrapper">
          <div ref="codeInnerRef" v-html="$highlight(activeSnippet, activeLanguage)"></div>
        </div>
      </div>

      <div class="mt-8 animate-in flex justify-center gap-3 flex-wrap" style="animation-delay: 350ms">
        <NuxtLink to="/docs" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold no-underline hover:bg-primary-600 transition-colors">
          {{ $t('home.hero.ctaDocs') }} &rarr;
        </NuxtLink>
        <NuxtLink to="/register" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)] transition-colors">
          {{ $t('home.hero.ctaRegister') }} &rarr;
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { snippets } from '../composables/snippets'
import { openStackBlitz } from '../composables/stackblitz'

const { $t } = useI18n()
const route = useRoute()
const breadcrumb = useBreadcrumb([{ name: 'Home' }])

useHead({
  title: 'Tronche - Avatar generator',
  meta: [
    { name: 'description', content: 'Tronche generates custom, SVG-based avatars from any username and color palette. Try 6 unique styles: beam, pixel, sunset, ring, bauhaus & marble.' },
    { property: 'og:title', content: 'Tronche - Avatar generator' },
    { property: 'og:description', content: 'Tronche generates custom, SVG-based avatars from any username and color palette. Try 6 unique styles: beam, pixel, sunset, ring, bauhaus & marble.' },
    { property: 'og:image', content: '/images/tronche-og.jpeg' },
    { property: 'og:url', content: `https://tronche.app${route.path}` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Tronche - Avatar generator' },
    { name: 'twitter:description', content: 'Tronche generates custom, SVG-based avatars from any username and color palette. Try 6 unique styles: beam, pixel, sunset, ring, bauhaus & marble.' },
    { name: 'twitter:image', content: '/images/tronche-og.jpeg' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tronche',
        url: 'https://tronche.app',
        description: 'Tronche generates custom, SVG-based avatars from any username and color palette.',
        applicationCategory: 'Multimedia',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
    breadcrumb,
  ],
})

const copied = ref<string | null>(null)
const activeTab = ref('nuxt')
const codeContentRef = ref<HTMLElement | null>(null)
const codeInnerRef = ref<HTMLElement | null>(null)

const codeTabs = [
  { id: 'nuxt', label: 'Nuxt', icon: 'i-tabler-brand-nuxt' },
  { id: 'react', label: 'React', icon: 'i-tabler-brand-react' },
  { id: 'solid', label: 'Solid', icon: 'i-tabler-brand-solidjs' },
  { id: 'svelte', label: 'Svelte', icon: 'i-tabler-brand-svelte' },
  { id: 'vanilla', label: 'Vanilla', icon: 'i-tabler-brand-javascript' },
  { id: 'vue', label: 'Vue', icon: 'i-tabler-brand-vue' },
]

const activeLanguage = computed(() => {
  const map: Record<string, string> = { vanilla: 'js', vue: 'vue', react: 'tsx', nuxt: 'vue', solid: 'tsx', svelte: 'html' }
  return map[activeTab.value]
})

const activeSnippet = computed(() => snippets['home-' + activeTab.value])

watch(activeTab, async () => {
  const wrapper = codeContentRef.value
  const inner = codeInnerRef.value
  if (!wrapper || !inner) return

  const prevHeight = wrapper.offsetHeight
  wrapper.style.height = prevHeight + 'px'

  await nextTick()

  const newHeight = inner.scrollHeight
  if (prevHeight === newHeight) {
    wrapper.style.height = ''
    return
  }

  wrapper.style.height = newHeight + 'px'

  const reset = () => { wrapper.style.height = '' }
  wrapper.addEventListener('transitionend', reset, { once: true })
})

function switchTab(id: string) {
  activeTab.value = id
}

const activeCopied = computed(() => copied.value === 'home-' + activeTab.value)

const variants = ['beam', 'pixel', 'sunset', 'ring', 'bauhaus', 'marble']

const variantColors = [
  '#E07A5F,#3D405B,#81B29A,#F4D06F,#D8A47F',
  '#FF6B6B,#4ECDC4,#45B7D1,#96CEB4,#FFEAA7',
  '#ff6b6b,#ee5a24,#f0932b,#ffbe76,#badc58',
  '#6c5ce7,#a29bfe,#fd79a8,#fdcb6e,#e17055',
  '#ffe3b3,#ff9a52,#ff5252,#c91e5a,#3d2922',
  '#5b1d99,#0074b4,#00b34c,#ffd41f,#fc6e3d',
]

function goToPlayground(variant: string, colors: string) {
  navigateTo({
    path: '/playground',
    query: { name: 'Clara Barton', variant, colors },
  })
}

function avatarUrl(n: string, v: string, s: number, sq: boolean, colors?: string): string {
  const base = `/api/avatar/${encodeURIComponent(n || '?')}`
  const p = new URLSearchParams({ variant: v, size: String(s) })
  if (sq) p.set('square', 'true')
  if (colors) p.set('colors', colors)
  return `${base}?${p}`
}

function copy(id: string, e: Event) {
  navigator.clipboard.writeText(snippets[id])
  copied.value = id
  sparkle(e.target as HTMLElement)
  setTimeout(() => { copied.value = null }, 2000)
}

function copyCode(e: Event) {
  copy('home-' + activeTab.value, e)
}
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

.code-content-wrapper {
  overflow: hidden;
  transition: height 0.35s ease;
}

.glow {
  position: fixed;
  pointer-events: none;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(240, 93, 94, 0.08) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(129, 178, 154, 0.06) 0%, transparent 70%);
  bottom: -50px;
  left: -50px;
}
</style>
