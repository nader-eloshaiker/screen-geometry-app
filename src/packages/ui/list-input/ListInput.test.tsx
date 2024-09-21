import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
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
    const { user, getByPlaceholderText, getByRole } = await renderWithUserEvents(
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

    const input = getByPlaceholderText('Type to filter list...')
    await act(async () => await user.click(input))

    const listElement = getByRole('button', { name: /BBBB/i })
    await act(async () => await user.click(listElement))

    expect(input).toHaveValue(searchList[1].label)
  })

  test('renders the ListInput dropdown and make a selectin using keys', async () => {
    const { user, getByRole, getByPlaceholderText } = await renderWithUserEvents(
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
    const input = getByPlaceholderText('Type to filter list...')
    await act(async () => await user.click(input))

    const listElement = getByRole('button', { name: /BBBB/i })
    await act(async () => await user.click(listElement))
    listElement.focus()
    await act(async () => await user.keyboard('{enter}'))

    expect(input).toHaveValue(searchList[1].label)
  })
})
