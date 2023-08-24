import { ScreenData, ScreenInput, ScreenSpec } from '../generated/openapi/models'

export interface DataBaseEntry {
  name: string
  size?: number
  width: number
  height: number
  aspectRatio: string
}

export type SearchData = Partial<ScreenData> & Pick<ScreenData, 'hAspectRatio'> & Pick<ScreenData, 'vAspectRatio'>
export type SearchTag = Partial<ScreenInput> & Pick<ScreenInput, 'aspectRatio'>
export type SearchSpec = Partial<ScreenSpec> & Pick<ScreenSpec, 'vRes'> & Pick<ScreenSpec, 'hRes'>
export interface SearchItem {
  id: string
  label: string
  tag: SearchTag
  data: SearchData
  spec?: SearchSpec
}
