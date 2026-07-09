<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-20">
    <div class="mb-10 fade-in" style="animation-delay: 0ms">
      <h1 class="text-3xl font-bold font-heading">{{ $t('docs.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('docs.subtitle') }}</p>
    </div>

    <nav class="flex gap-2 flex-wrap mb-10 pb-6 border-b border-border fade-in" style="animation-delay: 100ms">
      <a v-for="s in sectionLinks" :key="s.id" :href="`#${s.id}`"
         class="text-sm px-3.5 py-1.5 rounded-full bg-surface border border-border text-muted transition-all no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)]"
         :class="{ '!bg-primary/15 !text-primary !border-primary': activeSection === s.id }">{{ $t(s.label) }}</a>
    </nav>

    <section id="start" class="mb-12 fade-in" style="animation-delay: 200ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.installation') }}</h2>
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-label">Shell</span>
          <button class="copy-btn" :class="{ copied: copied === 'npm-install' }" @click="copy('npm-install', $event)">{{ copied === 'npm-install' ? 'Copied!' : $t('docs.copy') }}</button>
        </div>
        <div v-html="$highlight(snippets['npm-install'], 'sh')"></div>
      </div>
    </section>

    <section id="nuxt" class="mb-12 fade-in" style="animation-delay: 300ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.nuxt') }}</h2>
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
    </section>

    <section id="vue" class="mb-12 fade-in" style="animation-delay: 400ms">
      <h2 class="text-2xl font-bold font-heading mb-4">{{ $t('docs.sections.vue') }}</h2>
      <div class="code-block">
        <div class="code-block-header">
          <span class="code-block-label">Vue</span>
          <button class="copy-btn" :class="{ copied: copied === 'vue-import' }" @click="copy('vue-import', $event)">{{ copied === 'vue-import' ? 'Copied!' : $t('docs.copy') }}</button>
        </div>
        <div v-html="$highlight(snippets['vue-import'], 'vue')"></div>
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
          <tr v-for="p in props" :key="p[0]" class="text-sm">
            <td class="p-3 border-b border-border font-mono">{{ p[0] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[1] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[2] }}</td>
            <td class="p-3 border-b border-border text-muted">{{ p[3] }}</td>
          </tr>
        </tbody>
      </table>
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
      <div v-for="(ex, i) in examples" :key="i" class="code-block">
        <div class="code-block-header">
          <span class="code-block-label">Shell</span>
          <button class="copy-btn" :class="{ copied: copied === ex.id }" @click="copy(ex.id, $event)">{{ copied === ex.id ? 'Copied!' : $t('docs.copy') }}</button>
        </div>
        <div v-html="$highlight(ex.code, 'sh')"></div>
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
          <img :src="`/api/avatar/Demo?variant=${v.name}&size=40&colors=${encodeURIComponent(docsColors)}`" :alt="v.name" width="40" height="40" class="rounded-full shrink-0" loading="lazy" />
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

const activeSection = ref('start')
const copied = ref<string | null>(null)

const docsColors = '#4300FF,#0065F8,#00CAFF,#00FFDE,#00FF9C'

const variantColors = Array(6).fill(docsColors)

const variants = computed(() => [
  { name: 'beam', desc: $t('docs.variants.beam') },
  { name: 'pixel', desc: $t('docs.variants.pixel') },
  { name: 'sunset', desc: $t('docs.variants.sunset') },
  { name: 'ring', desc: $t('docs.variants.ring') },
  { name: 'bauhaus', desc: $t('docs.variants.bauhaus') },
  { name: 'marble', desc: $t('docs.variants.marble') },
])

const props = computed(() => [
  ['name', 'string', 'Clara Barton', $t('docs.vue.props.name')],
  ['variant', 'string', 'marble', $t('docs.vue.props.variant')],
  ['size', 'number', '80', $t('docs.vue.props.size')],
  ['square', 'boolean', 'false', $t('docs.vue.props.square')],
  ['colors', 'string[]', 'palette', $t('docs.vue.props.colors')],
  ['title', 'boolean', 'false', $t('docs.vue.props.title')],
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
  { id: 'start', label: 'docs.sections.installation' },
  { id: 'nuxt', label: 'docs.sections.nuxt' },
  { id: 'vue', label: 'docs.sections.vue' },
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

useHead({ title: 'Docs | Tronche' })
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
</style>
