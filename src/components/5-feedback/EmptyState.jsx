export default function EmptyState({ icon = '📭', title, description }) {
  return (
    <div className="glamour-empty-state" style={{
      padding: '40px 24px', textAlign: 'center', color: '#a89fb8',
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
      <p style={{ margin: '8px 0', fontWeight: 600, color: '#4b4560' }}>{title}</p>
      {description && <p style={{ margin: '8px 0' }}>{description}</p>}
    </div>
  )
}
