<template>
  <section class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5 py-12">
    <div class="w-full max-w-lg bg-surface border border-border rounded-xl p-8 md:p-10">
      <h1 class="font-heading text-2xl font-bold mb-1">
        {{ $t('contact.title') }}
      </h1>
      <p class="text-muted text-sm mb-6">
        {{ $t('contact.subtitle') }}
      </p>

      <form
        class="space-y-3"
        @submit.prevent="submit"
      >
        <input
          v-model="form.name"
          required
          :placeholder="$t('contact.name')"
          class="field"
        >
        <input
          v-model="form.email"
          type="email"
          required
          :placeholder="$t('contact.email')"
          class="field"
        >
        <input
          v-model="form.subject"
          required
          :placeholder="$t('contact.subject')"
          class="field"
        >
        <textarea
          v-model="form.message"
          required
          rows="6"
          :placeholder="$t('contact.message')"
          class="field resize-y"
        />

        <p
          v-if="error"
          class="text-primary text-sm"
        >
          {{ error }}
        </p>
        <p
          v-if="sent"
          class="text-sm"
        >
          {{ $t('contact.sent') }}
        </p>

        <button
          type="submit"
          class="w-full px-7 py-3 rounded-full bg-primary font-semibold text-sm cursor-pointer disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? $t('contact.loading') : $t('contact.submit') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $t } = useI18n()
const form = reactive({ name: '', email: '', subject: '', message: '' })
const error = ref('')
const sent = ref(false)
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    sent.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch (e: any) {
    error.value = e.data?.statusMessage || $t('contact.error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.field {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 0.75rem;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  font-size: 0.875rem;
  outline: none;
}

.field:focus {
  border-color: var(--c-primary, #F05D5E);
}
</style>
