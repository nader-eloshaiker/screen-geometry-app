import { IScreenData, IScreenDataInput, IScreenSpec } from './Screen'

export interface IDataBaseEntry {
  name: string
  size?: number
  width: number
  height: number
  aspectRatio: string
}

export type ISearchData = Partial<IScreenData> & Pick<IScreenData, 'hApsectRatio'> & Pick<IScreenData, 'vApsectRatio'>
export type ISearchTag = Partial<IScreenDataInput> & Pick<IScreenDataInput, 'aspectRatio'>
export type ISearchSpec = Partial<IScreenSpec> & Pick<IScreenSpec, 'vRes'> & Pick<IScreenSpec, 'hRes'>
export interface ISearch {
  id: string
  label: string
  tag: ISearchTag
  data: ISearchData
  spec?: ISearchSpec
}
