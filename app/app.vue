<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-[var(--c-bg)] text-[var(--c-text)]">
    <header class="sticky top-0 z-50 border-b border-[var(--c-border)] bg-[var(--c-bg)]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-[var(--c-text)] hover:no-underline">
          <img src="/images/tronche-250.png" width="28" height="28" alt="Tronche" class="shrink-0">
          <span :class="isHome ? 'hidden' : 'font-heading'">tronche</span>
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

    <NToaster />

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
const route = useRoute()
const isHome = computed(() => route.path === '/')

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
    { label: t('nav.playground'), to: '/playground' },
    { label: t('nav.about'), to: '/about' },
    { label: 'GitHub', to: 'https://github.com/rootasjey/tronche', target: '_blank' },
  ]

  if (!user.value) {
    items.push({ label: t('nav.login'), to: '/login' })
  } else {
    const accountItems: any[] = [
      { label: t('nav.dashboard'), to: '/dashboard' },
    ]
    if (user.value.role === 'admin') {
      accountItems.push({ label: t('nav.admin'), to: '/admin' })
    }
    accountItems.push({ label: t('nav.logout'), onSelect: handleLogout })

    items.push({
      label: t('nav.account'),
      slot: 'account',
      items: accountItems,
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
  --c-syntax-tag: #f07178;
  --c-syntax-attr: #ffcb6b;
  --c-syntax-string: #c3e88d;
  --c-syntax-comment: #5a5a6a;
  --c-syntax-keyword: #c792ea;
  --c-syntax-number: #f78c6c;
}

[data-theme="light"] {
  --c-bg: #f5f5f0;
  --c-surface: #ffffff;
  --c-border: #e5e5e0;
  --c-text: #1a1a1a;
  --c-muted: #8a8a9a;
  --c-syntax-tag: #d73a49;
  --c-syntax-attr: #6f42c1;
  --c-syntax-string: #032f62;
  --c-syntax-comment: #6e7781;
  --c-syntax-keyword: #8250df;
  --c-syntax-number: #0550ae;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

.font-heading {
  font-family: 'Fraunces', serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.shiki {
  font-family: 'DM Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--c-border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.code-block {
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--c-border);
  margin-bottom: 1rem;
}

.code-block .shiki {
  border: none;
  border-radius: 0;
  margin: 0;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
}

.code-block-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--c-muted);
}

[data-theme="dark"] .shiki,
[data-theme="dark"] .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style, inherit) !important;
  font-weight: var(--shiki-dark-font-weight, inherit) !important;
  text-decoration: var(--shiki-dark-text-decoration, inherit) !important;
}

[data-theme="light"] .shiki,
[data-theme="light"] .shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
  font-style: var(--shiki-light-font-style, inherit) !important;
  font-weight: var(--shiki-light-font-weight, inherit) !important;
  text-decoration: var(--shiki-light-text-decoration, inherit) !important;
}

.copy-btn {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--c-border);
  background: transparent;
  color: var(--c-muted);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  color: var(--c-text);
  border-color: var(--c-text);
}

.copy-btn:active {
  transform: translateY(1px);
}

.copy-btn.copied {
  color: #22c55e;
  border-color: #22c55e;
  animation: copy-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes copy-pop {
  0% { transform: scale(1); }
  40% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
</style>
