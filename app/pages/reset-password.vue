<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-surface border border-border rounded-xl p-10 text-center">
      <h1 class="font-heading text-2xl font-bold mb-1">
        {{ $t('resetPassword.title') }}
      </h1>

      <form
        class="text-left mt-6"
        @submit.prevent="submit"
      >
        <input
          v-model="password"
          type="password"
          minlength="8"
          required
          :placeholder="$t('resetPassword.password')"
          class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--c-bg)] border border-border text-sm outline-none focus:border-primary"
        >

        <p
          v-if="message"
          class="text-sm my-3"
        >
          {{ message }}
        </p>
        <p
          v-if="error"
          class="text-primary text-sm my-3"
        >
          {{ error }}
        </p>

        <button
          type="submit"
          class="w-full mt-4 px-7 py-3 rounded-full bg-primary font-semibold text-sm cursor-pointer disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? $t('resetPassword.loading') : $t('resetPassword.submit') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const password = ref('')
const error = ref('')
const message = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: route.query.token, password: password.value },
    })
    message.value = $t('resetPassword.success')
  } catch (e: any) {
    error.value = e.data?.statusMessage || $t('resetPassword.error')
  } finally {
    loading.value = false
  }
}
</script>
