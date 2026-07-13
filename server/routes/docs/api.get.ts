export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/html')

  const specUrl = '/api/openapi.json'
  const title = 'Tronche API'
  const description = 'Generate custom, SVG-based avatars from any username and color palette. Tronche provides a free API tier for avatar generation with support for 6 visual styles: beam, marble, pixel, sunset, ring, and bauhaus.'

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://tronche.app/images/tronche-og.jpeg" />
  <meta property="og:url" content="https://tronche.app/docs/api" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://tronche.app/images/tronche-og.jpeg" />
  <link rel="canonical" href="https://tronche.app/docs/api" />
  <title>${title}</title>
  <link rel="icon" href="/images/favicon.ico" />
  <style>
    .light-mode,.light-mode .dark-mode{--theme-background-1:#fff;--theme-background-2:#fafafa;--theme-background-3:rgb(245,245,245);--theme-color-1:#2a2f45;--theme-color-2:#757575;--theme-color-3:#8e8e8e;--theme-color-accent:#ef4444;--theme-background-accent:transparent;--theme-border-color:rgba(0,0,0,0.1)}
    .dark-mode{--theme-background-1:#171717;--theme-background-2:#262626;--theme-background-3:#2e2e2e;--theme-color-1:rgba(255,255,255,0.9);--theme-color-2:rgba(255,255,255,0.62);--theme-color-3:rgba(255,255,255,0.44);--theme-color-accent:#f87171;--theme-background-accent:transparent;--theme-border-color:rgba(255,255,255,0.1)}
    body{margin:0}
  </style>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest/dist/browser/standalone.js" defer></script>
</head>
<body>
  <script type="application/json" id="scalar-spec">{"url":"${specUrl}"}</script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const spec = JSON.parse(document.getElementById('scalar-spec').textContent)
      Scalar.createApiReference(document.body, {
        spec: spec.url,
        hideDownloadButton: false,
        showSidebar: true,
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        metaData: { title: '${title}', description: '${description}' },
      })
    })
  </script>
</body>
</html>`
})
