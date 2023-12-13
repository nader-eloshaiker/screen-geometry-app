import { ScreenInput, ScreenInputList, ScreenItem } from '@openapi/models'
import { transformScreenInput } from '@utils/ScreenTransformation'
import { createItem, createItemList, deleteItem, getItem, getItemList, updateItem } from './indexDB'

export type TScreenListResponse = {
  list: ScreenItem[]
}

export type TScreenResponse = {
  item: ScreenItem
}

export type TIdResponse = {
  id: string
}

export async function getScreenList(): Promise<TScreenListResponse> {
  const list = await getItemList()

  return { list }
}

export async function getScreen(id: string | undefined): Promise<{ item: ScreenItem | undefined }> {
  if (!id) {
    throw new Error('No id provided!')
  }
  const item = await getItem(id)
  if (!item) {
    throw new Error('Not Found')
  }

  return { item }
}

export async function updateItemAction(id: string | undefined, data: ScreenInput) {
  if (!id) {
    throw new Error('No id provided!')
  }
  const screenItem = transformScreenInput(data, id)
  const item = await updateItem(id, screenItem)

  return { item }
}

export async function createItemAction(data: ScreenInput) {
  const item = await createItem(data)

  return { item }
}

export async function createItemListAction(data: ScreenInputList) {
  const list = await createItemList(data)

  return { list }
}

export async function deleteItemAction(id: string | undefined) {
  if (!id) {
    throw new Error('No id provided!')
  }

  await deleteItem(id)

  return { id }
}

export async function showItemAction(id: string | undefined) {
  if (!id) {
    throw new Error('No id provided!')
  }

  const data = await getItem(id)

  const item = data
    ? await updateItem(id, {
        ...data,
        visible: !data.visible, // === 'true',
      })
    : null

  return { item }
}
