import { ScreenInput, ScreenInputList, ScreenItem, SearchItem } from '@packages/openapi/generated'
import { search } from '@packages/server/api/searchEngine'
import { transformScreenInput } from '@packages/utils/DataTransformation'
import to from '@packages/utils/await-to-js'
import { SearchResult } from 'minisearch'
import { createItem, createItemList, deleteItem, getAllItems, getItem, updateItem } from '../db/IndexDB'

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

  return Promise.resolve({ list } as SearchScreenListResponse)
}

export const getScreenList = async () => {
  const [err, list] = await to<ScreenItem[]>(getAllItems())

  if (err) {
    throw err
  }

  return { list } as ScreenListResponse
}

export const getScreen = async (id: string | undefined) => {
  const [err, item] = await to<ScreenItem>(getItem(id))

  if (err) {
    throw err
  }

  return { item } as ScreenResponse
}

export const updateScreen = async (id: string, data: ScreenInput) => {
  const screenItem = transformScreenInput(data, id)
  const [err, item] = await to<ScreenItem>(updateItem(id, screenItem))

  if (err) {
    throw err
  }

  return { item } as ScreenResponse
}

export const createScreen = async (data: ScreenInput) => {
  const [err, item] = await to<ScreenItem>(createItem(data))

  if (err) {
    throw err
  }

  return { item } as ScreenResponse
}

export const createScreenList = async (data: ScreenInputList) => {
  const [err, list] = await to<ScreenItem[]>(createItemList(data))

  if (err) {
    throw err
  }

  return { list } as ScreenListResponse
}

export const deleteScreen = async (id: string) => {
  const [err] = await to<string>(deleteItem(id))

  if (err) {
    throw err
  }

  return { id } as IdResponse
}

export const showScreen = async (id: string) => {
  const [err, data] = await to<ScreenItem>(getItem(id))

  if (err) {
    throw err
  }

  const [err2, item] = await to<ScreenItem>(
    updateItem(id, {
      ...data,
      visible: !data.visible, // === 'true',
    }),
  )

  if (err2) {
    throw err2
  }

  return { item } as ScreenResponse
}
