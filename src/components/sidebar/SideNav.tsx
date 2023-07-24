// components/Navbar.tsx

import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import DeleteIcon from '../../assets/icons/Delete'
import StarOutlineIcon from '../../assets/icons/StarOutline'
import { routes } from '../api/ApiRouteSchema'
import { ActionTypes, DataContext } from '../api/DataProvider'
import { TIdResponse } from '../api/db/indexApi'
import useAxios from '../api/fetch/useAxios'
import CreateScreenForm from '../forms/screen/create'

export default function SideNav() {
  const [data] = useContext(DataContext)
  const { screens, query } = data

  const [deleteId, setDeleteId] = useState<string>()

  // const submit = useSubmit()
  // const navigation = useNavigation()
  // const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    const element = document.getElementById('q') as HTMLInputElement
    if (element && element != null) {
      element.value = query
    }
  }, [query])

  const [_, dispatch] = useContext(DataContext)
  const [{ response, loading, error }, { execute: executeDelete }] = useAxios<{ payload: TIdResponse }>(
    {
      url: `${routes.baseUrl}${routes.root}/${routes.screens.path}/${deleteId}`,
      method: 'DELETE',
    },
    { manualExecution: true },
  )

  useEffect(() => {
    if (response && !loading && !error) {
      dispatch({ type: ActionTypes.DELETE, payload: response.data.payload.id })
    }

    dispatch({ type: ActionTypes.LOADING, payload: loading })
  }, [loading, error, response])

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  useEffect(() => {
    if (deleteId) {
      executeDelete()
      setDeleteId(undefined)
    }
  }, [deleteId])

  return (
    <div className='flex flex-col gap-1 p-2 w-60 lg:h-full rounded-xl sidebar'>
      <div className='px-2 pt-2'>
        <h1>React Router Contacts</h1>
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
                <div className='flex flex-row items-center justify-between'>
                  <NavLink to={`${routes.screens.path}${item.id}`}>
                    <div>
                      {item.tag.diagonalSize}&quot; - {item.tag.aspectRatio}
                      {item.favorite && <span>★</span>}
                    </div>
                  </NavLink>
                  <div className='flex flex-row items-center gap-2'>
                    <button onClick={() => handleDelete(item.id)}>
                      <DeleteIcon id='delete-icon' className='w-5 h-5' fill='currentColor' />
                    </button>
                    <button
                      onClick={() => {
                        console.log('favourite')
                      }}
                    >
                      <StarOutlineIcon id='star-icon' className='w-4 h-4' fill='currentColor' />
                    </button>
                  </div>
                </div>
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
