import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <div className='flex size-full items-center justify-center'>
          <Story />
        </div>
      )
    },
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
