<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-surface border border-border rounded-xl p-10 text-center">
      <h1 class="font-heading text-2xl font-bold mb-3">
        {{ $t('verifyEmail.title') }}
      </h1>
      <p class="text-muted text-sm">
        {{ message }}
      </p>
      <NuxtLink
        v-if="verified"
        to="/login"
        class="inline-block mt-6 text-primary hover:underline"
      >
        {{ $t('verifyEmail.login') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const route = useRoute()
const message = ref($t('verifyEmail.loading'))
const verified = ref(false)

onMounted(async () => {
  try {
    await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: { token: route.query.token },
    })
    message.value = $t('verifyEmail.success')
    verified.value = true
  } catch (e: any) {
    message.value = e.data?.statusMessage || $t('verifyEmail.error')
  }
})
</script>
