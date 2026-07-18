import { createSignal, createEffect } from 'solid-js'
import { Avatar } from 'tronche/solid'

type Theme = 'light' | 'dark' | 'system'

const PALETTES = [
  ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'],
  ['#5b1d99', '#0074b4', '#00b34c', '#ffd41f', '#fc6e3d'],
]

const VARIANTS = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'] as const

const THEME_LABELS: Record<Theme, string> = { light: '☀️ Light', dark: '🌙 Dark', system: '💻 System' }

function applyTheme(theme: Theme) {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'system' ? prefersDark : theme === 'dark'
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

export function App() {
  const [palette, setPalette] = createSignal(0)
  const [theme, setTheme] = createSignal<Theme>('system')
  const [menuOpen, setMenuOpen] = createSignal(false)

  createEffect(() => applyTheme(theme()))

  const currentTheme = () => theme()

  return (
    <div>
      <div style={{ display: 'flex', 'align-items': 'center', gap: '1rem', 'margin-bottom': '1.5rem', 'flex-wrap': 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen())}
            style={{
              padding: '.5rem 1rem',
              background: 'var(--btn-bg)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              'border-radius': '.5rem',
              cursor: 'pointer',
              'font-size': '.875rem',
            }}
          >
            {THEME_LABELS[currentTheme()]}
          </button>
          {menuOpen() && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                'margin-top': '.25rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                'border-radius': '.5rem',
                'box-shadow': '0 4px 12px rgba(0,0,0,.15)',
                overflow: 'hidden',
                'z-index': 10,
              }}
            >
              {(['light', 'dark', 'system'] as Theme[]).map(t => (
                <button
                  onClick={() => { setTheme(t); setMenuOpen(false) }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '.5rem 1rem',
                    background: currentTheme() === t ? 'var(--accent-bg)' : 'transparent',
                    color: 'var(--text)',
                    border: 'none',
                    cursor: 'pointer',
                    'font-size': '.875rem',
                    'text-align': 'left',
                    'white-space': 'nowrap',
                  }}
                >
                  {THEME_LABELS[t]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setPalette(p => (p + 1) % PALETTES.length)}
          style={{
            padding: '.5rem 1rem',
            background: 'var(--btn-bg)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            'border-radius': '.5rem',
            cursor: 'pointer',
            'font-size': '.875rem',
          }}
        >
          Change palette
        </button>
      </div>
      <div style={{ display: 'grid', 'grid-template-columns': 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
        {VARIANTS.map(v => (
          <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', gap: '.5rem' }}>
            <Avatar name="Clara Barton" variant={v} colors={PALETTES[palette()]} size={100} />
            <span style={{ 'font-size': '.75rem', color: 'var(--muted)' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
