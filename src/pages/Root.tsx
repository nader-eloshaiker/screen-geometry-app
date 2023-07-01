import { useEffect } from 'react'
import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom'
import { IContact } from '../components/api/contactAPI'
import Footer from '../components/Footer'
import Header from '../components/Header'
import DrawerLayout from '../components/sidebar/DrawerLayout'
import SidebarProvider from '../components/sidebar/SidebarProvider'

export default function Root() {
  const { contacts, q } = (useLoaderData() as { contacts: Array<IContact>; q: string }) || { contacts: [], q: '' }
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const element = document.getElementById('q') as HTMLInputElement
    if (element && element != null) {
      element.value = q
    }
  }, [q])

  return (
    <SidebarProvider>
      <div className='container mx-auto flex min-h-screen flex-col justify-center'>
        <Header />
        {/* <div id='sidebar' className='drawer lg:drawer-open'>
        <h1>React Router Contacts</h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
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
            <div id='search-spinner' aria-hidden hidden={!searching} />
            <div className='sr-only' aria-live='polite'></div>
          </Form>
          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>
        <nav className='drawer-side'>
          {contacts.length ? (
            <ul className='h-full p-4 menu w-80 bg-base-200 text-base-content'>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div> */}
        <DrawerLayout>
          <div id='detail' className='grow'>
            {navigation.state === 'loading' ? <span className='loading loading-bars loading-lg'></span> : <Outlet />}
          </div>
        </DrawerLayout>

        <Footer />
      </div>
    </SidebarProvider>
  )
}
