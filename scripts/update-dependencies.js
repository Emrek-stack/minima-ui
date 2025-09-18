#!/usr/bin/env node
const { execSync } = require('node:child_process')
const fs = require('fs')
const path = require('path')

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

function updatePackageJson(packagePath, packageName, newVersion) {
  const packageJsonPath = path.join(packagePath, 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  let updated = false

  // Dependencies güncelle - sadece "*" olanları güncelle
  if (packageJson.dependencies && packageJson.dependencies[packageName] === '*') {
    packageJson.dependencies[packageName] = newVersion
    updated = true
  }

  // DevDependencies güncelle - sadece "*" olanları güncelle
  if (packageJson.devDependencies && packageJson.devDependencies[packageName] === '*') {
    packageJson.devDependencies[packageName] = newVersion
    updated = true
  }

  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
    console.log(`✅ Updated ${packageName} to ${newVersion} in ${packagePath}`)
  }
}

function getPackageVersion(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    return null
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  return packageJson.version
}

try {
  console.log('\n🔄 Updating internal dependencies...')

  const packagesDir = path.join(__dirname, '..', 'packages')
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  // Her paket için versiyon bilgisini al
  const packageVersions = {}
  for (const packageName of packages) {
    const packagePath = path.join(packagesDir, packageName)
    const version = getPackageVersion(packagePath)
    if (version) {
      packageVersions[packageName] = version
    }
  }

  // Her paketteki diğer paketlere olan bağımlılıkları güncelle
  for (const packageName of packages) {
    const packagePath = path.join(packagesDir, packageName)
    
    for (const [depPackageName, version] of Object.entries(packageVersions)) {
      if (packageName !== depPackageName) {
        const fullPackageName = `@minimaui/${depPackageName}`
        updatePackageJson(packagePath, fullPackageName, version)
      }
    }
  }

  console.log('\n✅ Internal dependencies updated successfully!')
} catch (err) {
  console.error('\n❌ Failed to update dependencies:', err.message || err)
  process.exit(1)
}
