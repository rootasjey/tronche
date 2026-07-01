<template>
  <div class="max-w-200 mx-auto px-5 pt-10 pb-20">
    <div class="mb-10">
      <h1 class="text-3xl font-bold">Documentation</h1>
      <p class="text-muted mt-1">Tout pour intégrer Tronche dans vos projets</p>
    </div>

    <nav class="flex gap-2 flex-wrap mb-10 pb-6 border-b border-border">
      <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="text-sm px-3.5 py-1.5 rounded-full bg-surface border border-border text-muted transition-colors no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)]">{{ s.label }}</a>
    </nav>

    <section id="start" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Installation</h2>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">npm install tronche</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('npm-install')">Copier</button>
      </div>
    </section>

    <section id="nuxt" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Module Nuxt</h2>
      <p class="text-muted mb-3 leading-relaxed">Ajoutez le module dans votre <code class="bg-surface px-1.5 py-0.5 rounded text-sm text-primary">nuxt.config.ts</code> :</p>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">export default defineNuxtConfig({
  modules: ['tronche/module'],
})</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('nuxt-config')">Copier</button>
      </div>

      <p class="text-muted mb-3 leading-relaxed">Les composants sont auto-importés :</p>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">&lt;template&gt;
  &lt;Avatar name="Maria Mitchell" variant="beam" /&gt;
&lt;/template&gt;</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('nuxt-template')">Copier</button>
      </div>
    </section>

    <section id="vue" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Vue.js</h2>
      <div class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <pre class="text-sm font-mono whitespace-pre m-0">&lt;script setup&gt;
import Avatar from 'tronche/src/runtime/components/Avatar.vue'
&lt;/script&gt;
&lt;template&gt;
  &lt;Avatar name="Grace Hopper" :colors="['#fb6900', '#f63700', '#004853']" /&gt;
&lt;/template&gt;</pre>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy('vue-import')">Copier</button>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-3">Props</h3>
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="text-left text-xs text-muted font-semibold uppercase tracking-wider">
            <th class="p-3 border-b border-border">Prop</th>
            <th class="p-3 border-b border-border">Type</th>
            <th class="p-3 border-b border-border">Défaut</th>
            <th class="p-3 border-b border-border">Description</th>
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
      <h2 class="text-2xl font-bold mb-4">API REST</h2>
      <p class="text-muted mb-4 leading-relaxed">Générez des avatars à distance via notre API.</p>

      <div class="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border mb-4">
        <span class="text-xs font-bold px-2 py-0.5 rounded uppercase bg-[#22c55e]/15 text-[#22c55e]">GET</span>
        <code class="text-sm flex-1">/api/avatar/:name</code>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full uppercase bg-primary/15 text-primary">Free</span>
      </div>

      <table class="w-full border-collapse mb-6">
        <thead>
          <tr class="text-left text-xs text-muted font-semibold uppercase tracking-wider">
            <th class="p-3 border-b border-border">Paramètre</th>
            <th class="p-3 border-b border-border">Type</th>
            <th class="p-3 border-b border-border">Défaut</th>
            <th class="p-3 border-b border-border">Description</th>
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

      <h3 class="text-lg font-semibold mb-3">Exemples</h3>
      <div v-for="(ex, i) in examples" :key="i" class="flex items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-border mb-4 overflow-x-auto">
        <code class="text-sm font-mono whitespace-pre shrink-0">{{ ex.code }}</code>
        <button class="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary hover:text-[var(--c-text)] text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copy(ex.id)">Copier</button>
      </div>

      <h3 class="text-lg font-semibold mt-6 mb-2">Rate limiting</h3>
      <p class="text-muted leading-relaxed">Le plan gratuit autorise <strong class="hover:text-[var(--c-text)]">100 requêtes par minute</strong> par IP.</p>
      <p class="text-muted leading-relaxed">Pour un volume plus élevé, <NuxtLink to="/register" class="text-primary hover:underline">créez un compte</NuxtLink> et utilisez une clé API.</p>
    </section>

    <section id="variants" class="mb-12">
      <h2 class="text-2xl font-bold mb-4">Variants</h2>
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

const variants = [
  { name: 'marble', desc: 'Formes organiques floues' },
  { name: 'beam', desc: 'Visages expressifs' },
  { name: 'pixel', desc: 'Pixel art 8×8' },
  { name: 'sunset', desc: 'Dégradés de couleurs' },
  { name: 'ring', desc: 'Cercles concentriques' },
  { name: 'bauhaus', desc: 'Formes géométriques' },
]

const props = [
  ['name', 'string', 'Clara Barton', "Nom pour generer l'avatar"],
  ['variant', 'string', 'marble', 'marble, beam, pixel, sunset, ring, bauhaus'],
  ['size', 'number', '80', 'Taille en pixels'],
  ['square', 'boolean', 'false', 'Avatar carre'],
  ['colors', 'string[]', 'palette', '5 couleurs hexadecimales'],
  ['title', 'boolean', 'false', 'Balise title'],
]

const apiParams = [
  ['variant', 'string', 'marble', 'marble, beam, pixel, sunset, ring, bauhaus'],
  ['size', 'number', '80', 'De 16 a 512'],
  ['square', 'boolean', 'false', 'true ou false'],
  ['colors', 'string', '—', 'Couleurs hex separees par des virgules'],
]

const examples = [
  { id: 'curl-example', code: 'curl "https://tronche.app/api/avatar/Clara%20Barton?variant=beam"' },
  { id: 'curl-colors', code: 'curl "https://tronche.app/api/avatar/test?size=200&square=true&colors=FF6B6B,4ECDC4,45B7D1"' },
]

const sections = [
  { id: 'start', label: 'Installation' },
  { id: 'nuxt', label: 'Module Nuxt' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'api', label: 'API REST' },
  { id: 'variants', label: 'Variants' },
]

function copy(id: string) {
  navigator.clipboard.writeText(snippets[id])
}
</script>
