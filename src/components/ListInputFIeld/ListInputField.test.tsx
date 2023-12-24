import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { fireEvent, render } from '@testing-library/react'
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

  test.only('renders ListInputField component with an input field', () => {
    const { getByPlaceholderText } = render(
      <ListInputField items={searchList} value='' isLoading={false} placeholder='Type to filter list...' />,
    )
    expect(getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test('displays loading message', () => {
    const { getByPlaceholderText } = render(
      <ListInputField items={searchList} value='' isLoading={true} placeholder='Type to filter list...' />,
    )

    expect(getByPlaceholderText('Loading...')).toBeInTheDocument()
  })

  test('renders the ListInputField dropdown and make a selectin', () => {
    const { container, getByPlaceholderText } = render(
      <ListInputField items={searchList} value='' isLoading={false} placeholder='Type to filter list...' />,
    )
    const listElements = container.querySelectorAll('li')
    fireEvent.click(listElements[0])

    expect(getByPlaceholderText('Type to filter list...')).toHaveValue(searchList[0].label)
  })
})
