import { to, toScreenItem } from '@screengeometry/lib-api/extended'
import type { ScreenInput, ScreenInputList, ScreenItem, SearchItem } from '@screengeometry/lib-api/spec'
import { DatabaseError } from '../db/DatabaseError'
import { StoresEnum } from '../db/DbConstants'
import { addAllData, addData, deleteData, getAllData, getData, searchData, updateData } from '../db/IndexedDB'
import { ApiError } from './ApiError'

export type ScreenListResponse = {
  list: ScreenItem[]
}

export type SearchScreenListResponse = {
  list: Array<SearchItem>
}

export type ScreenResponse = {
  item: ScreenItem
}

export type IdResponse = {
  id: string
}

export const getSearchList = async (params: URLSearchParams) => {
  const term = params.get('term')?.toLowerCase().trim() ?? ''

  const [err, list] = await to<Array<SearchItem>>(searchData<SearchItem>(StoresEnum.Search, term, 'label'))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return Promise.resolve<SearchScreenListResponse>({ list: list ?? [] })
}

export const getScreenList = async () => {
  const [err, list = []] = await to<Array<ScreenItem>>(getAllData<ScreenItem>(StoresEnum.Screens))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const getScreen = async (id: string) => {
  if (!id) {
    throw new ApiError('No parameters provided', 400)
  }

  const [err, item] = await to<Nullable<ScreenItem>>(getData<ScreenItem>(StoresEnum.Screens, id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}

export const updateScreen = async (id: string, data: ScreenInput) => {
  if (!id || !data) {
    throw new ApiError('No parameters provided', 400)
  }

  const screenItem = { ...toScreenItem(data), id } as ScreenItem
  const [err, item] = await to<ScreenItem>(updateData<ScreenItem>(StoresEnum.Screens, screenItem))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}

export const createScreen = async (data: ScreenInput) => {
  if (!data) {
    throw new ApiError('No parameters provided', 400)
  }

  const keylessData = toScreenItem(data) as ScreenItem
  const [err, item] = await to<ScreenItem>(addData<ScreenItem>(StoresEnum.Screens, keylessData))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { item } as ScreenResponse
}

export const createScreenList = async (data: ScreenInputList) => {
  if (!data) {
    throw new ApiError('No parameters provided', 400)
  }

  const keylessList = data.map((item) => toScreenItem(item))
  const [err, list] = await to<Array<ScreenItem>>(addAllData<ScreenItem>(StoresEnum.Screens, keylessList))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const deleteScreen = async (id: string) => {
  if (!id) {
    throw new ApiError('No parameters provided', 400)
  }

  const [err, data] = await to<string>(deleteData(StoresEnum.Screens, id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!data) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { id: data } as IdResponse
}

export const showScreen = async (id: string) => {
  if (!id) {
    throw new ApiError('No parameters provided', 400)
  }

  const [err, data] = await to<Undefinable<ScreenItem>>(getData<ScreenItem>(StoresEnum.Screens, id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!data) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  const [err2, item] = await to<ScreenItem>(
    updateData<ScreenItem>(StoresEnum.Screens, {
      ...data,
      visible: !data.visible,
    })
  )

  if (err2) {
    throw new DatabaseError('Database error', 500, err2)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}
