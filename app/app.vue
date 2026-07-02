<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-[var(--c-bg)] text-[var(--c-text)]">
    <header class="sticky top-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-[var(--c-text)] hover:no-underline">
          <img src="/images/tronche-250.png" width="28" height="28" alt="Tronche" class="shrink-0">
          tronche
        </NuxtLink>

        <nav class="flex items-center gap-3">
          <NuxtLink to="/" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">{{ $t('nav.playground') }}</NuxtLink>
          <NuxtLink to="/docs" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">{{ $t('nav.docs') }}</NuxtLink>
          <a href="/api/avatar/test" target="_blank" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">{{ $t('nav.api') }}</a>
          <NuxtLink v-if="!user" to="/login" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">{{ $t('nav.login') }}</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">{{ $t('nav.dashboard') }}</NuxtLink>
          <button v-if="user" class="text-sm text-[var(--c-muted)] border border-[var(--c-border)] rounded-full px-3.5 py-1 bg-transparent cursor-pointer transition-colors hover:text-primary hover:border-primary" @click="handleLogout">{{ $t('nav.logout') }}</button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-[var(--c-border)] py-6 px-5">
      <div class="max-w-240 mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p class="text-xs text-[var(--c-muted)] m-0">{{ $t('footer.tagline') }}</p>
        <div class="flex items-center gap-3">
          <button
            class="text-xs font-semibold text-[var(--c-muted)] bg-transparent border border-[var(--c-border)] rounded-full px-3 py-1 cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)] uppercase"
            @click="toggleLocale"
          >
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button>
          <div class="flex items-center gap-1.5 bg-[var(--c-surface)] rounded-full p-0.5 border border-[var(--c-border)]">
            <button
              v-for="option in themeOptions"
              :key="option.value"
              class="text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors"
              :class="theme === option.value ? 'bg-primary hover:text-[var(--c-text)]' : 'bg-transparent text-[var(--c-muted)] hover:text-[var(--c-text)]'"
              @click="set(option.value)"
            >
              {{ $t(option.label) }}
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const { theme, set, cssVars } = useTheme()
const { locale } = useI18nLocale()
const { $switchLocale } = useI18n()

const themeOptions = [
  { value: 'dark' as const, label: 'theme.dark' },
  { value: 'light' as const, label: 'theme.light' },
  { value: 'system' as const, label: 'theme.system' },
]

function toggleLocale() {
  $switchLocale(locale.value === 'fr' ? 'en' : 'fr')
}

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  navigateTo('/')
}
</script>

<style>
:root,
[data-theme="dark"] {
  --c-bg: #0a0a0b;
  --c-surface: #141416;
  --c-border: #1e1e22;
  --c-text: #e8e8e8;
  --c-muted: #6b6b7b;
}

[data-theme="light"] {
  --c-bg: #f5f5f0;
  --c-surface: #ffffff;
  --c-border: #e5e5e0;
  --c-text: #1a1a1a;
  --c-muted: #8a8a9a;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
