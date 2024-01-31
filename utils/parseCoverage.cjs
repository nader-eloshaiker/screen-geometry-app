/* eslint-disable @typescript-eslint/no-var-requires */
const jsonfile = require('jsonfile')
const { mkdirp } = require('mkdirp')

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
  .then(({ Coverage, Lines, Statements, Functions, Branches }) =>
    Promise.all([
      jsonfile.writeFile('./reports/badges/coverage.json', { Coverage }, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/lines.json', { Lines }, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/statements.json', { Statements }, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/functions.json', { Functions }, { spaces: 2 }),
      jsonfile.writeFile('./reports/badges/branches.json', { Branches }, { spaces: 2 }),
    ]),
  )
  .catch((err) => {
    console.error(err)
  })
