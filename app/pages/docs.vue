<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-20">
    <div class="mb-10">
      <h1 class="text-3xl font-bold">{{ $t('docs.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('docs.subtitle') }}</p>
    </div>

    <nav class="flex gap-2 flex-wrap mb-10 pb-6 border-b border-border">
      <a v-for="s in sectionLinks" :key="s.id" :href="`#${s.id}`" class="text-sm px-3.5 py-1.5 rounded-full bg-surface border border-border text-muted transition-colors no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)]">{{ $t(s.label) }}</a>
    </nav>

    <section id="start" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('docs.sections.installation') }}</h2>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">npm install tronche</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('npm-install')">{{ $t('docs.copy') }}</button>
      </div>
    </section>

    <section id="nuxt" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('docs.sections.nuxt') }}</h2>
      <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.nuxt.addModule') }} <code class="bg-surface px-1.5 py-0.5 rounded text-sm text-primary">nuxt.config.ts</code> :</p>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">export default defineNuxtConfig({
  modules: ['tronche/module'],
})</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('nuxt-config')">{{ $t('docs.copy') }}</button>
      </div>

      <p class="text-muted mb-3 leading-relaxed">{{ $t('docs.nuxt.autoImport') }}</p>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">&lt;template&gt;
  &lt;Avatar name="Maria Mitchell" variant="beam" /&gt;
&lt;/template&gt;</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('nuxt-template')">{{ $t('docs.copy') }}</button>
      </div>
    </section>

    <section id="vue" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('docs.sections.vue') }}</h2>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">&lt;script setup&gt;
import Avatar from 'tronche/src/runtime/components/Avatar.vue'
&lt;/script&gt;
&lt;template&gt;
  &lt;Avatar name="Grace Hopper" :colors="['#fb6900', '#f63700', '#004853']" /&gt;
&lt;/template&gt;</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('vue-import')">{{ $t('docs.copy') }}</button>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">Props</h3>
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

    <section id="api" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('docs.sections.api') }}</h2>
      <p class="text-muted mb-4 leading-relaxed">{{ $t('docs.api.subtitle') }}</p>

      <div class="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border mb-4">
        <span class="text-xs font-bold px-2 py-0.5 rounded uppercase bg-[#22c55e]/15 text-[#22c55e]">GET</span>
        <code class="text-sm flex-1">/api/avatar/:name</code>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full uppercase bg-primary/15 text-primary">Free</span>
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

      <h3 class="text-lg font-semibold mb-3">{{ $t('docs.api.examples') }}</h3>
      <div v-for="(ex, i) in examples" :key="i" class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">{{ ex.code }}</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy(ex.id)">{{ $t('docs.copy') }}</button>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-2">{{ $t('docs.api.rateLimiting') }}</h3>
      <p class="text-muted leading-relaxed">{{ $t('docs.api.rateLimitingText') }} <strong class="hover:text-[var(--c-text)]">{{ $t('docs.api.rateLimitingBold') }}</strong> {{ $t('docs.api.rateLimitingPerIp') }}</p>
      <p class="text-muted leading-relaxed">{{ $t('docs.api.upgrade') }} <NuxtLink to="/register" class="text-primary hover:underline">{{ $t('docs.api.createAccount') }}</NuxtLink> {{ $t('docs.api.useApiKey') }}</p>
    </section>

    <section id="variants" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">{{ $t('docs.sections.variants') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="v in variants" :key="v.name" class="flex gap-4 items-center p-4 bg-surface border border-border rounded-xl">
          <img :src="`/api/avatar/Demo?variant=${v.name}&size=120`" :alt="v.name" width="120" height="120" class="rounded-full shrink-0" />
          <div>
            <h3 class="text-base font-semibold mb-1">{{ v.name }}</h3>
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

const variants = computed(() => [
  { name: 'marble', desc: $t('docs.variants.marble') },
  { name: 'beam', desc: $t('docs.variants.beam') },
  { name: 'pixel', desc: $t('docs.variants.pixel') },
  { name: 'sunset', desc: $t('docs.variants.sunset') },
  { name: 'ring', desc: $t('docs.variants.ring') },
  { name: 'bauhaus', desc: $t('docs.variants.bauhaus') },
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

function copy(id: string) {
  navigator.clipboard.writeText(snippets[id])
}
</script>
