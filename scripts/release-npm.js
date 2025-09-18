#!/usr/bin/env node
const { execSync } = require('node:child_process')

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = { bump: 'minor' } // Default olarak minor versiyon
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if ((a === '--bump' || a === '-b') && args[i + 1]) {
      out.bump = args[++i]
    }
  }
  return out
}

const validBumps = new Set([
  'patch', 'minor', 'major',
  'prepatch', 'preminor', 'premajor', 'prerelease',
])

try {
  const { bump } = parseArgs()
  if (!validBumps.has(bump)) {
    console.error(`Invalid --bump value: ${bump}. Use one of: ${Array.from(validBumps).join(', ')}`)
    process.exit(1)
  }

  console.log(`\n🚀 Starting release process with '${bump}' version bump...`)

  // Install deps with npm workspaces
  console.log('\n📦 Installing dependencies...')
  try {
    sh('npm ci --workspaces', { cwd: 'minimaui' })
  } catch (e) {
    console.warn('\n`npm ci` failed; falling back to `npm install`...')
    sh('npm install --workspaces', { cwd: 'minimaui' })
  }

  // Bump version for each workspace individually
  console.log(`\n📈 Bumping versions with '${bump}'...`)
  const packages = ['icons', 'toolbox', 'ui', 'ui-preset']
  
  for (const pkg of packages) {
    console.log(`Bumping ${pkg}...`)
    sh(`npm version ${bump} --no-git-tag-version`, { cwd: `minimaui/packages/${pkg}` })
  }

  // Update internal dependencies between packages after version bump
  console.log('\n🔄 Updating internal dependencies...')
  sh('npm run update-deps', { cwd: 'minimaui' })

  // Build all packages (only where build script exists)
  console.log('\n🔨 Building all packages...')
  sh('npm run build --workspaces --if-present', { cwd: 'minimaui' })

  // Publish all workspaces to npm
  // Requires auth: `npm login` or an `.npmrc` with NPM_TOKEN
  console.log('\n📤 Publishing to npm...')
  sh('npm publish --workspaces --access public', { cwd: 'minimaui' })

  console.log(`\n✅ Published all workspaces with '${bump}' bump successfully!`)
} catch (err) {
  console.error('\n❌ Release failed:', err.message || err)
  process.exit(1)
}
