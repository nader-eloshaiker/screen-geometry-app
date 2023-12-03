// declare module '*.css'

type TReactChildren = {
  children?: React.ReactNode
}

type TRestProps = Record<string, unknown>

type Maybe<T> = T | undefined

type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>

// eslint-disable-next-line @typescript-eslint/ban-types
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown ? A : never
