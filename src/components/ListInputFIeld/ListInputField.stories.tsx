import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { ListInputField } from './ListInputField'

const meta = {
  title: 'components/ListInputField',
  component: ListInputField,
  decorators: [
    (Story: StoryFn) => {
      return (
        <div className='h-48'>
          <Story />
        </div>
      )
    },
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change input', 'select item'],
    },
    docs: {
      description: {
        story: 'InputField with dropdown list',
      },
    },
  },
  argTypes: {
    // Props should be mapped here
    items: {
      description: 'List items in pulldown. Must be an array of objects with { id: string; label: string }.',
      table: { category: 'content', type: { summary: 'Array<TListItem>' }, defaultValue: { summary: '[]' } },
      control: 'object',
    },
    value: {
      description: 'The value of the input field.',
      table: { category: 'content', type: { summary: 'string' }, defaultValue: { summary: '""' } },
      control: 'text',
    },
    isLoading: {
      description: 'Show the component in the loading state.',
      table: { category: 'format', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
    placeholder: {
      description: 'The placeholder text when the input is empty.',
      table: { category: 'content', type: { summary: 'string' } },
      control: 'text',
    },
    onChange: {
      description: 'Input field change handler.',
      table: { category: 'event', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
      action: 'onChange',
      control: 'function',
    },
    onSelect: {
      description: 'List selection handler.',
      table: { category: 'event', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
      action: 'onSelect',
      control: 'function',
    },
    setClearHandler: {
      description: 'Attach clear handler to a state in the parent component.',
      table: { category: 'event handler', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
      control: 'function',
    },
  },
} satisfies Meta<typeof ListInputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'AAAA',
        id: '1',
      },
      {
        label: 'BBBB',
        id: '2',
      },
      {
        label: 'CCCC',
        id: '3',
      },
    ],
    value: '',
    isLoading: false,
    placeholder: 'Type to filter list...',
    onChange: () => {},
    onSelect: () => {},
    setClearHandler: () => {},
  },
}
