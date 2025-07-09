import { Button } from '@lib/components/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@lib/components/tooltip'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  // tags: ['autodocs'],
  argTypes: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button mode='outline'>Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
}
