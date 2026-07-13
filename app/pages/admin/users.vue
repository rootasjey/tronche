<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="glow glow-admin"></div>
    <div class="mb-8 animate-in" style="animation-delay: 0ms">
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

    <div class="flex items-center gap-3 mb-5 flex-wrap animate-in" style="animation-delay: 100ms">
      <div class="relative flex-1 min-w-50">
        <input v-model="search" type="text" :placeholder="$t('admin.users.searchPlaceholder')" class="w-full px-3.5 py-2 rounded-xl bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary transition-colors" />
      </div>
      <div class="flex gap-1.5 flex-wrap">
        <button v-for="r in roleOptions" :key="r.value" class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer" :class="roleFilter === r.value ? 'bg-primary text-[var(--c-text)] border-primary' : 'bg-transparent text-muted border-border hover:text-[var(--c-text)] hover:border-[var(--c-text)]'" @click="roleFilter = r.value">{{ r.label }}</button>
      </div>
      <div class="flex gap-1.5 flex-wrap">
        <button v-for="s in statusOptions" :key="s.value" class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer" :class="statusFilter === s.value ? 'bg-primary text-[var(--c-text)] border-primary' : 'bg-transparent text-muted border-border hover:text-[var(--c-text)] hover:border-[var(--c-text)]'" @click="statusFilter = s.value">{{ s.label }}</button>
      </div>
    </div>

    <div v-if="loading" class="bg-surface border border-border rounded-xl overflow-hidden">
      <div class="p-3 flex gap-4 border-b border-border">
        <div v-for="n in 5" :key="n" class="h-4 flex-1 rounded-md skeleton-pulse" />
      </div>
      <div v-for="n in 4" :key="n" class="p-3 flex gap-4 border-b border-border last:border-none" :style="{ '--skeleton-delay': `${(n - 1) * 0.08}s` }">
        <div v-for="m in 5" :key="m" class="h-4 flex-1 rounded-md skeleton-pulse" :class="m === 3 ? 'hidden md:block' : ''" />
      </div>
    </div>

    <template v-else>
      <div class="bg-surface border border-border rounded-xl overflow-hidden animate-in" style="animation-delay: 150ms">
        <div v-if="filteredUsers.length === 0" class="text-center py-12 text-muted">
          <p class="mb-1">{{ $t('admin.users.noUsers') }}</p>
          <p class="text-xs">{{ $t('admin.users.emptyHint') }}</p>
        </div>
        <table v-else class="w-full text-sm">
          <thead class="bg-gray-50 dark:bg-gray-950">
            <tr class="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
              <th class="p-3 font-semibold">{{ $t('admin.users.name') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.users.email') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.users.role') }}</th>
              <th class="p-3 font-semibold">{{ $t('admin.users.status') }}</th>
              <th class="p-3 font-semibold hidden md:table-cell">{{ $t('admin.users.createdAt') }}</th>
              <th class="p-3 font-semibold text-right hidden md:table-cell">{{ $t('admin.users.id') }}</th>
              <th class="p-3 font-semibold text-right">{{ $t('admin.users.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUsers" :key="u.id" class="border-b border-border last:border-none hover:bg-[var(--c-surface)] transition-colors">
              <td class="p-3 font-semibold">{{ u.name }}</td>
              <td class="p-3 text-muted hidden md:table-cell">{{ u.email }}</td>
              <td class="p-3">
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-[var(--c-bg)] text-muted border border-border'">
                  {{ u.role === 'admin' ? $t('admin.users.roleAdmin') : $t('admin.users.roleUser') }}
                </span>
              </td>
              <td class="p-3">
                <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.isActive ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="u.isActive ? 'bg-green-500' : 'bg-red-500'" />
                  {{ u.isActive ? $t('admin.users.active') : $t('admin.users.inactive') }}
                </span>
              </td>
              <td class="p-3 text-muted text-xs hidden md:table-cell">{{ formatDate(u.createdAt) }}</td>
              <td class="p-3 text-muted text-xs text-right hidden md:table-cell">{{ u.id }}</td>
              <td class="p-3">
                <div class="flex items-center justify-end">
                  <template v-if="confirmingDelete === u.id">
                    <span class="text-xs text-muted mr-1">{{ $t('admin.users.confirmLabel') }}</span>
                    <button class="px-2 py-1 rounded-md text-xs font-semibold bg-red-500/15 text-red-500 border-none cursor-pointer hover:bg-red-500/25 transition-colors" @click="performDelete(u.id)">{{ $t('admin.users.delete') }}</button>
                    <button class="ml-1 px-2 py-1 rounded-md text-xs font-semibold bg-transparent text-muted border border-border cursor-pointer hover:text-[var(--c-text)] transition-colors" @click="confirmingDelete = null">{{ $t('admin.users.cancel') }}</button>
                  </template>
                  <template v-else>
                    <NDropdownMenu
                      :items="getActions(u)"
                      :_dropdown-menu-content="{ class: 'w-44', align: 'end', side: 'bottom' }"
                    >
                      <button class="shrink-0 bg-transparent border-none cursor-pointer text-sm px-1.5 py-0.5 rounded-md text-muted hover:text-[var(--c-text)] hover:bg-[var(--c-bg)] transition-colors leading-none flex items-center justify-center" aria-label="User actions">
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
        <button :disabled="page <= 1" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page--; fetchUsers()">
          ← {{ $t('admin.users.previous') }}
        </button>
        <span class="text-sm text-muted">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-transparent text-muted hover:text-[var(--c-text)] transition-colors" @click="page++; fetchUsers()">
          {{ $t('admin.users.next') }} →
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const { user } = useUserSession()
const { locale } = useI18nLocale()

useHead({
  title: 'Admin Users | Tronche',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Tronche admin panel — manage registered users, roles, and account statuses.' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
})

const users = ref<any[]>([])
const loading = ref(true)
const page = ref(1)
const total = ref(0)
const limit = 20
const search = ref('')
const roleFilter = ref('all')
const statusFilter = ref('all')
const confirmingDelete = ref<number | null>(null)

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit)))

