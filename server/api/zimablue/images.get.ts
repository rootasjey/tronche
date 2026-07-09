export default defineEventHandler(async (event) => {
  const images = await fetchRandomImages(event, 18)

  const galleryImages = images.map((img) => ({
    id: img.id,
    name: img.name,
    slug: img.slug,
    description: img.description ?? '',
    w: img.w,
    h: img.h,
    url: getImageDisplayUrl(img, 'md'),
    thumbnailUrl: getImageDisplayUrl(img, 'xs'),
    tags: (img.tags ?? []).map(t => t.name),
  }))

  setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')
  return { success: true, data: galleryImages }
})
