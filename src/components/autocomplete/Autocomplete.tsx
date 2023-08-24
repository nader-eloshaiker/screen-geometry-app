// ./components/Autocomplete.tsx

import cn from 'classnames'
import { ChangeEvent, memo, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { InputPlaceholder } from '../inputplaceholder/InputPlaceholder'

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
const Autocomplete = ({
  items = [],
  value = '',
  onChange = () => {},
  onSelect = () => {},
  className,
  placeholder,
  isLoading,
  ...rest
}: TProps) => {
  const { ref: divRef, width = 1 } = useResizeObserver<HTMLDivElement>()
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
      // use classnames here to easily toggle dropdown open
      className={
        cn({
          'dropdown w-full': true,
          'dropdown-open': open,
          relative: isLoading,
        }) + (className ? ' ' + className : '')
      }
      ref={divRef}
      {...rest}
    >
      {isLoading && (
        <InputPlaceholder className='absolute flex w-full h-full left-3/4'>
          <span className='z-10 flex items-center justify-center loading loading-spinner loading-md' />
        </InputPlaceholder>
      )}
      <input
        type='text'
        className={cn({ relative: isLoading }) + ' w-full input input-bordered input-md'}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder || 'Type something..'}
        tabIndex={0}
        disabled={isLoading}
      />
      {items.length > 0 && (
        <div className='z-40 flex-col overflow-auto rounded-md dropdown-content bg-base-200 top-14 max-h-80'>
          <ul
            className='menu menu-compact'
            // use ref to calculate the width of parent
            style={{ width: width }}
          >
            {items.map((item, index) => {
              return (
                <li
                  key={index}
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

const MemoAutocomplete = memo(Autocomplete)

export default MemoAutocomplete
