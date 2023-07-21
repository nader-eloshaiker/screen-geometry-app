import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'
import { IScreenData, IScreenSpec } from '../../../models/Screen'

const storageKey = 'screens'

export async function getItemList(query?: string): Promise<Array<IScreenSpec>> {
  await fakeNetwork(`getScreens:${query}`)
  let list: Array<IScreenSpec> = (await localforage.getItem(storageKey)) || []
  if (query) {
    list = matchSorter(list, query, { keys: ['diagonalSize', 'aspectRatio'] })
  }
  return list.sort(sortBy('diagonalSize', 'aspectRatio'))
}

export function createScreenEntry(data: IScreenData): IScreenSpec {
  data.diagonalSize = data.diagonalSize || 27
  data.aspectRatio = data.aspectRatio || '16:9'
  const id = Math.random().toString(36).substring(2, 9)
  const aspectRatio = data.aspectRatio.split(':') // [width, height]
  const aspectRatioFloat = parseFloat(aspectRatio[0]) / parseFloat(aspectRatio[1])
  const hSize = Math.sqrt(Math.pow(data.diagonalSize, 2) / (1 + Math.pow(aspectRatioFloat, 2)))
  const vSize = hSize * aspectRatioFloat
  const item: IScreenSpec = {
    id,
    diagonalSize: data.diagonalSize,
    aspectRatio: data.aspectRatio,
    hSize,
    vSize,
    aspectRatioFloat,
  }
  return item
}

export async function createItem(data: IScreenData): Promise<IScreenSpec> {
  await fakeNetwork()
  const item = createScreenEntry(data)
  const list: Array<IScreenSpec> = await getItemList()
  list.unshift(item)
  await set(list)
  return item
}

export async function getItem(id?: string): Promise<IScreenSpec | undefined> {
  await fakeNetwork(`contact:${id}`)
  const list: Array<IScreenSpec> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  return item
}

export async function updateItem(id: string, updates: IScreenSpec): Promise<IScreenSpec> {
  await fakeNetwork()
  const list: Array<IScreenSpec> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  if (!item) throw new Error(`No contact found for ${id}`)
  Object.assign(item, updates)
  await set(list)
  return item
}

export async function deleteItem(id: string): Promise<boolean> {
  const list: Array<IScreenSpec> = (await localforage.getItem(storageKey)) || []
  const index = list.findIndex((entry) => entry.id === id)
  if (index > -1) {
    list.splice(index, 1)
    await set(list)
    return true
  }
  return false
}

function set(itemList: Array<IScreenSpec>): Promise<Array<IScreenSpec>> {
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
