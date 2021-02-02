'use strict';

const fs = require('fs')
const replace = require('replace-in-file')

async function updateStatisticsView() {
  await fs.readFile('./templates/statistics.md', (err, data) => {
    if (err) throw err
    const options = {
      allowEmptyPaths: true,
      disableGlobs: true,
      files: 'README.md',
      from: /<!--views:github-stats:start-->[\s\S]*?<!--views:github-stats:end-->/gm,
      to: data.toString()
    }
    replaceContent(options)
  })
}

async function replaceContent(options) {
  try {
    const results = await replace(options)
    console.log('Replacement results:', results)
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

async function runWorkflow() {
  await updateStatisticsView();
}

runWorkflow();
