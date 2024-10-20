type TableHeadingProps = {
  colNames: Array<string>
}

export const TableHeading = ({ colNames }: TableHeadingProps) => {
  return (
    <thead>
      <tr className='border border-dashed border-base-300'>
        <th className='px-8 py-4' scope='col'></th>
        {colNames.map((state) => (
          <th className='px-8 py-4' key={state} scope='col'>
            {state}
          </th>
        ))}
      </tr>
    </thead>
  )
}
