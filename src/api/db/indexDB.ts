import localforage from 'localforage'
import { ScreenInput, ScreenInputList, ScreenItem } from '../../generated/openapi/models'
import { transformScreenInput } from '../../utils/ScreenTransformation'

const storageKey = 'screens'

export async function getItemList(): Promise<Array<ScreenItem>> {
  await fakeNetwork()
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []

  return list
}

export async function createItem(data: ScreenInput): Promise<ScreenItem> {
  await fakeNetwork()
  const item = transformScreenInput(data)
  const list: Array<ScreenItem> = await getItemList()
  list.unshift(item)
  await set(list)
  return item
}

export async function createItemList(data: ScreenInputList): Promise<Array<ScreenItem>> {
  await fakeNetwork()
  const items = data.map((item) => transformScreenInput(item))
  const list: Array<ScreenItem> = await getItemList()
  const newlist = list.concat(items)
  await set(newlist)
  return newlist
}

export async function getItem(id?: string): Promise<ScreenItem | undefined> {
  await fakeNetwork(`contact:${id}`)
  const list: Array<ScreenItem> = (await localforage.getItem(storageKey)) ?? []
  const item = list.find((entry) => entry.id === id)
  return item
}

export async function updateItem(id: string, updates: ScreenItem): Promise<ScreenItem> {
  await fakeNetwork()
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

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {}

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {}
  }
  const defKey: string = key || ''
  if (fakeCache[defKey]) {
    return
  }

  fakeCache[defKey] = true
  return new Promise((res) => {
    setTimeout(res, 0)
  })
}
