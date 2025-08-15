import { createContext, type Dispatch } from 'react'
import { initialLoaderState, type LoaderEvent } from './PageLoaderReducer'

export const PageLoaderContext = createContext<{
  isPageLoading: boolean
  setPageLoading: Dispatch<LoaderEvent>
}>({
  isPageLoading: initialLoaderState.isLoading,
  setPageLoading: () => {},
})
