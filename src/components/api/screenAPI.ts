import { Params, redirect } from 'react-router-dom'
import { IScreenSpec, TScreenData } from '../../models/Screen'
import { routes } from '../../routes/RouteSchema'
import { createItem, deleteItem, getItem, getItemList, updateItem } from './screenStore'

export async function itemListLoader({ request }: { request: Request }): Promise<{ list: IScreenSpec[]; q: string }> {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const list = await getItemList(q)

  return { list, q }
}

export async function itemLoader({ params }: { params: Params }): Promise<{ item: IScreenSpec | undefined }> {
  const item = await getItem(params[routes.screens.key])
  if (!item) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return { item }
}

export async function editItemAction({ request, params }: { request: Request; params: Params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData) as unknown as IScreenSpec
  await updateItem(params.screenId || '', updates)

  return redirect(`/${routes.screens}${params[routes.screens.key]}`)
}

export async function createItemAction({ request }: { request: Request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData) as unknown as TScreenData

  const item = await createItem(data)

  return redirect(`/${routes.screens}${item.id}`)
}

export async function deleteItemAction({ params }: { params: Params }) {
  if (!params[routes.screens.key] || params[routes.screens.key] === null) {
    throw new Error('oh dang!')
  }

  // null check is handled by the if statement above
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await deleteItem(params[routes.screens.key]!)

  return redirect('/')
}

export async function favouriteAction({ request, params }: { request: Request; params: Params }) {
  if (!params[routes.screens.key] || params[routes.screens.key] === null) {
    throw new Error('oh dang!')
  }

  const formData = await request.formData()
  const item = Object.fromEntries(formData) as unknown as IScreenSpec

  // null check is handled by the if statement above
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return updateItem(params[routes.screens.key]!, {
    ...item,
    favorite: !item.favorite, // === 'true',
  })
}
