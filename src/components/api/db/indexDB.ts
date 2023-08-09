import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'
import { IScreen, IScreenDataInput } from '../../../models/Screen'
import { transformScreen } from '../../../utils/ScreenTransformation'

const storageKey = 'screens'

export async function getItemList(query?: string): Promise<Array<IScreen>> {
  await fakeNetwork(`getScreens:${query}`)
  let list: Array<IScreen> = (await localforage.getItem(storageKey)) || []
  if (query) {
    list = matchSorter(list, query, { keys: ['diagonalSize', 'aspectRatio'] })
  }
  return list.sort(sortBy('diagonalSize', 'aspectRatio'))
}

export async function createItem(data: IScreenDataInput): Promise<IScreen> {
  await fakeNetwork()
  const item = transformScreen(data)
  const list: Array<IScreen> = await getItemList()
  list.unshift(item)
  await set(list)
  return item
}

export async function getItem(id?: string): Promise<IScreen | undefined> {
  await fakeNetwork(`contact:${id}`)
  const list: Array<IScreen> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  return item
}

export async function updateItem(id: string, updates: IScreen): Promise<IScreen> {
  await fakeNetwork()
  const list: Array<IScreen> = (await localforage.getItem(storageKey)) || []
  const item = list.find((entry) => entry.id === id)
  if (!item) throw new Error(`No contact found for ${id}`)
  Object.assign(item, updates)
  await set(list)
  return item
}

export async function deleteItem(id: string): Promise<boolean> {
  const list: Array<IScreen> = (await localforage.getItem(storageKey)) || []
  const index = list.findIndex((entry) => entry.id === id)
  if (index > -1) {
    list.splice(index, 1)
    await set(list)
    return true
  }
  return false
}

function set(itemList: Array<IScreen>): Promise<Array<IScreen>> {
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
