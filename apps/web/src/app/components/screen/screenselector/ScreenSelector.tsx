import { useDebounce } from '@/lib/ui/hooks/useDebounce'
import { useElementSize } from '@/lib/ui/hooks/useElementSize'
import { cn } from '@/lib/utils'
import { type SearchItem } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@screengeometry/lib-ui/command'
import { InputVariants } from '@screengeometry/lib-ui/input'
import { Label } from '@screengeometry/lib-ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@screengeometry/lib-ui/popover'
import parse from 'html-react-parser'
import { Check, ChevronsUpDown } from 'lucide-react'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

type TProps = {
  items: Array<SearchItem> | undefined
  commandPlaceholder?: string
  selectPlaceholder?: string
  isLoading: boolean
  onSelectItem: (item: SearchItem | undefined) => void
  selectedItem?: SearchItem | undefined
  onSearch: Dispatch<SetStateAction<string>>
}

export const ScreenSelector = ({
  items = [],
  commandPlaceholder,
  selectPlaceholder,
  isLoading = false,
  onSelectItem = () => {},
  selectedItem,
  onSearch = () => {},
}: TProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedValue = useDebounce(searchTerm, 500)
  const [setRef, { width }] = useElementSize()

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  useEffect(() => {
    if (!open) {
      setSearchTerm('')
    }
  }, [open])

  return (
    <div className='flex w-full flex-col gap-2 py-8' ref={setRef}>
      <Label palette='mono' htmlFor='searchList'>
        <FormattedMessage id='screens.selector.description' defaultMessage='Pre fill the form from list of Screens' />
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id='searchList'
            mode='outline'
            role='combobox'
            aria-expanded={open}
            className={cn('flex w-full justify-between border-2 shadow-lg', InputVariants({ palette: 'primary' }), {
              'pointer-events-none animate-pulse': isLoading,
              'text-primary-foreground-input': !!selectedItem,
              'text-primary-foreground-muted': !selectedItem,
            })}
          >
            <span>{selectedItem?.label ?? selectPlaceholder}</span>
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mt-2 w-full border-none p-0'>
          <Command shouldFilter={false}>
            <CommandInput placeholder={commandPlaceholder} className='h-9' onValueChange={setSearchTerm} />
            <CommandList>
              <CommandEmpty style={{ width: width }}>
                <FormattedMessage id='screens.selector.nomatching' defaultMessage='No Matching Screens found' />
              </CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    style={{ width: width }}
                    onSelect={(value) => {
                      onSelectItem(selectedItem && value === selectedItem.id ? undefined : item)
                      setOpen(!!selectedItem && value === selectedItem.id)
                    }}
                  >
                    <span>{item.decoratedLabel ? parse(item.decoratedLabel) : item.label}</span>
                    <Check className={cn('ml-auto', selectedItem?.id === item.id ? 'opacity-100' : 'opacity-0')} />
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
