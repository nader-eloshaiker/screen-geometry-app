import { ScreenInput, ScreenInputList, ScreenItem } from '@packages/openapi/generated'
import { transformScreenInput } from '@packages/utils/DataTransformation'
import to from '@packages/utils/await-to-js'
import localforage from 'localforage'
import { DatabaseError } from './DatabaseError'

const storageKey = 'screens'

export const getItem = async (id?: string) => {
  const [err, list] = await getStore()

  if (err) {
    throw err
  }

  const item = list?.find((entry) => entry.id === id)

  if (!item) {
    throw new DatabaseError(`No screen found for ${id}`, 404)
  }

  return item
}

export const getAllItems = async () => {
  const [err, list] = await getStore()

  if (err) {
    throw err
  }

  return list ?? []
}

export const createItem = async (data: ScreenInput) => {
  const item = transformScreenInput(data)
  const [err, list] = await getStore()

  if (err) {
    throw err
  }

  const newList = list ? [...list, item] : [item]
  const [err2] = await setStore(newList)

  if (err2) {
    throw err2
  }

  return item
}

export const createItemList = async (data: ScreenInputList) => {
  const items = data.map((item) => transformScreenInput(item))
  const [err, list] = await getStore()

  if (err) {
    throw err
  }

  const newList = list ? list.concat(items) : items
  const [err2] = await setStore(newList)

  if (err2) {
    throw err2
  }

  return newList
}

export const updateItem = async (id: string, updates: ScreenItem) => {
  const [err, list] = await getStore()

  if (err) {
    return Promise.reject(err)
  }

  const item = list?.find((entry) => entry.id === id)

  if (!list || !item) {
    throw new DatabaseError(`No screen found for ${id}`, 404)
  }

  Object.assign(item, updates)
  const [err2] = await setStore(list)

  if (err2) {
    throw err2
  }

  return item
}

export const deleteItem = async (id: string) => {
  const [err, list] = await getStore()

  if (err) {
    throw err
  }

  const index = list?.findIndex((entry) => entry.id === id) ?? -1

  if (!list || index === -1) {
    throw new DatabaseError(`No screen found for ${id}`, 404)
  }

  list.splice(index, 1)
  const [err2] = await setStore(list)

  if (err2) {
    throw err2
  }

  return id
}

const getStore = async () => await to<Array<ScreenItem> | null>(localforage.getItem<Array<ScreenItem>>(storageKey))

const setStore = async (itemList: Array<ScreenItem>) =>
  await to<Array<ScreenItem>>(localforage.setItem(storageKey, itemList))
