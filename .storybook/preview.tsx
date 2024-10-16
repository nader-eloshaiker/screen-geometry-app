import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '../src/app/contexts/theme/ThemeProvider'
import '../src/index.css'

const preview: Preview = {
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

export const decorators = [
  (Story: any): React.ReactNode => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
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
    attributeName: 'data-mode',
  }),
]

export default preview
