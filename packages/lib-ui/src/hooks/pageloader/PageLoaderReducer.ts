import { match } from 'ts-pattern'

/*
 Description:
 Loader State represents the current "components" that are loading
 as well as the overall loading state "isLoading" of the application.
 
 Components are represented as an array of strings identifiers, 
 which can be used to track which components are currently loading.
 This is useful for displaying loading indicators or managing the loading
 state of the application.
*/
export type ComponentsState = Array<string>
export type LoaderState = { components: ComponentsState; isLoading: boolean }
export const initialLoaderState: LoaderState = { components: [], isLoading: false }

export type LoaderEventTypes = 'loading' | 'idle'

export type LoaderEvent = { action: 'loading'; componentId: string } | { action: 'idle'; componentId: string }

export const loaderReducer = (state: LoaderState, event: LoaderEvent): LoaderState =>
  match(event)
    .returnType<LoaderState>()
    .with({ action: 'loading' }, ({ componentId }) => {
      const components: ComponentsState = state.components.includes(componentId)
        ? [...state.components]
        : [...state.components, componentId]
      return { components, isLoading: true }
    })
    .with({ action: 'idle' }, ({ componentId }) => {
      const components: ComponentsState = state.components.filter((value) => value !== componentId)
      return { components, isLoading: components.length > 0 }
    })
    .exhaustive()
