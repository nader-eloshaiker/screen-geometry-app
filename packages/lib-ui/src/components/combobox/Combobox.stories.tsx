import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '../button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../command'

const frameworks = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
  {
    label: 'TypeScript',
    value: 'typescript',
  },
  {
    label: 'Go Lang',
    value: 'go',
  },
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'Python',
    value: 'python',
  },
]

const meta = {
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/Combobox',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ComboboxDemo = ({ defaultValue = false }: { defaultValue?: boolean }) => {
  const [open, setOpen] = useState(defaultValue)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          mode='outline'
          role='combobox'
          aria-expanded={open}
          className='[&_svg]:text-primary-foreground-muted hocus:[&_svg]:text-primary-foreground-hover w-[260px] justify-between shadow-lg'
        >
          <div>{value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...'}</div>
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[260px] pt-2'>
        <Command>
          <CommandInput placeholder='Search framework...' className='h-9' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check className={cn('ml-auto', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const Test: Story = {
  args: {},
  parameters: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox')
    await userEvent.click(trigger)

    const inputElement = canvas.getByPlaceholderText(/Search framework/i)
    await expect(inputElement).toBeInTheDocument()

    expect(canvas.getAllByRole('option')).toHaveLength(5)

    await userEvent.type(inputElement, 'java')

    expect(canvas.getAllByRole('option')).toHaveLength(2)
  },
  render: () => {
    return <ComboboxDemo />
  },
}

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return <ComboboxDemo />
  },
}

export const ComponentOpenedState: Story = {
  args: {},
  parameters: {},
  render: () => {
    return <ComboboxDemo defaultValue={true} />
  },
}
