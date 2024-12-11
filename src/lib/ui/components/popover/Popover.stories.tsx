import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { Label } from '../label/Label'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

const meta = {
  title: 'Elements/Popover',
  component: Popover,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button mode='outline'>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className='mt-2 w-80'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <h4 className='font-medium leading-none'>Dimensions</h4>
              <p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
            </div>
            <div className='grid gap-4'>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='width'>Width</Label>
                <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='maxWidth'>Max. width</Label>
                <Input id='maxWidth' defaultValue='300px' className='col-span-2 h-8' />
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='height'>Height</Label>
                <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='maxHeight'>Max. height</Label>
                <Input id='maxHeight' defaultValue='none' className='col-span-2 h-8' />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}
