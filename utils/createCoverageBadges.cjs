/* eslint-disable @typescript-eslint/no-var-requires */
const jsonfile = require('jsonfile')
const { mkdirp } = require('mkdirp')
const https = require('https')
const fs = require('fs')
const outputPath = './docs/badges'

const getMessageColor = (percentage) => {
  let color = 'brightgreen'
  if (percentage < 50) {
    color = 'red'
  } else if (percentage < 65) {
    color = 'yellow'
  } else if (percentage < 80) {
    color = 'orange'
  }
  return color
}

const getBadgeObject = (label, message) => ({
  label,
  message: String(message.toFixed()) + '%',
  namedLogo: 'vitest',
  color: getMessageColor(message),
  labelColor: '#444d57',
})

const getBadgeUrl = (badgeObj) =>
  `https://img.shields.io/badge/${encodeURI(badgeObj.label)}-${encodeURI(badgeObj.message)}-${encodeURI(
    badgeObj.color,
  )}.svg?logo=${encodeURI(badgeObj.namedLogo)}`

const downloadBadge = (url, filename) =>
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Error downloading badge: ${res.statusMessage}`)
      return
    }

    const file = fs.createWriteStream(filename)
    res.pipe(file)
    file.on('finish', () => {
      file.close()
    })
  })

jsonfile
  .readFile('./reports/coverage/coverage-summary.json')
  .then((summary) => {
    const { total } = summary
    const { lines, statements, functions, branches } = total
    const Lines = lines.pct
    const Statements = statements.pct
    const Functions = functions.pct
    const Branches = branches.pct

    return Promise.resolve({ Coverage: Lines, Lines, Statements, Functions, Branches })
  })
  .then((data) =>
    mkdirp(outputPath)
      .then(() => Promise.resolve(data))
      .catch((err) => Promise.reject(err)),
  )
  .then(({ Coverage, Lines, Statements, Functions, Branches }) => {
    const coverage = getBadgeObject('Coverage', Coverage)
    const lines = getBadgeObject('Lines', Lines)
    const statements = getBadgeObject('Statements', Statements)
    const functions = getBadgeObject('Functions', Functions)
    const branches = getBadgeObject('Branches', Branches)

    return Promise.all([
      Promise.resolve({ coverage, lines, statements, functions, branches }),
      jsonfile.writeFile(outputPath + '/coverage.json', coverage, { spaces: 2 }),
      jsonfile.writeFile(outputPath + '/lines.json', lines, { spaces: 2 }),
      jsonfile.writeFile(outputPath + '/statements.json', statements, { spaces: 2 }),
      jsonfile.writeFile(outputPath + '/functions.json', functions, { spaces: 2 }),
      jsonfile.writeFile(outputPath + '/branches.json', branches, { spaces: 2 }),
    ])
  })
  .then(([{ coverage, lines, statements, functions, branches }]) => {
    downloadBadge(getBadgeUrl(coverage), outputPath + '/coverage.svg')
    downloadBadge(getBadgeUrl(lines), outputPath + '/lines.svg')
    downloadBadge(getBadgeUrl(statements), outputPath + '/statements.svg')
    downloadBadge(getBadgeUrl(functions), outputPath + '/functions.svg')
    downloadBadge(getBadgeUrl(branches), outputPath + '/branches.svg')
  })
  .catch((err) => {
    console.error(err)
  })
