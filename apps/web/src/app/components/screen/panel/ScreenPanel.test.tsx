import { toScreenItemRender } from '@/app/utils'
import { renderWithUserEvents } from '@/lib/support/test/utils/RenderWithUserEvents'
import { TestEnvironment } from '@/lib/support/test/utils/TestEnvironment'
import { getGetScreenResponseMock } from '@screengeometry/lib-api/spec'
import { ScreenPanel } from './ScreenPanel'

describe('#ScreenPanel', () => {
  const screenItem = toScreenItemRender(getGetScreenResponseMock().item)

  test('render screen panel component with a table representing the pixel density when selected', async () => {
    const test = await renderWithUserEvents(<ScreenPanel screen={screenItem} highlighted={screenItem} />, {
      wrapper: TestEnvironment,
    })

    const tableElement = test.getByRole('table')
    expect(tableElement).toBeInTheDocument()

    const rowElements = test.getAllByRole('row')
    expect(rowElements.length).toBe(16)

    const colElements = test.getAllByRole('cell')
    expect(colElements.length).toBe(608)
  })

  test('render screen panel component with NO table representing the pixel density when NOT selected', async () => {
    const test = await renderWithUserEvents(<ScreenPanel screen={screenItem} highlighted={undefined} />, {
      wrapper: TestEnvironment,
    })

    const tableElement = test.container.querySelector('table')
    expect(tableElement).not.toBeInTheDocument()
  })
})
