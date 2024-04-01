import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { act, waitFor } from '@testing-library/react'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { App } from '../App'

// async function wait(ms = 0): Promise<void> {
//   return await act(async () => {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms)
//     })
//   })
// }

const TestComnponent = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  )
}

describe('#App', () => {
  it('should render', async () => {
    const test = renderWithUserEvents(<TestComnponent />)

    waitFor(() => expect(test.getByText('Welcome to Screen Geometry')).toBeInTheDocument())
  })

  it('should naviate to the screens page', async () => {
    const test = renderWithUserEvents(<TestComnponent />)
    const element = await test.findAllByTestId('link-Screens')

    await act(async () => {
      await test.user.click(element[0])
    })

    waitFor(() => expect(test.getByText('Click here to populate default list')).toBeInTheDocument())
  })

  it('should naviate back home page', async () => {
    const test = renderWithUserEvents(<TestComnponent />)
    const element = await test.findAllByTestId('link-Screens')

    await act(async () => {
      await test.user.click(element[0])
    })

    waitFor(() => expect(test.getByText('Click here to populate default list')).toBeInTheDocument())

    const element2 = await test.findAllByTestId('link-Home')

    await act(async () => {
      await test.user.click(element2[0])
    })

    waitFor(() => expect(test.getByText('Welcome to Screen Geometry')).toBeInTheDocument())
  })

  it('should naviate to the contact page', async () => {
    const test = renderWithUserEvents(<TestComnponent />)
    const element = await test.findAllByTestId('link-Contact')

    await act(async () => {
      await test.user.click(element[0])
    })

    waitFor(() => expect(test.getByText('How to engage with me or this app')).toBeInTheDocument())
  })

  it('should naviate to the help page', async () => {
    const test = renderWithUserEvents(<TestComnponent />)
    const element = await test.findAllByTestId('link-Help')

    await act(async () => {
      await test.user.click(element[0])
    })

    waitFor(() => expect(test.getByText('Getting started')).toBeInTheDocument())
  })
})
