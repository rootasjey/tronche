<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-[var(--c-bg)] text-[var(--c-text)]">
    <header class="sticky top-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-[var(--c-text)] hover:no-underline">
          <img src="/images/tronche-250.png" width="28" height="28" alt="Tronche" class="shrink-0">
          <span class="font-heading">tronche</span>
        </NuxtLink>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-5">
      <div class="text-center max-w-lg">
        <div class="text-8xl font-heading font-bold text-primary/20 leading-none mb-4">
          {{ error.statusCode }}
        </div>
        <h1 class="text-3xl font-heading font-bold mb-3">
          {{ statusTitle }}
        </h1>
        <p class="text-muted text-lg leading-relaxed mb-8">
          {{ statusMessage }}
        </p>
        <div class="flex justify-center gap-3 flex-wrap">
          <NuxtLink to="/" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold no-underline hover:bg-primary-600 transition-colors">
            &larr; Back to home
          </NuxtLink>
          <NuxtLink to="/docs" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted no-underline hover:text-[var(--c-text)] hover:border-[var(--c-text)] transition-colors">
            Read the docs
          </NuxtLink>
        </div>
      </div>
    </main>

    <footer class="border-t border-[var(--c-border)] py-6 px-5">
      <div class="max-w-240 mx-auto text-center">
        <p class="text-xs text-[var(--c-muted)] m-0">SVG avatars, nothing like you.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage?: string; description?: string } }>()

const statusTitle = computed(() => {
  if (error.statusCode === 404) return 'Page not found'
  if (error.statusCode === 500) return 'Server error'
  return 'Something went wrong'
})

const statusMessage = computed(() => {
  if (error.statusCode === 404) return 'The page you\'re looking for doesn\'t exist or has been moved.'
  if (error.statusCode === 500) return 'An unexpected error occurred. Please try again later.'
  return error.description || 'An unexpected error occurred.'
})

useHead({
  title: `${error.statusCode} | Tronche`,
  meta: [
    { name: 'robots', content: 'noindex' },
    { name: 'description', content: error.statusCode === 404 ? 'Page not found - Tronche SVG avatar generator.' : 'Server error - Tronche SVG avatar generator.' },
  ],
})
</script>
