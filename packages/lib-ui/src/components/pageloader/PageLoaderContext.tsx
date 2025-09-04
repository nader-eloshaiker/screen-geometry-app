import { createContext, type Dispatch } from 'react'
import { initialLoaderState, type LoaderEvent } from './PageLoaderReducer'

export const PageLoaderContext = createContext<{
  isPageLoading: boolean
  setComponentLoading: Dispatch<LoaderEvent>
  isComponentLoading: (key: string) => boolean
}>({
  isPageLoading: initialLoaderState.isLoading,
  setComponentLoading: () => {},
  isComponentLoading: () => initialLoaderState.isLoading,
})
