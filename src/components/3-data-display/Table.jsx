export default function Table({ columns = [], data = [], renderActions, className = '' }) {
  return (
    <table className={`data-table ${className}`.trim()}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className={col.className || ''}>
              {col.label}
            </th>
          ))}
          {renderActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={row.id || rowIndex}>
            {columns.map((col) => (
              <td key={col.key} className={col.cellClassName || ''}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {renderActions && (
              <td className="actions">{renderActions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
