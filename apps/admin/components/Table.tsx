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
import Link from 'next/link';

export default function Table({
  tableColumnNames,
  tableRows,
  link,
  linkProperty,
  prependLink,
}: {
  tableColumnNames: { id: string; name: string }[];
  tableRows: Record<string, string>[];
  link?: boolean;
  linkProperty?: string;
  prependLink?: string;
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
            <tr key={rowIndex} className="mb-6">
              {tableColumnNames.map((column) => (
                <td
                  className={`min-w-[150px] py-2 ${rowIndex > 0 && 'border-t'}`}
                  key={column.id}
                >
                  <Link
                    href={
                      linkProperty && link
                        ? `${prependLink}/${row[linkProperty]}`
                        : '#'
                    }
                  >
                    {row[column.id]}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}