import ListInputField, { TListItem } from '@components/common/list-input-fIeld/ListInputField'
import { SearchItem } from '@openapi/generated'
import { SearchScreenItem } from '@openapi/models'
import { transformSearchData } from '@utils/DataTransformation'
import { useCallback, useEffect, useState } from 'react'

type TProps = TRestProps & {
  onSelectScreen: (item: SearchScreenItem) => void
  setClearSearchHandler?: (func: () => void) => void
  onSearch?: (term: string) => void
  searchList: Array<SearchItem>
  isFetching: boolean
}

export const AutoCompleteScreen = ({
  onSelectScreen = () => {},
  setClearSearchHandler = () => {},
  onSearch = () => {},
  searchList,
  isFetching,
  ...rest
}: TProps) => {
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})
  const [list, setList] = useState<Array<TListItem>>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSelect = (value: TListItem) => {
    if (!value) {
      return
    }

    const match = searchList.find((entry) => entry.id === value.id)
    if (match) {
      const screen = transformSearchData(match)
      onSelectScreen(screen)
    }
  }

  const handleResetSearch = useCallback(() => {
    clearHandler()
  }, [clearHandler])

  useEffect(() => {
    onSearch(searchTerm)
  }, [onSearch, searchTerm])

  useEffect(() => {
    if (!setClearSearchHandler || !handleResetSearch) {
      return
    }

    setClearSearchHandler(() => handleResetSearch)
  }, [setClearSearchHandler, handleResetSearch])

  useEffect(() => {
    const newResponse = searchList ?? []
    const newList = newResponse.map(({ id, label }) => ({ id, label }))

    setList(newList)
  }, [searchList])

  // use the common auto complete component here.
  return (
    <ListInputField
      items={list}
      onChange={setSearchTerm}
      onSelect={handleSelect}
      setClearHandler={setClearHandler}
      placeholder='Type to filter list...'
      isLoading={isFetching}
      disableOnLoading={false}
      {...rest}
    />
  )
}
