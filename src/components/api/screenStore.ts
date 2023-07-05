import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

const storageKey = 'screens'

export interface IScreenEntry {
  id: string
  diagonalSize: number
  aspectRatio: string
  aspectRatioFloat: number
  hSize: number
  vSize: number
  hRes?: number
  vRes?: number
  ppi?: number
  favorite?: boolean
  refreshRate?: number
  notes?: string
}

export type TScreenData = {
  diagonalSize: number
  aspectRatio: string
}

export async function getItemList(query?: string): Promise<Array<IScreenEntry>> {
  await fakeNetwork(`getScreens:${query}`)
  let list: Array<IScreenEntry> = (await localforage.getItem(storageKey)) || []
  if (query) {
    list = matchSorter(list, query, { keys: ['diagonalSize', 'aspectRatio'] })
  }
  return list.sort(sortBy('diagonalSize', 'aspectRatio'))
}

export function createScreenEntry(data: TScreenData): IScreenEntry {
  const id = Math.random().toString(36).substring(2, 9)
  const aspectRatio = data.aspectRatio.split(':') // [width, height]
  const aspectRatioFloat = parseFloat(aspectRatio[0]) / parseFloat(aspectRatio[1])
  const hSize = Math.sqrt(Math.pow(data.diagonalSize, 2) / (1 + Math.pow(aspectRatioFloat, 2)))
  const vSize = hSize * aspectRatioFloat
  const item: IScreenEntry = {
    id,
    diagonalSize: data.diagonalSize,
    aspectRatio: data.aspectRatio,
    hSize,
    vSize,
    aspectRatioFloat,
  }
  return item
}

export async function createItem(data: TScreenData): Promise<IScreenEntry> {
  await fakeNetwork()
  const item = createScreenEntry(data)
  const list: Array<IScreenEntry> = await getItemList()
  list.unshift(item)
  await set(list)
  return item
}

export async function getItem(id?: string): Promise<IScreenEntry | undefined> {
  await fakeNetwork(`contact:${id}`)
  const list: Array<IScreenEntry> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  return item
}

export async function updateItem(id: string, updates: IScreenEntry): Promise<IScreenEntry> {
  await fakeNetwork()
  const list: Array<IScreenEntry> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  if (!item) throw new Error(`No contact found for ${id}`)
  Object.assign(item, updates)
  await set(list)
  return item
}

export async function deleteItem(id: string): Promise<boolean> {
  const list: Array<IScreenEntry> = (await localforage.getItem(storageKey)) || []
  const index = list.findIndex((entry) => entry.id === id)
  if (index > -1) {
    list.splice(index, 1)
    await set(list)
    return true
  }
  return false
}

function set(itemList: Array<IScreenEntry>): Promise<Array<IScreenEntry>> {
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
