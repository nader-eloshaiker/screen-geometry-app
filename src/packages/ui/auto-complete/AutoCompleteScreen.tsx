import { useCallback, useEffect, useState } from 'react'
import { ListInput, TListItem } from '../list-input'

type TProps<T> = {
  onSelectItem: (item: T) => void
  setClearSearchHandler?: (func: () => void) => void
  onSearch?: (term: string) => void
  searchList: Array<T>
  isFetching: boolean
} & TRestProps

export const AutoCompleteScreen = <T extends TListItem>({
  onSelectItem = () => {},
  setClearSearchHandler = () => {},
  onSearch = () => {},
  searchList,
  isFetching,
  ...rest
}: TProps<T>) => {
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})
  const [list, setList] = useState<Array<TListItem>>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSelect = (value: TListItem) => {
    if (!value) {
      return
    }

    const match = searchList.find((entry) => entry.id === value.id)
    if (match) {
      onSelectItem(match)
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
    <ListInput
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
