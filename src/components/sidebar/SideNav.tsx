// components/Navbar.tsx

import { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import CloseIcon from '../../assets/icons/Close'
import StarOutlineIcon from '../../assets/icons/StarOutline'
import StarSolidIcon from '../../assets/icons/StarSolid'
import { AppContext } from '../../contexts/AppContext'
import { useDeleteScreenAction } from '../api/actions/useDeleteScreenAction'
import { useFavoriteScreenAction } from '../api/actions/useFavoriteScreenAction'
import { routes } from '../api/ApiRouteSchema'
import CreateScreenForm from './CreateScreenForm'

export default function SideNav() {
  const [{ selections: screens, query }] = useContext(AppContext)
  const [{ deleteId, setDeleteId, executeDelete }] = useDeleteScreenAction()
  const [{ favoriteId, setFavoriteId, executeFavorite }] = useFavoriteScreenAction()
  // const submit = useSubmit()
  // const navigation = useNavigation()
  // const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const handleFavourite = (id: string) => {
    setFavoriteId(id)
  }

  useEffect(() => {
    const element = document.getElementById('q') as HTMLInputElement
    if (element && element != null) {
      element.value = query
    }
  }, [query])

  useEffect(() => {
    if (deleteId) {
      executeDelete()
      setDeleteId(undefined)
    }
  }, [deleteId])

  useEffect(() => {
    if (favoriteId) {
      executeFavorite()
      setFavoriteId(undefined)
    }
  }, [favoriteId])

  return (
    <div className='flex flex-col gap-1 p-2 w-70 lg:h-full rounded-xl sidebar'>
      <div className='px-2 pt-2'>
        <label className='text-lg'>Add Screen</label>
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
          <ul className='menu menu-lg'>
            <li className='text-lg'>Selected Screens</li>
            {screens.map((item) => (
              <li key={item.id}>
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center gap-3'>
                    <button
                      onClick={() => {
                        handleFavourite(item.id)
                      }}
                    >
                      {item.favorite ? (
                        <StarSolidIcon id='star-icon' className='w-4 h-4' fill='currentColor' />
                      ) : (
                        <StarOutlineIcon id='star-icon' className='w-4 h-4' fill='currentColor' />
                      )}
                    </button>
                    <NavLink to={`${routes.screens.path}${item.id}`}>
                      <div>
                        {item.tag.diagonalSize}&quot; - {item.tag.aspectRatio}
                      </div>
                    </NavLink>
                  </div>
                  <button className='align-middle' onClick={() => handleDelete(item.id)}>
                    <CloseIcon id='delete-icon' className='w-4 h-4' fill='currentColor' />
                  </button>
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
