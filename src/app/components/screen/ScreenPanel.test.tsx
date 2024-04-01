import { getGetScreenMock } from '@packages/openapi/generated'
import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { ScreenPanel } from './ScreenPanel'

describe('#ScreenPanel', () => {
  test('render screen panel component with a table representing the pixel density when selected', () => {
    const screenItem = getGetScreenMock().item
    const test = renderWithUserEvents(<ScreenPanel screen={screenItem} highlighted={screenItem} />)

    const tableElement = test.getByRole('table')
    expect(tableElement).toBeInTheDocument()

    const rowElements = test.getAllByRole('row')
    expect(rowElements.length).toBe(16)

    const colElements = test.getAllByRole('cell')
    expect(colElements.length).toBe(608)
  })

  test('render screen panel component with NO table representing the pixel density when NOT selected', () => {
    const test = renderWithUserEvents(<ScreenPanel screen={getGetScreenMock().item} highlighted={undefined} />)

    const tableElement = test.container.querySelector('table')
    expect(tableElement).not.toBeInTheDocument()
  })
})
