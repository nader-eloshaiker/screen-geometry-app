/* eslint-disable @typescript-eslint/no-var-requires */
const jsonfile = require('jsonfile')
const { mkdirp } = require('mkdirp')
const https = require('https')
const fs = require('fs')

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
  message: String(message) + '%',
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
    mkdirp('./reports/badges')
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
      jsonfile.writeFile('./reports/badges/coverage.json', coverage, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/lines.json', lines, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/statements.json', statements, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/functions.json', functions, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/branches.json', branches, { spaces: 2 }),
    ])
  })
  .then(([{ coverage, lines, statements, functions, branches }]) => {
    downloadBadge(getBadgeUrl(coverage), './reports/badges/coverage.svg')
    downloadBadge(getBadgeUrl(lines), './reports/badges/lines.svg')
    downloadBadge(getBadgeUrl(statements), './reports/badges/statements.svg')
    downloadBadge(getBadgeUrl(functions), './reports/badges/functions.svg')
    downloadBadge(getBadgeUrl(branches), './reports/badges/branches.svg')
  })
  .catch((err) => {
    console.error(err)
  })
