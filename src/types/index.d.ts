// declare module '*.css'

type TReactChildren = {
  children?: React.ReactNode
}

type TRestProps = Record<string, unknown>

type Maybe<T> = T | undefined

type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>

type TDispatchAction<TAction, TData> = { type: TAction; payload: TData | undefined }

type Nullable<T> = T | null | undefined
type Undefined<T> = T | undefined
