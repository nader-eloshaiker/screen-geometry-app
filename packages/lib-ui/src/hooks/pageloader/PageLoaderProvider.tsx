import { useMemo, useReducer } from 'react'
import { PageLoaderContext } from './PageLoaderContext'
import { LoaderState, initialLoaderState, loaderReducer } from './PageLoaderReducer'

type Props = React.PropsWithChildren & { initialLoadingKeys?: Array<string> }

/*
  Description:
  PageLoaderProvider is a React context provider that manages the loading state of the application.
  It uses a reducer to handle loading events and provides the current loading state and a function
  to update it to its children components.

  Props:
  - children: React nodes that will be wrapped by the provider.
  - onAppMountComponents: Optional array of component identifiers that are initially loading when the app mounts.
  */
export const PageLoaderProvider = ({ children, initialLoadingKeys }: Props) => {
  const init: LoaderState = initialLoadingKeys
    ? {
        components: initialLoadingKeys,
        isLoading: initialLoadingKeys.length > 0,
      }
    : initialLoaderState

  const [state, setPageLoading] = useReducer(loaderReducer, init)
  const contextValue = useMemo(
    () => ({
      isPageLoading: state.isLoading,
      setPageLoading,
    }),
    [state]
  )

  return <PageLoaderContext.Provider value={contextValue}>{children}</PageLoaderContext.Provider>
}
