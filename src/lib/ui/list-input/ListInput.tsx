import CloseIcon from '@/app/assets/icons/Close'
import MagnifyGlassIcon from '@/app/assets/icons/MagnifyGlass'
import { useDebounce } from '@/lib/ui/hooks/useDebounce'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { clsx } from 'clsx'
import parse from 'html-react-parser'
import {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
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
  items: Array<T> | undefined
  className?: string
  placeholder?: string
  isLoading?: boolean
  onSearchList?: (val: string) => void
  onSelectItem?: (item: T) => void
  setClearHandler?: Dispatch<SetStateAction<() => void>>
} & InputHTMLAttributes<HTMLInputElement>

const ListInputField = <T extends TListItem>({
  items = [],
  className,
  placeholder,
  isLoading = false,
  onSearchList = () => {},
  onSelectItem = () => {},
  setClearHandler = () => {},
  ...rest
}: TProps<T>) => {
  const [inputValue, setInputValue] = useState('')
  const [overlays, setOverlays] = useState<Array<InputOverlay>>([])
  const [open, setOpen] = useState(false)
  const debouncedValue = useDebounce(inputValue, 500)

  const divRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(divRef)

  const clearInput = useCallback(() => {
    setInputValue('')
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: T) => {
    event.preventDefault()
    onSelectItem(item)
    setOpen(false)
    // force close of the dropdown
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
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
              <CloseIcon className='size-4' onClick={clearInput} />
            </button>
          ),
          location: 'right',
        },
      ])
    }
  }, [inputValue, isLoading, clearInput])

  useEffect(() => {
    if (!setClearHandler || !clearInput) {
      return
    }

    setClearHandler(() => clearInput)
  }, [setClearHandler, clearInput])

  useEffect(() => {
    onSearchList(debouncedValue)
  }, [debouncedValue, onSearchList])

  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={clsx({
        'dropdown w-full': true,
        'dropdown-open': open,
      })}
      ref={divRef}
    >
      <OverlayInputField
        overlays={overlays}
        formKey='ListInputFieldInput'
        type='text'
        className={twMerge('input-bordered input-primary shadow-lg transition-all', className)}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={isLoading ? 'Loading...' : (placeholder ?? 'Type something...')}
        tabIndex={0}
        {...rest}
      />
      {items.length > 0 && (
        <div className='dropdown-content top-14 z-[1] max-h-80 flex-col overflow-auto rounded-md bg-base-200'>
          <ul
            className='menu'
            // use ref to calculate the width of parent
            style={{ width: width }}
          >
            {items.map((item) => (
              <li key={item.id} className='w-full border-b border-b-base-content/10'>
                <button onClick={(e) => handleClickItem(e, item)}>{parse(item.label)}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const ListInput = memo(ListInputField) as typeof ListInputField
