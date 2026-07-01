<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Connexion</h1>
      <p class="auth-sub">Créez-vous un compte pour gérer vos clés API</p>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <input v-model="email" type="email" placeholder="Email" class="input" />
        </div>
        <div class="field">
          <input v-model="password" type="password" placeholder="Mot de passe" class="input" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" class="btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <p class="auth-link">
        Pas encore de compte ?
        <NuxtLink to="/register">S'inscrire</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await refreshSession()
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.statusMessage || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 112px);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 380px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 40px 32px;
  text-align: center;
}

.auth-card h1 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.auth-sub {
  color: var(--c-muted);
  font-size: 0.85rem;
  margin-bottom: 24px;
}

form {
  text-align: left;
}

.field {
  margin-bottom: 12px;
}

.input {
  width: 100%;
  padding: 10px 14px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  color: var(--c-text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--c-accent);
}

.error {
  color: var(--c-accent);
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.btn-full {
  width: 100%;
  justify-content: center;
  margin-top: 4px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  background: var(--c-accent);
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--c-accent-hover);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-link {
  margin-top: 20px;
  font-size: 0.85rem;
  color: var(--c-muted);
}

.auth-link a {
  color: var(--c-accent);
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
