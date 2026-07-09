export default function BarChart({ data = [], height = 200, className = '' }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={`glamour-bar-chart ${className}`.trim()} style={{
      display: 'flex', alignItems: 'flex-end', gap: '8px', height, padding: '0 12px',
    }}>
      {data.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%' }}>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{
              width: '100%', maxWidth: '48px',
              height: `${(item.value / maxValue) * 100}%`,
              background: 'linear-gradient(180deg, #e95dfd 0%, #fb878c 100%)',
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.5s ease',
              minHeight: '4px',
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a89fb8' }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
