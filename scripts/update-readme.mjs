import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const packageJson = require('../projects/ngx-error-message/package.json')
const versionsConfig = require('../config/versions.json')

const newVersion = packageJson.version

// Prereleases (e.g. 4.0.0-next.1) are internal validation steps on the `next`
// dist-tag, not something users should pick from the compatibility table —
// only record a version once it ships on `latest`.
if (newVersion.includes('-')) {
  process.exit(0)
}

const angularVersion = versionsConfig.angularCompatibility
const tableHeader =
  /(\| ngx-error-message \| Angular\s+\|\n\| ----------------- \| ------------ \|\n)/

function addCompatibilityRow(filePath) {
  if (!existsSync(filePath)) {
    return
  }
  const content = readFileSync(filePath, 'utf8')
  if (content.includes(`| ${newVersion} `) || !tableHeader.test(content)) {
    return
  }
  const updatedContent = content.replace(
    tableHeader,
    `$1| ${newVersion}             | ${angularVersion} |\n`,
  )
  writeFileSync(filePath, updatedContent)
}

addCompatibilityRow('./README.md')
addCompatibilityRow('./docs/docs/intro.md')
