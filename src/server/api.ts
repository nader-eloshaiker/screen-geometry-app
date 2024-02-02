import { ScreenInput, ScreenInputList, ScreenItem } from '@openapi/generated/models'
import { search } from '@server/searchEngine'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { createItem, createItemList, deleteItem, getItem, getItemList, updateItem } from './db/indexDB'

export type TScreenListResponse = {
  list: ScreenItem[]
}

export type TScreenResponse = {
  item: ScreenItem
}

export type TIdResponse = {
  id: string
}

export async function getSearchList(params: URLSearchParams) {
  const term = params.get('term')?.toLowerCase().trim() ?? ''
  const results = search(term)

  return { list: results }
}

export async function getScreenList(): Promise<TScreenListResponse> {
  const list = await getItemList()

  return { list }
}

export async function getScreen(id: string | undefined): Promise<{ item: ScreenItem | undefined }> {
  const item = await getItem(id)

  return { item }
}

export async function updateScreen(id: string, data: ScreenInput) {
  const screenItem = transformScreenInput(data, id)
  const item = await updateItem(id, screenItem)

  return { item }
}

export async function createScreen(data: ScreenInput) {
  const item = await createItem(data)

  return { item }
}

export async function createScreenList(data: ScreenInputList) {
  const list = await createItemList(data)

  return { list }
}

export async function deleteScreen(id: string) {
  await deleteItem(id)

  return { id }
}

export async function showScreen(id: string) {
  const data = await getItem(id)

  const item = data
    ? await updateItem(id, {
        ...data,
        visible: !data.visible, // === 'true',
      })
    : null

  return { item }
}
