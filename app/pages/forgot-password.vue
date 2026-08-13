<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-surface border border-border rounded-xl p-10 text-center">
      <h1 class="font-heading text-2xl font-bold mb-1">
        {{ $t('forgotPassword.title') }}
      </h1>
      <p class="text-muted text-sm mb-6">
        {{ $t('forgotPassword.subtitle') }}
      </p>

      <form
        class="text-left"
        @submit.prevent="submit"
      >
        <input
          v-model="email"
          type="email"
          required
          :placeholder="$t('forgotPassword.email')"
          class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary"
        >
        <p
          v-if="error"
          class="text-primary text-sm my-3"
        >
          {{ error }}
        </p>
        <p
          v-if="sent"
          class="text-sm my-3"
        >
          {{ $t('forgotPassword.sent') }}
        </p>
        <button
          type="submit"
          class="w-full mt-4 px-7 py-3 rounded-full bg-primary font-semibold text-sm cursor-pointer disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? $t('forgotPassword.loading') : $t('forgotPassword.submit') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const email = ref('')
const error = ref('')
const sent = ref(false)
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value },
    })
    sent.value = true
  } catch (e: any) {
    error.value = e.data?.statusMessage || $t('forgotPassword.error')
  } finally {
    loading.value = false
  }
}
</script>
