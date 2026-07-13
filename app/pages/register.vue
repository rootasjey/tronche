<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-surface border border-border rounded-xl p-10 text-center">
      <h1 class="font-heading text-2xl font-bold mb-1">{{ $t('register.title') }}</h1>
      <p class="text-muted text-sm mb-6">{{ $t('register.subtitle') }}</p>

      <form class="text-left" @submit.prevent="handleRegister">
        <div class="mb-3">
          <input v-model="name" type="text" :placeholder="$t('register.username')" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div class="mb-3">
          <input v-model="email" type="email" :placeholder="$t('register.email')" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" :placeholder="$t('register.password')" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border hover:text-[var(--c-text)] text-sm outline-none transition-colors focus:border-primary" />
        </div>

        <p v-if="error" class="text-primary text-sm mb-3">{{ error }}</p>

        <button type="submit" class="w-full inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary hover:text-[var(--c-text)] font-semibold text-sm border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600" :disabled="loading">
          {{ loading ? $t('register.loading') : $t('register.submit') }}
        </button>
      </form>

      <p class="mt-5 text-sm text-muted">
        {{ $t('register.hasAccount') }}
        <NuxtLink to="/login" class="text-primary hover:underline">{{ $t('register.login') }}</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const { fetch: refreshSession } = useUserSession()

useHead({
  title: 'Register | Tronche',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Create a Tronche account to get API keys for avatar generation. Free tier available with 6 avatar styles.' },
  ],
  link: [
    { rel: 'canonical', href: `https://tronche.app${route.path}` },
  ],
})

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.statusMessage || $t('register.error')
  } finally {
    loading.value = false
  }
}
</script>
