import { SearchDocuments } from './SearchDocuments'

describe('#search', () => {
  it('search should return a list of screens', async () => {
    expect(SearchDocuments.length).toBe(34)
  })
})
