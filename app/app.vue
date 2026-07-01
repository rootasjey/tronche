<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="160" fill="#F05D5E" />
            <path d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="#2B2D42" transform="translate(0 0) rotate(15 40 40) scale(1.3)" />
            <path d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="#2B2D42" transform="translate(0 0) rotate(-10 40 40) scale(1.2)" />
          </svg>
          <span class="logo-text">tronche</span>
        </NuxtLink>

        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Playground</NuxtLink>
          <NuxtLink to="/docs" class="nav-link">Docs</NuxtLink>
          <a href="/api/avatar/test" class="nav-link" target="_blank">API</a>
          <NuxtLink v-if="!user" to="/login" class="nav-link">Connexion</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard" class="nav-link">Dashboard</NuxtLink>
          <button v-if="user" class="btn-logout" @click="handleLogout">Déconnexion</button>
        </nav>
      </div>
    </header>

    <main class="main">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>tronche — des avatars qui ont de la gueule</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  navigateTo('/')
}
</script>

<style>
:root {
  --c-bg: #0a0a0b;
  --c-surface: #141416;
  --c-border: #1e1e22;
  --c-text: #e8e8e8;
  --c-muted: #6b6b7b;
  --c-accent: #F05D5E;
  --c-accent-hover: #e04e4f;
  --radius: 12px;
  --max-w: 960px;
}

* {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0;
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(12px);
  z-index: 100;
}

.header-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.1rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--c-muted);
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--c-text);
}

.nav-link.router-link-exact-active {
  color: var(--c-accent);
}

.btn-logout {
  font-size: 0.875rem;
  color: var(--c-muted);
  background: none;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  padding: 4px 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-logout:hover {
  color: var(--c-accent);
  border-color: var(--c-accent);
}

.main {
  flex: 1;
}

.footer {
  border-top: 1px solid var(--c-border);
  padding: 24px 20px;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.8rem;
}
</style>
