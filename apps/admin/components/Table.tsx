// const tableColumnNames = [
//   { id: 'company', name: 'Company' },
//   { id: 'email', name: 'Email' },
// ];

// const tableRows = [
//   { id: '1', company: 'Alfreds Futterkiste', email: 'example@example.com' },
//   {
//     id: '2',
//     company: 'Centro comercial Moctezuma',
//     email: 'Francisco@gmail.com',
//   },
// ];

export default function Table({
  tableColumnNames,
  tableRows,
}: {
  tableColumnNames: { id: string; name: string }[];
  tableRows: Record<string, string>[];
}) {
  return (
    <div className="p-4 shadow overflow-y-auto rounded-lg">
      <table className="min-w-full table-fixed border-spacing-3">
        <tbody>
          <tr className="text-left">
            {tableColumnNames.map((column) => (
              <th className="min-w-[150px] py-2" key={column.name}>
                {column.name}
              </th>
            ))}
          </tr>
          {tableRows.map((row: Record<string, string>, rowIndex) => (
            <tr key={row.id} className="mb-6">
              {tableColumnNames.map((column) => (
                <td
                  className={`min-w-[150px] py-2 ${rowIndex > 0 && 'border-t'}`}
                  key={column.id}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
