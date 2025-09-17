#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const componentsDir = path.join(__dirname, '..', 'src', 'components')
const indexPath = path.join(componentsDir, 'index.ts')

function parseExports(content) {
  const lines = content.split(/\r?\n/)
  const result = []
  const re = /^export\s+\{\s*default\s+as\s+([A-Za-z0-9_]+)\s*\}\s+from\s+["'](\.[^"']+)["'];?$/
  for (const line of lines) {
    const m = line.match(re)
    if (m) {
      const name = m[1]
      const rel = m[2]
      result.push({ name, rel })
    }
  }
  return result
}

async function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('Cannot find components index at', indexPath)
    process.exit(1)
  }
  const content = fs.readFileSync(indexPath, 'utf8')
  const exports = parseExports(content)
  let created = 0
  let skipped = 0

  for (const { name, rel } of exports) {
    const compPathTsx = path.join(componentsDir, rel + '.tsx')
    const compPathTs = path.join(componentsDir, rel + '.ts')
    const base = path.basename(rel)
    const storyPath = path.join(componentsDir, base + '.stories.tsx')

    // Only generate if component file exists
    if (!fs.existsSync(compPathTsx) && !fs.existsSync(compPathTs)) {
      skipped++
      continue
    }
    // Skip if story already exists
    if (fs.existsSync(storyPath)) {
      skipped++
      continue
    }

    const story = `import type { Meta, StoryObj } from "@storybook/react"\n` +
`import Icon from "./${base}"\n\n` +
`const meta: Meta<typeof Icon> = {\n` +
`  title: "Icons/${name}",\n` +
`  component: Icon,\n` +
`  args: { width: 24, height: 24, color: "currentColor" },\n` +
`}\n\n` +
`export default meta\n` +
`type Story = StoryObj<typeof Icon>\n\n` +
`export const Default: Story = {}\n`

    fs.writeFileSync(storyPath, story, 'utf8')
    created++
  }

  console.log(`Generated stories: ${created}, skipped: ${skipped}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

