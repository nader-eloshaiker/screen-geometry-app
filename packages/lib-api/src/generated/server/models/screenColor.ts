/**
 * Generated by orval 🍺
 * Do not edit manually.
 * screen-geometry-app-backend-serverless-apis-v1
 * Environment configuration for endpoints

 */

/**
 * Screen representation colors in hex format
 */
export interface ScreenColor {
  /**
   * @minLength 7
   * @maxLength 7
   * @pattern #([a-fA-F0-9]{6})\b
   */
  lightColor: string
  /**
   * @minLength 7
   * @maxLength 7
   * @pattern #([a-fA-F0-9]{6})\b
   */
  darkColor: string
}
