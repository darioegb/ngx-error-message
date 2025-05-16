const fs = require('fs');
const packageJson = require('../projects/ngx-error-message/package.json');
const versionsConfig = require('../config/versions.json');
const readmePath = './README.md';

const newVersion = packageJson.version;
const angularVersion = versionsConfig.angularCompatibility;
const readmeContent = fs.readFileSync(readmePath, 'utf8');

const updatedReadmeContent = readmeContent.replace(
  /(\| ngx-error-message \| Angular\s+\|\n\| [-| ]+\| [-| ]+\|\n)/,
  `$1| ${newVersion}         | ${angularVersion} |\n`
);

fs.writeFileSync(readmePath, updatedReadmeContent);
