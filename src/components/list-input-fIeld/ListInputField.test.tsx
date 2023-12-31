import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { render } from '@testing-library/react'
import { ListInputField } from './ListInputField'

describe('#ListInputField', () => {
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

  test('renders ListInputField component with an input field', () => {
    const { getByPlaceholderText } = render(
      <ListInputField
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
      <ListInputField
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

  test('renders the ListInputField dropdown and make a selectin', async () => {
    const { user, container, getByPlaceholderText } = useInteractComponent(
      <ListInputField
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
    await user.click(listElements[0])

    expect(getByPlaceholderText('Type to filter list...')).toHaveValue(searchList[0].label)
  })
})
