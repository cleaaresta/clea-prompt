export default function PaymentBadge({ method = 'cash' }) {
  const styles = {
    cash: { bg: '#f0fdf4', color: '#16a34a', icon: '💵' },
    card: { bg: '#eef2ff', color: '#3b4ac5', icon: '💳' },
    transfer: { bg: '#f4d5ff', color: '#8b47c9', icon: '🏦' },
    qris: { bg: '#fef3c7', color: '#d97706', icon: '📱' },
  }

  const s = styles[method] || styles.cash

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem',
      fontWeight: 600, background: s.bg, color: s.color,
    }}>
      {s.icon} {method.charAt(0).toUpperCase() + method.slice(1)}
    </span>
  )
}