const roleOptions = [
  { value: 'all', label: $t('admin.users.filterAllRoles') },
  { value: 'admin', label: $t('admin.users.roleAdmin') },
  { value: 'user', label: $t('admin.users.roleUser') },
]

const statusOptions = [
  { value: 'all', label: $t('admin.users.filterAllStatuses') },
  { value: 'active', label: $t('admin.users.active') },
  { value: 'inactive', label: $t('admin.users.inactive') },
]

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const matchesSearch = !search.value || u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase())
    const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value
    const matchesStatus = statusFilter.value === 'all' || (statusFilter.value === 'active') === u.isActive
    return matchesSearch && matchesRole && matchesStatus
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
  fetchUsers()
})

async function fetchUsers() {
  loading.value = true
  try {
    const res = await $fetch<{ data: any[]; pagination: any }>(`/api/admin/users?page=${page.value}&limit=${limit}`)
    users.value = res.data
    total.value = res.pagination.total
  } catch {
    toast({ title: 'Error', description: 'Failed to load users.', toast: 'solid-red', duration: 4000 })
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
    actions.push({ label: $t('admin.users.delete'), onclick: () => { confirmingDelete.value = u.id }, dropdownMenuItem: 'text-red-500!' })
  }

  return actions
}

async function updateUser(id: number, body: Record<string, unknown>) {
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'PUT', body })
    await fetchUsers()
  } catch { /* ignore */ }
}

async function performDelete(id: number) {
  confirmingDelete.value = null
  try {
    await $fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    await fetchUsers()
    toast({ title: 'User deleted', description: 'User has been removed.', toast: 'solid-green', duration: 3000 })
  } catch {
    toast({ title: 'Error', description: 'Failed to delete user.', toast: 'solid-red', duration: 4000 })
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
