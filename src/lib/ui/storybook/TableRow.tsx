import { ReactNode } from 'react'

export type TableRowProps = {
  rowName: string
  data: Record<string, ReactNode>
}

export const TableRow = ({ rowName, data }: TableRowProps) => {
  return (
    <tr className='border border-dashed border-base-300'>
      <td className='px-8 py-4 text-right text-sm font-bold' scope='row'>
        {rowName}
      </td>
      {Object.entries(data).map(([key, element]) => (
        <td key={`${rowName}-${key}`} className='px-8 py-4'>
          {element}
        </td>
      ))}
    </tr>
  )
}
