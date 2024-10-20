import { ReactNode } from 'react'

export type TableRowProps = {
  rowName: string
  rows: Record<string, ReactNode>
}

export const TableRow = ({ rowName, rows }: TableRowProps) => {
  return (
    <tr className='border border-dashed border-base-300'>
      <td className='px-8 py-4 text-right text-sm font-bold' scope='row'>
        {rowName}
      </td>
      {Object.entries(rows).map(([key, element]) => (
        <td key={key} className='px-8 py-4'>
          {element}
        </td>
      ))}
    </tr>
  )
}
