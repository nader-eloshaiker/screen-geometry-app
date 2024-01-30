import { useInteractComponent } from '@test/utils/useInteractComponent'
import { Screens } from './Screens'

describe('#Screen', () => {
  test.skip('present load defaults button when no screens are present', async () => {
    const test = useInteractComponent(<Screens />)

    const loadDefaultsElement = await test.findByLabelText('load defaults button')
    expect(loadDefaultsElement).toBeDefined()
  })
})
