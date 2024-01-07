import MagnifyGlassIcon from '@assets/icons/MagnifyGlass'
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
    register: {
      description: 'React Hook Form register.',
      table: { category: 'content', type: { summary: 'UseFormRegisterReturn' } },
      control: { type: 'object' },
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
      control: { type: 'function' },
    },
  },
} satisfies Meta<typeof OverlayInputField>

export default meta
type Story = StoryObj<typeof meta>

export const ImageOverlay: Story = {
  args: {
    placeholder: 'Type something...',
    className: '!pl-12',
    disabled: false,
    overlays: [
      {
        overlay: <MagnifyGlassIcon className='h-6 w-6' />,
        overlayClassName: 'left-0 ml-4',
      },
    ],
  },
}
export const TextOverlay: Story = {
  args: {
    placeholder: 'Type something...',
    className: '!pr-14',
    disabled: false,
    overlays: [
      {
        overlay: 'text',
        overlayClassName: 'right-0 mr-4',
      },
    ],
  },
}
export const CombinationOverlay: Story = {
  args: {
    placeholder: 'Type something...',
    className: '!pl-12 !pr-14',
    disabled: false,
    overlays: [
      {
        overlay: <MagnifyGlassIcon className='h-6 w-6' />,
        overlayClassName: 'left-0 ml-4',
      },
      {
        overlay: 'text',
        overlayClassName: 'right-0 mr-4',
      },
    ],
  },
}
