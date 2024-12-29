import { QueryProvider } from '@/app/contexts/Query/QueryProvider'
import { ScreenProvider } from '@/app/contexts/Screen/ScreenProvider'
import { useScreenContext } from '@/app/contexts/Screen/useScreenContext'
import { ScreenItemRender } from '@/app/models/screenItemRender'
import {
  getScreenListServiceMock,
  getScreenServiceMock,
  getSearchServiceMock,
  SearchItem,
} from '@/lib/openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { screenInputFixture } from '@/lib/support/test/fixtures/ScreenFixtures'
import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { Button } from '@/lib/ui/components/button/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/ui/components/sheet/Sheet'
import { Toaster } from '@/lib/ui/components/toaster/Toaster'
import { useElementSizeMock } from '@/lib/ui/hooks/useElementSize.mock'
import { toScreenItemRender, transformScreenInput } from '@/lib/utils'
import { act, render, waitFor } from '@testing-library/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ScreenForm } from './ScreenForm'
import { FormSubmitType } from './ScreenFormSchema'

type ChildProps = {
  isEditLoading: boolean
  editId?: string
  editScreen?: FormSubmitType
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const ListComponent = () => {
  const {
    state: { screens },
  } = useScreenContext()

  return (
    <div>
      <h1>ScreenList</h1>
      <ul>
        {screens.map((screen) => (
          <li aria-label={'ScreenList:{screen.id}'} id={screen.id} key={screen.id}>
            {JSON.stringify(screen)}
          </li>
        ))}
      </ul>
    </div>
  )
}
const ChildTestComponent = ({ isEditLoading, editId, editScreen, open, setOpen }: ChildProps) => {
  const [selectedItem, setSelectedItem] = useState<SearchItem>()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button mode='outline'>Create Screen</Button>
      </SheetTrigger>
      <SheetContent side='right' showCloseButton={false} className='flex flex-col p-1'>
        <ScreenForm
          editScreen={editScreen}
          editId={editId}
          isEditLoading={isEditLoading}
          setOpen={setOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <ListComponent />
      </SheetContent>
    </Sheet>
  )
}

type ParentProps = Partial<ChildProps> & {
  initialise?: Array<ScreenItemRender>
}

const RootTestComponent = ({ initialise, isEditLoading, editId, editScreen }: ParentProps) => {
  const [open, setOpen] = useState(true)

  // force open as tests that close the sheet persist between tests
  useEffect(() => {
    if (!open) {
      setOpen(true)
    }
  }, [open])

  return (
    <QueryProvider>
      <ScreenProvider initialise={{ screens: initialise ?? [], query: '' }}>
        <h1>formState:{open ? 'open' : 'close'}</h1>
        <ChildTestComponent
          editScreen={editScreen}
          editId={editId}
          isEditLoading={!!isEditLoading}
          open={open}
          setOpen={setOpen}
        />
        {!open && <ListComponent />}
      </ScreenProvider>
      <Toaster />
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
      const test = await renderWithUserEvents(<RootTestComponent editScreen={screenInputFixture} />)

      expect(test.getByText('formState:open')).toBeTruthy()

      test.user.keyboard('{Escape}')

      expect(await test.findByText('formState:close')).toBeTruthy()
    })
  })

  // testing load state is proplematic with MSW response is pending
  describe('#LoadingMode', () => {
    test('show loading when updating a screen', async () => {
      const editId = '1'
      const test = await renderWithUserEvents(<RootTestComponent editScreen={screenInputFixture} editId={editId} />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => await test.user.clear(inputScreenSize))

      await act(async () => await test.user.type(inputScreenSize, '27'))

      const submitButton = test.getByText('Update')
      await act(async () => await test.user.click(submitButton))

      expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
    })

    test('show loading when creating a screen', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => await test.user.type(inputScreenSize, '27'))

      const ratioElement = test.getByLabelText('Aspect Ratio')
      await act(async () => await test.user.type(ratioElement, '32:9'))

      const hResElement = test.getByLabelText('Horizontal Res')
      await act(async () => await test.user.type(hResElement, '5120'))

      const vResElement = test.getByLabelText('Vertical Res')
      await act(async () => await test.user.type(vResElement, '1440'))

      const submitButton = test.getByText('Create')
      await act(async () => await test.user.click(submitButton))

      expect(test.getByTestId('busySubmitButton')).toBeInTheDocument()
    })
  })

  describe('#EditMode', () => {
    test('renders the screen form', async () => {
      const editId = '1'

      const test = render(<RootTestComponent editScreen={screenInputFixture} editId={editId} />)

      const element = test.getByText('Edit Screen')
      expect(element).toBeDefined()

      expect(test.getByLabelText('Screen Size')).toHaveValue(49)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('32:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(5120)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(test.getByLabelText('Light Color')).toHaveStyle({ backgroundColor: '#000000' })
      expect(test.getByLabelText('Dark Color')).toHaveStyle({ backgroundColor: '#FFFFFF' })

      expect(test.getByRole('button', { name: 'Update' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeDisabled()
      const closeButton = test.getByRole('button', { name: 'Close' })
      expect(closeButton).toBeEnabled()
    })

    test('reset screen form', async () => {
      const editId = '1'

      const test = await renderWithUserEvents(<RootTestComponent editScreen={screenInputFixture} editId={editId} />)
      const resetButton = test.getByText('Reset')

      const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => {
        await test.user.clear(inputScreenSize)
        await test.user.type(inputScreenSize, '27')
        expect(inputScreenSize).toHaveValue(27)
      })

      await act(async () => await test.user.click(resetButton))
      expect(inputScreenSize).toHaveValue(49)
    })

    test('change screen theme colors', async () => {
      const editId = '1'

      const test = await renderWithUserEvents(<RootTestComponent editScreen={screenInputFixture} editId={editId} />)
      const changeButton = test.getByTestId('generate-color-btn')
      const lightColor = test.getByLabelText('Light Color')
      const darkColor = test.getByLabelText('Dark Color')

      expect(lightColor).toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).toHaveStyle({ backgroundColor: '#FFFFFF' })

      await act(async () => await test.user.click(changeButton))

      expect(lightColor).not.toHaveStyle({ backgroundColor: '#000000' })
      expect(darkColor).not.toHaveStyle({ backgroundColor: '#FFFFFF' })
    })

    test('update a screen from list and populate form', async () => {
      const editId = '5HjERJbH'
      const initialise: Array<ScreenItemRender> = [
        toScreenItemRender({ ...transformScreenInput(screenInputFixture), id: editId }),
      ]

      const test = await renderWithUserEvents(
        <RootTestComponent editScreen={screenInputFixture} editId={editId} initialise={initialise} />,
      )
      const li = test.getAllByRole('listitem', { name: /ScreenList/i })
      expect(li).toHaveLength(1)
      expect(li[0]).toHaveTextContent('"diagonalSize":49')

      const inputScreenSize = test.getByLabelText('Screen Size')
      await act(async () => await test.user.clear(inputScreenSize))
      await act(async () => await test.user.type(inputScreenSize, '38'))

      const updateButton = test.getByText('Update')
      expect(updateButton).toBeEnabled()
      await act(async () => await test.user.click(updateButton))

      await waitFor(() => {
        const liUpdated = test.getAllByRole('listitem', { name: /ScreenList/i })
        expect(liUpdated).toHaveLength(1)
        expect(liUpdated[0]).toHaveTextContent('"diagonalSize":38')
      })
    })
  })

  describe('#CreateMode', () => {
    test('renders the screen form', async () => {
      const test = render(<RootTestComponent />)

      const element = test.getByText('Create Screen')

      expect(element).toBeDefined()
      expect(test.getByLabelText('Screen Size')).toHaveValue(null)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(null)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(null)

      expect(test.getByLabelText('Light Color')).toBeInTheDocument()
      expect(test.getByLabelText('Dark Color')).toBeInTheDocument()

      expect(test.getByRole('button', { name: 'Create' })).toBeDisabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeDisabled()
      const closeButton = test.getByRole('button', { name: 'Close' })
      expect(closeButton).toBeEnabled()
    })

    test('select a screen from list and populate form', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      const inputElement = test.getByPlaceholderText('Type to filter list...')
      await act(async () => await test.user.type(inputElement, 'WQHD+'))

      const listElement = test.getByRole('button', { name: /WQHD 34" 3440x1440 21:9/i })
      await act(async () => await test.user.click(listElement))

      expect(test.getByLabelText('Screen Size')).toHaveValue(34)
      expect(test.getByLabelText('Aspect Ratio')).toHaveValue('21:9')
      expect(test.getByLabelText('Horizontal Res')).toHaveValue(3440)
      expect(test.getByLabelText('Vertical Res')).toHaveValue(1440)

      expect(test.getByLabelText('Light Color')).toBeInTheDocument()
      expect(test.getByLabelText('Dark Color')).toBeInTheDocument()

      expect(test.getByRole('button', { name: 'Create' })).toBeEnabled()
      expect(test.getByRole('button', { name: 'Reset' })).toBeEnabled()
      const closeButton = test.getByRole('button', { name: 'Close' })
      expect(closeButton).toBeEnabled()
    })

    test('create a screen from list and populate form', async () => {
      const test = await renderWithUserEvents(<RootTestComponent />)

      const inputElement = test.getByPlaceholderText('Type to filter list...')
      await test.user.type(inputElement, 'WQHD+')

      const listElement = test.getByRole('button', { name: /WQHD 34" 3440x1440 21:9/i })
      await act(async () => await test.user.click(listElement))

      const createButton = test.getByText('Create')
      expect(createButton).toBeEnabled()
      await act(async () => await test.user.click(createButton))

      await waitFor(() => {
        const liUpdated = test.getAllByRole('listitem', { name: /ScreenList/i })
        expect(liUpdated).toHaveLength(1)
        expect(liUpdated[0]).toHaveTextContent('"diagonalSize":49')
      })
    })
  })
})
