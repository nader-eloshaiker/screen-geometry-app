import { getScreenListServiceMock, getScreenServiceMock, getSearchServiceMock } from '@/lib/openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@/lib/serviceworker/NodeServiceWorker'
import { renderWithRouter } from '@/lib/support/test/utils/RenderWithRouter'
import { useElementSizeMock } from '@/lib/ui/hooks/useElementSize.mock'
import { act, waitFor } from '@testing-library/react'
import { HttpResponse, delay, http } from 'msw'

describe('#App', () => {
  mswWithSpy([
    http.get('*/v1/screens', async () => {
      await delay(10)
      return new HttpResponse(JSON.stringify({ list: [] }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    ...getScreenServiceMock(),
    ...getScreenListServiceMock(),
    ...getSearchServiceMock(),
  ])

  afterEach(() => {
    vi.clearAllMocks()
  })

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

  it('should render', async () => {
    const test = await renderWithRouter()

    expect(await test.findByText('Welcome to Screen Geometry')).toBeInTheDocument()
  })

  it('should naviate to the screens page', async () => {
    const test = await renderWithRouter()
    const element = await test.findAllByRole('link', { name: 'Screens' })

    await act(async () => {
      await test.user.click(element[0])
    })

    await waitFor(() => expect(test.queryByText('Click here to populate default list')).toBeInTheDocument(), {
      timeout: 10000,
    })
  })

  it('should naviate back home page', async () => {
    const test = await renderWithRouter()
    const screenLink = await test.findAllByRole('link', { name: 'Screens' })

    await act(async () => {
      await test.user.click(screenLink[0])
    })

    await waitFor(() => expect(test.queryByText('Click here to populate default list')).toBeInTheDocument())

    const homeLink = await test.findAllByRole('link', { name: 'Home' })
    await act(async () => {
      await test.user.click(homeLink[0])
    })

    await waitFor(() => expect(test.queryByText('Welcome to Screen Geometry')).toBeInTheDocument())
  })

  it('should naviate to the contact page', async () => {
    const test = await renderWithRouter()
    const element = await test.findAllByRole('link', { name: 'Contact' })

    await act(async () => {
      await test.user.click(element[0])
    })

    await waitFor(() => expect(test.queryByText('How to engage with me or this app')).toBeInTheDocument())
  })

  it('should naviate to the help page', async () => {
    const test = await renderWithRouter()
    const element = await test.findAllByRole('link', { name: 'Help' })

    await act(async () => {
      await test.user.click(element[0])
    })

    await waitFor(() => expect(test.queryByText('Getting started')).toBeInTheDocument(), {
      timeout: 10000,
    })
  })
})
