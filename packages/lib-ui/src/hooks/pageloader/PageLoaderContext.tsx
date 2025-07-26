import { createContext, Dispatch } from 'react'
import { initialLoaderState, LoaderEvent } from './PageLoaderReducer'

export const PageLoaderContext = createContext<{
  isPageLoading: boolean
  setPageLoading: Dispatch<React.SetStateAction<LoaderEvent>>
}>({
  isPageLoading: initialLoaderState.isLoading,
  setPageLoading: () => {},
})
