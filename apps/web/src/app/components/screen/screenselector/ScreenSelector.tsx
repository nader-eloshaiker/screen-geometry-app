import { useDebounce } from '@/lib/ui/hooks/useDebounce'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { cn } from '@/lib/utils'
import { SearchItem } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@screengeometry/lib-ui/command'
import { Label } from '@screengeometry/lib-ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@screengeometry/lib-ui/popover'
import parse from 'html-react-parser'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TProps = {
  items: Array<SearchItem> | undefined
  commandPlaceholder?: string
  selectPlaceholder?: string
  isLoading?: boolean
  onSelectItem?: (item: SearchItem) => void
  onSearch?: Dispatch<SetStateAction<string>>
}

export const ScreenSelector = ({
  items = [],
  commandPlaceholder,
  selectPlaceholder,
  isLoading = false,
  onSelectItem = () => {},
  onSearch = () => {},
}: TProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedValue = useDebounce(searchTerm, 500)
  const elementRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(elementRef)
  const [selectId, setSelectId] = useState('')

  useEffect(() => {
    if (!items || !selectId || !onSelectItem) return

    const item = items.find((item) => item.id === selectId)
    if (item) {
      onSelectItem(item)
    }
  }, [items, onSelectItem, selectId])

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <div className='flex w-full flex-col gap-2 py-8' ref={elementRef}>
      <Label palette='mono' htmlFor='searchList'>
        Pre fill the form from list of Screens
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id='searchList'
            mode='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              'w-full justify-between shadow-lg border-primary-border bg-primary-input [&_svg]:text-primary-foreground-muted [&_svg]:hocus:text-primary-foreground-hover border-2',
              {
                'animate-pulse pointer-events-none': isLoading,
                'text-primary-foreground-input': !!selectId,
                'text-primary-foreground-muted': !selectId,
              }
            )}
          >
            {selectId ? items.find((item) => item.id === selectId)?.label : selectPlaceholder}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mt-2 w-full border-none p-0'>
          <Command shouldFilter={false}>
            <CommandInput placeholder={commandPlaceholder} className='h-9' onValueChange={setSearchTerm} />
            <CommandList>
              <CommandEmpty style={{ width: width }}>No Matching Screens found</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    style={{ width: width }}
                    onSelect={(value) => {
                      setSelectId(value === selectId ? '' : value)
                      setOpen(false)
                    }}
                  >
                    <span>{item.decoratedLabel ? parse(item.decoratedLabel) : item.label}</span>
                    <Check className={cn('ml-auto', selectId === item.id ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
