import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Button } from '../button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './Collapsilble'

const meta = {
  args: { onOpenChange: fn() },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the collapsible is open by default',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the collapsible is disabled',
    },
    open: {
      control: 'boolean',
      description: 'Whether the collapsible is open (controlled)',
    },
  },
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  title: 'Elements/Collapsible',
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button mode='outline'>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 rounded-md border p-4'>
        This is the collapsible content. It can contain any React elements.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button mode='outline'>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 rounded-md border p-4'>This content is open by default.</CollapsibleContent>
    </Collapsible>
  ),
}

const ControlledCollapsible = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button mode='outline'>{isOpen ? 'Close' : 'Open'} (Controlled)</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 rounded-md border p-4'>
        This is a controlled collapsible. The open state is managed by React state.
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Controlled: Story = {
  args: {
    open: true,
  },
  render: () => <ControlledCollapsible />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button mode='outline' disabled>
          Disabled Toggle
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 rounded-md border p-4'>
        This collapsible is disabled and cannot be toggled.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const WithCustomContent: Story = {
  args: {},
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button mode='outline'>Advanced Content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 space-y-4'>
        <div className='bg-muted rounded-md p-4'>
          <h4 className='font-semibold'>Section 1</h4>
          <p className='text-muted-foreground text-sm'>This is a section with custom styling and multiple elements.</p>
        </div>
        <div className='bg-muted rounded-md p-4'>
          <h4 className='font-semibold'>Section 2</h4>
          <ul className='text-muted-foreground list-inside list-disc text-sm'>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Nested: Story = {
  args: {},
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button mode='outline'>Parent Collapsible</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2 space-y-2'>
        <p className='text-muted-foreground text-sm'>Parent content with nested collapsible:</p>
        <div className='ml-4 rounded-md border p-4'>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button mode='ghost' dimension='sm'>
                Nested Collapsible
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='bg-muted mt-2 rounded-md p-3'>
              This is nested content inside the parent collapsible.
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
