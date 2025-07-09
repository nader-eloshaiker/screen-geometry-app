import { ReactNode } from 'react'

export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type TReactChildren = {
  children: ReactNode
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R>
  ? R
  : any

export type TRestProps = Record<string, unknown>

export type ImportMetaMode = (typeof ImportMetaMode)[keyof typeof ImportMetaMode]

// eslint-disable-next-line no-redeclare
export const ImportMetaMode = {
  mocked: 'mocked',
  integrated: 'integrated',
} as const
