type PloonScope = Record<string, unknown> & { entries?: { date: string; content: string }[] }

export function parsePloon(content: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  let scope = result as PloonScope
  let table = ''
  let columns: string[] = []
  const list = <T>(key: string) => ((scope[key] ??= []) as T[])

  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) {
      table = ''
      columns = []
      continue
    }

    const section = /^##\s+(.+)$/.exec(line)
    if (section) {
      scope = ((result[section[1]] ??= {}) as PloonScope)
      table = ''
      columns = []
      continue
    }

    const header = /^\[([^\]#]+)#\d+\]\(([^)]*)\)$/.exec(line)
    if (header) {
      table = header[1]
      columns = header[2].split(',').map((value) => value.trim()).filter(Boolean)
      list<Record<string, string>>(table)
      continue
    }

    if (table && /^\d+\|/.test(line)) {
      const values = line.split('|').slice(1)
      list<Record<string, string>>(table).push(
        Object.fromEntries(columns.map((column, index) => [column, values[index]?.trim() ?? ''])),
      )
      continue
    }

    const dateEntry = /^~(\d{4}-\d{2}-\d{2}):\s*(.*)$/.exec(line)
    if (dateEntry) {
      ;(scope.entries ??= []).push({ date: dateEntry[1], content: dateEntry[2] })
      table = ''
      columns = []
      continue
    }

    const keyValue = /^([^:]+):\s*(.*)$/.exec(line)
    if (keyValue) {
      scope[keyValue[1].trim()] = keyValue[2].trim()
      table = ''
      columns = []
    }
  }

  return result
}
