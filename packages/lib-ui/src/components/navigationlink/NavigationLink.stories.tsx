import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationLink } from './NavigationLink'

import { createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router'

const rootRoute = createRootRoute()

const router = createRouter({
  routeTree: rootRoute,
})

export function NavigationDemo() {
  return (
    <RouterProvider
      router={router}
      defaultComponent={() => (
        <nav aria-label='Main' className='flex gap-6' data-testid='large-header-menu'>
          <NavigationLink mode='ghost' palette='navigation' to='/' className='group w-24 text-base font-semibold'>
            Home
          </NavigationLink>
          <NavigationLink
            mode='ghost'
            palette='navigation'
            to='/screens'
            className='group w-24 text-base font-semibold'
          >
            Screens
          </NavigationLink>
          <NavigationLink
            mode='ghost'
            palette='navigation'
            to='/contact'
            className='group w-24 text-base font-semibold'
          >
            Contact
          </NavigationLink>
          <NavigationLink mode='ghost' palette='navigation' to='/help' className='group w-24 text-base font-semibold'>
            Help
          </NavigationLink>
        </nav>
      )}
    />
  )
}

const meta = {
  // tags: ['autodocs'],
  argTypes: {},
  component: NavigationDemo,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'Elements/NavigationLink',
} satisfies Meta<typeof NavigationDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {},
  parameters: {},
  render: () => <NavigationDemo />,
}
