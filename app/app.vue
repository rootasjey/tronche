<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-[var(--c-bg)] text-[var(--c-text)]">
    <header class="sticky top-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-[var(--c-text)] hover:no-underline">
          <img src="/images/tronche-250.png" width="28" height="28" alt="Tronche" class="shrink-0">
          tronche
        </NuxtLink>

        <NNavigationMenu
          :items="navItems"
          size="sm"
          class="flex-initial"
          navigation-menu-link="ghost-white"
          :_navigation-menu-viewport="{
            una: {
              navigationMenuViewportWrapper: '!left-auto !right-0 !justify-end',
            },
          }"
        >
          <template #account-content="{ items }">
            <ul class="grid gap-1 p-1.5 w-44">
              <li v-for="item in items" :key="item.label">
                <NNavigationMenuContentItem v-bind="item" class="rounded-md w-full" />
              </li>
            </ul>
          </template>
        </NNavigationMenu>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-[var(--c-border)] py-6 px-5">
      <div class="max-w-240 mx-auto flex items-center justify-between gap-4 flex-wrap">
        <p class="text-xs text-[var(--c-muted)] m-0">{{ $t('footer.tagline') }}</p>
        <div class="flex items-center gap-3">
          <NCombobox
            v-model="selectedLocale"
            :items="locales"
            by="value"
            :_combobox-trigger="{
              size: 'xs',
              btn: 'ghost',
              class: 'text-xs font-semibold text-[var(--c-muted)] border border-[var(--c-border)] rounded-full px-3 py-1 cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)] uppercase min-w-0 w-auto',
              una: {
                btnDefaultVariant: 'btn-ghost',
              },
            }"
            size="xs"
            :_combobox-list="{
              align: 'end',
            }"
          >
            <template #trigger="{ modelValue }">
              {{ modelValue?.value?.toUpperCase() || locale.toUpperCase() }}
            </template>
          </NCombobox>
          <NCombobox
            v-model="selectedTheme"
            :items="themeOptions"
            by="value"
            :_combobox-trigger="{
              size: 'xs',
              btn: 'ghost',
              class: 'text-xs text-[var(--c-muted)] border border-[var(--c-border)] rounded-full px-3 py-1 cursor-pointer transition-colors hover:text-[var(--c-text)] hover:border-[var(--c-text)] min-w-0 w-auto',
              una: {
                btnDefaultVariant: 'btn-ghost',
              },
            }"
            size="xs"
            :_combobox-list="{
              align: 'end',
            }"
          >
            <template #trigger="{ modelValue }">
              {{ $t(modelValue?.label || 'theme.system') }}
            </template>
            <template #label="{ item }">
              {{ $t(item.label) }}
            </template>
          </NCombobox>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const { theme, set, cssVars } = useTheme()
const { locale } = useI18nLocale()
const { t, $switchLocale } = useI18n()

const locales = [
  { value: 'en', label: 'EN' },
  { value: 'fr', label: 'FR' },
]
const selectedLocale = computed({
  get: () => locales.find(l => l.value === locale.value),
  set: (val) => {
    if (val) $switchLocale(val.value)
  },
})

const selectedTheme = computed({
  get: () => themeOptions.find(o => o.value === theme.value),
  set: (val) => {
    if (val) set(val.value)
  },
})

const themeOptions = [
  { value: 'dark' as const, label: 'theme.dark' },
  { value: 'light' as const, label: 'theme.light' },
  { value: 'system' as const, label: 'theme.system' },
]

const navItems = computed(() => {
  const items = [
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.docs'), to: '/docs' },
    { label: t('nav.api'), to: '/api/avatar/test', target: '_blank' },
    { label: t('nav.about'), to: '/about' },
    { label: 'GitHub', to: 'https://github.com/rootasjey/tronche', target: '_blank' },
  ]

  if (!user.value) {
    items.push({ label: t('nav.login'), to: '/login' })
  } else {
    items.push({
      label: t('nav.account'),
      slot: 'account',
      items: [
        { label: t('nav.dashboard'), to: '/dashboard' },
        { label: t('nav.logout'), onSelect: handleLogout },
      ],
    })
  }

  return items
})

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
  font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
