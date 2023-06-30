import { useEffect } from 'react'
import { Form, Link, Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom'
import { IContact } from '../components/api/contactAPI'
import Footer from '../components/Footer'
import Header from '../components/Header'

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
    <div className='container mx-auto flex min-h-screen flex-col'>
      <Header />
      <div id='sidebar'>
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
        <nav>
          {contacts.length ? (
            <ul>
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
        <div className='card m-4 w-80 shadow-2xl'>
          <figure>
            <img src='https://picsum.photos/id/1005/500/250' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>DaisyUI Card</h2>
            <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus.</p>
          </div>
        </div>
      </div>
      <div id='detail' className='grow'>
        {navigation.state === 'loading' ? <span className='loading loading-bars loading-lg'></span> : <Outlet />}
      </div>
      <Footer />
    </div>
  )
}
