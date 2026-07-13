<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-surface border border-border rounded-xl p-10 text-center">
      <h1 class="font-heading text-2xl font-bold mb-1">{{ $t('login.title') }}</h1>
      <p class="text-muted text-sm mb-6">{{ $t('login.subtitle') }}</p>

      <form class="text-left" @submit.prevent="handleLogin">
        <div class="mb-3">
          <input v-model="email" type="email" :placeholder="$t('login.email')" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" :placeholder="$t('login.password')" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
        </div>

        <p v-if="error" class="text-primary text-sm mb-3">{{ error }}</p>

        <button type="submit" class="w-full inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600" :disabled="loading">
          {{ loading ? $t('login.loading') : $t('login.submit') }}
        </button>
      </form>

      <p class="mt-5 text-sm text-muted">
        {{ $t('login.noAccount') }}
        <NuxtLink to="/register" class="text-primary hover:underline">{{ $t('login.signup') }}</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const { fetch: refreshSession } = useUserSession()

useHead({
  title: 'Login | Tronche',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Log in to your Tronche account to manage your API keys and access avatar generation.' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.statusMessage || $t('login.error')
  } finally {
    loading.value = false
  }
}
</script>
