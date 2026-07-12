import sdk from '@stackblitz/sdk'
import type { Project, OpenOptions } from '@stackblitz/sdk'
import { version } from '../../package.json'

const v = `^${version}`

const VITE_PKG = {
  vanilla: JSON.stringify({
    name: 'tronche-vanilla-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v },
    devDependencies: { vite: '^6' },
  }, null, 2),
  vue: JSON.stringify({
    name: 'tronche-vue-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, vue: '^3' },
    devDependencies: { vite: '^6', '@vitejs/plugin-vue': '^5' },
  }, null, 2),
  react: JSON.stringify({
    name: 'tronche-react-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, react: '^18', 'react-dom': '^18' },
    devDependencies: { vite: '^6', '@vitejs/plugin-react': '^4' },
  }, null, 2),
}

const projects: Record<string, { project: Project; openFile: string }> = {
  vanilla: {
    project: {
      title: 'Tronche — Vanilla JS Demo',
      description: 'Tronche avatar library in Vanilla JS',
      template: 'node',
      files: {
        'package.json': VITE_PKG.vanilla,
        'index.html': '<div id="app"></div>\n<script type="module" src="/main.js"></script>',
        'main.js': [
          "import { generateBeamSvg } from 'tronche'",
          '',
          "document.getElementById('app').innerHTML = generateBeamSvg('Clara Barton', ['#E07A5F', '#3D405B', '#81B29A', '#F4D06F', '#D8A47F'], { size: 200 })",
        ].join('\n'),
      },
    },
    openFile: 'main.js',
  },
  vue: {
    project: {
      title: 'Tronche — Vue 3 Demo',
      description: 'Tronche avatar library in Vue 3',
      template: 'node',
      files: {
        'package.json': VITE_PKG.vue,
        'vite.config.js': "import { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({ plugins: [vue()] })",
        'index.html': '<div id="app"></div>\n<script type="module" src="/src/main.js"></script>',
        'src/main.js': "import { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')",
        'src/App.vue': [
          '<script setup>',
          "import { Avatar } from 'tronche/vue'",
          '</script>',
          '',
          '<template>',
          '  <Avatar name="Clara Barton" variant="beam" :size="200" />',
          '</template>',
        ].join('\n'),
      },
    },
    openFile: 'src/App.vue',
  },
  react: {
    project: {
      title: 'Tronche — React Demo',
      description: 'Tronche avatar library in React',
      template: 'node',
      files: {
        'package.json': VITE_PKG.react,
        'vite.config.js': "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({ plugins: [react()] })",
        'index.html': '<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>',
        'src/main.jsx': "import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport App from './App'\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n)",
        'src/App.jsx': [
          "import { Avatar } from 'tronche/react'",
          '',
          'export default function App() {',
          '  return <Avatar name="Clara Barton" variant="beam" size={200} />',
          '}',
        ].join('\n'),
      },
    },
    openFile: 'src/App.jsx',
  },
}

export function openStackBlitz(framework: 'vanilla' | 'vue' | 'react') {
  const config = projects[framework]
  if (!config) return

  const options: OpenOptions = {
    openFile: config.openFile,
    showSidebar: false,
    newWindow: true,
  }

  sdk.openProject(config.project, options)
}
