<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="glow glow-admin"></div>
    <div class="mb-8 animate-in" style="animation-delay: 0ms">
      <h1 class="text-3xl font-bold font-heading">{{ $t('admin.apiKeys.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('admin.apiKeys.subtitle') }}</p>
    </div>

    <div class="flex gap-2 mb-8 flex-wrap animate-in" style="animation-delay: 50ms">
      <NuxtLink to="/admin" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.dashboard.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/users" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.users.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/api-keys" class="px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-colors bg-primary text-[var(--c-text)] no-underline">
        {{ $t('admin.apiKeys.title') }}
      </NuxtLink>
    </div>

    <div class="flex items-center gap-3 mb-5 flex-wrap animate-in" style="animation-delay: 100ms">
      <div class="relative flex-1 min-w-50">
        <input v-model="search" type="text" :placeholder="$t('admin.apiKeys.searchPlaceholder')" class="w-full px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary transition-colors" />
      </div>
      <div class="flex gap-1.5 flex-wrap">
        <button v-for="s in statusOptions" :key="s.value" class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer" :class="statusFilter === s.value ? 'bg-primary text-[var(--c-text)] border-primary' : 'bg-transparent text-muted border-border hover:text-[var(--c-text)] hover:border-[var(--c-text)]'" @click="statusFilter = s.value">{{ s.label }}</button>
      </div>
    </div>

    <div v-if="loading" class="bg-surface border border-border rounded-xl overflow-hidden">
      <div class="p-3 flex gap-4 border-b border-border">
        <div v-for="n in 6" :key="n" class="h-4 flex-1 rounded-md skeleton-pulse" />
      </div>
      <div v-for="n in 4" :key="n" class="p-3 flex gap-4 border-b border-border last:border-none" :style="{ '--skeleton-delay': `${(n - 1) * 0.08}s` }">
        <div v-for="m in 6" :key="m" class="h-4 flex-1 rounded-md skeleton-pulse" :class="m >= 5 ? 'hidden md:block' : ''" />
      </div>
    </div>

    <template v-else>
      <div class="bg-surface border border-border rounded-xl overflow-hidden animate-in" style="animation-delay: 150ms">
        <div v-if="filteredKeys.length === 0" class="text-center py-12 text-muted">
          <p class="mb-1">{{ $t('admin.apiKeys.noKeys') }}</p>
          <p class="text-xs">{{ $t('admin.apiKeys.emptyHint') }}</p>
        </div>
        <table v-else class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-950">
            <tr class="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.name') }}</th>
              <th class="p-3 font-semibold hidden lg:table-cell">{{ $t('admin.apiKeys.key') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.tier') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.status') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.user') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.apiKeys.usage') }}</th>
              <th class="p-3 font-semibold text-right hidden md:table-cell">{{ $t('admin.apiKeys.id') }}</th>
              <th class="p-3 font-semibold text-right">{{ $t('admin.users.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in filteredKeys" :key="k.id" class="border-b border-border last:border-none hover:bg-[var(--c-surface)] transition-colors">
              <td class="p-3 font-semibold">{{ k.name }}</td>
              <td class="p-3 font-mono text-xs text-muted hidden lg:table-cell max-w-50 truncate">{{ k.key }}</td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full uppercase font-semibold bg-primary/15 text-primary">{{ k.tier }}</span>
              </td>
              <td class="p-3">
                <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold" :class="k.isActive ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="k.isActive ? 'bg-green-500' : 'bg-red-500'" />
                  {{ k.isActive ? $t('admin.apiKeys.active') : $t('admin.apiKeys.inactive') }}
                </span>
              </td>
              <td class="p-3 text-xs">
                <span class="font-semibold text-[var(--c-text)]">{{ k.userName }}</span>
                <span class="ml-1 text-muted">{{ k.userEmail }}</span>
              </td>
              <td class="p-3 text-muted text-xs hidden md:table-cell">
                <div v-if="k.usage" class="flex items-center gap-2">
                  <span class="whitespace-nowrap" :class="k.usage.daily >= k.usage.dailyLimit ? 'text-red-500 font-semibold' : ''">{{ k.usage.daily }}/{{ k.usage.dailyLimit }}d</span>
                  <span class="text-border">|</span>
                  <span class="whitespace-nowrap" :class="k.usage.monthly >= k.usage.monthlyLimit ? 'text-red-500 font-semibold' : ''">{{ k.usage.monthly }}/{{ k.usage.monthlyLimit }}m</span>
                </div>
                <div v-else>{{ formatActivity(k) }}</div>
              </td>
              <td class="p-3 text-muted text-xs text-right hidden md:table-cell">{{ k.id }}</td>
              <td class="p-3">
                <div class="flex items-center justify-end">
                  <template v-if="confirmingDelete === k.id">
                    <span class="text-xs text-muted mr-1">{{ $t('admin.apiKeys.confirmLabel') }}</span>
                    <button class="px-2 py-1 rounded-md text-xs font-semibold bg-red-500/15 text-red-500 border-none cursor-pointer hover:bg-red-500/25 transition-colors" @click="performDelete(k.id)">{{ $t('admin.apiKeys.delete') }}</button>
                    <button class="ml-1 px-2 py-1 rounded-md text-xs font-semibold bg-transparent text-muted border border-border cursor-pointer hover:text-[var(--c-text)] transition-colors" @click="confirmingDelete = null">{{ $t('admin.apiKeys.cancel') }}</button>
                  </template>
                  <template v-else>
                    <NDropdownMenu
                      :items="getActions(k)"
                      :_dropdown-menu-content="{ class: 'w-44', align: 'end', side: 'bottom' }"
                    >
                      <button class="shrink-0 bg-transparent border-none cursor-pointer text-sm px-1.5 py-0.5 rounded-md text-muted hover:text-[var(--c-text)] hover:bg-[var(--c-bg)] transition-colors leading-none flex items-center justify-center" aria-label="Key actions">
                        <NIcon name="i-tabler-dots-vertical" />
                      </button>
                    </NDropdownMenu>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="total > limit" class="flex items-center justify-center gap-3 mt-6 animate-in" style="animation-delay: 200ms">
        <button :disabled="page <= 1" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page--; fetchKeys()">
          ← {{ $t('admin.apiKeys.previous') }}
        </button>
        <span class="text-sm text-muted">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page++; fetchKeys()">
          {{ $t('admin.apiKeys.next') }} →
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const { user } = useUserSession()
const { locale } = useI18nLocale()

const keys = ref<any[]>([])
const loading = ref(true)
const page = ref(1)
const total = ref(0)
const limit = 20
const search = ref('')
const statusFilter = ref('all')
const confirmingDelete = ref<number | null>(null)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))

const statusOptions = [
  { value: 'all', label: $t('admin.apiKeys.filterAllStatuses') },
  { value: 'active', label: $t('admin.apiKeys.active') },
  { value: 'inactive', label: $t('admin.apiKeys.inactive') },
]

const filteredKeys = computed(() => {
  return keys.value.filter((k) => {
    const q = search.value.toLowerCase()
    const matchesSearch = !search.value || k.name.toLowerCase().includes(q) || k.key.toLowerCase().includes(q) || k.userName.toLowerCase().includes(q)
    const matchesStatus = statusFilter.value === 'all' || (statusFilter.value === 'active') === k.isActive
    return matchesSearch && matchesStatus
  })
})

onMounted(() => {
  if (!user.value) {
    navigateTo('/login')
    return
  }
  if (user.value.role !== 'admin') {
    navigateTo('/dashboard')
    return
  }
  fetchKeys()
})

async function fetchKeys() {
  loading.value = true
  try {
    const res = await $fetch<{ data: any[]; pagination: any }>(`/api/admin/api-keys?page=${page.value}&limit=${limit}`)
    keys.value = res.data
    total.value = res.pagination.total
  } catch {
    toast({ title: 'Error', description: 'Failed to load API keys.', toast: 'solid-red', duration: 4000 })
  } finally {
    loading.value = false
  }
}

function getActions(k: any) {
  const actions: any[] = [
    {
      label: k.isActive ? $t('admin.apiKeys.deactivate') : $t('admin.apiKeys.activate'),
      onclick: () => updateKey(k.id, { isActive: !k.isActive }),
    },
  ]
  actions.push({ label: $t('admin.apiKeys.delete'), onclick: () => { confirmingDelete.value = k.id }, dropdownMenuItem: 'text-red-500!' })
  return actions
}

async function updateKey(id: number, body: Record<string, unknown>) {
  try {
    await $fetch(`/api/admin/api-keys/${id}`, { method: 'PUT', body })
    await fetchKeys()
  } catch {}
}

async function performDelete(id: number) {
  confirmingDelete.value = null
  try {
    await $fetch(`/api/admin/api-keys/${id}`, { method: 'DELETE' })
    await fetchKeys()
    toast({ title: 'Key deleted', description: 'API key has been removed.', toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to delete API key.', toast: 'solid-red', duration: 4000 })
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatActivity(k: any) {
  if (k.lastUsedAt) {
    return `${$t('admin.apiKeys.lastUsed')} ${formatDate(k.lastUsedAt)}`
  }
  return `${$t('admin.apiKeys.createdOn')} ${formatDate(k.createdAt)}`
}
</script>

<style scoped>
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.animate-in {
  animation: fadeSlideUp 0.5s ease both;
}

.skeleton-pulse {
  background: var(--c-border);
  border-radius: 0.375rem;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.glow-admin {
  position: fixed;
  pointer-events: none;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(240, 93, 94, 0.06) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}
</style>
