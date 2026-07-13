<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-6 animate-in" style="animation-delay: 0ms">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <NIcon name="i-tabler-key" class="text-primary text-xl" />
        </div>
        <div>
          <h1 class="text-3xl font-bold font-heading">{{ $t('dashboard.title') }}</h1>
          <p class="text-muted mt-0.5">{{ $t('dashboard.subtitle') }}</p>
        </div>
      </div>
    </div>

    <section v-if="!loading && keys.length > 0" class="flex gap-3 mb-6 animate-in" style="animation-delay: 25ms">
      <div class="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-3 flex-1">
        <div class="w-8 h-8 rounded-lg bg-[var(--c-bg)] flex items-center justify-center shrink-0">
          <NIcon name="i-tabler-key" class="text-muted text-sm" />
        </div>
        <div>
          <p class="text-2xl font-bold font-heading leading-none">{{ keys.length }}</p>
          <p class="text-xs text-muted mt-1">{{ $t('dashboard.totalKeys') }}</p>
        </div>
      </div>
      <div class="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-3 flex-1">
        <div class="w-8 h-8 rounded-lg bg-[var(--c-bg)] flex items-center justify-center shrink-0">
          <NIcon name="i-tabler-circle-check-filled" class="text-green-500 text-sm" />
        </div>
        <div>
          <p class="text-2xl font-bold font-heading leading-none">{{ keys.filter(k => k.isActive).length }}</p>
          <p class="text-xs text-muted mt-1">{{ $t('dashboard.activeKeys') }}</p>
        </div>
      </div>
    </section>

    <section class="bg-surface border border-border rounded-xl p-6 animate-in" style="animation-delay: 50ms">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg font-semibold">{{ $t('dashboard.keys') }}</h2>
        <button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">
          <NIcon name="i-tabler-plus" class="text-sm" />
          {{ $t('dashboard.newKey') }}
        </button>
      </div>

      <div v-if="showCreate" class="flex gap-2 flex-wrap mb-4 animate-in" style="animation-delay: 0ms">
        <input ref="createInputRef" v-model="newKeyName" type="text" :placeholder="$t('dashboard.keyNamePlaceholder')" class="flex-1 min-w-50 px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none focus:border-primary" @keyup.enter="createKey" />
        <button class="inline-flex items-center px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="createKey">{{ $t('dashboard.create') }}</button>
        <button class="inline-flex items-center px-4 py-2 rounded-xl border border-border hover:text-[var(--c-text)] font-semibold text-sm bg-transparent cursor-pointer hover:border-[var(--c-text)] transition-colors" @click="showCreate = false">{{ $t('dashboard.cancel') }}</button>
      </div>

      <div v-if="createdKey" class="bg-[var(--c-bg)] border border-primary rounded-xl p-4 mb-5 key-reveal">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm">🔑</span>
          <p class="text-sm text-muted">{{ $t('dashboard.newKeyCreated') }}</p>
        </div>
        <div class="font-mono text-xs bg-surface p-3 rounded-lg break-all mb-3">{{ createdKey }}</div>
        <button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="copyKey">
          <NIcon :name="copied ? 'i-tabler-check' : 'i-tabler-copy'" class="text-sm" />
          {{ copied ? $t('dashboard.copied') : $t('dashboard.copy') }}
        </button>
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

      <div v-else-if="fetchError" class="text-center py-10">
        <NIcon name="i-tabler-cloud-off" class="text-3xl text-muted mb-3" />
        <p class="text-muted mb-4">{{ $t('dashboard.errorLoading') }}</p>
        <button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border hover:text-[var(--c-text)] font-semibold text-sm bg-transparent cursor-pointer hover:border-[var(--c-text)] transition-colors" @click="fetchKeys">
          <NIcon name="i-tabler-refresh" class="text-sm" />
          {{ $t('dashboard.retry') }}
        </button>
      </div>

      <div v-else-if="keys.length === 0" class="text-center py-10">
        <NIcon name="i-tabler-key-off" class="text-3xl text-muted mb-3" />
        <p class="text-muted mb-4">{{ $t('dashboard.noKeys') }}</p>
        <button class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer hover:bg-primary-600 transition-colors" @click="showCreate = true">
          <NIcon name="i-tabler-plus" class="text-sm" />
          {{ $t('dashboard.newKey') }}
        </button>
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
            <NSwitch :model-value="key.isActive" @update:model-value="() => toggleKey(key)" size="sm" />
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <div class="text-xs text-muted flex gap-3" :class="key.usage ? 'items-center' : 'hidden md:flex'">
              <template v-if="key.usage">
                <span class="whitespace-nowrap" :class="key.usage.daily >= key.usage.dailyLimit ? 'text-red-500 font-semibold' : ''">
                  {{ formatNumber(key.usage.daily) }}/{{ formatNumber(key.usage.dailyLimit) }}<span class="hidden sm:inline"> today</span>
                </span>
                <span class="text-border hidden md:inline">·</span>
                <span class="whitespace-nowrap hidden md:inline" :class="key.usage.monthly >= key.usage.monthlyLimit ? 'text-red-500 font-semibold' : ''">
                  {{ formatNumber(key.usage.monthly) }}/{{ formatNumber(key.usage.monthlyLimit) }}<span class="hidden lg:inline"> this month</span>
                </span>
                <span class="text-border">·</span>
              </template>
              <span v-if="key.lastUsedAt">{{ $t('dashboard.lastUsed') }} {{ formatDate(key.lastUsedAt) }}</span>
              <span v-else>{{ $t('dashboard.neverUsed') }}</span>
              <span class="hidden sm:inline">{{ $t('dashboard.createdOn') }} {{ formatDate(key.createdAt) }}</span>
            </div>
            <NDropdownMenu
              :items="[
                { label: $t('dashboard.edit'), onclick: () => startEdit(key) },
                { label: $t('dashboard.delete'), onclick: () => openDeleteDialog(key), dropdownMenuItem: 'text-red-500!' },
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
    </section>

    <NAlertDialog
      v-model:open="deleteDialogOpen"
      :title="$t('dashboard.deleteTitle')"
      :description="$t('dashboard.deleteDescription', { name: deletingKey?.name || '' })"
      :_alert-dialog-action="{ class: '!bg-red-500 !text-white hover:!bg-red-600' }"
      @action="confirmDelete"
    >
      <template #cancel>{{ $t('dashboard.cancel') }}</template>
      <template #action>{{ $t('dashboard.delete') }}</template>
    </NAlertDialog>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const { locale } = useI18nLocale()
