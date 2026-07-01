<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-112px)] px-5">
    <div class="w-full max-w-sm bg-$surface border border-[#1e1e22] rounded-xl p-10 text-center">
      <h1 class="text-2xl font-bold mb-1">Créer un compte</h1>
      <p class="text-$muted text-sm mb-6">Pour générer des clés API et monitorer votre utilisation</p>

      <form class="text-left" @submit.prevent="handleRegister">
        <div class="mb-3">
          <input v-model="name" type="text" placeholder="Nom d'utilisateur" class="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0b] border border-[#1e1e22] text-white text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div class="mb-3">
          <input v-model="email" type="email" placeholder="Email" class="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0b] border border-[#1e1e22] text-white text-sm outline-none transition-colors focus:border-primary" />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" placeholder="Mot de passe (8+ caractères)" class="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0b] border border-[#1e1e22] text-white text-sm outline-none transition-colors focus:border-primary" />
        </div>

        <p v-if="error" class="text-primary text-sm mb-3">{{ error }}</p>

        <button type="submit" class="w-full inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-white font-semibold text-sm border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600" :disabled="loading">
          {{ loading ? 'Création...' : 'Créer mon compte' }}
        </button>
      </form>

      <p class="mt-5 text-sm text-$muted">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-primary hover:underline">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.statusMessage || "Erreur lors de l'inscription"
  } finally {
    loading.value = false
  }
}
</script>
