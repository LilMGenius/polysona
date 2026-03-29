import { readdir } from 'node:fs/promises'

import { Hono } from 'hono'

import { parsePloon } from '../lib/ploon'

const apiRoutes = new Hono()
const version = '1.3.0'
const personasDir = './personas'
const draftsDir = './content/drafts'
const publishedDir = './content/published'

const FOLLOWER_ARCHETYPES = [
  { id: 'f01', label: '20s female office worker', age: 24, gender: 'F', occupation: 'office' },
  { id: 'f02', label: '30s male developer', age: 32, gender: 'M', occupation: 'dev' },
  { id: 'f03', label: '40s self-employed', age: 43, gender: 'M', occupation: 'self' },
  { id: 'f04', label: 'startup founder', age: 29, gender: 'M', occupation: 'founder' },
  { id: 'f05', label: 'general follower', age: 27, gender: 'F', occupation: 'general' },
  { id: 'f06', label: '20s male student', age: 21, gender: 'M', occupation: 'student' },
  { id: 'f07', label: '30s female marketer', age: 35, gender: 'F', occupation: 'marketing' },
  { id: 'f08', label: '40s male executive', age: 47, gender: 'M', occupation: 'executive' },
  { id: 'f09', label: '20s female creator', age: 23, gender: 'F', occupation: 'creator' },
  { id: 'f10', label: '30s male engineer', age: 31, gender: 'M', occupation: 'engineer' },
  { id: 'f11', label: '50s female entrepreneur', age: 52, gender: 'F', occupation: 'entrepreneur' },
  { id: 'f12', label: '20s non-binary designer', age: 26, gender: 'NB', occupation: 'design' },
  { id: 'f13', label: '30s male product manager', age: 34, gender: 'M', occupation: 'pm' },
  { id: 'f14', label: '40s female educator', age: 41, gender: 'F', occupation: 'education' },
  { id: 'f15', label: '20s male gamer', age: 22, gender: 'M', occupation: 'gaming' },
  { id: 'f16', label: '30s female researcher', age: 33, gender: 'F', occupation: 'research' },
  { id: 'f17', label: '40s male consultant', age: 44, gender: 'M', occupation: 'consulting' },
  { id: 'f18', label: '20s female influencer', age: 25, gender: 'F', occupation: 'influencer' },
  { id: 'f19', label: '30s male journalist', age: 37, gender: 'M', occupation: 'media' },
  { id: 'f20', label: '50s male investor', age: 55, gender: 'M', occupation: 'investor' },
] as const

const AGENT_DEFINITIONS = [
  { name: 'profiler', description: 'Deep psychology interviewer', skillFile: 'skills/interview/SKILL.md', badge: '10 frameworks' },
  { name: 'trendsetter', description: 'Trend detector', skillFile: 'skills/trend/SKILL.md', badge: 'WebSearch' },
  { name: 'content-writer', description: 'Platform content generator', skillFile: 'skills/content/SKILL.md', badge: '5 platforms' },
  { name: 'virtual-follower', description: 'QA simulator', skillFile: 'skills/qa/SKILL.md', badge: 'context: fork' },
  { name: 'admin', description: 'Publisher and tracker', skillFile: 'skills/publish/SKILL.md', badge: 'feedback loop' },
] as const

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

function deterministicScore(personaId: string, followerId: string, dimension: string, contentName = ''): number {
  const seed = `${personaId}-${followerId}-${dimension}-${contentName}`
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash |= 0
  }

  return 40 + Math.abs(hash % 56)
}

const listContentFiles = async (path: string) =>
  (await readDir(path))
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
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

apiRoutes.get('/personas/:id/qa-simulation', async (c) => {
  const id = c.req.param('id')
  const contentName = c.req.query('content') ?? ''
  const [persona, nuance, accounts] = await Promise.all([
    readPloonFile(`${personasDir}/${id}/persona.md`),
    readPloonFile(`${personasDir}/${id}/nuance.md`),
    readPloonFile(`${personasDir}/${id}/accounts.md`),
  ])

  if (!persona && !nuance && !accounts) {
    return c.notFound()
  }

  const followers = FOLLOWER_ARCHETYPES.map((archetype) => {
    const scores = {
      hook: deterministicScore(id, archetype.id, 'hook', contentName),
      empathy: deterministicScore(id, archetype.id, 'empathy', contentName),
      share: deterministicScore(id, archetype.id, 'share', contentName),
      cta: deterministicScore(id, archetype.id, 'cta', contentName),
      platform_fit: deterministicScore(id, archetype.id, 'platform_fit', contentName),
    }
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)

    return { ...archetype, scores, total }
  }).sort((left, right) => right.total - left.total)

  const top5Ids = new Set(followers.slice(0, 5).map((follower) => follower.id))
  const rankedFollowers = followers.map((follower) => ({
    ...follower,
    isTop5: top5Ids.has(follower.id),
  }))

  return c.json({
    personaId: id,
    contentName,
    followers: rankedFollowers,
    top5: rankedFollowers.slice(0, 5),
    generatedAt: new Date().toISOString(),
  })
})

apiRoutes.get('/agents/status', async (c) => {
  const skills = (await readDir('./skills')).filter((entry) => entry.isDirectory())
  const skillNames = new Set(skills.map((entry) => entry.name))

  const statuses = await Promise.all(
    AGENT_DEFINITIONS.map(async (agent) => {
      const skillDir = agent.skillFile.split('/')[1] ?? ''

      return {
        name: agent.name,
        description: agent.description,
        badge: agent.badge,
        status: 'idle' as const,
        agentFileExists: await Bun.file(`agents/${agent.name}.md`).exists(),
        skillFileExists: skillNames.has(skillDir) && await Bun.file(agent.skillFile).exists(),
        skillCount: skillNames.has(skillDir) ? 1 : 0,
        lastActivity: null,
      }
    }),
  )

  return c.json(statuses)
})

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
