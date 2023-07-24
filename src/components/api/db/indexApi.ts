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

export async function editItemAction(data: IScreen) {
  const item = await updateItem(data.id || '', data)

  return { item }
}

export async function createItemAction(data: IScreenDataInput) {
  const item = await createItem(data)

  return { item }
}

export async function deleteItemAction(params: Params) {
  if (!params[routes.screens.key] || params[routes.screens.key] === null) {
    throw new Error('oh dang!')
  }

  // null check is handled by the if statement above
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await deleteItem(params[routes.screens.key]!)

  return { item: null }
}

export async function favouriteAction(apiUrl: string) {
  const url = new URL(apiUrl)
  const q = url.searchParams.get('q') || ''
  const data = await getItem(q)

  const item = data
    ? await updateItem(q, {
        ...data,
        favorite: !data.favorite, // === 'true',
      })
    : null

  return { item }
}
