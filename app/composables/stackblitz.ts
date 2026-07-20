import sdk from '@stackblitz/sdk'
import type { Project, OpenOptions } from '@stackblitz/sdk'
import { version } from '../../package.json'

const v = `^${version}`

const NUXT_PKG = JSON.stringify({
  name: 'tronche-nuxt-demo',
  private: true,
  scripts: { dev: 'nuxt dev', build: 'nuxt build', preview: 'nuxt preview' },
  dependencies: { tronche: v, nuxt: '^4' },
}, null, 2)

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
  solid: JSON.stringify({
    name: 'tronche-solid-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, 'solid-js': '^1.8' },
    devDependencies: { vite: '^6', 'vite-plugin-solid': '^2' },
  }, null, 2),
  svelte: JSON.stringify({
    name: 'tronche-svelte-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, svelte: '^5' },
    devDependencies: { vite: '^6', '@sveltejs/vite-plugin-svelte': '^5' },
  }, null, 2),
  lit: JSON.stringify({
    name: 'tronche-lit-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, lit: '^3' },
    devDependencies: { vite: '^6' },
  }, null, 2),
  angular: JSON.stringify({
    name: 'tronche-angular-demo',
    private: true,
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: { tronche: v, '@angular/core': '^19', '@angular/common': '^19', '@angular/platform-browser': '^19', 'zone.js': '^0.15' },
    devDependencies: { vite: '^6', '@analogjs/vite-plugin-angular': '^2.6', '@angular/compiler': '^19', '@angular/build': '^19', '@angular/compiler-cli': '^19' },
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
  nuxt: {
    project: {
      title: 'Tronche — Nuxt Demo',
      description: 'Tronche avatar library in Nuxt 4',
      template: 'node',
      files: {
        'package.json': NUXT_PKG,
        'nuxt.config.ts': [
          'export default defineNuxtConfig({',
          "  compatibilityDate: '2025-12-31',",
          "  modules: ['tronche/module'],",
          '})',
        ].join('\n'),
        'app.vue': [
          '<template>',
          '  <Avatar name="Clara Barton" variant="beam" />',
          '</template>',
        ].join('\n'),
      },
    },
    openFile: 'app.vue',
  },
  solid: {
    project: {
      title: 'Tronche — Solid Demo',
      description: 'Tronche avatar library in SolidJS',
      template: 'node',
      files: {
        'package.json': VITE_PKG.solid,
        'vite.config.js': "import { defineConfig } from 'vite'\nimport solid from 'vite-plugin-solid'\n\nexport default defineConfig({ plugins: [solid()] })",
        'index.html': '<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>',
        'src/main.jsx': "import { render } from 'solid-js/web'\nimport { App } from './App'\n\nrender(() => <App />, document.getElementById('root')!)",
        'src/App.jsx': [
          "import { Avatar } from 'tronche/solid'",
          '',
          'export default function App() {',
          '  return <Avatar name="Clara Barton" variant="beam" size={200} />',
          '}',
        ].join('\n'),
      },
    },
    openFile: 'src/App.jsx',
  },
  svelte: {
    project: {
      title: 'Tronche — Svelte Demo',
      description: 'Tronche avatar library in Svelte 5',
      template: 'node',
      files: {
        'package.json': VITE_PKG.svelte,
        'vite.config.js': "import { defineConfig } from 'vite'\nimport { svelte } from '@sveltejs/vite-plugin-svelte'\n\nexport default defineConfig({ plugins: [svelte()] })",
        'index.html': '<div id="app"></div>\n<script type="module" src="/src/main.js"></script>',
        'src/main.js': "import { mount } from 'svelte'\nimport App from './App.svelte'\n\nmount(App, { target: document.getElementById('app') })",
        'src/App.svelte': [
          '<script>',
          "  import { Avatar } from 'tronche/svelte'",
          '</script>',
          '',
          '<Avatar name="Clara Barton" variant="beam" size={200} />',
        ].join('\n'),
      },
    },
    openFile: 'src/App.svelte',
  },
  lit: {
    project: {
      title: 'Tronche — Lit Demo',
      description: 'Tronche avatar library in Lit 3',
      template: 'node',
      files: {
        'package.json': VITE_PKG.lit,
        'vite.config.js': "import { defineConfig } from 'vite'\n\nexport default defineConfig({})",
        'index.html': '<!doctype html>\n<html>\n<head>\n  <script type="module" src="/src/main.js"></script>\n</head>\n<body>\n  <tronche-avatar name="Clara Barton" variant="beam"></tronche-avatar>\n</body>\n</html>',
        'src/main.js': ["import 'tronche/lit'"].join('\n'),
      },
    },
    openFile: 'src/main.js',
  },
  angular: {
    project: {
      title: 'Tronche — Angular Demo',
      description: 'Tronche avatar library in Angular 19',
      template: 'node',
      files: {
        'package.json': VITE_PKG.angular,
        'vite.config.ts': [
          "import { defineConfig } from 'vite'",
          "import angular from '@analogjs/vite-plugin-angular'",
          "import { resolve } from 'path'",
          '',
          'export default defineConfig({',
          "  plugins: [angular({ tsconfig: resolve(__dirname, 'tsconfig.json') })],",
          '})',
        ].join('\n'),
        'tsconfig.json': JSON.stringify({
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'bundler',
            experimentalDecorators: true,
            useDefineForClassFields: false,
            skipLibCheck: true,
            strict: true,
          },
          include: ['src'],
        }, null, 2),
        'index.html': '<!doctype html>\n<html>\n<head>\n  <script type="module" src="/src/main.ts"></script>\n</head>\n<body>\n  <app-root></app-root>\n</body>\n</html>',
        'src/main.ts': "import 'zone.js'\nimport '@angular/compiler'\nimport { bootstrapApplication } from '@angular/platform-browser'\nimport { App } from './app.component'\n\nbootstrapApplication(App)",
        'src/app.component.ts': [
          "import { Component } from '@angular/core'",
          "import { TroncheAvatar } from 'tronche/angular'",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  standalone: true,',
          '  imports: [TroncheAvatar],',
          '  template: `',
          '    <tronche-avatar',
          '      name="Clara Barton"',
          '      variant="beam"',
          '    />',
          '  `',
          '})',
          'export class App {}',
        ].join('\n'),
      },
    },
    openFile: 'src/app.component.ts',
  },
}

export function openStackBlitz(framework: 'vanilla' | 'vue' | 'react' | 'nuxt' | 'solid' | 'svelte' | 'lit' | 'angular') {
  const config = projects[framework]
  if (!config) return

  const options: OpenOptions = {
    openFile: config.openFile,
    showSidebar: false,
    newWindow: true,
  }

  sdk.openProject(config.project, options)
}
