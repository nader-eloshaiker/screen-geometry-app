import CloseIcon from '@app/assets/icons/Close'
import MagnifyGlassIcon from '@app/assets/icons/MagnifyGlass'
import { useDebounce } from '@packages/ui/hooks/useDebounce'
import { useElementSize } from '@packages/ui/hooks/useElementSize'
import { clsx } from 'clsx'
import parse from 'html-react-parser'
import { ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { InputOverlay, OverlayInputField } from '../overlay-input-field/OverlayInputField'

const activeOverlay: InputOverlay = {
  overlay: <MagnifyGlassIcon key='1' className='size-6' />,
  location: 'left',
}

const loadingOverlay: InputOverlay = {
  overlay: <span key='2' className='loading loading-spinner loading-md' />,
  location: 'left',
}

export interface TListItem {
  id: string
  label: string
}

type TProps<T extends TListItem> = {
  items: Array<T>
  className?: string
  placeholder?: string
  isLoading?: boolean
  onChange?: (val: string) => void
  onSelect?: (item: T) => void
  setClearHandler?: (func: () => void) => void
} & TRestProps

const ListInputField = <T extends TListItem>({
  items = [],
  className,
  placeholder,
  isLoading = false,
  onChange = () => {},
  onSelect = () => {},
  setClearHandler = () => {},
  ...rest
}: TProps<T>) => {
  const [inputValue, setInputValue] = useState('')
  const [overlays, setOverlays] = useState<Array<InputOverlay>>([])
  const [open, setOpen] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500)

  const divRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divRef)

  const handleClear = useCallback(() => {
    setInputValue('')
  }, [])

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value)
  }

  const handleSelect = (item: T) => {
    setInputValue(item.label)
    onChange(item.label)
    onSelect(item)
    setOpen(false)
    // force close of the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: T) => {
    if (event.code === 'Enter') {
      handleSelect(item)
    }
  }

  useEffect(() => {
    const stdOverlay = isLoading ? loadingOverlay : activeOverlay

    if (!inputValue) {
      setOverlays([stdOverlay])
    } else {
      setOverlays([
        stdOverlay,
        {
          overlay: (
            <button key='3' className='btn btn-circle btn-xs hover:cursor-pointer' role='reset'>
              <CloseIcon className='size-4' onClick={handleClear} />
            </button>
          ),
          location: 'right',
        },
      ])
    }
  }, [inputValue, isLoading, handleClear])

  useEffect(() => {
    if (!setClearHandler || !handleClear) {
      return
    }

    setClearHandler(() => handleClear)
  }, [setClearHandler, handleClear])

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

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
      <OverlayInputField
        overlays={overlays}
        formKey='ListInputFieldInput'
        type='text'
        className='input-bordered input-primary shadow-lg transition-all'
        value={inputValue}
        onChange={handleChange}
        placeholder={isLoading ? 'Loading...' : (placeholder ?? 'Type something...')}
        tabIndex={0}
        disabled={isLoading}
      />
      {items.length > 0 && (
        <div className='dropdown-content top-14 z-[1] max-h-80 flex-col overflow-auto rounded-md bg-base-200'>
          <ul
            className='menu'
            // use ref to calculate the width of parent
            style={{ width: width }}
          >
            {items.map((item, index) => (
              <li key={item.id} tabIndex={index + 1} className='w-full border-b border-b-base-content/10'>
                <button
                  className='w-full'
                  onClick={() => handleSelect(item)}
                  onKeyDown={(event) => handleKeyDown(event, item)}
                >
                  <span>{parse(item.label)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const ListInput = memo(ListInputField) as typeof ListInputField
