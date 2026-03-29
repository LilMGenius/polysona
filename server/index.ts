import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import apiRoutes from './routes/api'

const app = new Hono()
const port = Number(process.env.PORT ?? 3000)
const isProduction = process.env.NODE_ENV === 'production'

app.route('/api', apiRoutes)

if (isProduction) {
  app.use('/assets/*', serveStatic({ root: './dist' }))
}

const htmlResponse = (filePath: string) => {
  const file = Bun.file(filePath)

  return new Response(file, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}

app.get('/', () => {
  if (isProduction) {
    return htmlResponse('./dist/index.html')
  }

  return htmlResponse('./client/index.html')
})

app.get('*', (c) => {
  if (c.req.path.startsWith('/api')) {
    return c.notFound()
  }

  if (isProduction && !c.req.path.includes('.')) {
    return htmlResponse('./dist/index.html')
  }

  if (!isProduction && !c.req.path.includes('.')) {
    return htmlResponse('./client/index.html')
  }

  return c.notFound()
})

console.log(`Polysona dashboard server listening on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
