import { ScreenItem, ScreenItemResponse } from '@/lib/openapi/generated'

export const screenInputFixture = {
  aspectRatio: '32:9',
  diagonalSize: 49,
  hRes: 5120,
  vRes: 1440,
  darkColor: '#FFFFFF',
  lightColor: '#000000',
}

export const screenItemFixture: ScreenItem = {
  id: '5HjERJbH',
  specs: {
    hSize: 34.9275111406862,
    vSize: 14.968933346008372,
    hAspectRatio: 21,
    vAspectRatio: 9,
    ppi: 109.47368421052632,
  },
  data: {
    diagonalSize: 38,
    aspectRatio: '21:9',
    hRes: 3840,
    vRes: 1600,
  },
  color: {
    lightColor: '#F6693C',
    darkColor: '#C33609',
  },
  visible: true,
  signature: 'dSize=38&aSize=21:9&hRes=3840&vRes=1600',
}

export const screenItemResponseFixture: ScreenItemResponse = {
  item: screenItemFixture,
}
