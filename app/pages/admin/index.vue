<template>
  <div class="max-w-240 mx-auto px-5 pt-10 pb-15">
    <div class="glow glow-admin"></div>
    <div class="mb-8 animate-in" style="animation-delay: 0ms">
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

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div v-for="n in 4" :key="n" class="bg-surface border border-border rounded-xl p-5 skeleton-card" :style="{ '--skeleton-delay': `${(n - 1) * 0.1}s` }">
        <div class="h-3 w-20 rounded-md skeleton-pulse mb-3" />
        <div class="h-8 w-16 rounded-md skeleton-pulse" />
      </div>
    </div>

    <template v-else-if="stats">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div class="bg-surface border border-border rounded-xl p-5 animate-in" style="animation-delay: 50ms">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.totalUsers') }}</p>
          <p class="text-3xl font-bold">{{ stats.users.total }}</p>
        </div>
        <div class="bg-surface border border-border rounded-xl p-5 animate-in" style="animation-delay: 100ms">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.stats.admins') }}</p>
          <p class="text-3xl font-bold">{{ stats.users.admins }}</p>
        </div>
        <div class="bg-surface border border-border rounded-xl p-5 animate-in" style="animation-delay: 150ms">
          <p class="text-xs text-muted uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.totalKeys') }}</p>
          <p class="text-3xl font-bold">{{ stats.apiKeys.total }}</p>
        </div>
        <div class="bg-surface border border-primary/30 rounded-xl p-5 animate-in" style="animation-delay: 200ms">
          <p class="text-xs text-primary uppercase font-semibold tracking-wide mb-1">{{ $t('admin.dashboard.activeKeys') }}</p>
          <p class="text-3xl font-bold text-primary">{{ stats.apiKeys.active }}</p>
        </div>
      </div>

      <div class="bg-surface border border-border rounded-xl p-6 animate-in" style="animation-delay: 250ms">
        <h2 class="text-lg font-semibold mb-4">{{ $t('admin.stats.recentUsers') }}</h2>
        <div v-if="stats.recentUsers.length === 0" class="text-center py-8 text-muted">
          <p class="mb-1">{{ $t('admin.users.noUsers') }}</p>
          <p class="text-xs">Users will appear here once they register.</p>
        </div>
        <div v-else class="flex flex-col gap-2">
          <div v-for="u in stats.recentUsers" :key="u.id" class="flex items-center justify-between p-3 bg-[var(--c-bg)] rounded-lg hover:bg-[var(--c-bg)]/80 transition-colors">
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
  if (!user.value) {
    navigateTo('/login')
    return
  }
  if (user.value.role !== 'admin') {
    navigateTo('/dashboard')
    return
  }
  try {
    const res = await $fetch<{ data: any }>('/api/admin/stats')
    stats.value = res.data
  } catch {
    toast({ title: 'Error', description: 'Failed to load admin stats.', toast: 'solid-red', duration: 4000 })
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

.skeleton-card {
  animation: fadeSlideUp 0.4s ease both;
  animation-delay: var(--skeleton-delay, 0s);
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
