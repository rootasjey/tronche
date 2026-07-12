import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

export default defineNuxtPlugin(async () => {
  const highlighter = await createHighlighterCore({
    themes: [
      () => import('shiki/themes/github-dark.mjs').then(m => m.default),
      () => import('shiki/themes/github-light.mjs').then(m => m.default),
    ],
    langs: [
      () => import('shiki/langs/javascript.mjs').then(m => m.default),
      () => import('shiki/langs/typescript.mjs').then(m => m.default),
      () => import('shiki/langs/html.mjs').then(m => m.default),
      () => import('shiki/langs/shellscript.mjs').then(m => m.default),
      () => import('shiki/langs/tsx.mjs').then(m => m.default),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  const langMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    tsx: 'tsx',
    vue: 'html',
    html: 'html',
    sh: 'shellscript',
    shell: 'shellscript',
    bash: 'shellscript',
  }

  function highlight(code: string, lang: string): string {
    const resolvedLang = langMap[lang] || lang
    try {
      return highlighter.codeToHtml(code, {
        lang: resolvedLang,
        themes: {
          dark: 'github-dark',
          light: 'github-light',
        },
        defaultColor: false,
      })
    }
    catch {
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      return `<pre class="shiki"><code>${escaped}</code></pre>`
    }
  }

  return {
    provide: { highlight },
  }
})
