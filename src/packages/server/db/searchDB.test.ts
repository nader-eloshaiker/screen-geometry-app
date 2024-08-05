import { SearchDB } from './SearchDB'

describe('#search', () => {
  it('search should return a list of screens', async () => {
    expect(SearchDB.length).toBe(34)
  })
})
