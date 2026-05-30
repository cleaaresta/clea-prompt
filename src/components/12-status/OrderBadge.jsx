export default function OrderBadge({ status = 'pending' }) {
  const styles = {
    pending: { background: '#fef3c7', color: '#d97706' },
    completed: { background: '#f0fdf4', color: '#16a34a' },
    cancelled: { background: '#fee2e2', color: '#dc2626' },
    processing: { background: '#eef2ff', color: '#3b4ac5' },
  }

  const style = styles[status] || styles.pending

  return (
    <span style={{
      display: 'inline-block', padding: '6px 12px', borderRadius: '8px',
      fontSize: '0.85rem', fontWeight: 600, ...style,
    }}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
