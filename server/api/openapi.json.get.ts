defineRouteMeta({
  openAPI: {
    tags: ['Internal'],
    summary: 'OpenAPI specification (filtered)',
    description: 'Returns the OpenAPI 3.1 specification for the Tronche API, excluding non-API routes.',
    operationId: 'getOpenApiSpec',
    responses: {
      200: { description: 'OpenAPI specification' },
    },
  },
})

const EXCLUDED_PATHS = new Set([
  '',
  '/__nuxt_error',
  '/_openapi.json',
  '/_swagger',
  '/docs/api',
])

const PUBLIC_TAGS = new Set(['Avatar', 'Auth'])

function hasApiMeta(_path: string, methods: Record<string, any>): boolean {
  for (const method of Object.values(methods)) {
    const tags = method.tags ?? []
    if (tags.some((t: string) => PUBLIC_TAGS.has(t))) {
      return true
    }
  }
  return false
}

export default defineEventHandler(async (event) => {
  const spec = await $fetch('/_openapi.json')

  for (const path of Object.keys(spec.paths)) {
    if (EXCLUDED_PATHS.has(path) || !hasApiMeta(path, spec.paths[path])) {
      delete spec.paths[path]
    }
  }

  return spec
})
