import { TestTranslationsEnvironment } from '@/test/utils/TestTranslationsEnvironment'
import { render } from '@testing-library/react'
import { CreateScreenButton } from './CreateButton'

describe('CreateScreenButton', () => {
  test('renders screen table component with a table and rows', () => {
    const test = render(<CreateScreenButton />, {
      wrapper: TestTranslationsEnvironment,
    })

    const createButton = test.getByText('Create Screen')
    expect(createButton).toBeInTheDocument()
    expect(createButton).toBeVisible()
    expect(createButton).toBeEnabled()
  })
})