const { user } = useUserSession()

useHead({
  title: 'Dashboard | Tronche',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Manage your Tronche API keys, view usage statistics, and control access to avatar generation.' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
})

const keys = ref<any[]>([])
const loading = ref(true)
const fetchError = ref(false)
const showCreate = ref(false)
const newKeyName = ref('')
const createdKey = ref('')
const copied = ref(false)
const editingId = ref<number | null>(null)
const editingName = ref('')
const deleteDialogOpen = ref(false)
const deletingKey = ref<any>(null)
const createInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  if (!user.value) {
    navigateTo('/login')
    return
  }
  await fetchKeys()
})

watch(showCreate, async (val) => {
  if (val) {
    await nextTick()
    createInputRef.value?.focus()
  }
})

async function fetchKeys() {
  loading.value = true
  fetchError.value = false
  try {
    const res = await $fetch<{ data: any[] }>('/api/api-keys')
    keys.value = res.data
  } catch {
    keys.value = []
    fetchError.value = true
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
    toast({ title: '🔑 Key ready!', description: `API key "${name}" created — copy it now, you won't see it again.`, toast: 'solid-green', duration: 4000 })
  } catch {
    toast({ title: 'Could not create key', description: 'Something went wrong. Please try again.', toast: 'solid-red', duration: 4000 })
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
    toast({ title: 'Renamed!', description: `API key renamed to "${name}".`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Rename failed', description: 'Could not rename the key. Try again.', toast: 'solid-red', duration: 4000 })
  }
}

async function toggleKey(key: any) {
  const newState = !key.isActive
  key.isActive = newState
  try {
    await $fetch(`/api/api-keys/${key.id}`, {
      method: 'PUT',
      body: { isActive: newState },
    })
    toast({
      title: newState ? 'Key enabled' : 'Key disabled',
      description: `API key "${key.name}" ${newState ? 'is now active' : 'has been disabled'}.`,
      toast: 'solid-green',
      duration: 3000,
    })
  } catch {
    key.isActive = !newState
    toast({ title: 'Update failed', description: 'Could not update the key status.', toast: 'solid-red', duration: 4000 })
  }
}

function openDeleteDialog(key: any) {
  deletingKey.value = key
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  if (!deletingKey.value) return
  const key = deletingKey.value
  const name = key.name
  deletingKey.value = null
  try {
    await $fetch(`/api/api-keys/${key.id}`, { method: 'DELETE' })
    await fetchKeys()
    toast({ title: 'Key deleted', description: `API key "${name}" removed.`, toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Delete failed', description: 'Could not delete the key. Try again.', toast: 'solid-red', duration: 4000 })
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatNumber(n: number) {
  return n.toLocaleString(locale.value === 'fr' ? 'fr-FR' : 'en-US')
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

@keyframes keyReveal {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.animate-in {
  animation: fadeSlideUp 0.5s ease both;
}

.key-reveal {
  animation: keyReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
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
