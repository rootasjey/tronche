export type Theme = 'dark' | 'light' | 'system'

export function useTheme() {
  const cookie = useCookie<Theme>('tronche-theme', {
    default: () => 'system',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const resolved = ref<Theme>('dark')

  function resolve() {
    if (cookie.value === 'system') {
      const prefersLight = import.meta.client && window.matchMedia('(prefers-color-scheme: light)').matches
      return prefersLight ? 'light' : 'dark'
    }
    return cookie.value
  }

  function apply() {
    resolved.value = resolve()
    document.documentElement.setAttribute('data-theme', resolved.value)
  }

  onMounted(() => {
    apply()
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', apply)
  })

  watch(cookie, apply)

  function set(t: Theme) {
    cookie.value = t
  }

  return { theme: readonly(cookie), resolved: readonly(resolved), set }
}
