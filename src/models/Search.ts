import { ScreenData, ScreenInput, ScreenSpec } from '@openapi/generated/models'

export type SearchData = Partial<ScreenData> & Pick<ScreenData, 'hAspectRatio'> & Pick<ScreenData, 'vAspectRatio'>
export type SearchTag = Partial<ScreenInput> & Pick<ScreenInput, 'aspectRatio'>
export interface SearchScreenItem {
  id: string
  label: string
  tag: SearchTag
  data: SearchData
  spec?: ScreenSpec
}
