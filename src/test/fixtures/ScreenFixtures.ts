import { ScreenItemResponse } from '@openapi/generated'

export const screenInputFixture = {
  aspectRatio: '32:9',
  diagonalSize: 49,
  hRes: 5120,
  vRes: 1440,
  darkColor: '#FFFFFF',
  lightColor: '#000000',
}

export const screenItemFixture: ScreenItemResponse = {
  item: {
    id: '5HjERJbH',
    tag: {
      diagonalSize: 38,
      aspectRatio: '21:9',
    },
    data: {
      hSize: 34.9275111406862,
      vSize: 14.968933346008372,
      hAspectRatio: 21,
      vAspectRatio: 9,
    },
    spec: {
      hRes: 3840,
      vRes: 1600,
      ppi: 109.47368421052632,
    },
    color: {
      lightColor: '#F6693C',
      darkColor: '#C33609',
    },
    visible: true,
    render: {
      width: 0.7404619058450888,
      height: 0.7100596596986617,
    },
  },
}
