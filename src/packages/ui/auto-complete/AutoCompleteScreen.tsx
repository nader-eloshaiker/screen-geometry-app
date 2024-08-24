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
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSelect = (item: T) => {
    if (!item) {
      return
    }
    onSelectItem(item)
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

  // use the common auto complete component here.
  return (
    <ListInput<T>
      items={searchList}
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
