<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-[var(--c-bg)] text-[var(--c-text)]">
    <header class="sticky top-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-[var(--c-text)] hover:no-underline">
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="160" fill="#F05D5E" />
            <path d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="#2B2D42" transform="translate(0 0) rotate(15 40 40) scale(1.3)" />
            <path d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="#2B2D42" transform="translate(0 0) rotate(-10 40 40) scale(1.2)" />
          </svg>
          tronche
        </NuxtLink>

        <nav class="flex items-center gap-3">
          <NuxtLink to="/" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">Playground</NuxtLink>
          <NuxtLink to="/docs" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">Docs</NuxtLink>
          <a href="/api/avatar/test" target="_blank" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">API</a>
          <NuxtLink v-if="!user" to="/login" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">Connexion</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard" class="text-sm text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors no-underline">Dashboard</NuxtLink>
          <button v-if="user" class="text-sm text-[var(--c-muted)] border border-[var(--c-border)] rounded-full px-3.5 py-1 bg-transparent cursor-pointer transition-colors hover:text-primary hover:border-primary" @click="handleLogout">Déconnexion</button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-[var(--c-border)] py-6 px-5">
      <div class="max-w-240 mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p class="text-xs text-[var(--c-muted)] m-0">tronche — des avatars qui ont de la gueule</p>
        <div class="flex items-center gap-1.5 bg-[var(--c-surface)] rounded-full p-0.5 border border-[var(--c-border)]">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            class="text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors"
            :class="theme === option.value ? 'bg-primary text-white' : 'bg-transparent text-[var(--c-muted)] hover:text-[var(--c-text)]'"
            @click="set(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const { theme, set, cssVars } = useTheme()

const themeOptions = [
  { value: 'dark' as const, label: 'Sombre' },
  { value: 'light' as const, label: 'Clair' },
  { value: 'system' as const, label: 'Système' },
]

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
