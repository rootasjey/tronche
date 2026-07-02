<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">{{ $t('dashboard.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('dashboard.subtitle') }}</p>
    </div>

    <div class="bg-surface border border-border rounded-xl p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold">{{ $t('dashboard.keys') }}</h2>
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">{{ $t('dashboard.newKey') }}</button>
      </div>

      <div v-if="showCreate" class="flex gap-2 flex-wrap mb-4">
        <input v-model="newKeyName" type="text" :placeholder="$t('dashboard.keyNamePlaceholder')" class="flex-1 min-w-50 px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none focus:border-primary" @keyup.enter="createKey" />
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="createKey">{{ $t('dashboard.create') }}</button>
        <button class="inline-flex items-center px-4 py-2 rounded-full border border-border hover:text-[var(--c-text)] font-semibold text-xs bg-transparent cursor-pointer hover:border-[var(--c-text)] transition-colors" @click="showCreate = false">{{ $t('dashboard.cancel') }}</button>
      </div>

      <div v-if="createdKey" class="bg-[#1a1a1a] border border-primary rounded-xl p-4 mb-5">
        <p class="text-sm text-muted mb-2">🔑 {{ $t('dashboard.newKeyCreated') }}</p>
        <div class="font-mono text-xs bg-[var(--c-bg)] p-3 rounded-lg break-all mb-3">{{ createdKey }}</div>
        <button class="inline-flex items-center px-4 py-2 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-xs border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copyKey">{{ copied ? $t('dashboard.copied') : $t('dashboard.copy') }}</button>
      </div>

      <div v-if="keys.length === 0 && !loading" class="text-center py-10 text-muted">{{ $t('dashboard.noKeys') }}</div>

      <div v-else class="flex flex-col gap-2">
        <div v-for="key in keys" :key="key.id" class="flex items-center justify-between gap-2 p-3.5 bg-[var(--c-bg)] rounded-lg flex-wrap">
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <template v-if="editingId === key.id">
              <input v-model="editingName" type="text" class="flex-1 min-w-0 px-2 py-1 rounded-lg bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary" @keyup.enter="saveEdit(key.id)" @keyup.escape="editingId = null" />
              <button class="text-xs px-2 py-1 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold border-none cursor-pointer" @click="saveEdit(key.id)">{{ $t('dashboard.save') }}</button>
              <button class="text-xs px-2 py-1 rounded-full border border-border hover:text-[var(--c-text)] font-semibold bg-transparent cursor-pointer" @click="editingId = null">{{ $t('dashboard.cancel') }}</button>
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
              <button class="shrink-0 bg-transparent border-none cursor-pointer text-sm tracking-wide px-1.5 py-0.5 rounded-md text-[var(--c-text)] hover:bg-[var(--c-bg)] transition-colors leading-none" aria-label="Actions">•••</button>
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
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function startEdit(key: any) {
  editingId.value = key.id
  editingName.value = key.name
}

async function saveEdit(id: number) {
  if (!editingName.value.trim()) return
  try {
    await $fetch(`/api/api-keys/${id}`, {
      method: 'PUT',
      body: { name: editingName.value.trim() },
    })
    editingId.value = null
    await fetchKeys()
  } catch {}
}

async function toggleKey(key: any) {
  try {
    await $fetch(`/api/api-keys/${key.id}`, {
      method: 'PUT',
      body: { isActive: !key.isActive },
    })
    await fetchKeys()
  } catch {}
}

async function deleteKey(key: any) {
  if (!confirm($t('dashboard.confirmDelete'))) return
  try {
    await $fetch(`/api/api-keys/${key.id}`, { method: 'DELETE' })
    await fetchKeys()
  } catch {}
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>
