/**
 * Generated by orval 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 */
import type { ScreenColor } from './screenColor'
import type { ScreenData } from './screenData'
import type { ScreenSpecs } from './screenSpecs'

/**
 * Complete screen object
 */
export interface ScreenItem {
  color: ScreenColor
  data: ScreenData
  id: string
  signature: string
  specs: ScreenSpecs
  visible: boolean
}
