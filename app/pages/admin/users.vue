<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8">
      <h1 class="text-3xl font-bold font-heading">{{ $t('admin.users.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('admin.users.subtitle') }}</p>
    </div>

    <div class="flex gap-2 mb-8 flex-wrap">
      <NuxtLink to="/admin" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.dashboard.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/users" class="px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-colors bg-primary text-[var(--c-text)] no-underline">
        {{ $t('admin.users.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/api-keys" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.apiKeys.title') }}
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-20 text-muted">Loading...</div>

    <template v-else>
      <div class="bg-surface border border-border rounded-xl overflow-hidden">
        <div v-if="users.length === 0" class="text-center py-10 text-muted">{{ $t('admin.users.noUsers') }}</div>
        <table v-else class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-950">
            <tr class="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
              <th class="p-3 font-semibold">{{ $t('admin.users.id') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.users.name') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.users.email') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.users.role') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.users.status') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.users.createdAt') }}</th>
              <th class="p-3 font-semibold text-right">{{ $t('admin.users.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.id" class="border-b border-border last:border-none hover:bg-[var(--c-bg)]/50 transition-colors">
              <td class="p-3 text-muted text-xs">{{ u.id }}</td>
              <td class="p-3 font-semibold">{{ u.name }}</td>
              <td class="p-3 text-muted hidden md:table-cell">{{ u.email }}</td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-[var(--c-bg)] text-muted border border-border'">
                  {{ u.role === 'admin' ? $t('admin.users.roleAdmin') : $t('admin.users.roleUser') }}
                </span>
              </td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.isActive ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'">
                  {{ u.isActive ? $t('admin.users.active') : $t('admin.users.inactive') }}
                </span>
              </td>
              <td class="p-3 text-muted text-xs hidden md:table-cell">{{ formatDate(u.createdAt) }}</td>
              <td class="p-3 text-right">
                <NDropdownMenu
                  :items="getActions(u)"
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
        <button :disabled="page <= 1" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page--; fetchUsers()">
          ← Prev
        </button>
        <span class="text-sm text-muted">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page++; fetchUsers()">
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

const users = ref<any[]>([])
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
  fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  try {
    const res = await $fetch<{ data: any[]; pagination: any }>(`/api/admin/users?page=${page.value}&limit=${limit}`)
    users.value = res.data
    total.value = res.pagination.total
  } catch {
    navigateTo('/')
  } finally {
    loading.value = false
  }
}

function getActions(u: any) {
  const actions: any[] = []

  if (u.role === 'user') {
    actions.push({ label: $t('admin.users.promote'), onclick: () => updateUser(u.id, { role: 'admin' }) })
  } else if (u.id !== user.value?.id) {
    actions.push({ label: $t('admin.users.demote'), onclick: () => updateUser(u.id, { role: 'user' }) })
  }

  if (u.isActive) {
    actions.push({ label: $t('admin.users.deactivate'), onclick: () => updateUser(u.id, { isActive: false }) })
  } else {
    actions.push({ label: $t('admin.users.activate'), onclick: () => updateUser(u.id, { isActive: true }) })
  }

  if (u.id !== user.value?.id) {
    actions.push({ label: $t('admin.users.delete'), onclick: () => deleteUser(u.id), dropdownMenuItem: 'text-red-500!' })
  }

  return actions
}

async function updateUser(id: number, body: Record<string, unknown>) {
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'PUT', body })
    await fetchUsers()
  } catch {}
}

async function deleteUser(id: number) {
  if (!confirm($t('admin.users.confirmDelete'))) return
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    await fetchUsers()
  } catch {}
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>
