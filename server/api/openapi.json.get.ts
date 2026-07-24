defineRouteMeta({
  openAPI: {
    tags: ['Internal'],
    summary: 'OpenAPI specification',
    description: 'OpenAPI 3.1 specification for the public Tronche API.',
    operationId: 'getOpenApiSpec',
    responses: {
      200: { description: 'OpenAPI specification' },
    },
  },
})

export default defineEventHandler(() => {
  const HOST = 'https://tronche.cc'

  return {
    openapi: '3.1.0',
    info: {
      title: 'Tronche API',
      description: 'Generate custom, SVG-based avatars from any username and color palette. Tronche provides a free API tier for avatar generation with support for 6 visual styles: beam, marble, pixel, sunset, ring, and bauhaus.',
      version: '1.0.0',
    },
    servers: [{ url: HOST }],
    paths: {
      '/api/avatar/{name}': {
        get: {
          tags: ['Avatar'],
          summary: 'Generate an avatar',
          description: 'Generate a custom SVG avatar for any username. Supports 6 visual variants with configurable size, shape, and color palette. IP rate-limited to 1000 requests/minute.',
          operationId: 'generateAvatar',
          parameters: [
            { name: 'name', in: 'path', required: true, schema: { type: 'string' }, description: 'Username to generate an avatar for' },
            { name: 'variant', in: 'query', schema: { type: 'string', enum: ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus'], default: 'marble' }, description: 'Visual style variant' },
            { name: 'size', in: 'query', schema: { type: 'integer', minimum: 16, maximum: 512, default: 80 }, description: 'Avatar size in pixels (width and height)' },
            { name: 'square', in: 'query', schema: { type: 'boolean', default: false }, description: 'If true, removes border-radius for a square avatar' },
            { name: 'colors', in: 'query', schema: { type: 'string' }, description: 'Comma-separated hex color values (e.g. "FF6B6B,4ECDC4,45B7D1")' },
          ],
          responses: {
            200: { description: 'SVG image', content: { 'image/svg+xml': { schema: { type: 'string', format: 'binary' } } } },
            400: { description: 'Invalid variant or parameters' },
            429: { description: 'Rate limit exceeded' },
          },
        },
      },
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          description: 'Create a new account with email, name and password. Sets a session cookie on success.',
          operationId: 'register',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'name', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email', description: 'User email address' },
                    name: { type: 'string', description: 'Display name' },
                    password: { type: 'string', minLength: 8, description: 'Password (min 8 characters)' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Registration successful', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' } } } } } },
            400: { description: 'Invalid input' },
            409: { description: 'Email already registered' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Sign in',
          description: 'Authenticate with email and password. Sets a session cookie on success.',
          operationId: 'login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful' },
            400: { description: 'Email and password required' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Sign out',
          description: 'Clear the current user session.',
          operationId: 'logout',
          responses: {
            200: { description: 'Logout successful' },
          },
        },
      },
      '/api/auth/session': {
        get: {
          tags: ['Auth'],
          summary: 'Get current session',
          description: 'Returns the current authenticated user session, or null if not authenticated.',
          operationId: 'getSession',
          responses: {
            200: { description: 'Session data or null' },
          },
        },
      },
    },
  }
})
