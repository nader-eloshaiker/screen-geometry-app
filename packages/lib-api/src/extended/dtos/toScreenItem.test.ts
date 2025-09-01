// packages/lib-api/src/extended/dtos/ScreenInput.test.ts
import type { ScreenInput, ScreenItem } from '@/generated/server/models'
import { describe, expect, it } from 'vitest'
import { toScreenItem } from './toScreenItem'

describe('toScreenItem#', () => {
  it('should return a ScreenItem object with calculated specs', () => {
    const screenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: '32:9',
      hRes: 5120,
      vRes: 1440,
      lightColor: '#FFFFFF',
      darkColor: '#000000',
    }

    const expectedScreenItem: Omit<ScreenItem, 'id'> = {
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

    expect(toScreenItem(screenInput)).toEqual(expectedScreenItem)
  })

  it('should handle null or undefined aspectRatio', () => {
    const screenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: '123',
      hRes: 5120,
      vRes: 1440,
      lightColor: '#FFFFFF',
      darkColor: '#000000',
    }

    const expectedScreenItem: Omit<ScreenItem, 'id'> = {
      specs: {
        hSize: 34.648232278140824,
        vSize: 34.648232278140824,
        hAspectRatio: 1,
        vAspectRatio: 1,
        ppi: 108.54380498674065,
      },
      data: { hRes: 5120, vRes: 1440, diagonalSize: 49, aspectRatio: '123' },
      color: {
        lightColor: '#FFFFFF',
        darkColor: '#000000',
      },
      visible: true,
      signature: 'dSize=49&aRatio=123&hRes=5120&vRes=1440',
    }

    expect(toScreenItem(screenInput)).toEqual(expectedScreenItem)
  })

  it('should handle invalid aspectRatio format', () => {
    const screenInput: ScreenInput = {
      diagonalSize: 49,
      aspectRatio: ' invalid',
      hRes: 5120,
      vRes: 1440,
      lightColor: '#FFFFFF',
      darkColor: '#000000',
    }

    const expectedScreenItem: Omit<ScreenItem, 'id'> = {
      specs: {
        hSize: 34.648232278140824,
        vSize: 34.648232278140824,
        hAspectRatio: 1,
        vAspectRatio: 1,
        ppi: 108.54380498674065,
      },
      data: { hRes: 5120, vRes: 1440, diagonalSize: 49, aspectRatio: ' invalid' },
      color: {
        lightColor: '#FFFFFF',
        darkColor: '#000000',
      },
      visible: true,
      signature: 'dSize=49&aRatio= invalid&hRes=5120&vRes=1440',
    }

    expect(toScreenItem(screenInput)).toEqual(expectedScreenItem)
  })
})
