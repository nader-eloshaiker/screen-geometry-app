import { getGetSearchMock } from '@packages/openapi/generated'
import { useInteractComponent } from '@packages/test/utils/useInteractComponent'
import { useElementSizeMock } from '@packages/ui/hooks/useElementSize.mock'
import { act, waitFor } from '@testing-library/react'
import { Mock } from 'vitest'
import { AutoCompleteScreen } from './AutoCompleteScreen'

type Props = {
  onSelectScreenSpy: Mock
  setClearSearchHandlerSpy: Mock
  onSearchSpy: Mock
}
const TestComponent = ({ onSelectScreenSpy, setClearSearchHandlerSpy, onSearchSpy }: Props) => {
  return (
    <AutoCompleteScreen
      onSelectScreen={onSelectScreenSpy}
      setClearSearchHandler={setClearSearchHandlerSpy}
      isFetching={false}
      searchList={getGetSearchMock().list}
      onSearch={onSearchSpy}
    />
  )
}

describe('#AutoCompleteScreen', () => {
  let spies: Props

  beforeEach(() => {
    spies = {
      onSelectScreenSpy: vi.fn(),
      setClearSearchHandlerSpy: vi.fn(),
      onSearchSpy: vi.fn(),
    }

    useElementSizeMock()
  })

  test('renders autocomplete component with an input field', async () => {
    const test = useInteractComponent(
      <TestComponent
        onSelectScreenSpy={spies.onSelectScreenSpy}
        setClearSearchHandlerSpy={spies.setClearSearchHandlerSpy}
        onSearchSpy={spies.onSearchSpy}
      />,
    )

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    expect(inputElement).toBeDefined()
  })

  test('calls backend search api a limited time as the user enters a search term', async () => {
    const test = useInteractComponent(
      <TestComponent
        onSelectScreenSpy={spies.onSelectScreenSpy}
        setClearSearchHandlerSpy={spies.setClearSearchHandlerSpy}
        onSearchSpy={spies.onSearchSpy}
      />,
    )

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    expect(inputElement).toBeDefined()
    await act(async () => {
      await test.user.type(inputElement, 'WQHD')
    })

    waitFor(() => {
      expect(spies.onSearchSpy).toHaveBeenCalledWith('WQHD')
    })
  })

  test('clears search results and requests a full list from search engine', async () => {
    const test = useInteractComponent(
      <TestComponent
        onSelectScreenSpy={spies.onSelectScreenSpy}
        setClearSearchHandlerSpy={spies.setClearSearchHandlerSpy}
        onSearchSpy={spies.onSearchSpy}
      />,
    )

    const inputElement = await test.findByPlaceholderText('Type to filter list...')
    await act(async () => {
      await test.user.type(inputElement, 'WQHD')
    })

    waitFor(() => {
      expect(spies.onSearchSpy).toHaveBeenCalledWith('WQHD')
    })

    const clearButton = await test.findByRole('reset')
    await test.user.click(clearButton)

    waitFor(() => {
      expect(spies.onSearchSpy).toHaveBeenCalledTimes(2)
      expect(spies.onSearchSpy).toHaveBeenCalledWith('')
    })
  })
})
