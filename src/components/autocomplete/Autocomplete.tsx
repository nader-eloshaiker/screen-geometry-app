// ./components/Autocomplete.tsx

import cn from 'classnames'
import { ChangeEvent, memo, useRef, useState } from 'react'
import MagnifyGlassIcon from '../../assets/icons/MagnifyGlass'
import { useElementSize } from '../../hooks/useElementSize'
import { InputSuffix, SuffixLocation } from '../input-suffix/InputSuffix'

export type TAutoCompleteItem = { id: string; label: string }
type TProps = TRestProps & {
  isLoading: boolean
  className?: string
  placeholder?: string
  items: Array<TAutoCompleteItem> // we are using this type for autocomplete
  value: string
  onChange(val: string): void
  onSelect(item: TAutoCompleteItem): void
}

// we are using dropdown, input and menu component from daisyui
export const AutoComplete = ({
  items = [],
  value = '',
  onChange = () => {},
  onSelect = () => {},
  className,
  placeholder,
  isLoading,
  ...rest
}: TProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divRef)
  // const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(items.length === 1 ? items[0].label : value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    setInputValue(event.target.value)
  }

  const handleSelect = (item: TAutoCompleteItem) => {
    setInputValue(item.label)
    onSelect(item)
    setOpen(false)
    // force close of the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return (
    <div
      data-testid='autoComplete'
      // use classnames here to easily toggle dropdown open
      className={cn(className, {
        'dropdown w-full relative': true,
        'dropdown-open': open,
      })}
      ref={divRef}
      {...rest}
    >
      <InputSuffix
        suffix={
          isLoading ? (
            <span data-testid='autoCompleteLoading' className='loading loading-spinner loading-md' />
          ) : (
            <MagnifyGlassIcon data-testid='autoCompleteIcon' className='h-6 w-6' />
          )
        }
        location={SuffixLocation.left}
      >
        <input
          name='autoCompleteInput'
          data-testid='autoCompleteInput'
          type='text'
          className='input input-md relative w-full pl-12 shadow-md'
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder || 'Type something..'}
          tabIndex={0}
          disabled={isLoading}
        />
      </InputSuffix>
      {items.length > 0 && (
        <div
          data-testid='autoCompleteResults'
          className='dropdown-content top-14 z-[1] max-h-80 flex-col overflow-auto rounded-md bg-base-200'
        >
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
                  className='w-full border-b border-b-base-content/10'
                >
                  <button>{item.label}</button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

const MemoAutocomplete = memo(AutoComplete)

export default MemoAutocomplete
