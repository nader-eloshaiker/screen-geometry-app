import { TableHeading } from './TableHeading'
import { TableRow, TableRowProps } from './TableRow'

type StateTableProps = {
  caption: string
  headerTitles: Array<string>
  rows: Array<TableRowProps>
}

export const StateTable = ({ caption, headerTitles, rows }: StateTableProps) => {
  return (
    <table className='border border-dashed border-base-300'>
      <caption className='p-5'>{caption}</caption>
      <TableHeading colNames={headerTitles} />
      <tbody>
        {rows.map(({ rowName, data }) => (
          <TableRow key={rowName} rowName={rowName} data={data} />
        ))}
      </tbody>
    </table>
  )
}
