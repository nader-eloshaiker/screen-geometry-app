import { SearchItem, getGetSearchMock } from '@packages/openapi/generated'
import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { act, render, waitFor } from '@testing-library/react'
import { Mock } from 'vitest'
import { useElementSizeMock } from '../hooks/useElementSize.mock'
import { ListInput } from './ListInput'

type TSearchListItem = { id: string; label: string }
const searchList: TSearchListItem[] = [
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
]

type Props = {
  onSelectScreenSpy: Mock
  setClearSearchHandlerSpy: Mock
  onSearchSpy: Mock
}
const TestComponent = ({ onSelectScreenSpy, setClearSearchHandlerSpy, onSearchSpy }: Props) => {
  return (
    <ListInput<SearchItem>
      onSelectItem={onSelectScreenSpy}
      setClearHandler={setClearSearchHandlerSpy}
      isLoading={false}
      items={getGetSearchMock().list}
      onSearchList={onSearchSpy}
      placeholder='Type to filter list...'
    />
  )
}

describe('#ListInput', () => {
  let spies: Props

  beforeEach(() => {
    spies = {
      onSelectScreenSpy: vi.fn(),
      setClearSearchHandlerSpy: vi.fn(),
      onSearchSpy: vi.fn(),
    }

    useElementSizeMock()
  })

  test('renders ListInput component with an input field', () => {
    const { getByPlaceholderText } = render(
      <ListInput
        items={searchList}
        value=''
        isLoading={false}
        placeholder='Type to filter list...'
        onSearchList={() => {}}
        onSelectItem={() => {}}
        setClearHandler={() => {}}
      />,
    )
    expect(getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test('displays loading message', () => {
    const { getByPlaceholderText } = render(
      <ListInput
        items={searchList}
        value=''
        isLoading={true}
        placeholder='Type to filter list...'
        onSearchList={() => {}}
        onSelectItem={() => {}}
        setClearHandler={() => {}}
      />,
    )

    expect(getByPlaceholderText('Loading...')).toBeInTheDocument()
  })

  test('renders the ListInput dropdown and make a selection', async () => {
    const { user, getByPlaceholderText, getByRole, getByTestId } = await renderWithUserEvents(
      <TestComponent
        onSelectScreenSpy={spies.onSelectScreenSpy}
        setClearSearchHandlerSpy={spies.setClearSearchHandlerSpy}
        onSearchSpy={spies.onSearchSpy}
      />,
    )

    const input = getByPlaceholderText('Type to filter list...')
    await act(async () => await user.click(input))

    const listElement = getByRole('button', { name: /WQHD 34" 3440x1440 21:9/i })
    await act(async () => await user.click(listElement))

    expect(spies.onSelectScreenSpy).toHaveBeenCalledWith({
      aspectRatio: '21:9',
      diagonalSize: 34,
      hRes: 3440,
      id: 'WQHD3421:9',
      label: 'WQHD 34" 3440x1440 21:9',
      name: 'WQHD',
      vRes: 1440,
    })
  })

  test('calls backend search api a limited time as the user enters a search term', async () => {
    const test = await renderWithUserEvents(
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
    const test = await renderWithUserEvents(
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
