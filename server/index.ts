import { existsSync } from 'node:fs'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import apiRoutes from './routes/api'

const app = new Hono()
const port = Number(process.env.PORT ?? 3000)
const hostname = process.env.HOST ?? '127.0.0.1'
const isProduction = process.env.NODE_ENV === 'production'
const serveBuiltClient = isProduction || existsSync('./dist/index.html')

app.route('/api', apiRoutes)

if (serveBuiltClient) {
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
  if (serveBuiltClient) {
    return htmlResponse('./dist/index.html')
  }

  return htmlResponse('./client/index.html')
})

app.get('*', (c) => {
  if (c.req.path.startsWith('/api')) {
    return c.notFound()
  }

  if (serveBuiltClient && !c.req.path.includes('.')) {
    return htmlResponse('./dist/index.html')
  }

  if (!serveBuiltClient && !c.req.path.includes('.')) {
    return htmlResponse('./client/index.html')
  }

  return c.notFound()
})

console.log(`Polysona dashboard server listening on http://${hostname}:${port}`)

if (hostname !== '127.0.0.1' && hostname !== 'localhost') {
  console.warn(
    `WARNING: bound to ${hostname}, so persona files are reachable from the network. ` +
      'This server has no authentication.',
  )
}

export default {
  port,
  hostname,
  fetch: app.fetch,
}
