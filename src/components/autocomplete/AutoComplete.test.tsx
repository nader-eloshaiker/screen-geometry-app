import { RenderResult, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RefObject } from 'react'
import { Mock, afterEach, beforeEach, describe, expect, vi } from 'vitest'
import { ElementSize, useElementSize } from '../../hooks/useElementSize'

import { AutoComplete } from './Autocomplete'

vi.mock('../../hooks/useElementSize', async () => {
  const actual = await vi.importActual('../../hooks/useElementSize')
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useElementSize: vi.fn(),
  }
})

describe('AutoCompleteScreen', () => {
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
    const useElementSizeResponse: ElementSize = {
      width: 1024,
      height: 1024,
      x: 0,
      y: 0,
    }
    const useElementSizeMock = useElementSize as Mock<[target: RefObject<HTMLElement>], ElementSize>
    useElementSizeMock.mockImplementation(() => useElementSizeResponse)
  })

  afterEach(() => {
    cleanup()
  })

  test('renders autocomplete component with an input field', async () => {
    const { getByPlaceholderText } = await waitFor<RenderResult>(() =>
      render(<AutoComplete items={searchList} value='' isLoading={false} placeholder='Type to filter list...' />),
    )

    expect(getByPlaceholderText('Type to filter list...')).toBeInTheDocument()
  })

  test('displays loading message', async () => {
    const { getByPlaceholderText } = await waitFor<RenderResult>(() =>
      render(<AutoComplete items={searchList} value='' isLoading={true} placeholder='Type to filter list...' />),
    )

    // screen.debug()

    expect(getByPlaceholderText('Loading...')).toBeDefined()
  })

  test('renders the autocomplete dropdown and make a selectin', async () => {
    const { container, getByTestId } = render(
      <AutoComplete items={searchList} value='' isLoading={false} placeholder='Type to filter list...' />,
    )
    const inputElement = getByTestId('autoCompleteInput') as HTMLInputElement
    fireEvent.click(inputElement)
    screen.debug()

    // Type 'a' in the input field
    const listElements = container.querySelectorAll('li')
    fireEvent.click(listElements[0])

    expect(inputElement).toHaveValue(searchList[0].label)
  })
})
