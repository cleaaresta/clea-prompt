export default function ProgressBar({ value = 0, max = 100, color, label, showPercent = true }) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100)
  const barColor = color || (percent > 70 ? '#16a34a' : percent > 40 ? '#f5a92f' : '#dc2626')

  return (
    <div className="glamour-progress" style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
          <span style={{ color: '#4b4560' }}>{label}</span>
          {showPercent && <span style={{ color: '#a89fb8' }}>{Math.round(percent)}%</span>}
        </div>
      )}
      <div style={{
        width: '100%', height: '8px', borderRadius: '4px',
        background: '#f4efff', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: '4px',
          width: `${percent}%`, background: barColor,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  )
}
