<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0b] text-white font-sans antialiased">
    <header class="sticky top-0 z-50 border-b border-[#1e1e22] bg-[#0a0a0b]/80 backdrop-blur-md">
      <div class="max-w-240 mx-auto px-5 h-14 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg no-underline text-white hover:no-underline">
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="160" fill="#F05D5E" />
            <path d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" fill="#2B2D42" transform="translate(0 0) rotate(15 40 40) scale(1.3)" />
            <path d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" fill="#2B2D42" transform="translate(0 0) rotate(-10 40 40) scale(1.2)" />
          </svg>
          tronche
        </NuxtLink>

        <nav class="flex items-center gap-3">
          <NuxtLink to="/" class="text-sm text-[#6b6b7b] hover:text-white transition-colors no-underline">Playground</NuxtLink>
          <NuxtLink to="/docs" class="text-sm text-[#6b6b7b] hover:text-white transition-colors no-underline">Docs</NuxtLink>
          <a href="/api/avatar/test" target="_blank" class="text-sm text-[#6b6b7b] hover:text-white transition-colors no-underline">API</a>
          <NuxtLink v-if="!user" to="/login" class="text-sm text-[#6b6b7b] hover:text-white transition-colors no-underline">Connexion</NuxtLink>
          <NuxtLink v-if="user" to="/dashboard" class="text-sm text-[#6b6b7b] hover:text-white transition-colors no-underline">Dashboard</NuxtLink>
          <button v-if="user" class="text-sm text-[#6b6b7b] border border-[#1e1e22] rounded-full px-3.5 py-1 bg-transparent cursor-pointer transition-colors hover:text-primary hover:border-primary" @click="handleLogout">Déconnexion</button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="border-t border-[#1e1e22] py-6 px-5 text-center text-xs text-[#6b6b7b]">
      tronche — des avatars qui ont de la gueule
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
