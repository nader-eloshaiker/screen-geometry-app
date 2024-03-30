import { useInteractComponent } from '@packages/test/utils/useInteractComponent'
import { act, render } from '@testing-library/react'
import { useElementSizeMock } from '../hooks/useElementSize.mock'
import { ListInput } from './ListInput'

describe('#ListInput', () => {
  const searchList = [
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

  beforeEach(() => {
    useElementSizeMock()
  })

  test('renders ListInput component with an input field', () => {
    const { getByPlaceholderText } = render(
      <ListInput
        items={searchList}
        value=''
        isLoading={false}
        placeholder='Type to filter list...'
        onChange={() => {}}
        onSelect={() => {}}
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
        onChange={() => {}}
        onSelect={() => {}}
        setClearHandler={() => {}}
      />,
    )

    expect(getByPlaceholderText('Loading...')).toBeInTheDocument()
  })

  test('renders the ListInput dropdown and make a selectin', async () => {
    const { user, container, getByPlaceholderText } = useInteractComponent(
      <ListInput
        items={searchList}
        value=''
        isLoading={false}
        placeholder='Type to filter list...'
        onChange={() => {}}
        onSelect={() => {}}
        setClearHandler={() => {}}
      />,
    )
    const listElements = container.querySelectorAll('li')
    await act(async () => {
      await user.click(listElements[0]!)
    })

    expect(getByPlaceholderText('Type to filter list...')).toHaveValue(searchList[0]!.label)
  })
})
