import { renderWithUserEvents } from '@packages/test/utils/RenderWithUserEvents'
import { act } from '@testing-library/react'
import { HAlignKey, HorizontalAlignmentSelector, VAlignKey, VerticalAlignmentSelector } from './AlignmentSelector'

describe('#AlignmentSelector', () => {
  const onChangeMock = vi.fn()

  beforeEach(() => {
    onChangeMock.mockClear()
    window.localStorage.reset()
  })

  describe('VerticalAlignmentSelector', () => {
    it('should render', async () => {
      const { getAllByRole } = await renderWithUserEvents(<VerticalAlignmentSelector onChange={onChangeMock} />)
      const elements = getAllByRole('button')

      expect(elements).toHaveLength(3)
      expect(window.localStorage.getItem).toHaveBeenCalledWith(VAlignKey)
    })

    it('should align vertically when button clicked', async () => {
      const { getAllByRole, user } = await renderWithUserEvents(<VerticalAlignmentSelector onChange={onChangeMock} />)
      const elements = getAllByRole('button')

      await act(async () => {
        await user.click(elements[0])
      })

      expect(onChangeMock).toHaveBeenCalledWith('start')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(VAlignKey, '"start"')

      await act(async () => {
        await user.click(elements[1])
      })

      expect(onChangeMock).toHaveBeenCalledWith('center')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(VAlignKey, '"center"')

      await act(async () => {
        await user.click(elements[2])
      })

      expect(onChangeMock).toHaveBeenCalledWith('end')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(VAlignKey, '"end"')
    })
  })

  describe('HorizontalAlignmentSelector', () => {
    it('should render', async () => {
      const { getAllByRole } = await renderWithUserEvents(<HorizontalAlignmentSelector onChange={onChangeMock} />)
      const elements = getAllByRole('button')

      expect(elements).toHaveLength(3)
      expect(window.localStorage.getItem).toHaveBeenCalledWith(HAlignKey)
    })

    it('should align horizontally when button clicked', async () => {
      const { getAllByRole, user } = await renderWithUserEvents(<HorizontalAlignmentSelector onChange={onChangeMock} />)
      const elements = getAllByRole('button')

      await act(async () => {
        await user.click(elements[0])
      })

      expect(onChangeMock).toHaveBeenCalledWith('start')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(HAlignKey, '"start"')

      await act(async () => {
        await user.click(elements[1])
      })

      expect(onChangeMock).toHaveBeenCalledWith('center')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(HAlignKey, '"center"')

      await act(async () => {
        await user.click(elements[2])
      })

      expect(onChangeMock).toHaveBeenCalledWith('end')
      expect(window.localStorage.setItem).toHaveBeenCalledWith(HAlignKey, '"end"')
    })
  })
})
