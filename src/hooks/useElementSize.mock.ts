import * as ElementSizeModule from '@hooks/useElementSize'

export const useElementSizeMock = (value?: ElementSizeModule.ElementSize) => {
  const useElementSizeResponse: ElementSizeModule.ElementSize = value ?? {
    width: 1024,
    height: 1024,
    x: 0,
    y: 0,
  }
  return vi.spyOn(ElementSizeModule, 'useElementSize').mockImplementation(() => useElementSizeResponse)
}
