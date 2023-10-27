import { Params } from 'react-router-dom'
import { routes } from '../../routes/AppRouteSchema'
import { ScreenInput, ScreenInputList, ScreenItem } from './../../generated/openapi/models'
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

export async function getScreen(params: Params): Promise<{ item: ScreenItem | undefined }> {
  const item = await getItem(params[routes.screens.key])
  if (!item) {
    throw new Error('Not Found')
  }

  return { item }
}

export async function updateItemAction(data: ScreenItem) {
  const item = await updateItem(data.id || '', data)

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

export async function deleteItemAction(url: string | undefined) {
  if (!url) {
    throw new Error('No url provided!')
  }

  const id = url.split('/').at(-1) ?? ''

  if (!id) {
    throw new Error('No id provided!')
  }

  await deleteItem(id)

  return { id }
}

export async function favouriteItemAction(url: string | undefined) {
  if (!url) {
    throw new Error('No url provided!')
  }

  const id = url.split('/').at(-2) ?? ''

  if (!id) {
    throw new Error('No id provided!')
  }

  const data = await getItem(id)

  const item = data
    ? await updateItem(id, {
        ...data,
        favorite: !data.favorite, // === 'true',
      })
    : null

  return { item }
}
