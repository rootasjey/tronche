export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml')

  const pages = [
    { loc: 'https://tronche.app', changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://tronche.app/about', changefreq: 'monthly', priority: '0.6' },
    { loc: 'https://tronche.app/docs', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://tronche.app/gallery', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://tronche.app/playground', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://tronche.app/docs/api', changefreq: 'monthly', priority: '0.7' },
  ]

  const urls = pages.map(p => `
  <url>
    <loc>${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`
})
