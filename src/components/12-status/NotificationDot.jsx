export default function NotificationDot({ count = 0, color = '#ef4ea7' }) {
  if (count <= 0) return null

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: '20px', height: '20px', borderRadius: '10px',
      background: color, color: 'white', fontSize: '0.7rem',
      fontWeight: 700, padding: '0 6px',
    }}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
