import { SearchStore } from './SearchStore'

describe('#search', () => {
  it('search should return a list of screens', async () => {
    expect(SearchStore.length).toBe(34)
  })
})
