<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-20">
    <div class="mb-10 fade-in" style="animation-delay: 0ms">
      <h1 class="text-3xl font-bold font-heading">{{ $t('docs.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('docs.subtitle') }}</p>
    </div>

    <nav class="flex gap-1 mb-10 border-b border-border fade-in" style="animation-delay: 100ms">
      <a v-for="s in sectionLinks" :key="s.id" :href="`#${s.id}`"
         class="text-sm px-3 py-2.5 border-b-2 transition-all no-underline -mb-[1px]"
         :class="activeSection === s.id
           ? 'border-primary text-[var(--c-text)] font-medium'
           : 'border-transparent text-muted hover:text-[var(--c-text)] hover:border-[var(--c-border)]'">#{{ $t(s.label) }}</a>
    </nav>

    <section id="api-docs" class="mb-12 fade-in" style="animation-delay: 150ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.apiDocs') }}</h2>
      <p class="text-muted mb-4 leading-relaxed">
        {{ $t('docs.apiDocs.description') }}
      </p>
      <a href="/docs/api"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm transition-all hover:bg-primary-600 hover:scale-[1.02] active:scale-[0.99] no-underline">
        <span>{{ $t('docs.apiDocs.openButton') }}</span>
        <span class="text-lg leading-none">→</span>
      </a>
    </section>

    <section id="start" class="mb-12 fade-in" style="animation-delay: 200ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.installation') }}</h2>
      <div class="code-block">
        <div class="code-block-header">
          <div class="flex gap-0">
            <button v-for="pm in packageManagers" :key="pm.id" @click="pmTab = pm.id"
              class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-1 transition-all cursor-pointer"
              :class="[
                pmTab === pm.id
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted hover:text-[var(--c-text)]',
              ]">{{ pm.label }}</button>
          </div>
          <button class="copy-btn" :class="{ copied: copied === pmTab + '-install' }" @click="copy(pmTab + '-install', $event)">{{ copied === pmTab + '-install' ? 'Copied!' : $t('docs.copy') }}</button>
        </div>
        <div v-html="$highlight(snippets[pmTab + '-install'], 'sh')"></div>
      </div>
    </section>

    <section class="mb-12 fade-in" style="animation-delay: 250ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.usage') }}</h2>
      <div class="inline-flex bg-surface border border-border rounded-xl p-1 mb-6" role="tablist">
        <button v-for="fw in frameworkItems" :key="fw.value" @click="frameworkTab = fw.value" role="tab" :aria-selected="frameworkTab === fw.value"
          class="text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
          :class="frameworkTab === fw.value
            ? 'bg-[var(--c-bg)] text-primary shadow-sm'
            : 'text-muted hover:text-[var(--c-text)]'">
          {{ fw.name }}
        </button>
      </div>

      <div v-if="frameworkTab === 'vanilla'" class="pt-4">
        <p class="text-muted mb-3 leading-relaxed">
          {{ $t('docs.vanilla.prefix') }}
          <NTooltip :content="$t('docs.vanilla.functions.generateData')">
            <code class="fn-name">generate*Data</code>
          </NTooltip>,
          <NTooltip :content="$t('docs.vanilla.functions.renderSvg')">
            <code class="fn-name">render*Svg</code>
          </NTooltip>
          {{ $t('docs.vanilla.and') }}
          <NTooltip :content="$t('docs.vanilla.functions.generateSvg')">
            <code class="fn-name">generate*Svg</code>
          </NTooltip>
          {{ $t('docs.vanilla.suffix') }}
        </p>
        <div class="code-block">
          <div class="code-block-header">
        <div class="flex gap-1.5">
          <button @click="vanillaTab = 'ts'"
            class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-border transition-all cursor-pointer"
            :class="vanillaTab === 'ts'
              ? 'bg-primary/15 text-primary border-primary/30'
              : 'text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] bg-surface'">TypeScript</button>
          <button @click="vanillaTab = 'html'"
            class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-border transition-all cursor-pointer"
            :class="vanillaTab === 'html'
              ? 'bg-primary/15 text-primary border-primary/30'
              : 'text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] bg-surface'">HTML</button>
        </div>
            <button class="copy-btn" :class="{ copied: copied === (vanillaTab === 'ts' ? 'vanilla-import' : 'vanilla-html') }" @click="copy(vanillaTab === 'ts' ? 'vanilla-import' : 'vanilla-html', $event)">{{ copied === (vanillaTab === 'ts' ? 'vanilla-import' : 'vanilla-html') ? 'Copied!' : $t('docs.copy') }}</button>
          </div>
          <div v-if="vanillaTab === 'ts'" v-html="$highlight(snippets['vanilla-import'], 'ts')"></div>
          <div v-else v-html="$highlight(snippets['vanilla-html'], 'html')"></div>
        </div>
      </div>

      <div v-else-if="frameworkTab === 'vue'" class="pt-4">
        <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.vue.description') }}</p>
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-label">Vue</span>
            <button class="copy-btn" :class="{ copied: copied === 'vue-import' }" @click="copy('vue-import', $event)">{{ copied === 'vue-import' ? 'Copied!' : $t('docs.copy') }}</button>
          </div>
          <div v-html="$highlight(snippets['vue-import'], 'vue')"></div>
        </div>

        <h3 class="text-lg font-semibold font-heading mt-6 mb-3">{{ $t('docs.table.prop') }}</h3>
        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="text-left text-xs text-muted font-semibold uppercase tracking-wider">
              <th class="p-3 border-b border-border">{{ $t('docs.table.prop') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.type') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.default') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.description') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in vueProps" :key="p[0]" class="text-sm">
              <td class="p-3 border-b border-border font-mono">{{ p[0] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[1] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[2] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="frameworkTab === 'react'" class="pt-4">
        <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.react.description') }}</p>
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-label">TSX</span>
            <button class="copy-btn" :class="{ copied: copied === 'react-import' }" @click="copy('react-import', $event)">{{ copied === 'react-import' ? 'Copied!' : $t('docs.copy') }}</button>
          </div>
          <div v-html="$highlight(snippets['react-import'], 'tsx')"></div>
        </div>

        <h3 class="text-lg font-semibold font-heading mt-6 mb-3">Props</h3>
        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="text-left text-xs text-muted font-semibold uppercase tracking-wider">
              <th class="p-3 border-b border-border">{{ $t('docs.table.prop') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.type') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.default') }}</th>
              <th class="p-3 border-b border-border">{{ $t('docs.table.description') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in reactProps" :key="p[0]" class="text-sm">
              <td class="p-3 border-b border-border font-mono">{{ p[0] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[1] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[2] }}</td>
              <td class="p-3 border-b border-border text-muted">{{ p[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="frameworkTab === 'nuxt'" class="pt-4">
        <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.nuxt.addModule') }} <code class="bg-surface px-1.5 py-0.5 rounded text-sm text-primary">nuxt.config.ts</code> :</p>
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-label">JavaScript</span>
            <button class="copy-btn" :class="{ copied: copied === 'nuxt-config' }" @click="copy('nuxt-config', $event)">{{ copied === 'nuxt-config' ? 'Copied!' : $t('docs.copy') }}</button>
          </div>
          <div v-html="$highlight(snippets['nuxt-config'], 'js')"></div>
        </div>

        <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.nuxt.autoImport') }}</p>
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-block-label">Vue</span>
            <button class="copy-btn" :class="{ copied: copied === 'nuxt-template' }" @click="copy('nuxt-template', $event)">{{ copied === 'nuxt-template' ? 'Copied!' : $t('docs.copy') }}</button>
          </div>
          <div v-html="$highlight(snippets['nuxt-template'], 'vue')"></div>
        </div>
      </div>
    </section>

    <section id="api" class="mb-12 fade-in" style="animation-delay: 500ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.api') }}</h2>
      <p class="text-muted mb-4 leading-relaxed">{{ $t('docs.api.subtitle') }}</p>

      <div class="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border mb-4">
        <span class="text-xs font-bold px-2 py-0.5 rounded uppercase bg-[#22c55e]/15 text-[#22c55e]">GET</span>
        <code class="text-sm flex-1">/api/avatar/:name</code>
      </div>

      <table class="w-full border-collapse mb-6">
        <thead>
          <tr class="text-left text-xs text-muted font-semibold uppercase tracking-wider">
            <th class="p-3 border-b border-border">{{ $t('docs.apiTable.parameter') }}</th>
            <th class="p-3 border-b border-border">{{ $t('docs.apiTable.type') }}</th>
            <th class="p-3 border-b border-border">{{ $t('docs.apiTable.default') }}</th>
            <th class="p-3 border-b border-border">{{ $t('docs.apiTable.description') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in apiParams" :key="p[0]" class="text-sm">
            <td class="p-3 border-b border-border font-mono">{{ p[0] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[1] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[2] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[3] }}</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-semibold font-heading mb-3">{{ $t('docs.api.examples') }}</h3>
      <div class="code-block">
        <div class="code-block-header">
          <div class="flex gap-0">
            <button @click="curlTab = 'basic'"
              class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-1 transition-all cursor-pointer"
              :class="curlTab === 'basic'
                ? 'bg-primary/15 text-primary'
                : 'text-muted hover:text-[var(--c-text)]'">Basic</button>
            <button @click="curlTab = 'colors'"
              class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-1 transition-all cursor-pointer"
              :class="curlTab === 'colors'
                ? 'bg-primary/15 text-primary'
                : 'text-muted hover:text-[var(--c-text)]'">Custom colors</button>
          </div>
          <button class="copy-btn" :class="{ copied: copied === (curlTab === 'basic' ? 'curl-example' : 'curl-colors') }" @click="copy(curlTab === 'basic' ? 'curl-example' : 'curl-colors', $event)">{{ copied === (curlTab === 'basic' ? 'curl-example' : 'curl-colors') ? 'Copied!' : $t('docs.copy') }}</button>
        </div>
        <div v-if="curlTab === 'basic'" v-html="$highlight(examples[0].code, 'sh')"></div>
        <div v-else v-html="$highlight(examples[1].code, 'sh')"></div>
      </div>

      <h3 class="text-lg font-semibold font-heading mt-6 mb-2">{{ $t('docs.api.rateLimiting') }}</h3>
      <p class="text-muted leading-relaxed">
        {{ $t('docs.api.rateLimitingText') }} <strong class="text-[var(--c-text)]">{{ $t('docs.api.rateLimitingBold') }}</strong> {{ $t('docs.api.rateLimitingPerIp') }}
        {{ $t('docs.api.upgrade') }} <NuxtLink to="/register" class="text-primary font-semibold hover:underline">{{ $t('docs.api.createAccount') }}</NuxtLink> {{ $t('docs.api.useApiKey') }}
      </p>
    </section>

    <section id="variants" class="mb-12 fade-in" style="animation-delay: 600ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.variants') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(v, i) in variants" :key="v.name" class="flex gap-4 items-center p-4 bg-surface border border-border rounded-xl cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]" @click="goToPlayground(v.name, v.name, variantColors[i])">
          <img
            :src="`/api/avatar/${v.name}?variant=${v.name}&size=40&colors=${encodeURIComponent(docsColors)}`"
            :alt="`${v.name} avatar preview`"
            width="40"
            height="40"
            class="rounded-full shrink-0 hover:shadow-lg hover:scale-105 active:scale-99 active:shadow-none transition-[transform]"
            loading="lazy"
          >
          <div>
            <h3 class="text-base font-semibold font-heading mb-1">{{ v.name }}</h3>
            <p class="text-sm text-muted m-0">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { snippets } from '../composables/snippets'

const { $t } = useI18n()
const route = useRoute()
const router = useRouter()
const breadcrumb = useBreadcrumb([{ name: 'Home', path: '/' }, { name: 'Docs' }])

const activeSection = ref('start')
const copied = ref<string | null>(null)

const curlTab = ref('basic')

const validFrameworks = ['vanilla', 'vue', 'react', 'nuxt']
const initialFramework = typeof route.query.framework === 'string' && validFrameworks.includes(route.query.framework)
  ? route.query.framework
  : 'vanilla'

const vanillaTab = ref('ts')

const pmTab = ref('npm')

const packageManagers = [
  { id: 'npm', label: 'npm' },
  { id: 'bun', label: 'bun' },
  { id: 'pnpm', label: 'pnpm' },
  { id: 'yarn', label: 'yarn' },
]

const frameworkTab = ref(initialFramework)

watch(frameworkTab, (val) => {
  router.replace({ query: { ...route.query, framework: val } })
})

const docsColors = '#4300FF,#0065F8,#00CAFF,#00FFDE,#00FF9C'

const variantColors = Array(6).fill(docsColors)

const frameworkItems = computed(() => [
  { value: 'vanilla', name: $t('docs.sections.vanilla') },
  { value: 'vue', name: $t('docs.sections.vue') },
  { value: 'react', name: $t('docs.sections.react') },
  { value: 'nuxt', name: $t('docs.sections.nuxt') },
])

const variants = computed(() => [
  { name: 'beam', desc: $t('docs.variants.beam') },
  { name: 'pixel', desc: $t('docs.variants.pixel') },
  { name: 'sunset', desc: $t('docs.variants.sunset') },
  { name: 'ring', desc: $t('docs.variants.ring') },
  { name: 'bauhaus', desc: $t('docs.variants.bauhaus') },
  { name: 'marble', desc: $t('docs.variants.marble') },
])

const vueProps = computed(() => [
  ['name', 'string', 'Clara Barton', $t('docs.vue.props.name')],
  ['variant', 'string', 'marble', $t('docs.vue.props.variant')],
  ['size', 'number', '80', $t('docs.vue.props.size')],
  ['square', 'boolean', 'false', $t('docs.vue.props.square')],
  ['colors', 'string[]', 'palette', $t('docs.vue.props.colors')],
  ['title', 'boolean', 'false', $t('docs.vue.props.title')],
])

const reactProps = computed(() => [
  ['name', 'string', 'Clara Barton', $t('docs.react.props.name')],
  ['variant', 'string', 'marble', $t('docs.react.props.variant')],
  ['size', 'number', '80', $t('docs.react.props.size')],
  ['square', 'boolean', 'false', $t('docs.react.props.square')],
  ['colors', 'string[]', 'palette', $t('docs.react.props.colors')],
  ['title', 'boolean', 'false', $t('docs.react.props.title')],
])

const apiParams = computed(() => [
  ['variant', 'string', 'marble', $t('docs.api.table.variantDesc')],
  ['size', 'number', '80', $t('docs.api.table.sizeDesc')],
  ['square', 'boolean', 'false', $t('docs.api.table.squareDesc')],
  ['colors', 'string', '—', $t('docs.api.table.colorsDesc')],
])

const examples = [
  { id: 'curl-example', code: 'curl "https://tronche.app/api/avatar/Clara%20Barton?variant=beam"' },
  { id: 'curl-colors', code: 'curl "https://tronche.app/api/avatar/test?size=200&square=true&colors=FF6B6B,4ECDC4,45B7D1"' },
]

const sectionLinks = [
  { id: 'api-docs', label: 'docs.sections.apiDocs' },
  { id: 'start', label: 'docs.sections.installation' },
  { id: 'api', label: 'docs.sections.api' },
  { id: 'variants', label: 'docs.sections.variants' },
]

function goToPlayground(name: string, variant: string, colors: string) {
  navigateTo({
    path: '/playground',
    query: { name, variant, colors },
  })
}

function copy(id: string, e: Event) {
  navigator.clipboard.writeText(snippets[id])
  copied.value = id
  sparkle(e.target as HTMLElement)
  setTimeout(() => { copied.value = null }, 2000)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    }
  }, { rootMargin: '-80px 0px -50% 0px' })

  for (const s of sectionLinks) {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  }
})

useHead({
  title: 'Docs | Tronche',
  htmlAttrs: { style: 'scroll-behavior: smooth' },
  meta: [
    { name: 'description', content: 'Documentation for Tronche SVG avatar generator. Learn how to install, use, and customize avatars with Nuxt, Vue, React, or Vanilla JS.' },
    { property: 'og:title', content: 'Docs | Tronche' },
    { property: 'og:description', content: 'Documentation for Tronche SVG avatar generator. Learn how to install, use, and customize avatars with Nuxt, Vue, React, or Vanilla JS.' },
    { property: 'og:image', content: '/images/tronche-og.jpeg' },
    { property: 'og:url', content: `https://tronche.app${route.path}` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Docs | Tronche' },
    { name: 'twitter:description', content: 'Documentation for Tronche SVG avatar generator. Learn how to install, use, and customize avatars with Nuxt, Vue, React, or Vanilla JS.' },
    { name: 'twitter:image', content: '/images/tronche-og.jpeg' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
  script: [breadcrumb],
})
</script>

<style scoped>
.fade-in {
  animation: fade-up 0.5s ease both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.fn-name) {
  color: var(--una-primary-hex);
  text-decoration: underline dotted;
  text-underline-offset: 3px;
  cursor: help;
}
</style>
