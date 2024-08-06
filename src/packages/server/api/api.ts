import { ScreenInput, ScreenInputList, ScreenItem, SearchItem } from '@packages/openapi/generated'
import { search } from '@packages/server/api/searchEngine'
import { transformScreenInput } from '@packages/utils/DataTransformation'
import to from '@packages/utils/await-to-js'
import { SearchResult } from 'minisearch'
import { DatabaseError } from '../db/DatabaseError'
import { createItem, createItemList, deleteItem, getAllItems, getItem, updateItem } from '../db/IndexDB'
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
  const [err, list = []] = await to<Nullable<Array<ScreenItem>>>(getAllItems())

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const getScreen = async (id: string | undefined) => {
  const [err, item] = await to<Undefined<ScreenItem>>(getItem(id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}

export const updateScreen = async (id: string, data: ScreenInput) => {
  const screenItem = transformScreenInput(data, id)
  const [err, item] = await to<Undefined<ScreenItem>>(updateItem(id, screenItem))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}

export const createScreen = async (data: ScreenInput) => {
  const [err, item] = await to<ScreenItem>(createItem(data))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { item } as ScreenResponse
}

export const createScreenList = async (data: ScreenInputList) => {
  const [err, list] = await to<ScreenItem[]>(createItemList(data))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  }

  return { list } as ScreenListResponse
}

export const deleteScreen = async (id: string) => {
  const [err, data] = await to<Undefined<string>>(deleteItem(id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!data) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { id: data } as IdResponse
}

export const showScreen = async (id: string) => {
  const [err, data] = await to<Undefined<ScreenItem>>(getItem(id))

  if (err) {
    throw new DatabaseError('Database error', 500, err)
  } else if (!data) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  const [err2, item] = await to<Undefined<ScreenItem>>(
    updateItem(id, {
      ...data,
      visible: !data.visible, // === 'true',
    }),
  )

  if (err2) {
    throw new DatabaseError('Database error', 500, err2)
  } else if (!item) {
    throw new ApiError(`No screen found for ${id}`, 404)
  }

  return { item } as ScreenResponse
}
