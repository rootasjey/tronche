import { createSignal } from 'solid-js'
import { Avatar } from 'tronche/solid'

const PALETTES = [
  ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'],
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'],
  ['#5b1d99', '#0074b4', '#00b34c', '#ffd41f', '#fc6e3d'],
]

const VARIANTS = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'] as const

export function App() {
  const [palette, setPalette] = createSignal(0)

  return (
    <div>
      <div style={{ "margin-bottom": "1.5rem", display: "flex", "align-items": "center", gap: "1rem" }}>
        <button
          onClick={() => setPalette((p + 1) % PALETTES.length)}
          style={{
            padding: ".5rem 1rem",
            background: "#27272a",
            color: "#e4e4e7",
            border: "1px solid #3f3f46",
            "border-radius": ".5rem",
            cursor: "pointer",
            "font-size": ".875rem",
          }}
        >
          Change palette
        </button>
      </div>
      <div class="grid">
        {VARIANTS.map(v => (
          <div class="card">
            <Avatar name="Clara Barton" variant={v} colors={PALETTES[palette]} size={100} />
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
