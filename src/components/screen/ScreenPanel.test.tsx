import { getGetScreenMock } from '@openapi/generated/services/screen-service'
import { useInteractComponent } from '@test/utils/useInteractComponent'
import { ScreenPanel } from './ScreenPanel'

describe('#ScreenPanel', () => {
  test('render screen panel component with a table representing the pixel density when selected', () => {
    const test = useInteractComponent(<ScreenPanel screen={getGetScreenMock().item} isHighlighted={() => true} />)

    const tableElement = test.getByRole('table')
    expect(tableElement).toBeInTheDocument()

    const rowElements = test.getAllByRole('row')
    expect(rowElements.length).toBe(16)

    const colElements = test.getAllByRole('cell')
    expect(colElements.length).toBe(608)
  })

  test('render screen panel component with NO table representing the pixel density when NOT selected', () => {
    const test = useInteractComponent(<ScreenPanel screen={getGetScreenMock().item} isHighlighted={() => false} />)

    const tableElement = test.container.querySelector('table')
    expect(tableElement).not.toBeInTheDocument()
  })
})
