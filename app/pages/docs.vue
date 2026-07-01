<template>
  <div class="docs">
    <div class="docs-header">
      <h1>Documentation</h1>
      <p>Tout pour intégrer Tronche dans vos projets</p>
    </div>

    <nav class="docs-nav">
      <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="docs-nav-link">{{ s.label }}</a>
    </nav>

    <div class="docs-content">
      <section id="start" class="doc-section">
        <h2>Installation</h2>
        <div class="code-block">
          <pre>npm install tronche</pre>
          <button class="btn-copy" @click="copy('npm-install')">Copier</button>
        </div>
      </section>

      <section id="nuxt" class="doc-section">
        <h2>Module Nuxt</h2>
        <p>Ajoutez le module dans votre <code>nuxt.config.ts</code> :</p>
        <div class="code-block">
          <pre>export default defineNuxtConfig({
  modules: ['tronche/module'],
})</pre>
          <button class="btn-copy" @click="copy('nuxt-config')">Copier</button>
        </div>

        <p>Les composants sont auto-importés :</p>
        <div class="code-block">
          <pre>&lt;template&gt;
  &lt;Avatar name="Maria Mitchell" variant="beam" /&gt;
&lt;/template&gt;</pre>
          <button class="btn-copy" @click="copy('nuxt-template')">Copier</button>
        </div>
      </section>

      <section id="vue" class="doc-section">
        <h2>Vue.js</h2>
        <div class="code-block">
          <pre>&lt;script setup&gt;
import Avatar from 'tronche/src/runtime/components/Avatar.vue'
&lt;/script&gt;

&lt;template&gt;
  &lt;Avatar name="Grace Hopper" :colors="['#fb6900', '#f63700', '#004853']" /&gt;
&lt;/template&gt;</pre>
          <button class="btn-copy" @click="copy('vue-import')">Copier</button>
        </div>

        <h3>Props</h3>
        <table class="props-table">
          <thead>
            <tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>name</td><td>string</td><td>Clara Barton</td><td>Nom pour générer l'avatar</td></tr>
            <tr><td>variant</td><td>string</td><td>marble</td><td>marble, beam, pixel, sunset, ring, bauhaus</td></tr>
            <tr><td>size</td><td>number</td><td>80</td><td>Taille en pixels</td></tr>
            <tr><td>square</td><td>boolean</td><td>false</td><td>Avatar carré (arrondi par défaut)</td></tr>
            <tr><td>colors</td><td>string[]</td><td>palette par défaut</td><td>5 couleurs hexadécimales</td></tr>
            <tr><td>title</td><td>boolean</td><td>false</td><td>Afficher le nom dans une balise title</td></tr>
          </tbody>
        </table>
      </section>

      <section id="api" class="doc-section">
        <h2>API REST</h2>
        <p>Générez des avatars à distance via notre API.</p>

        <div class="endpoint">
          <span class="method get">GET</span>
          <code>/api/avatar/:name</code>
          <span class="tier free">Free</span>
        </div>

        <table class="props-table">
          <thead>
            <tr><th>Paramètre</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>variant</td><td>string</td><td>marble</td><td>marble, beam, pixel, sunset, ring, bauhaus</td></tr>
            <tr><td>size</td><td>number</td><td>80</td><td>De 16 à 512</td></tr>
            <tr><td>square</td><td>boolean</td><td>false</td><td>true ou false</td></tr>
            <tr><td>colors</td><td>string</td><td>—</td><td>Couleurs hex séparées par des virgules</td></tr>
          </tbody>
        </table>

        <h3>Exemples</h3>
        <div class="code-block">
          <pre>curl "https://tronche.app/api/avatar/Clara%20Barton?variant=beam"</pre>
          <button class="btn-copy" @click="copy('curl-example')">Copier</button>
        </div>
        <div class="code-block">
          <pre>curl "https://tronche.app/api/avatar/test?size=200&square=true&colors=FF6B6B,4ECDC4,45B7D1"</pre>
          <button class="btn-copy" @click="copy('curl-colors')">Copier</button>
        </div>

        <h3>Rate limiting</h3>
        <p>Le plan gratuit autorise <strong>100 requêtes par minute</strong> par IP.</p>
        <p>Pour un volume plus élevé, <NuxtLink to="/register">créez un compte</NuxtLink> et utilisez une clé API.</p>
      </section>

      <section id="variants" class="doc-section">
        <h2>Variants</h2>
        <div class="variants-grid">
          <div v-for="v in variants" :key="v.name" class="variant-card">
            <img :src="`/api/avatar/Demo?variant=${v.name}&size=120`" :alt="v.name" width="120" height="120" />
            <div class="variant-card-body">
              <h3>{{ v.name }}</h3>
              <p>{{ v.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
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

<style scoped>
.docs {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.docs-header {
  margin-bottom: 40px;
}

.docs-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.docs-header p {
  color: var(--c-muted);
  margin-top: 4px;
}

.docs-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--c-border);
}

.docs-nav-link {
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-muted);
  transition: 0.2s;
}

.docs-nav-link:hover {
  color: var(--c-text);
  border-color: var(--c-text);
  text-decoration: none;
}

.doc-section {
  margin-bottom: 48px;
}

.doc-section h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.doc-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
}

.doc-section p {
  color: var(--c-muted);
  line-height: 1.7;
  margin-bottom: 12px;
}

.doc-section code {
  background: var(--c-surface);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
  color: var(--c-accent);
}

.code-block {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.code-block pre {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  white-space: pre;
  margin: 0;
}

.btn-copy {
  flex-shrink: 0;
  padding: 6px 14px;
  background: var(--c-accent);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-copy:hover {
  background: var(--c-accent-hover);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.props-table th,
.props-table td {
  text-align: left;
  padding: 10px 14px;
  font-size: 0.85rem;
  border-bottom: 1px solid var(--c-border);
}

.props-table th {
  color: var(--c-muted);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.props-table td {
  color: var(--c-text);
}

.endpoint {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--c-surface);
  border-radius: var(--radius);
  margin-bottom: 16px;
}

.method {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.method.get {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.tier {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
}

.tier.free {
  background: rgba(240, 93, 94, 0.15);
  color: var(--c-accent);
}

.endpoint code {
  font-size: 0.9rem;
  color: var(--c-text);
}

.variants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.variant-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
}

.variant-card img {
  border-radius: 50%;
  flex-shrink: 0;
}

.variant-card-body h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px;
}

.variant-card-body p {
  color: var(--c-muted);
  font-size: 0.85rem;
  margin: 0;
}
</style>
