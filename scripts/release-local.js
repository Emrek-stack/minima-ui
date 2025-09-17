#!/usr/bin/env node
const { execSync } = require('node:child_process')

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

try {
  // Ensure Yarn Berry is active
  sh('corepack enable')
  sh('corepack prepare yarn@3.2.1 --activate')

  // Install, version bump (changesets), build and publish
  sh('corepack yarn install --immutable', { cwd: 'minimaui' })

  // Apply pending changesets to versions (if any)
  sh('corepack yarn version', { cwd: 'minimaui' })

  // Build all packages
  sh('corepack yarn build', { cwd: 'minimaui' })

  // Publish via changesets
  // Requires auth: either `yarn npm login` or `.npmrc` with NPM_TOKEN
  sh('corepack yarn release', { cwd: 'minimaui' })

  console.log('\nRelease completed successfully.')
} catch (err) {
  console.error('\nRelease failed:', err.message || err)
  process.exit(1)
}

