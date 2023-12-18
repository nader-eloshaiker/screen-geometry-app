import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { SearchProvider } from '@contexts/Search/SearchProvider'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { ScreenInput } from '@openapi/generated/models'
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
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ScreenProvider>
          <SearchProvider>
            <ScreenForm defaultValues={defaultValues} editId={editId} isLoading={isLoading} />
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

  describe('#CreateMode', () => {
    test('renders the screen form in create mode', () => {
      const defaultValues = undefined

      const { getByText } = render(<TestComponent defaultValues={defaultValues} />)

      expect(getByText('Add Screen')).toBeDefined()
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form in edit mode', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText, getByLabelText } = render(<TestComponent defaultValues={defaultValues} editId={editId} />)
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

    test('reset screen form in edit mode', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText, getByLabelText } = render(<TestComponent defaultValues={defaultValues} editId={editId} />)
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

    test('change screen theme colors in edit mode', () => {
      const defaultValues: ScreenInput = {
        aspectRatio: '16:9',
        diagonalSize: 55,
        hRes: 1920,
        vRes: 1080,
        darkColor: '#FFFFFF',
        lightColor: '#000000',
      }
      const editId = '1'

      const { getByText } = render(<TestComponent defaultValues={defaultValues} editId={editId} />)
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
})
