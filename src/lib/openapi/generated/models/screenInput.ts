/**
 * Generated by orval 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 */

/**
 * Screen primitive data
 */
export interface ScreenInput {
  /** @minLength 3 */
  aspectRatio: string
  /**
   * @minLength 7
   * @maxLength 7
   * @pattern #([a-f0-9]{6})\b
   */
  darkColor: string
  /**
   * @minimum 0
   * @exclusiveMinimum
   */
  diagonalSize: number
  /**
   * @minimum 0
   * @exclusiveMinimum
   */
  hRes: number
  /**
   * @minLength 7
   * @maxLength 7
   * @pattern #([a-f0-9]{6})\b
   */
  lightColor: string
  vRes: number
}