import MagnifyGlassIcon from '@assets/icons/MagnifyGlass'
import { InputFix } from '@components/input-suffix/InputFix'
import { useElementSize } from '@hooks/useElementSize'
import { clsx } from 'clsx'
import { ChangeEvent, KeyboardEvent, memo, useRef, useState } from 'react'

export type TAutoCompleteItem = { id: string; label: string }
type TProps = TRestProps & {
  isLoading: boolean
  className?: string
  placeholder?: string
  items: Array<TAutoCompleteItem> // we are using this type for autocomplete
  value: string
  onChange?: (val: string) => void
  onSelect?: (item: TAutoCompleteItem) => void
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
  const [inputValue, setInputValue] = useState(value)
  const { width } = useElementSize(divRef)
  const [open, setOpen] = useState(false)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value)
    setInputValue(target.value)
  }

  const handleSelect = (item: TAutoCompleteItem) => {
    setInputValue(item.label)
    onChange(item.label)
    onSelect(item)
    setOpen(false)
    // force close of the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, item: TAutoCompleteItem) => {
    if (event.code === 'Enter') {
      handleSelect(item)
    }
  }

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
          name='autoCompleteInput'
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

const MemoAutocomplete = memo(AutoComplete)

export default MemoAutocomplete
