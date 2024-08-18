// declare module '*.css'

type TReactChildren = {
  children?: React.ReactNode
}

type TRestProps = Record<string, unknown>

type Maybe<T> = T | undefined

type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>

type TDispatchAction<TAction, TData> = { type: TAction; payload: TData | undefined }

type Nullable<T> = T | null | undefined
type NullableObj<T> = { [K in keyof T]: T[K] | null }
type DeepNullableObj<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null
}
type Undefinable<T> = T | undefined
type UndefinableObj<T> = { [K in keyof T]: T[K] | undefined }
type DeepUndefinableObj<T> = {
  [K in keyof T]: DeepUndefinableObj<T[K]> | null
}
