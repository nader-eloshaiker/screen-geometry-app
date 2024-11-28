import { ReactNode } from 'react'

type StateTableProps<T> = {
  caption: string
  states?: Array<string>
  props: Array<NonNullable<T>>
  getComponent: (prop: T, state: string) => ReactNode
}

export const StateTable = <T extends string>({
  caption,
  getComponent,
  props,
  states = ['normal', 'hover', 'focus', 'active', 'disabled'],
}: StateTableProps<T>) => {
  return (
    <table className='border border-dashed border-base-300'>
      <caption className='p-5'>{caption}</caption>
      <thead>
        <tr className='border border-dashed border-base-300'>
          <th className='px-8 py-4' scope='col'></th>
          {states.map((title) => (
            <th className='px-8 py-4' key={title} scope='col'>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop} className='border border-dashed border-base-300'>
            <td className='px-8 py-4 text-right text-sm font-bold' scope='row'>
              {prop}
            </td>
            {states.map((state) => (
              <td key={`${prop}-${state}`} className='px-8 py-4'>
                {getComponent(prop, state)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
