import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const index = await readFile(join(dist, 'index.html'))
const screens = ['dashboard', 'weight-data', 'projects', 'import-export', 'settings']

for (let concept = 1; concept <= 6; concept += 1) {
  const routes = ['', ...screens]
  for (const screen of routes) {
    const route = `preview/${concept}${screen ? `/${screen}` : ''}/index.html`
    const output = join(dist, route)
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, index)
  }
}
