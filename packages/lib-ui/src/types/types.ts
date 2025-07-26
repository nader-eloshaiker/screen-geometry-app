export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type AsyncReturnType<T extends (...args: Array<unknown>) => Promise<unknown>> = T extends (
  ...args: Array<unknown>
) => Promise<infer R>
  ? R
  : unknown

export type TRestProps = Record<string, unknown>

export type ImportMetaMode = (typeof ImportMetaMode)[keyof typeof ImportMetaMode]

export const ImportMetaMode = {
  mocked: 'mocked',
  integrated: 'integrated',
} as const
