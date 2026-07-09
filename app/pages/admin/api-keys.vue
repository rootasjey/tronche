<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8">
      <h1 class="text-3xl font-bold font-heading">{{ $t('admin.apiKeys.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('admin.apiKeys.subtitle') }}</p>
    </div>

    <div class="flex gap-2 mb-8 flex-wrap">
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

    <div v-if="loading" class="text-center py-20 text-muted">Loading...</div>

    <template v-else>
      <div class="bg-surface border border-border rounded-xl overflow-hidden">
        <div v-if="keys.length === 0" class="text-center py-10 text-muted">{{ $t('admin.apiKeys.noKeys') }}</div>
        <table v-else class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-950">
            <tr class="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.id') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.name') }}</th>
              <th class="p-3 font-semibold hidden lg:table-cell">{{ $t('admin.apiKeys.key') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.tier') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.status') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.apiKeys.user') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.apiKeys.lastUsed') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.apiKeys.createdAt') }}</th>
              <th class="p-3 font-semibold text-right">{{ $t('admin.users.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in keys" :key="k.id" class="border-b border-border last:border-none hover:bg-[var(--c-bg)]/50 transition-colors">
              <td class="p-3 text-muted text-xs">{{ k.id }}</td>
              <td class="p-3 font-semibold">{{ k.name }}</td>
              <td class="p-3 font-mono text-xs text-muted hidden lg:table-cell max-w-50 truncate">{{ k.key }}</td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full uppercase font-semibold bg-primary/15 text-primary">{{ k.tier }}</span>
              </td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="k.isActive ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'">
                  {{ k.isActive ? $t('admin.apiKeys.active') : $t('admin.apiKeys.inactive') }}
                </span>
              </td>
              <td class="p-3 text-xs">
                <span class="font-semibold text-[var(--c-text)]">{{ k.userName }}</span>
                <span class="ml-2 text-muted"> {{ k.userEmail }}</span>
              </td>
              <td class="p-3 text-muted text-xs hidden md:table-cell">{{ k.lastUsedAt ? formatDate(k.lastUsedAt) : $t('admin.apiKeys.neverUsed') }}</td>
              <td class="p-3 text-muted text-xs hidden md:table-cell">{{ formatDate(k.createdAt) }}</td>
              <td class="p-3 text-right">
                <NDropdownMenu
                  :items="getActions(k)"
                  :_dropdown-menu-content="{ class: 'w-44', align: 'end', side: 'bottom' }"
                >
                  <button class="bg-transparent border-none cursor-pointer text-sm tracking-wide px-1.5 py-0.5 rounded-md text-[var(--c-text)] hover:bg-[var(--c-bg)] transition-colors leading-none" aria-label="Actions">•••</button>
                </NDropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="total > limit" class="flex items-center justify-center gap-3 mt-6">
        <button :disabled="page <= 1" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page--; fetchKeys()">
          ← Prev
        </button>
        <span class="text-sm text-muted">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page++; fetchKeys()">
          Next →
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
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))

onMounted(() => {
  if (!user.value || user.value.role !== 'admin') {
    navigateTo('/login')
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
    navigateTo('/')
  } finally {
    loading.value = false
  }
}

function getActions(k: any) {
  return [
    {
      label: k.isActive ? $t('admin.apiKeys.deactivate') : $t('admin.apiKeys.activate'),
      onclick: () => updateKey(k.id, { isActive: !k.isActive }),
    },
    { label: $t('admin.apiKeys.delete'), onclick: () => deleteKey(k.id), dropdownMenuItem: 'text-red-500!' },
  ]
}

async function updateKey(id: number, body: Record<string, unknown>) {
  try {
    await $fetch(`/api/admin/api-keys/${id}`, { method: 'PUT', body })
    await fetchKeys()
  } catch {}
}

async function deleteKey(id: number) {
  if (!confirm($t('admin.apiKeys.confirmDelete'))) return
  try {
    await $fetch(`/api/admin/api-keys/${id}`, { method: 'DELETE' })
    await fetchKeys()
  } catch {}
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>
