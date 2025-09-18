#!/usr/bin/env node
const { execSync } = require('node:child_process')
const fs = require('fs')
const path = require('path')

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

function bumpVersion(packagePath, bump) {
  const packageJsonPath = path.join(packagePath, 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    return null
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const currentVersion = packageJson.version
  const [major, minor, patch] = currentVersion.split('.').map(Number)
  
  let newVersion
  switch (bump) {
    case 'major':
      newVersion = `${major + 1}.0.0`
      break
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`
      break
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`
      break
    default:
      throw new Error(`Invalid bump type: ${bump}`)
  }
  
  packageJson.version = newVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
  
  console.log(`✅ Bumped ${path.basename(packagePath)} from ${currentVersion} to ${newVersion}`)
  return newVersion
}

function updateInternalDependencies(packagePath, packageVersions) {
  const packageJsonPath = path.join(packagePath, 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  let updated = false

  // Dependencies güncelle
  if (packageJson.dependencies) {
    for (const [depName, depVersion] of Object.entries(packageJson.dependencies)) {
      if (depName.startsWith('@minimaui/') && depVersion === '*') {
        const pkgName = depName.replace('@minimaui/', '')
        if (packageVersions[pkgName]) {
          packageJson.dependencies[depName] = packageVersions[pkgName]
          updated = true
        }
      }
    }
  }

  // DevDependencies güncelle
  if (packageJson.devDependencies) {
    for (const [depName, depVersion] of Object.entries(packageJson.devDependencies)) {
      if (depName.startsWith('@minimaui/') && depVersion === '*') {
        const pkgName = depName.replace('@minimaui/', '')
        if (packageVersions[pkgName]) {
          packageJson.devDependencies[depName] = packageVersions[pkgName]
          updated = true
        }
      }
    }
  }

  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
    console.log(`✅ Updated internal dependencies in ${path.basename(packagePath)}`)
  }
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

  // Install dependencies
  console.log('\n📦 Installing dependencies...')
  sh('yarn install')

  // Bump versions for all workspaces individually
  console.log(`\n📈 Bumping versions with '${bump}'...`)
  const packages = ['icons', 'toolbox', 'ui', 'ui-preset']
  const packageVersions = {}
  
  for (const pkg of packages) {
    const packagePath = path.join(__dirname, '..', 'packages', pkg)
    const newVersion = bumpVersion(packagePath, bump)
    if (newVersion) {
      packageVersions[pkg] = newVersion
    }
  }

  // Update internal dependencies
  console.log('\n🔄 Updating internal dependencies...')
  for (const pkg of packages) {
    const packagePath = path.join(__dirname, '..', 'packages', pkg)
    updateInternalDependencies(packagePath, packageVersions)
  }

  // Build all packages
  console.log('\n🔨 Building all packages...')
  sh('yarn workspaces foreach -tv run build')

  // Publish all workspaces to npm
  console.log('\n📤 Publishing to npm...')
  sh('yarn workspaces foreach --no-private -tv exec npm publish --access public')

  console.log(`\n✅ Published all workspaces with '${bump}' bump successfully!`)
} catch (err) {
  console.error('\n❌ Release failed:', err.message || err)
  process.exit(1)
}
