import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { SearchProvider } from '@contexts/Search/SearchProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { ScreenInput } from '@openapi/generated/models'
import { useCreateScreenActionMock } from '@openapi/mocks/useCreateScreenAction.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchListAction.mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render } from '@testing-library/react'
import { ScreenForm } from './ScreenForm'

type Props = {
  defaultValues: ScreenInput | undefined
  editId?: string | undefined
  isLoading?: boolean
}
const TestComponent = ({ defaultValues, editId, isLoading }: Props) => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <>
      <ScreenForm defaultValues={defaultValues} editId={editId} isLoading={isLoading} />
      <div>
        <h1>Screens</h1>
        {screens.map((screen) => (
          <div key={screen.id}>{JSON.stringify(screen, null, 2)}</div>
        ))}
      </div>
    </>
  )
}

const RootComponent = ({ defaultValues, editId, isLoading }: Props) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ScreenProvider>
          <SearchProvider>
            <TestComponent defaultValues={defaultValues} editId={editId} isLoading={isLoading} />
          </SearchProvider>
        </ScreenProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

describe('#ScreenForm', () => {
  beforeEach(() => {
    useSearchListActionMock()
    useElementSizeMock()
  })

  describe('#EditMode', () => {
    test('renders the screen form', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText, getByLabelText } = render(<RootComponent defaultValues={defaultValues} editId={editId} />)
      expect(getByText('Edit Screen')).toBeDefined()
      expect(getByLabelText('Screen Size')).toHaveValue(55)
      expect(getByLabelText('Aspect Ratio')).toHaveValue('16:9')
      expect(getByLabelText('Horizontal Res')).toHaveValue(1920)
      expect(getByLabelText('Vertical Res')).toHaveValue(1080)

      expect(getByText('Light')).toHaveStyle({ backgroundColor: '#000000' })
      expect(getByText('Dark')).toHaveStyle({ backgroundColor: '#FFFFFF' })

      expect(getByText('Update')).toBeDisabled()
      expect(getByText('Reset')).toBeEnabled()
      expect(getByText('Close')).toBeEnabled()
    })

    test('reset screen form', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText, getByLabelText } = render(<RootComponent defaultValues={defaultValues} editId={editId} />)
      const resetButton = getByText('Reset')

      fireEvent.change(getByLabelText('Screen Size'), {
        target: {
          value: '27',
        },
      })

      expect(getByLabelText('Screen Size')).toHaveValue(27)

      fireEvent.click(resetButton)
      expect(getByLabelText('Screen Size')).toHaveValue(55)
    })

    test('change screen theme colors', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText } = render(<RootComponent defaultValues={defaultValues} editId={editId} />)
      const changeButton = getByText('Change')
      const lightColor = getByText('Light')
      const darkColor = getByText('Dark')

      expect(lightColor).toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).toHaveStyle({ backgroundColor: '#FFFFFF' })

      fireEvent.click(changeButton)

      expect(lightColor).not.toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).not.toHaveStyle({ backgroundColor: '#FFFFFF' })
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', () => {
      const { getByText, getByLabelText } = render(<RootComponent defaultValues={undefined} />)

      expect(getByText('Add Screen')).toBeDefined()
      expect(getByLabelText('Screen Size')).toHaveValue(null)
      expect(getByLabelText('Aspect Ratio')).toHaveValue('')
      expect(getByLabelText('Horizontal Res')).toHaveValue(null)
      expect(getByLabelText('Vertical Res')).toHaveValue(null)

      expect(getByText('Light')).toBeInTheDocument()
      expect(getByText('Dark')).toBeInTheDocument()

      expect(getByText('Create')).toBeDisabled()
      expect(getByText('Reset')).toBeEnabled()
      expect(getByText('Close')).toBeEnabled()
    })

    test('select a screen from list and populate form', () => {
      const { getByText, getByLabelText, getByPlaceholderText, container } = render(
        <RootComponent defaultValues={undefined} />,
      )

      const inputElement = getByPlaceholderText('Type to filter list...')
      fireEvent.change(inputElement, {
        target: {
          value: 'WQHD+',
        },
      })

      const listElement = container.querySelectorAll('li')[0]
      fireEvent.click(listElement)

      expect(getByLabelText('Screen Size')).toHaveValue(38)
      expect(getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(getByLabelText('Horizontal Res')).toHaveValue(3840)
      expect(getByLabelText('Vertical Res')).toHaveValue(1600)

      expect(getByText('Light')).toBeInTheDocument()
      expect(getByText('Dark')).toBeInTheDocument()

      expect(getByText('Create')).toBeDisabled()
      expect(getByText('Reset')).toBeEnabled()
      expect(getByText('Close')).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      useCreateScreenActionMock({
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      })
      const { getByPlaceholderText, container, getByText, findByText, debug } = render(
        <RootComponent defaultValues={undefined} />,
      )

      const inputElement = getByPlaceholderText('Type to filter list...')

      fireEvent.change(inputElement, {
        target: {
          value: 'WQHD+',
        },
      })

      const listElement = container.querySelectorAll('li')[0]

      fireEvent.click(listElement)

      expect(await findByText('Create')).toBeEnabled()

      fireEvent.click(getByText('Create'))

      expect(await findByText('Create')).toBeEnabled()
      debug()
    })
  })
})
