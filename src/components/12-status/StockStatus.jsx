export default function StockStatus({ status }) {
  const statusClass = status.toLowerCase().replace(' ', '-')

  return (
    <span className={`stock-status ${statusClass}`}>
      {status}
    </span>
  )
}
