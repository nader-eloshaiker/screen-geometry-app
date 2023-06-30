import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import { Params, redirect } from 'react-router-dom'
import sortBy from 'sort-by'

export interface IContact {
  id?: string
  createdAt?: number
  first?: string
  last?: string
  favorite?: boolean
  avatar?: string
  notes?: string
  twitter?: string
}

function waitfor(millisec: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, millisec)
  })
}

export async function contactsLoader({ request }: { request: Request }): Promise<{ contacts: IContact[]; q: string }> {
  await waitfor(2000)

  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const contacts = await getContacts(q)

  return { contacts, q }
}

export async function contactLoader({ params }: { params: Params }): Promise<{ contact: IContact | undefined }> {
  await waitfor(2000)

  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return { contact }
}

export async function editAction({ request, params }: { request: Request; params: Params }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData) as unknown as IContact
  await updateContact(params.contactId || '', updates)

  return redirect(`/contacts/${params.contactId}`)
}

export async function createAction() {
  const contact = await createContact()

  return redirect(`/contacts/${contact.id}`)
}

export async function destroyAction({ params }: { params: Params }) {
  if (!params.contactId) {
    throw new Error('oh dang!')
  }

  await deleteContact(params.contactId)

  return redirect('/')
}

export async function favouriteAction({ request, params }: { request: Request; params: Params }) {
  if (!params.contactId) {
    throw new Error('oh dang!')
  }

  const formData = await request.formData()

  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export async function getContacts(query?: string): Promise<Array<IContact>> {
  await fakeNetwork(`getContacts:${query}`)
  let contacts: Array<IContact> = (await localforage.getItem('contacts')) || []
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact(): Promise<IContact> {
  await fakeNetwork()
  const id = Math.random().toString(36).substring(2, 9)
  const contact: IContact = { id, createdAt: Date.now() }
  const contacts: Array<IContact> = await getContacts()
  contacts.unshift(contact)
  await set(contacts)
  return contact
}

export async function getContact(id?: string): Promise<IContact | undefined> {
  await fakeNetwork(`contact:${id}`)
  const contacts: Array<IContact> = (await localforage.getItem('contacts')) || []
  const contact = contacts.find((contact) => contact.id === id)
  return contact
}

export async function updateContact(id: string, updates: IContact): Promise<IContact> {
  await fakeNetwork()
  const contacts: Array<IContact> = (await localforage.getItem('contacts')) || []
  const contact = contacts.find((contact) => contact.id === id)
  if (!contact) throw new Error(`No contact found for ${id}`)
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export async function deleteContact(id: string): Promise<boolean> {
  const contacts: Array<IContact> = (await localforage.getItem('contacts')) || []
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index > -1) {
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

function set(contacts: Array<IContact>): Promise<Array<IContact>> {
  return localforage.setItem('contacts', contacts)
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
    setTimeout(res, Math.random() * 800)
  })
}
