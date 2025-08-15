import { ReactNode } from 'react'
import { cn } from '../lib/utils'

type StateTableProps<T> = {
  caption: string
  states?: Array<string>
  defaultProps: T
  props: Array<NonNullable<T>>
  getComponent: (prop: T, state: string) => ReactNode
  getRowClassName?: (prop: T, state: string) => string
}

export const StateTable = <T extends string>({
  caption,
  getComponent,
  defaultProps,
  props,
  states,
  getRowClassName = () => '',
}: StateTableProps<T>) => {
  const cols = states && states.length > 0 ? states : ['normal']

  return (
    <table className='border-mono-border border border-dashed'>
      <caption className='p-5'>{caption}</caption>
      {states && states.length > 0 && (
        <thead>
          <tr className='border-mono-border border border-dashed'>
            <th className='px-8 py-4 font-normal' scope='col'></th>
            {cols.map((title) => (
              <th className='px-8 py-4 font-normal' key={title} scope='col'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {props.map((prop) => (
          <tr key={prop} className='border-mono-border border border-dashed'>
            <td className='px-8 py-4 text-right text-sm' scope='row'>
              <span className={cn({ 'text-danger-label font-bold': defaultProps === prop })}>{prop}</span>
            </td>
            {cols.map((state) => (
              <td key={`${prop}-${state}`} className='px-1 py-2' scope='row'>
                <div className={cn('flex items-center justify-center p-3', getRowClassName(prop, state))}>
                  {getComponent(prop, state)}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
