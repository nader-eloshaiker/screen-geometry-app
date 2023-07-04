// components/Navbar.tsx

import { useEffect } from 'react'
import { Form, NavLink, useLoaderData, useNavigation, useSubmit } from 'react-router-dom'
import { IContact } from '../api/contactAPI'

export default function SideNav() {
  const { contacts, q } = (useLoaderData() as { contacts: Array<IContact>; q: string }) || { contacts: [], q: '' }
  const submit = useSubmit()

  const navigation = useNavigation()
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const element = document.getElementById('q') as HTMLInputElement
    if (element && element != null) {
      element.value = q
    }
  }, [q])

  return (
    <div id='sidebar' className='p-4 lg:h-full w-80 rounded-xl sidebar'>
      <h1>React Router Contacts</h1>
      <div className='flex flex-row gap-2'>
        <Form id='search-form' role='search'>
          <input
            id='q'
            className='w-full max-w-xs input'
            aria-label='Search contacts'
            placeholder='Search'
            type='search'
            name='q'
            defaultValue={q}
            onChange={(event) => {
              const isFirstSearch = q == null
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              })
            }}
          />
          <div
            id='search-spinner'
            aria-hidden
            className={`loading loading-dots loading-lg ${!searching && 'hidden'}`}
          />
        </Form>
        <Form method='post'>
          <button type='submit' className='btn-neutral btn'>
            New
          </button>
        </Form>
      </div>
      <div className='divider' />
      <nav>
        {contacts.length ? (
          <ul className='menu'>
            <li className='menu-title'>Selected Screens</li>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink to={`contacts/${contact.id}`}>
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{' '}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  )
}
