declare module 'fuzzy-tools' {
  export type WhereRate = { value: string; rate: number }
  export type Where = string | string[] | Array<WhereRate> | { [key: string]: WhereRate }

  export type MatchOptions = {
    caseSensitive?: boolean
    withScore?: boolean
    withRanges?: boolean
    withWrapper?: string | ((w: unknown) => string)
  }
  export type ResultListItem = {
    score: number
    original: string
    index: string | number
    rate?: number
    wrapped?: Array<string>
    ranges?: Array<{ begin: number; end: number }>
  }

  export type ResultList = {
    score: number
    matches: { [key: string]: ResultListItem }
  }

  export function matchList(mask: string | string[], where: Where, options?: MatchOptions): ResultList | null

  export type ResultString = {
    score: number
    wrapped?: Array<string>
    ranges?: Array<{ begin: number; end: number }>
  }

  export function matchString(mask: string, where: string, options?: MatchOptions): ResultString | null

  export function match(
    mask: string | string[],
    where: string | Where,
    options?: MatchOptions,
  ): ResultList | ResultString | null

  export type FilterOptions<T = unknown> = {
    extract?: string | ((item: T) => string | Array<string> | Array<WhereRate>) | { [key: string]: string }
    itemWrapper: (item: T, matchResult: ResultString) => string
  } & MatchOptions

  export function filter<TData = unknown>(
    mask: string | string[],
    data: Array<TData>,
    options?: FilterOptions<T>,
  ): Array<TData>
}
