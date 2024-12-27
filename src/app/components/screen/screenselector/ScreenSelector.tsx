import { SearchItem } from '@/lib/openapi/generated'
import { Label } from '@/lib/ui/components/label/Label'
import { useDebounce } from '@/lib/ui/hooks/useDebounce'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { cn } from '@/lib/utils'
import parse from 'html-react-parser'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Button } from '../../../../lib/ui/components/button/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../../lib/ui/components/command/Command'
import { Popover, PopoverContent, PopoverTrigger } from '../../../../lib/ui/components/popover/Popover'

type TProps = {
  items: Array<SearchItem> | undefined
  placeholder?: string
  label?: string
  isLoading?: boolean
  selectId: string
  setSelectId: Dispatch<SetStateAction<string>>
  onSelectItem?: (item: SearchItem) => void
  onSearch?: Dispatch<SetStateAction<string>>
}

export const ScreenSelector = ({
  items = [],
  placeholder,
  label,
  isLoading = false,
  selectId = '',
  setSelectId = () => {},
  onSelectItem = () => {},
  onSearch = () => {},
}: TProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedValue = useDebounce(searchTerm, 500)
  const elementRef = useRef<HTMLLabelElement>(null)
  const { width } = useElementSize(elementRef)
  console.log('width', width)

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
    <div className='flex w-full flex-col gap-2 py-10'>
      <Label palette='primary' htmlFor='searchList' ref={elementRef}>
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
              },
            )}
          >
            {selectId ? items.find((item) => item.id === selectId)?.label : label}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mt-2 w-full border-none p-0'>
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} className='h-9' onValueChange={setSearchTerm} />
            <CommandList>
              <CommandEmpty>No Screens found</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    style={{ width: width }}
                    onSelect={(selectValue) => {
                      setSelectId(selectValue === selectId ? '' : selectValue)
                      setOpen(false)
                    }}
                  >
                    <span>{parse(item.label)}</span>
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
