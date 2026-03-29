import { Hono } from 'hono'

const apiRoutes = new Hono()

apiRoutes.get('/', (c) => {
  return c.json({
    message: 'Polysona dashboard API placeholder',
    status: 'ok',
  })
})

export default apiRoutes
