/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 * OpenAPI spec version: 1.0.0
 */
import type { ScreenColor } from './screenColor'
import type { ScreenData } from './screenData'
import type { ScreenRender } from './screenRender'
import type { ScreenSpec } from './screenSpec'
import type { ScreenTag } from './screenTag'

/**
 * Complete screen object
 */
export interface ScreenItem {
  id: string
  favorite: boolean
  tag: ScreenTag
  data: ScreenData
  color: ScreenColor
  spec?: ScreenSpec
  render?: ScreenRender
}
