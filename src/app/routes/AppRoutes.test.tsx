import { getScreenListServiceMock, getScreenServiceMock, getSearchServiceMock } from '@packages/openapi/generated'
import { mswWithSpy, resetMSW, startMSW, stopMSW } from '@packages/serviceworker/NodeServiceWorker'
import { resetLocalStorage } from '@packages/test/mocks/localStorage'
import { renderWithRouter } from '@packages/test/utils/RenderWithRouter'
import { useElementSizeMock } from '@packages/ui/hooks/useElementSize.mock'
import { act } from '@testing-library/react'
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
    resetLocalStorage()
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
    const element = await test.findAllByTestId('link-Screens')

    await test.user.click(element[0])

    expect(await test.findByText('Click here to populate default list')).toBeInTheDocument()
  })

  it('should naviate back home page', async () => {
    const test = await renderWithRouter()
    const screenLink = await test.findAllByTestId('link-Screens')

    await test.user.click(screenLink[0])

    expect(await test.findByText('Click here to populate default list')).toBeInTheDocument()

    const homeLink = await test.findAllByTestId('link-Home')
    await test.user.click(homeLink[0])

    expect(await test.findByText('Welcome to Screen Geometry')).toBeInTheDocument()
  })

  it('should naviate to the contact page', async () => {
    const test = await renderWithRouter()
    const element = await test.findAllByTestId('link-Contact')

    await act(async () => {
      await test.user.click(element[0])
    })

    expect(await test.findByText('How to engage with me or this app')).toBeInTheDocument()
  })

  it('should naviate to the help page', async () => {
    const test = await renderWithRouter()
    const element = await test.findAllByTestId('link-Help')

    await act(async () => {
      await test.user.click(element[0])
    })

    expect(await test.findByText('Getting started')).toBeInTheDocument()
  })
})
