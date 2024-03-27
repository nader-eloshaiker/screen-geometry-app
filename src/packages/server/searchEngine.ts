import { SearchItem } from '@packages/openapi/generated'
import { SearchDB } from '@packages/server/db/searchDB'
import MiniSearch, { SearchResult } from 'minisearch'

const searchEngine = new MiniSearch({
  fields: ['id', 'name', 'aspectRatio', 'diagonalSize', 'vRes', 'hRes'],
  storeFields: ['id', 'name', 'label', 'aspectRatio', 'diagonalSize', 'vRes', 'hRes'],
})

searchEngine.addAll(SearchDB)

export const search = (term: string) => {
  return (
    !term
      ? searchEngine.search(MiniSearch.wildcard)
      : searchEngine.search(term, {
          prefix: true,
          fuzzy: 0.2,
          boost: { name: 4, aspectRatio: 2, diagonalSize: 3, vRes: 1, hRes: 1 },
        })
  ) as Array<SearchResult & SearchItem>
}
