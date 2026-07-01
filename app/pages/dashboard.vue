<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Gérez vos clés API</p>
    </div>

    <div class="section-card">
      <div class="section-card-header">
        <h2>Vos clés</h2>
        <button class="btn-primary btn-sm" @click="showCreate = true">+ Nouvelle clé</button>
      </div>

      <div v-if="showCreate" class="create-form">
        <input v-model="newKeyName" type="text" placeholder="Nom de la clé (ex: production, dev...)" class="input" @keyup.enter="createKey" />
        <div class="create-actions">
          <button class="btn-primary btn-sm" @click="createKey">Créer</button>
          <button class="btn-secondary btn-sm" @click="showCreate = false">Annuler</button>
        </div>
      </div>

      <div v-if="createdKey" class="key-reveal">
        <p class="key-reveal-label">🔑 Votre nouvelle clé (copiez-la, elle ne sera plus affichée) :</p>
        <div class="key-value">{{ createdKey }}</div>
        <button class="btn-primary btn-sm" @click="copyKey">Copier</button>
      </div>

      <div v-if="keys.length === 0 && !loading" class="empty">
        Aucune clé pour le moment.
      </div>

      <div v-else class="keys-list">
        <div v-for="key in keys" :key="key.id" class="key-card">
          <div class="key-info">
            <span class="key-name">{{ key.name }}</span>
            <span class="key-tier" :class="key.tier">{{ key.tier }}</span>
          </div>
          <div class="key-meta">
            <span v-if="key.lastUsedAt">Dernière utilisation : {{ formatDate(key.lastUsedAt) }}</span>
            <span v-else>Jamais utilisé</span>
            <span>Créée le {{ formatDate(key.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()

const keys = ref<any[]>([])
const loading = ref(true)

const showCreate = ref(false)
const newKeyName = ref('')
const createdKey = ref('')

onMounted(async () => {
  if (!user.value) {
    navigateTo('/login')
    return
  }
  await fetchKeys()
})

async function fetchKeys() {
  try {
    const res = await $fetch<{ data: any[] }>('/api/api-keys')
    keys.value = res.data
  } catch {
    keys.value = []
  } finally {
    loading.value = false
  }
}

async function createKey() {
  if (!newKeyName.value) return
  try {
    const res = await $fetch<{ data: { key: string } }>('/api/api-keys', {
      method: 'POST',
      body: { name: newKeyName.value },
    })
    createdKey.value = res.data.key
    newKeyName.value = ''
    showCreate.value = false
    await fetchKeys()
  } catch {
    // handled
  }
}

function copyKey() {
  navigator.clipboard.writeText(createdKey.value)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>

<style scoped>
.dashboard {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 40px 20px 60px;
}

.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
}

.dashboard-header p {
  color: var(--c-muted);
  margin-top: 4px;
}

.section-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 24px;
}

.section-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-card-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.85rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  background: var(--c-accent);
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--c-accent-hover);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  background: none;
  color: var(--c-text);
  cursor: pointer;
}

.create-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  color: var(--c-text);
  font-size: 0.9rem;
  outline: none;
}

.input:focus {
  border-color: var(--c-accent);
}

.create-actions {
  display: flex;
  gap: 8px;
}

.key-reveal {
  background: #1a1a1a;
  border: 1px solid var(--c-accent);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 20px;
}

.key-reveal-label {
  font-size: 0.85rem;
  color: var(--c-muted);
  margin-bottom: 8px;
}

.key-value {
  font-family: 'SF Mono', monospace;
  font-size: 0.8rem;
  background: var(--c-bg);
  padding: 10px;
  border-radius: 6px;
  word-break: break-all;
  margin-bottom: 12px;
}

.empty {
  text-align: center;
  padding: 40px;
  color: var(--c-muted);
}

.keys-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.key-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: var(--c-bg);
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.key-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.key-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.key-tier {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 600;
}

.key-tier.free {
  background: rgba(240, 93, 94, 0.15);
  color: var(--c-accent);
}

.key-meta {
  font-size: 0.8rem;
  color: var(--c-muted);
  display: flex;
  gap: 16px;
}
</style>
