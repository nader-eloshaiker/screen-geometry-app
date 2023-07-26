import { Params } from 'react-router-dom'
import { IScreen, IScreenDataInput } from '../../../models/Screen'
import { routes } from '../../../routes/AppRouteSchema'
import { createItem, deleteItem, getItem, getItemList, updateItem } from './indexDB'

export type TScreenListResponse = {
  list: IScreen[]
  q: string
}

export type TScreenResponse = {
  item: IScreen
}

export type TIdResponse = {
  id: string
}

export async function getScreenList(apiUrl: string): Promise<TScreenListResponse> {
  const url = new URL(apiUrl)
  const q = url.searchParams.get('q') || ''
  const list = await getItemList(q)

  return { list, q }
}

export async function getScreen(params: Params): Promise<{ item: IScreen | undefined }> {
  const item = await getItem(params[routes.screens.key])
  if (!item) {
    throw new Error('Not Found')
  }

  return { item }
}

export async function updateItemAction(data: IScreen) {
  const item = await updateItem(data.id || '', data)

  return { item }
}

export async function createItemAction(data: IScreenDataInput) {
  const item = await createItem(data)

  return { item }
}

export async function deleteItemAction(url: string | undefined) {
  if (!url) {
    throw new Error('No url provided!')
  }

  const urlObj = new URL(url)
  const id = urlObj.pathname.split('/').at(-1) || ''

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

  const urlObj = new URL(url)
  const id = urlObj.pathname.split('/').at(-2) || ''

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
