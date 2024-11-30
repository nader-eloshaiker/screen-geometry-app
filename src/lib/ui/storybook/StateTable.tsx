import { cn } from '@/lib/utils/class-name'
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
  states = ['normal', 'hover', 'focus', 'active', 'disabled'],
  getRowClassName = () => '',
}: StateTableProps<T>) => {
  return (
    <table className='border border-dashed border-base-300'>
      <caption className='p-5'>{caption}</caption>
      <thead>
        <tr className='border border-dashed border-base-300'>
          <th className='px-8 py-4 font-normal' scope='col'></th>
          {states.map((title) => (
            <th className='px-8 py-4 font-normal' key={title} scope='col'>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop} className='border border-dashed border-base-300'>
            <td className='px-8 py-4 text-right text-sm' scope='row'>
              <span className={cn({ 'font-bold text-danger-active': defaultProps === prop })}>{prop}</span>
            </td>
            {states.map((state) => (
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
