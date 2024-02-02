import { ScreenInput, ScreenInputList, ScreenItem } from '@openapi/generated/models'
import { transformScreenInput } from '@utils/ScreenTransformation'
import localforage from 'localforage'

const storageKey = 'screens'

export async function getItemList(): Promise<Array<ScreenItem>> {
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []

  return list
}

export async function createItem(data: ScreenInput): Promise<ScreenItem> {
  const item = transformScreenInput(data)
  const list: Array<ScreenItem> = await getItemList()
  list.unshift(item)
  await set(list)
  return item
}

export async function createItemList(data: ScreenInputList): Promise<Array<ScreenItem>> {
  const items = data.map((item) => transformScreenInput(item))
  const list: Array<ScreenItem> = await getItemList()
  const newlist = list.concat(items)
  await set(newlist)
  return newlist
}

export async function getItem(id?: string): Promise<ScreenItem | undefined> {
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []
  const item = list.find((entry) => entry.id === id)
  return item
}

export async function updateItem(id: string, updates: ScreenItem): Promise<ScreenItem> {
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []
  const item = list.find((entry) => entry.id === id)
  if (!item) throw new Error(`No contact found for ${id}`)
  Object.assign(item, updates)
  await set(list)
  return item
}

export async function deleteItem(id: string): Promise<boolean> {
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []
  const index = list.findIndex((entry) => entry.id === id)
  if (index > -1) {
    list.splice(index, 1)
    await set(list)
    return true
  }
  return false
}

function set(itemList: Array<ScreenItem>): Promise<Array<ScreenItem>> {
  return localforage.setItem(storageKey, itemList)
}
