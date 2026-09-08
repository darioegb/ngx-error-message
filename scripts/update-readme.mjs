import { readFileSync, writeFileSync } from 'node:fs'
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

const readmePath = './README.md'
const angularVersion = versionsConfig.angularCompatibility
const readmeContent = readFileSync(readmePath, 'utf8')

if (readmeContent.includes(`| ${newVersion} `)) {
  process.exit(0)
}

const updatedReadmeContent = readmeContent.replace(
  /(\| ngx-error-message \| Angular\s+\|\n\| ----------------- \| ------------ \|\n)/,
  `$1| ${newVersion}             | ${angularVersion} |\n`,
)

writeFileSync(readmePath, updatedReadmeContent)
