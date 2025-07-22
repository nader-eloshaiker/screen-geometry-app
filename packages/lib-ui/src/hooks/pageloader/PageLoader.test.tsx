import { PageLoader } from '@/components/pageloader'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageLoaderProvider } from './PageLoaderProvider'
import { usePageLoader } from './usePageLoader'

const TestContentComponent = () => {
  const { isPageLoading, setPageLoading } = usePageLoader()

  const onClickClear = () => setPageLoading({ action: 'idle', componentId: 'key1' })
  const onClickAdd = () => setPageLoading({ action: 'loading', componentId: 'key2' })

  return (
    <div>
      <button data-testid='button-clear' onClick={onClickClear}>
        Clear loading
      </button>
      <button data-testid='button-add' onClick={onClickAdd}>
        Add loading
      </button>
      {isPageLoading ? <PageLoader /> : <div data-testId='content'>content</div>}
    </div>
  )
}

const TestComponent = () => {
  return (
    <PageLoaderProvider onAppMountComponents={['key1']}>
      <TestContentComponent />
    </PageLoaderProvider>
  )
}

describe('#PageLoader', () => {
  it('should render loading state and then content', async () => {
    const user = userEvent.setup()
    const test = render(<TestComponent />)

    expect(test.getByTestId('page-loader')).toBeInTheDocument()

    const button = test.getByTestId('button-clear')
    await user.click(button)

    expect(test.queryByTestId('page-loader')).not.toBeInTheDocument()
  })

  it('should render loading state when another component is registered and is loading', async () => {
    const user = userEvent.setup()
    const test = render(<TestComponent />)

    expect(test.getByTestId('page-loader')).toBeInTheDocument()

    const buttonClear = test.getByTestId('button-clear')
    await user.click(buttonClear)

    expect(test.queryByTestId('page-loader')).not.toBeInTheDocument()

    const buttonAdd = test.getByTestId('button-add')
    await user.click(buttonAdd)

    expect(test.queryByTestId('page-loader')).toBeInTheDocument()
  })
})
