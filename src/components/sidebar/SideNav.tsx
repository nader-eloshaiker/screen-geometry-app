// components/Navbar.tsx

import { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../routes/AppRouteSchema'
import { DataContext } from '../api/DataProvider'
import CreateScreenForm from '../forms/screen/create'

export default function SideNav() {
  const [data] = useContext(DataContext)
  const { screens, query } = data

  // const submit = useSubmit()
  // const navigation = useNavigation()
  // const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const element = document.getElementById('q') as HTMLInputElement
    if (element && element != null) {
      element.value = query
    }
  }, [query])

  return (
    <div className='p-4 lg:h-full rounded-xl sidebar'>
      <h1>React Router Contacts</h1>
      <div className='flex flex-row gap-2'>
        <CreateScreenForm />
        {/* <Form id='search-form' role='search'>
          <input
            id='q'`
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
        </Form> */}
      </div>
      <div className='divider' />
      <nav id='sidebar'>
        {screens.length ? (
          <ul className='menu'>
            <li className='menu-title'>Selected Screens</li>
            {screens.map((item) => (
              <li key={item.id}>
                <NavLink to={`${routes.screens.path}${item.id}`}>
                  <div className='flex flex-row justify-between'>
                    <div>
                      {item.diagonalSize} - {item.aspectRatio}
                      {item.favorite && <span>★</span>}
                    </div>
                    <div>
                      <button onClick={() => {}}>Delete</button>
                    </div>
                  </div>
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
