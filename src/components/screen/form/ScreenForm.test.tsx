import { useElementSizeMock } from '@components/common/hooks/useElementSize.mock'
import { NotificationProvider } from '@components/common/notification'
import { QueryProvider } from '@contexts/Query/QueryProvider'
import { ScreenProvider } from '@contexts/Screen/ScreenProvider'
import { useScreenContext } from '@contexts/Screen/useScreenContext'
import {
  ScreenInput,
  ScreenItem,
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
} from '@openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@serviceworker/NodeServiceWorker'
import { screenInputFixture } from '@test/fixtures/ScreenFixtures'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { render, waitFor } from '@testing-library/react'
import { transformScreenInput } from '@utils/DataTransformation'
import { ScreenForm } from './ScreenForm'

type Props = {
  defaultValues: ScreenInput | undefined
  editId?: string | undefined
  initialise?: ScreenItem[]
  onCloseAction?: () => void
}
const TestComponent = ({ defaultValues, editId, onCloseAction }: Props) => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <>
      <ScreenForm defaultValues={defaultValues} editId={editId} isLoading={false} onClose={onCloseAction} />
      <div>
        <h1>Screens</h1>
        {screens.map((screen) => (
          <h2 key={screen.id}>{JSON.stringify(screen)}</h2>
        ))}
      </div>
    </>
  )
}

const RootTestComponent = ({ defaultValues, editId, initialise, onCloseAction = () => {} }: Props) => {
  return (
    <QueryProvider>
      <NotificationProvider>
        <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
          <TestComponent defaultValues={defaultValues} editId={editId} onCloseAction={onCloseAction} />
        </ScreenProvider>
      </NotificationProvider>
    </QueryProvider>
  )
}

describe('#ScreenForm', () => {
  mswWithSpy([...getSearchServiceMock(), ...getScreenServiceMock(), ...getScreenListServiceMock()])

  beforeAll(async () => {
    startMSW()
  })

  afterAll(async () => {
    stopMSW()
  })

  beforeEach(() => {
    useElementSizeMock()
    resetMSW()
  })

  describe('#close', () => {
    test('close button', async () => {
      const onCloseAction = vi.fn()
      const test = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} onCloseAction={onCloseAction} />,
      )

      const closeButton = await test.findByText('Close')
      expect(closeButton).toBeEnabled()

      await test.user.click(closeButton)
      expect(onCloseAction).toHaveBeenCalledTimes(1)
    })
  })

  // testing load state is proplematic with MSW response is pending
  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '1'
      const test = useInteractComponent(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)

      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.clear(inputScreenSize)
      await test.user.type(inputScreenSize, '27')

      const submitButton = await test.findByText('Update')
      await test.user.click(submitButton)

      waitFor(() => expect(test.getByTestId('busySubmitButton')).toBeInTheDocument())
    })

    test('show loading when creating a screen', async () => {
      const test = useInteractComponent(<RootTestComponent defaultValues={undefined} editId={undefined} />)

      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.type(inputScreenSize, '27')

      const ratioElement = await test.findByLabelText('Aspect Ratio')
      await test.user.type(ratioElement, '32:9')

      const hResElement = await test.findByLabelText('Horizontal Res')
      await test.user.type(hResElement, '5120')

      const vResElement = await test.findByLabelText('Vertical Res')
      await test.user.type(vResElement, '1440')

      // test.debug()
      const submitButton = await test.findByText('Create')
      await test.user.click(submitButton)

      waitFor(() => expect(test.getByTestId('busySubmitButton')).toBeInTheDocument())
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '1'

      const test = render(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)

      const element = await test.findByText('Edit Screen')
      expect(element).toBeDefined()

      expect(await test.findByLabelText('Screen Size')).toHaveValue(49)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('32:9')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(5120)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(1440)

      expect(await test.findByText('Light')).toHaveStyle({ backgroundColor: '#000000' })
      expect(await test.findByText('Dark')).toHaveStyle({ backgroundColor: '#FFFFFF' })

      expect(await test.findByText('Update')).toBeDisabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '1'

      const test = useInteractComponent(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)
      const resetButton = await test.findByText('Reset')

      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.clear(inputScreenSize)
      await test.user.type(inputScreenSize, '27')
      expect(inputScreenSize).toHaveValue(27)

      await test.user.click(resetButton)
      expect(inputScreenSize).toHaveValue(49)
    })

    test('change screen theme colors', async () => {
      const editId = '1'

      const test = useInteractComponent(<RootTestComponent defaultValues={screenInputFixture} editId={editId} />)
      const changeButton = await test.findByText('Change')
      const lightColor = await test.findByText('Light')
      const darkColor = await test.findByText('Dark')

      expect(lightColor).toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).toHaveStyle({ backgroundColor: '#FFFFFF' })

      await test.user.click(changeButton)

      expect(lightColor).not.toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).not.toHaveStyle({ backgroundColor: '#FFFFFF' })
    })

    test('update a screen from list and populate form', async () => {
      const editId = '5HjERJbH'
      const initialise: Array<ScreenItem> = [{ ...transformScreenInput(screenInputFixture), id: editId }]

      const test = useInteractComponent(
        <RootTestComponent defaultValues={screenInputFixture} editId={editId} initialise={initialise} />,
      )

      await test.findByPlaceholderText('Type to filter list...')
      const inputScreenSize = await test.findByLabelText('Screen Size')
      await test.user.clear(inputScreenSize)
      await test.user.type(inputScreenSize, '38')

      const updateButton = await test.findByText('Update')
      await test.user.click(updateButton)
      expect(await test.findByText('Update')).toBeEnabled()

      const h2Element = test.container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":38')
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', async () => {
      const test = render(<RootTestComponent defaultValues={undefined} />)

      const element = await test.findByText('Add Screen')

      expect(element).toBeDefined()
      expect(await test.findByLabelText('Screen Size')).toHaveValue(null)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(null)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(null)

      expect(await test.findByText('Light')).toBeInTheDocument()
      expect(await test.findByText('Dark')).toBeInTheDocument()

      expect(await test.findByText('Create')).toBeDisabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('select a screen from list and populate form', async () => {
      const test = useInteractComponent(<RootTestComponent defaultValues={undefined} />)

      const inputElement = await test.findByPlaceholderText('Type to filter list...')
      await test.user.type(inputElement, 'WQHD+')

      const listElement = test.container.querySelectorAll('li')[0] as HTMLElement
      await test.user.click(listElement)

      expect(await test.findByLabelText('Screen Size')).toHaveValue(34)
      expect(await test.findByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(await test.findByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(await test.findByLabelText('Vertical Res')).toHaveValue(1440)

      expect(await test.findByText('Light')).toBeInTheDocument()
      expect(await test.findByText('Dark')).toBeInTheDocument()

      expect(await test.findByText('Create')).toBeEnabled()
      expect(await test.findByText('Reset')).toBeEnabled()
      expect(await test.findByText('Close')).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const test = useInteractComponent(<RootTestComponent defaultValues={undefined} />)

      const inputElement = await test.findByPlaceholderText('Type to filter list...')
      await test.user.type(inputElement, 'WQHD+')

      const listElement = test.container.querySelectorAll('li')[0] as HTMLElement
      await test.user.click(listElement)

      const createButton = await test.findByText('Create')
      expect(createButton).toBeEnabled()
      await test.user.click(createButton)

      expect(await test.findByText('Create')).toBeEnabled()
      const h2Element = test.container.querySelectorAll('h2')
      expect(h2Element).toHaveLength(1)
      expect(h2Element[0]).toHaveTextContent('"diagonalSize":49')
    })
  })
})
