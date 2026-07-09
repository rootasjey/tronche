<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8 animate-in" style="animation-delay: 0ms">
      <h1 class="text-3xl font-bold">{{ $t('dashboard.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('dashboard.subtitle') }}</p>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6 animate-in" style="animation-delay: 50ms">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold">{{ $t('dashboard.keys') }}</h2>
        <button class="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">{{ $t('dashboard.newKey') }}</button>
      </div>

      <div v-if="showCreate" class="flex gap-2 flex-wrap mb-4 animate-in" style="animation-delay: 0ms">
        <input v-model="newKeyName" type="text" :placeholder="$t('dashboard.keyNamePlaceholder')" class="flex-1 min-w-50 px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none focus:border-primary" @keyup.enter="createKey" />
        <button class="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="createKey">{{ $t('dashboard.create') }}</button>
        <button class="inline-flex items-center px-4 py-2 rounded-xl border border-border hover:text-[var(--c-text)] font-semibold text-xs bg-transparent cursor-pointer hover:border-[var(--c-text)] transition-colors" @click="showCreate = false">{{ $t('dashboard.cancel') }}</button>
      </div>

      <div v-if="createdKey" class="bg-[#1a1a1a] border border-primary rounded-xl p-4 mb-5 animate-in" style="animation-delay: 0ms">
        <p class="text-sm text-muted mb-2">🔑 {{ $t('dashboard.newKeyCreated') }}</p>
        <div class="font-mono text-xs bg-[var(--c-bg)] p-3 rounded-lg break-all mb-3">{{ createdKey }}</div>
        <button class="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copyKey">{{ copied ? $t('dashboard.copied') : $t('dashboard.copy') }}</button>
      </div>

      <div v-if="loading" class="flex flex-col gap-2">
        <div v-for="n in 3" :key="n" class="flex items-center justify-between gap-2 p-3.5 bg-[var(--c-bg)] rounded-lg skeleton-row" :style="{ '--skeleton-delay': `${(n - 1) * 0.1}s` }">
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <div class="h-4 w-32 rounded-md skeleton-pulse" />
            <div class="h-5 w-14 rounded-full skeleton-pulse" />
            <div class="h-5 w-16 rounded-full skeleton-pulse" />
          </div>
          <div class="h-4 w-24 rounded-md skeleton-pulse" />
        </div>
      </div>

      <div v-else-if="keys.length === 0" class="text-center py-10">
        <p class="text-muted mb-4">{{ $t('dashboard.noKeys') }}</p>
        <button class="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">{{ $t('dashboard.newKey') }}</button>
      </div>

      <div v-else class="flex flex-col gap-2">
        <div v-for="(key, index) in keys" :key="key.id" class="flex items-center justify-between gap-2 p-3.5 bg-[var(--c-bg)] rounded-lg flex-wrap key-row" :style="{ '--key-delay': `${index * 0.05}s` }">
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <template v-if="editingId === key.id">
              <input v-model="editingName" type="text" class="flex-1 min-w-0 px-2 py-1 rounded-lg bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary" @keyup.enter="saveEdit(key.id)" @keyup.escape="editingId = null" />
              <button class="text-xs px-2 py-1 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold border-none cursor-pointer" @click="saveEdit(key.id)">{{ $t('dashboard.save') }}</button>
              <button class="text-xs px-2 py-1 rounded-xl border border-border hover:text-[var(--c-text)] font-semibold bg-transparent cursor-pointer" @click="editingId = null">{{ $t('dashboard.cancel') }}</button>
            </template>
            <template v-else>
              <span class="font-semibold text-sm truncate">{{ key.name }}</span>
            </template>
            <span class="text-xs px-2 py-0.5 rounded-full uppercase font-semibold bg-primary/15 text-primary shrink-0">{{ key.tier }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0" :class="key.isActive ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'">{{ key.isActive ? $t('dashboard.active') : $t('dashboard.inactive') }}</span>
          </div>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-xs text-muted flex gap-4">
              <span v-if="key.lastUsedAt">{{ $t('dashboard.lastUsed') }} {{ formatDate(key.lastUsedAt) }}</span>
              <span v-else>{{ $t('dashboard.neverUsed') }}</span>
              <span class="hidden sm:inline">{{ $t('dashboard.createdOn') }} {{ formatDate(key.createdAt) }}</span>
            </div>
            <NDropdownMenu
              :items="[
                { label: $t('dashboard.edit'), onclick: () => startEdit(key) },
                { label: key.isActive ? $t('dashboard.disable') : $t('dashboard.enable'), onclick: () => toggleKey(key) },
                { label: $t('dashboard.delete'), onclick: () => deleteKey(key), dropdownMenuItem: 'text-red-500!' },
              ]"
              :_dropdown-menu-content="{ class: 'w-40', align: 'end', side: 'bottom' }"
            >
              <button class="shrink-0 bg-transparent border-none cursor-pointer text-sm px-1.5 py-0.5 rounded-md text-[var(--c-text)] hover:bg-[var(--c-bg)] transition-colors leading-none flex items-center justify-center" aria-label="Actions">
                <NIcon name="i-tabler-dots-vertical" />
              </button>
            </NDropdownMenu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const { locale } = useI18nLocale()
const { user } = useUserSession()

const keys = ref<any[]>([])
const loading = ref(true)
const showCreate = ref(false)
const newKeyName = ref('')
const createdKey = ref('')
const copied = ref(false)
const editingId = ref<number | null>(null)
const editingName = ref('')

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
  const name = newKeyName.value
  try {
    const res = await $fetch<{ data: { key: string } }>('/api/api-keys', {
      method: 'POST',
      body: { name },
    })
    createdKey.value = res.data.key
    newKeyName.value = ''
    showCreate.value = false
    await fetchKeys()
    toast({ title: 'Key created', description: `API key "${name}" created.`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to create API key.', toast: 'solid-red', duration: 4000 })
  }
}

function copyKey() {
  navigator.clipboard.writeText(createdKey.value)
  copied.value = true
  toast({ title: 'Copied!', description: 'API key copied to clipboard.', toast: 'solid-green', duration: 2000 })
  setTimeout(() => { copied.value = false }, 2000)
}

function startEdit(key: any) {
  editingId.value = key.id
  editingName.value = key.name
}

async function saveEdit(id: number) {
  if (!editingName.value.trim()) return
  const name = editingName.value.trim()
  try {
    await $fetch(`/api/api-keys/${id}`, {
      method: 'PUT',
      body: { name },
    })
    editingId.value = null
    await fetchKeys()
    toast({ title: 'Key renamed', description: `API key renamed to "${name}".`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to rename API key.', toast: 'solid-red', duration: 4000 })
  }
}

async function toggleKey(key: any) {
  const newState = !key.isActive
  try {
    await $fetch(`/api/api-keys/${key.id}`, {
      method: 'PUT',
      body: { isActive: newState },
    })
    await fetchKeys()
    toast({ title: newState ? 'Key enabled' : 'Key disabled', description: `API key "${key.name}" ${newState ? 'enabled' : 'disabled'}.`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to update API key.', toast: 'solid-red', duration: 4000 })
  }
}

async function deleteKey(key: any) {
  if (!confirm($t('dashboard.confirmDelete'))) return
  const name = key.name
  try {
    await $fetch(`/api/api-keys/${key.id}`, { method: 'DELETE' })
    await fetchKeys()
    toast({ title: 'Key deleted', description: `API key "${name}" deleted.`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to delete API key.', toast: 'solid-red', duration: 4000 })
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>

<style scoped>
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.animate-in {
  animation: fadeSlideUp 0.5s ease both;
}

.key-row {
  animation: fadeSlideUp 0.4s ease both;
  animation-delay: var(--key-delay, 0s);
}

.skeleton-row {
  animation: fadeSlideUp 0.4s ease both;
  animation-delay: var(--skeleton-delay, 0s);
}

.skeleton-pulse {
  background: var(--c-border);
  border-radius: 0.375rem;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
</style>
