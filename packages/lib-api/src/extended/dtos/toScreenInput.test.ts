// packages/lib-api/src/extended/dtos/ScreenItem.test.ts
import type { ScreenInput, ScreenItem } from '@/generated/server/models'
import { describe, expect, it } from 'vitest'
import { toScreenInput } from './toScreenInput'

describe('toScreenInput', () => {
  it('should return a ScreenInput object with valid properties', () => {
    const screenItem: ScreenItem = {
      id: '1',
      specs: {
        hSize: 47.169896067541046,
        vSize: 13.26653326899592,
        hAspectRatio: 32,
        vAspectRatio: 9,
        ppi: 108.54380498674065,
      },
      data: { hRes: 5120, vRes: 1440, diagonalSize: 49, aspectRatio: '32:9' },
      color: {
        lightColor: '#FFFFFF',
        darkColor: '#000000',
      },
      visible: true,
      signature: 'dSize=49&aRatio=32:9&hRes=5120&vRes=1440',
    }

    const expectedScreenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: '32:9',
      hRes: 5120,
      vRes: 1440,
      lightColor: '#FFFFFF',
      darkColor: '#000000',
    }

    expect(toScreenInput(screenItem)).toEqual(expectedScreenInput)
  })

  it('should return a ScreenInput object with null properties', () => {
    const screenItem: ScreenItem = {
      id: '1',
      specs: {
        hSize: 47.169896067541046,
        vSize: 13.26653326899592,
        hAspectRatio: 32,
        vAspectRatio: 9,
        ppi: 108.54380498674065,
      },
      data: { hRes: 5120, vRes: 1440, diagonalSize: 49, aspectRatio: '' },
      color: {
        lightColor: '',
        darkColor: '#000000',
      },
      visible: true,
      signature: 'dSize=49&aRatio=null&hRes=5120&vRes=1440',
    }

    const expectedScreenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: '',
      hRes: 5120,
      vRes: 1440,
      lightColor: '',
      darkColor: '#000000',
    }

    expect(toScreenInput(screenItem)).toEqual(expectedScreenInput)
  })

  it('should return a ScreenInput object with undefined properties', () => {
    const screenItem: ScreenItem = {
      id: '1',
      specs: {
        hSize: 47.169896067541046,
        vSize: 13.26653326899592,
        hAspectRatio: 32,
        vAspectRatio: 9,
        ppi: 108.54380498674065,
      },
      data: { hRes: 5120, vRes: 1440, diagonalSize: 49, aspectRatio: '' },
      color: {
        lightColor: '',
        darkColor: '#000000',
      },
      visible: true,
      signature: 'dSize=49&aRatio=undefined&hRes=5120&vRes=1440',
    }

    const expectedScreenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: '',
      hRes: 5120,
      vRes: 1440,
      lightColor: '',
      darkColor: '#000000',
    }

    expect(toScreenInput(screenItem)).toEqual(expectedScreenInput)
  })
})
