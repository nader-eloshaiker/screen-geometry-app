import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { ListInput } from './ListInput'

const meta = {
  title: 'components/ListInput',
  component: ListInput,
  decorators: [
    (Story: StoryFn) => {
      return (
        <div className='size-48'>
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
      control: { type: 'object', requied: true },
    },
    value: {
      description: 'The value of the input field.',
      table: { category: 'content', type: { summary: 'string' }, defaultValue: { summary: '""' } },
      control: { type: 'text' },
    },
    isLoading: {
      description: 'Show the component in the loading state.',
      table: { category: 'format', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: { type: 'boolean' },
    },
    disableOnLoading: {
      description: 'Prevent user interaction while in loading state.',
      table: { category: 'format', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      control: { type: 'boolean' },
    },
    placeholder: {
      description: 'The placeholder text when the input is empty.',
      table: { category: 'content', type: { summary: 'string' } },
      control: { type: 'text' },
    },
    onChange: {
      description: 'Input field change handler.',
      table: { category: 'event', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
      action: 'onChange',
    },
    onSelect: {
      description: 'List selection handler.',
      table: { category: 'event', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
      action: 'onSelect',
    },
    setClearHandler: {
      description: 'Attach clear handler to a state in the parent component.',
      table: { category: 'event handler', type: { summary: 'function' }, defaultValue: { summary: '() => {}' } },
    },
  },
} satisfies Meta<typeof ListInput>

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvasElement.querySelector('ul')).not.toBeVisible()

    const inputElement = canvas.getByPlaceholderText('Type to filter list...')
    await expect(inputElement).toBeInTheDocument()

    await userEvent.click(inputElement, {
      delay: 100,
    })

    expect(canvasElement.querySelector('ul')).toBeVisible()
  },
}
