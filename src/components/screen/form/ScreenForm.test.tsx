import { NotificationProvider } from '@contexts/Notification/NotificationProvider'
import { ScreenState } from '@contexts/Screen/ScreenManager'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import { useElementSizeMock } from '@hooks/useElementSize.mock'
import { screenInputFixture } from '@openapi/fixtures/ScreenFixtures'
import { ScreenInput, ScreenItem } from '@openapi/generated/models'
import { CreateScreenMock, useCreateScreenMock } from '@openapi/mocks/useCreateScreen.mock'
import { useSearchListActionMock } from '@openapi/mocks/useSearchList.mock'
import { UpdateScreenMock, useUpdateScreenMock } from '@openapi/mocks/useUpdateScreen.mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { render, waitFor } from '@testing-library/react'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { useEffect, useState } from 'react'
import { ScreenForm } from './ScreenForm'

type Props = {
  defaultValues: ScreenInput | undefined
  editId?: string | undefined
  isLoading?: boolean
  initialise?: ScreenItem[]
  onCloseAction?: () => void
}
const TestComponent = ({ defaultValues, editId, isLoading = false, onCloseAction }: Props) => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <>
      <ScreenForm defaultValues={defaultValues} editId={editId} isLoading={isLoading} onClose={onCloseAction} />
      <div>
        <h1>Screens</h1>
        {screens.map((screen) => (
          <h2 key={screen.id}>{JSON.stringify(screen)}</h2>
        ))}
      </div>
    </>
  )
}

const RootTestComponent = ({
  defaultValues,
  editId,
  initialise,
  isLoading = false,
  onCloseAction = () => {},
}: Props) => {
  const queryClient = new QueryClient()
  const [state, setState] = useState<ScreenState>()

  useEffect(() => {
    if (editId && initialise) {
      setState({ screens: initialise, query: '' })
    }
  }, [editId, initialise])

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ScreenProvider initialise={state}>
          <TestComponent
            defaultValues={defaultValues}
            editId={editId}
            isLoading={isLoading}
            onCloseAction={onCloseAction}
          />
        </ScreenProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

describe('#ScreenForm', () => {
  let createScreenSpy: CreateScreenMock
  let updateScreenSpy: UpdateScreenMock

  beforeEach(() => {
    useSearchListActionMock()
    useElementSizeMock()

    createScreenSpy = useCreateScreenMock()
    updateScreenSpy = useUpdateScreenMock()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('#close', () => {
    test('close button', async () => {
      const onCloseAction = vi.fn()
      const { user, getByText } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} onCloseAction={onCloseAction} />,
      )

      const closeButton = getByText('Close')
      expect(closeButton).toBeEnabled()
      await user.click(closeButton)

      expect(onCloseAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '1'
      updateScreenSpy.override({ opt: { isPending: true } })

      const { container } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} />,
      )

      const spinners = await waitFor(() =>
        container.getElementsByClassName('loading loading-spinner items-center justify-center'),
      )
      expect(spinners).toHaveLength(1)
    })

    test('show loading when creating a screen', async () => {
      const editId = undefined
      createScreenSpy.override({ opt: { isPending: true } })

      const { container } = render(<RootTestComponent defaultValues={undefined} editId={editId} />)

      const spinners = await waitFor(() =>
        container.getElementsByClassName('loading loading-spinner items-center justify-center'),
      )
      expect(spinners).toHaveLength(1)
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '1'

      const { getByText, getByLabelText } = render(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} />,
      )

      const element = await waitFor(() => getByText('Edit Screen'))
      expect(element).toBeDefined()

      expect(getByLabelText('Screen Size')).toHaveValue(49)
      expect(getByLabelText('Aspect Ratio')).toHaveValue('32:9')
      expect(getByLabelText('Horizontal Res')).toHaveValue(5120)
      expect(getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(getByText('Light')).toHaveStyle({ backgroundColor: '#000000' })
      expect(getByText('Dark')).toHaveStyle({ backgroundColor: '#FFFFFF' })

      expect(getByText('Update')).toBeDisabled()
      expect(getByText('Reset')).toBeEnabled()
      expect(getByText('Close')).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '1'

      const { user, getByText, getByLabelText } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} />,
      )
      const resetButton = getByText('Reset')

      await user.clear(getByLabelText('Screen Size'))
      await user.type(getByLabelText('Screen Size'), '27')
      expect(getByLabelText('Screen Size')).toHaveValue(27)

      await user.click(resetButton)
      expect(getByLabelText('Screen Size')).toHaveValue(49)
    })

    test('change screen theme colors', async () => {
      const editId = '1'

      const { user, getByText } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} />,
      )
      const changeButton = getByText('Change')
      const lightColor = getByText('Light')
      const darkColor = getByText('Dark')

      expect(lightColor).toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).toHaveStyle({ backgroundColor: '#FFFFFF' })

      await user.click(changeButton)

      expect(lightColor).not.toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).not.toHaveStyle({ backgroundColor: '#FFFFFF' })
    })

    test('update a screen from list and populate form', async () => {
      const modifiedValues: ScreenInput = { ...screenInputFixture, diagonalSize: 32 }
      const editId = '1'
      updateScreenSpy.override({ screenInput: modifiedValues, id: editId })
      const initialise = [{ ...transformScreenInput(screenInputFixture), id: editId }]

      const { user, getByLabelText, container, getByText } = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} initialise={initialise} />,
      )

      await user.type(getByLabelText('Screen Size'), '38')

      const updateButton = getByText('Update')
      expect(updateButton).toBeEnabled()
      await user.click(updateButton)

      expect(updateButton).toBeEnabled()
      const h2Element = container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":32')
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', async () => {
      const { getByText, getByLabelText } = render(<RootTestComponent defaultValues={undefined} />)

      const element = await waitFor(() => getByText('Add Screen'))

      expect(element).toBeDefined()
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

    test('select a screen from list and populate form', async () => {
      const { user, getByText, getByLabelText, getByPlaceholderText, container } = useInteractComponent(
        <RootTestComponent defaultValues={undefined} />,
      )

      const inputElement = getByPlaceholderText('Type to filter list...')
      await user.type(inputElement, 'WQHD+')

      const listElement = container.querySelectorAll('li')[0]
      await user.click(listElement)

      expect(getByLabelText('Screen Size')).toHaveValue(34)
      expect(getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(getByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(getByText('Light')).toBeInTheDocument()
      expect(getByText('Dark')).toBeInTheDocument()

      expect(getByText('Create')).toBeEnabled()
      expect(getByText('Reset')).toBeEnabled()
      expect(getByText('Close')).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const { user, getByPlaceholderText, container, getByText } = useInteractComponent(
        <RootTestComponent defaultValues={undefined} />,
      )

      const inputElement = getByPlaceholderText('Type to filter list...')
      await user.type(inputElement, 'WQHD+')

      const listElement = container.querySelectorAll('li')[0]
      await user.click(listElement)

      const createButton = getByText('Create')
      expect(createButton).toBeEnabled()
      await user.click(createButton)

      expect(getByText('Create')).toBeEnabled()
      const h2Element = container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":49')
    })
  })
})
