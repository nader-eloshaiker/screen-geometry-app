import MagnifyGlassIcon from '@/app/assets/icons/MagnifyGlass'
import type { Meta, StoryObj } from '@storybook/react'
import { OverlayInputField } from './OverlayInputField'

const meta = {
  title: 'components/OverlayInputField',
  component: OverlayInputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'HTML Input field with overlayed elements on top of it.',
      },
    },
  },
  argTypes: {
    // Props should be mapped here
    overlays: {
      description: 'Content to be displayed in the field.',
      table: { category: 'content', type: { summary: 'Array<InputOverlay>' } },
      control: { type: 'object', requied: true },
    },
    formKey: {
      description: 'Unique Identifier for label matching.',
      table: { category: 'content', type: { summary: 'string' } },
      control: { type: 'text' },
    },
    title: {
      description: 'Input heading.',
      table: { category: 'content', type: { summary: 'string' } },
      control: { type: 'text' },
    },
    className: {
      description: 'Manage the style of the input field to allow for the overlays to be viewed correctly.',
      table: { category: 'format', type: { summary: 'string' } },
      control: { type: 'text' },
    },
    disabled: {
      description: 'Disable user actions.',
      table: { category: 'format', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: { type: 'boolean' },
    },
    value: {
      description: 'The value of the input field.',
      table: { category: 'content', type: { summary: 'string' }, defaultValue: { summary: '""' } },
      control: { type: 'text' },
    },
    type: {
      description: 'The type of the input field',
      table: {
        category: 'format',
        type: { summary: 'text | password | email | number | tel | url | search' },
        defaultValue: { summary: 'text' },
      },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      control: { type: 'select' },
    },
    placeholder: {
      description: 'The placeholder text when the input is empty.',
      table: { category: 'content', type: { summary: 'string' } },
      control: { type: 'text' },
    },
    onChange: {
      description: 'Input field change handler.',
      table: { category: 'event', type: { summary: 'function' } },
      action: 'onChange',
    },
  },
} satisfies Meta<typeof OverlayInputField>

export default meta
type Story = StoryObj<typeof meta>

export const ImageOverlay: Story = {
  args: {
    formKey: 'input1',
    placeholder: 'Type something...',
    className: 'input-bordered input-secondary shadow-md',
    disabled: false,
    overlays: [
      {
        overlay: <MagnifyGlassIcon key='1' className='size-6' />,
        location: 'left',
      },
    ],
  },
}
export const TextOverlay: Story = {
  args: {
    formKey: 'input2',
    placeholder: 'Type something...',
    className: 'input-bordered input-secondary shadow-md',
    disabled: false,
    overlays: [
      {
        overlay: (
          <span key='1' className='text-sm opacity-70'>
            text
          </span>
        ),
        location: 'right',
      },
    ],
  },
}
export const CombinationOverlay: Story = {
  args: {
    formKey: 'input3',
    placeholder: 'Type something...',
    className: 'input-bordered input-secondary shadow-md',
    disabled: false,
    overlays: [
      {
        overlay: <MagnifyGlassIcon key='1' className='size-6' />,
        location: 'left',
      },
      {
        overlay: (
          <span key='2' className='text-sm opacity-70'>
            text
          </span>
        ),
        location: 'right',
      },
    ],
  },
}
