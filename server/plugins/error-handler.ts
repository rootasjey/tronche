export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    console.error('[Nitro Error]', {
      url: event.path,
      method: event.method,
      message: error.message,
      stack: error.stack,
      data: error.data,
      statusCode: error.statusCode,
    })
  })
})
