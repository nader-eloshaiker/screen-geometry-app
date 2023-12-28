import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeModeProvider } from '../src/contexts/theme/ThemeModeProvider'
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

const withThemeProvider = (Story: any): React.ReactNode => {
  return (
    <ThemeModeProvider>
      <Story />
    </ThemeModeProvider>
  )
}

export const decorators = [
  withThemeProvider,
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
