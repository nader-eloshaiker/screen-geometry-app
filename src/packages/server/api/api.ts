import { ScreenInput, ScreenInputList, ScreenItem, SearchItem } from '@packages/openapi/generated'
import { search } from '@packages/server/api/SearchService'
import { transformScreenInput } from '@packages/utils/DataTransformation'
import to from '@packages/utils/await-to-js'
import { SearchResult } from 'minisearch'
import { DatabaseError } from '../db/DatabaseError'
import { Stores, addAllData, addData, deleteData, getAllData, getData, updateData } from '../db/IndexedDB'
import { ApiError } from './ApiError'

export type ScreenListResponse = {
  list: ScreenItem[]
}

export type SearchScreenListResponse = {
  list: Array<SearchResult & SearchItem>
}

export type ScreenResponse = {
  item: ScreenItem
}

export type IdResponse = {
  id: string
}

export const getSearchList = async (params: URLSearchParams) => {
  const term = params.get('term')?.toLowerCase().trim() ?? ''
  const list = search(term)

  return Promise.resolve<SearchScreenListResponse>({ list })
}

export const getScreenList = async () => {
  const [err, list = []] = await to<Array<ScreenItem>>(getAllData<ScreenItem>(Stores.Screens))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const getScreen = async (id: string) => {
  if (!id) {
    throw new ApiError('No parameters provided', 400)
  }

  const [err, item] = await to<Nullable<ScreenItem>>(getData<ScreenItem>(Stores.Screens, id))

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

  const screenItem = { ...transformScreenInput(data), id }
  const [err, item] = await to<ScreenItem>(updateData<ScreenItem>(Stores.Screens, screenItem))

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const keylessData = transformScreenInput(data)
  const [err, item] = await to<ScreenItem>(addData<ScreenItem>(Stores.Screens, keylessData))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { item } as ScreenResponse
}

export const createScreenList = async (data: ScreenInputList) => {
  if (!data) {
    throw new ApiError('No parameters provided', 400)
  }

  const keylessList = data.map((item) => transformScreenInput(item))
  const [err, list] = await to<Array<ScreenItem>>(addAllData<ScreenItem>(Stores.Screens, keylessList))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const deleteScreen = async (id: string) => {
  if (!id) {
    throw new ApiError('No parameters provided', 400)
  }

  const [err, data] = await to<string>(deleteData(Stores.Screens, id))

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

  const [err, data] = await to<Undefinable<ScreenItem>>(getData<ScreenItem>(Stores.Screens, id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!data) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  const [err2, item] = await to<ScreenItem>(
    updateData<ScreenItem>(Stores.Screens, {
      ...data,
      visible: !data.visible,
    }),
  )

  if (err2) {
    throw new DatabaseError('Database error', 500, err2)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}
