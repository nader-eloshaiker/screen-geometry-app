import MagnifyGlassIcon from '@assets/icons/MagnifyGlass'
import { InputFix } from '@components/input-suffix/InputFix'
import { useElementSize } from '@hooks/useElementSize'
import { clsx } from 'clsx'
import { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react'

export type TListItem = { id: string; label: string }
type TProps = TRestProps & {
  items: Array<TListItem>
  isLoading: boolean
  className?: string
  placeholder?: string
  onChange?: (val: string) => void
  onSelect?: (item: TListItem) => void
  setClearHandler?: (func: () => void) => void
}

export const ListInputField = ({
  items = [],
  className,
  placeholder,
  isLoading,
  onChange = () => {},
  onSelect = () => {},
  setClearHandler = () => {},
  ...rest
}: TProps) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divRef)

  const handleClear = useCallback(() => {
    setInputValue('')
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value)
    setInputValue(target.value)
  }

  const handleSelect = (item: TListItem) => {
    setInputValue(item.label)
    onChange(item.label)
    onSelect(item)
    setOpen(false)
    // force close of the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, item: TListItem) => {
    if (event.code === 'Enter') {
      handleSelect(item)
    }
  }

  useEffect(() => {
    if (!setClearHandler || !handleClear) {
      return
    }

    setClearHandler(() => handleClear)
  }, [setClearHandler, handleClear])

  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={clsx(className, {
        'dropdown w-full': true,
        'dropdown-open': open,
      })}
      ref={divRef}
      {...rest}
    >
      <InputFix
        fix={
          isLoading ? <span className='loading loading-spinner loading-md' /> : <MagnifyGlassIcon className='h-6 w-6' />
        }
        fixStyle='left-0 ml-4'
      >
        <input
          name='ListInputFieldInput'
          type='text'
          className='input input-md relative w-full !pl-12 shadow-md'
          value={inputValue}
          onChange={handleChange}
          placeholder={isLoading ? 'Loading...' : placeholder ?? 'Type something...'}
          tabIndex={0}
          disabled={isLoading}
        />
      </InputFix>
      {items.length > 0 && (
        <div className='dropdown-content top-14 z-[1] max-h-80 flex-col overflow-auto rounded-md bg-base-200'>
          <ul
            className='menu'
            // use ref to calculate the width of parent
            style={{ width: width }}
          >
            {items.map((item, index) => {
              return (
                <li
                  key={item.id}
                  tabIndex={index + 1}
                  onClick={() => handleSelect(item)}
                  onKeyDown={(event) => handleKeyDown(event, item)}
                  className='w-full border-b border-b-base-content/10'
                >
                  <a>{item.label}</a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

const MemoListInputField = memo(ListInputField)

export default MemoListInputField
