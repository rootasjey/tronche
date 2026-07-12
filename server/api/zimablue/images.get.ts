defineRouteMeta({
  openAPI: {
    tags: ['Gallery'],
    summary: 'Get gallery images',
    description: 'Fetch random gallery images from the ZimaBlue API. Returns 18 curated images with thumbnails for the gallery page.',
    operationId: 'getGalleryImages',
    responses: {
      200: { description: 'Array of gallery images with metadata' },
    },
  },
})

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
