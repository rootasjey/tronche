<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">
        Des avatars<br />
        <span class="hero-highlight">qui ont de la gueule</span>
      </h1>
      <p class="hero-sub">
        Générez des avatars SVG uniques à partir d'un nom. Open source, API gratuite.
      </p>

      <div class="hero-demo">
        <div class="demo-avatars">
          <div v-for="s in samples" :key="s.name" class="demo-avatar-card">
            <img :src="`/api/avatar/${s.name}?variant=${s.variant}&size=80`" :alt="s.name" width="80" height="80" />
            <span class="demo-name">{{ s.name }}</span>
          </div>
        </div>
      </div>

      <div class="hero-actions">
        <NuxtLink to="#playground" class="btn-primary">Essayer</NuxtLink>
        <a href="https://github.com/rootasjey/tronche" class="btn-secondary" target="_blank">GitHub</a>
      </div>
    </section>

    <section id="playground" class="section">
      <div class="section-header">
        <h2>Playground</h2>
        <p>Customisez votre avatar en direct</p>
      </div>

      <div class="playground">
        <div class="playground-preview">
          <div class="preview-avatar">
            <img :src="previewUrl" alt="avatar" width="200" height="200" />
          </div>
          <p class="preview-name">{{ name || '—' }}</p>
          <button class="btn-primary btn-sm" @click="download">Télécharger SVG</button>
        </div>

        <div class="playground-controls">
          <div class="control-group">
            <label>Nom</label>
            <input v-model="name" type="text" class="input" placeholder="Entrez un nom..." />
          </div>

          <div class="control-group">
            <label>Variant</label>
            <div class="variant-grid">
              <button
                v-for="v in variants"
                :key="v"
                class="variant-btn"
                :class="{ active: variant === v }"
                @click="variant = v"
              >
                <img :src="`/api/avatar/${name}?variant=${v}&size=40`" :alt="v" width="40" height="40" />
                <span>{{ v }}</span>
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>Taille : {{ size }}px</label>
            <input v-model.number="size" type="range" min="40" max="400" class="range" />
          </div>

          <div class="control-group row">
            <label class="checkbox-label">
              <input v-model="square" type="checkbox" />
              Carré
            </label>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-api">
      <div class="section-header">
        <h2>API gratuite</h2>
        <p>Intégration simple, résultat immédiat</p>
      </div>

      <div class="code-block">
        <pre>&lt;img src="https://tronche.app/api/avatar/Maria%20Mitchell?variant=beam&size=80" /&gt;</pre>
        <button class="btn-copy" @click="copyCode">Copier</button>
      </div>

      <div class="api-demo">
        <div class="api-params">
          <div class="param"><code>variant</code><span>marble, beam, pixel, sunset, ring, bauhaus</span></div>
          <div class="param"><code>size</code><span>16 – 512</span></div>
          <div class="param"><code>square</code><span>true | false</span></div>
          <div class="param"><code>colors</code><span>liste de couleurs hex séparées par des virgules</span></div>
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

const variants = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']

const samples = [
  { name: 'Marguerite', variant: 'marble' },
  { name: 'Amélie', variant: 'beam' },
  { name: 'Pierre', variant: 'pixel' },
  { name: 'Camille', variant: 'sunset' },
  { name: 'Léon', variant: 'ring' },
  { name: 'Manon', variant: 'bauhaus' },
]

const previewUrl = computed(() => {
  const base = `/api/avatar/${encodeURIComponent(name.value || '?')}`
  const params = new URLSearchParams({ variant: variant.value })
  if (size.value !== 200) params.set('size', String(size.value))
  if (square.value) params.set('square', 'true')
  return `${base}?${params}`
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

<style scoped>
.hero {
  text-align: center;
  padding: 80px 20px 60px;
  max-width: var(--max-w);
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.hero-highlight {
  background: linear-gradient(135deg, var(--c-accent), #FF8A5C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  color: var(--c-muted);
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.hero-demo {
  margin-bottom: 40px;
}

.demo-avatars {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.demo-avatar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-avatar-card img {
  border-radius: 50%;
  background: var(--c-surface);
}

.demo-name {
  font-size: 0.8rem;
  color: var(--c-muted);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  background: var(--c-accent);
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--c-accent-hover);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  cursor: pointer;
  background: none;
  color: var(--c-text);
}

.btn-secondary:hover {
  border-color: var(--c-text);
}

.section {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 60px 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-header p {
  color: var(--c-muted);
  font-size: 1rem;
}

.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 700px) {
  .playground {
    grid-template-columns: 1fr;
  }
}

.playground-preview {
  text-align: center;
  position: sticky;
  top: 80px;
}

.preview-avatar {
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
}

.preview-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--c-surface);
}

.preview-name {
  color: var(--c-muted);
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.btn-sm {
  padding: 8px 20px;
  font-size: 0.85rem;
}

.playground-controls {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-muted);
}

.control-group.row {
  flex-direction: row;
  align-items: center;
}

.input {
  padding: 10px 14px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  color: var(--c-text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--c-accent);
}

.variant-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.variant-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: var(--c-surface);
  border: 2px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
  transition: 0.2s;
}

.variant-btn:hover {
  border-color: var(--c-border);
}

.variant-btn.active {
  border-color: var(--c-accent);
}

.variant-btn img {
  border-radius: 50%;
}

.variant-btn span {
  font-size: 0.7rem;
  color: var(--c-muted);
}

.range {
  width: 100%;
  accent-color: var(--c-accent);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;
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
  overflow-x: auto;
  margin-bottom: 24px;
}

.code-block pre {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  white-space: pre;
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

.api-params {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.param {
  display: flex;
  gap: 12px;
  font-size: 0.9rem;
  padding: 8px 12px;
  background: var(--c-surface);
  border-radius: 8px;
}

.param code {
  color: var(--c-accent);
  font-family: 'SF Mono', monospace;
  min-width: 80px;
}

.param span {
  color: var(--c-muted);
}
</style>
