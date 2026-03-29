import { readdir } from 'node:fs/promises'

import { Hono } from 'hono'

import { parsePloon } from '../lib/ploon'

const apiRoutes = new Hono()
const version = '1.2.1'
const personasDir = './personas'
const draftsDir = './content/drafts'
const publishedDir = './content/published'

const isMissingPath = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'

const readDir = async (path: string) => {
  try {
    return await readdir(path, { withFileTypes: true })
  } catch (error) {
    if (isMissingPath(error)) {
      return []
    }
    throw error
  }
}

const readPloonFile = async (path: string) => {
  const file = Bun.file(path)
  return (await file.exists()) ? parsePloon(await file.text()) : null
}

const listContentFiles = async (path: string) =>
  (await readDir(path))
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))

apiRoutes.notFound((c) => c.json({ error: 'not found' }, 404))

apiRoutes.get('/personas', async (c) => {
  const entries = (await readDir(personasDir)).filter((entry) => entry.isDirectory())
  const personas = await Promise.all(
    entries.map(async (entry) => {
      const persona = await readPloonFile(`${personasDir}/${entry.name}/persona.md`)
      return { id: entry.name, name: String(persona?.name ?? entry.name) }
    }),
  )

  return c.json(personas.sort((left, right) => left.id.localeCompare(right.id)))
})

apiRoutes.get('/personas/:id', async (c) => {
  const id = c.req.param('id')
  const files = await readDir(`${personasDir}/${id}`)
  if (!files.length) {
    return c.notFound()
  }

  const fileNames = new Set(files.filter((entry) => entry.isFile()).map((entry) => entry.name))
  const [persona, nuance, accounts] = await Promise.all([
    fileNames.has('persona.md') ? readPloonFile(`${personasDir}/${id}/persona.md`) : Promise.resolve(null),
    fileNames.has('nuance.md') ? readPloonFile(`${personasDir}/${id}/nuance.md`) : Promise.resolve(null),
    fileNames.has('accounts.md') ? readPloonFile(`${personasDir}/${id}/accounts.md`) : Promise.resolve(null),
  ])

  return c.json({ id, name: String(persona?.name ?? id), persona: persona ?? {}, nuance: nuance ?? {}, accounts: accounts ?? {} })
})

apiRoutes.get('/personas/:id/interview-log', async (c) => {
  const id = c.req.param('id')
  const persona = await readPloonFile(`${personasDir}/${id}/persona.md`)
  if (!persona) {
    return c.notFound()
  }

  const section = persona['interview-log']
  const interviewLog = Array.isArray(section)
    ? section
    : ((section as { entries?: { date: string; content: string }[] } | undefined)?.entries ?? [])

  return c.json({ id, interviewLog })
})

apiRoutes.get('/content/drafts', async (c) => c.json(await listContentFiles(draftsDir)))

apiRoutes.get('/content/published', async (c) => c.json(await listContentFiles(publishedDir)))

apiRoutes.get('/status', async (c) => {
  const personas = (await readDir(personasDir)).filter((entry) => entry.isDirectory())
  const drafts = await listContentFiles(draftsDir)
  const published = await listContentFiles(publishedDir)
  const timestamps = [
    ...personas.flatMap((entry) => [
      `${personasDir}/${entry.name}/persona.md`,
      `${personasDir}/${entry.name}/nuance.md`,
      `${personasDir}/${entry.name}/accounts.md`,
    ]),
    ...drafts.map((file) => `${draftsDir}/${file}`),
    ...published.map((file) => `${publishedDir}/${file}`),
  ].map((path) => Bun.file(path).lastModified)
  const lastActivity = Math.max(0, ...timestamps)

  return c.json({
    personaCount: personas.length,
    contentCount: drafts.length + published.length,
    lastActivity: lastActivity ? new Date(lastActivity).toISOString() : null,
    version,
  })
})

export default apiRoutes
