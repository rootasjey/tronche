<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-muted mt-1">Gérez vos clés API</p>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold">Vos clés</h2>
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">+ Nouvelle clé</button>
      </div>

      <div v-if="showCreate" class="flex gap-2 flex-wrap mb-4">
        <input v-model="newKeyName" type="text" placeholder="Nom de la clé (ex: production, dev...)" class="flex-1 min-w-50 px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none focus:border-primary" @keyup.enter="createKey" />
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="createKey">Créer</button>
        <button class="inline-flex items-center px-4 py-2 rounded-full border border-border hover:text-[var(--c-text)] font-semibold text-xs bg-transparent cursor-pointer hover:border-[var(--c-text)] transition-colors" @click="showCreate = false">Annuler</button>
      </div>

      <div v-if="createdKey" class="bg-[#1a1a1a] border border-primary rounded-xl p-4 mb-5">
        <p class="text-sm text-muted mb-2">🔑 Votre nouvelle clé (copiez-la, elle ne sera plus affichée) :</p>
        <div class="font-mono text-xs bg-[var(--c-bg)] p-3 rounded-lg break-all mb-3">{{ createdKey }}</div>
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copyKey">Copier</button>
      </div>

      <div v-if="keys.length === 0 && !loading" class="text-center py-10 text-muted">Aucune clé pour le moment.</div>

      <div v-else class="flex flex-col gap-2">
        <div v-for="key in keys" :key="key.id" class="flex items-center justify-between gap-2 p-3.5 bg-[var(--c-bg)] rounded-lg flex-wrap">
          <div class="flex items-center gap-2.5">
            <span class="font-semibold text-sm">{{ key.name }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full uppercase font-semibold bg-primary/15 text-primary">{{ key.tier }}</span>
          </div>
          <div class="text-xs text-muted flex gap-4">
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
  } catch {}
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
