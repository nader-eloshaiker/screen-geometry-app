import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

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
    <table className='border border-dashed border-mono-border'>
      <caption className='p-5'>{caption}</caption>
      {states && states.length > 0 && (
        <thead>
          <tr className='border border-dashed border-mono-border'>
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
          <tr key={prop} className='border border-dashed border-mono-border'>
            <td className='px-8 py-4 text-right text-sm' scope='row'>
              <span className={cn({ 'font-bold text-danger-label': defaultProps === prop })}>{prop}</span>
            </td>
            {cols.map((state) => (
              <td key={`${prop}-${state}`} className='px-1 py-2' scope='row'>
                <div className={cn('flex justify-center items-center p-3', getRowClassName(prop, state))}>
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
