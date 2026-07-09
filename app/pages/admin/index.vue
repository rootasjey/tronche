<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="mb-8">
      <h1 class="text-3xl font-bold font-heading">{{ $t('admin.title') }}</h1>
      <p class="text-muted mt-1">{{ $t('admin.subtitle') }}</p>
    </div>

    <div class="flex gap-2 mb-8 flex-wrap">
      <NuxtLink to="/admin" class="px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-colors bg-primary text-[var(--c-text)] no-underline">
        {{ $t('admin.dashboard.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/users" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.users.title') }}
      </NuxtLink>
      <NuxtLink to="/admin/api-keys" class="px-4 py-2 rounded-full text-sm font-semibold border border-border cursor-pointer transition-colors text-muted hover:text-[var(--c-text)] hover:border-[var(--c-text)] no-underline">
        {{ $t('admin.apiKeys.title') }}
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-20 text-muted">Loading...</div>

    <template v-else-if="stats">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div class="bg-surface border border-border rounded-xl p-5">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.totalUsers') }}</p>
          <p class="text-3xl font-bold">{{ stats.users.total }}</p>
        </div>
        <div class="bg-surface border border-border rounded-xl p-5">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.stats.admins') }}</p>
          <p class="text-3xl font-bold">{{ stats.users.admins }}</p>
        </div>
        <div class="bg-surface border border-border rounded-xl p-5">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.totalKeys') }}</p>
          <p class="text-3xl font-bold">{{ stats.apiKeys.total }}</p>
        </div>
        <div class="bg-surface border border-border rounded-xl p-5">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.activeKeys') }}</p>
          <p class="text-3xl font-bold">{{ stats.apiKeys.active }}</p>
        </div>
      </div>

      <div class="bg-surface border border-border rounded-xl p-6">
        <h2 class="text-lg font-semibold mb-4">{{ $t('admin.stats.recentUsers') }}</h2>
        <div v-if="stats.recentUsers.length === 0" class="text-center py-6 text-muted">No users yet.</div>
        <div v-else class="flex flex-col gap-2">
          <div v-for="u in stats.recentUsers" :key="u.id" class="flex items-center justify-between p-3 bg-[var(--c-bg)] rounded-lg">
            <div>
              <span class="font-semibold text-sm">{{ u.name }}</span>
              <span class="text-xs text-muted ml-2">{{ u.email }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full font-semibold" :class="u.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-[var(--c-bg)] text-muted border border-border'">
                {{ u.role === 'admin' ? $t('admin.users.roleAdmin') : $t('admin.users.roleUser') }}
              </span>
              <span class="text-xs text-muted">{{ formatDate(u.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const { user } = useUserSession()
const { locale } = useI18nLocale()

const stats = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  if (!user.value || user.value.role !== 'admin') {
    navigateTo('/login')
    return
  }
  try {
    const res = await $fetch<{ data: any }>('/api/admin/stats')
    stats.value = res.data
  } catch {
    navigateTo('/')
  } finally {
    loading.value = false
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}
</script>
