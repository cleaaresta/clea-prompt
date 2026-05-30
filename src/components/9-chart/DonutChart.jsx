export default function DonutChart({ segments = [], size = 160, strokeWidth = 20 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  let cumulativePercent = 0

  const colors = ['#e95dfd', '#fb878c', '#45c3f4', '#f5a92f', '#9b4bff']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#f4efff" strokeWidth={strokeWidth} />
        {segments.map((segment, i) => {
          const percent = total > 0 ? segment.value / total : 0
          const offset = circumference * (1 - percent)
          const rotation = cumulativePercent * 360
          cumulativePercent += percent
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={radius}
              fill="none" stroke={colors[i % colors.length]} strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`} strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(${rotation - 90} ${size / 2} ${size / 2})`}
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          )
        })}
      </svg>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        {segments.map((segment, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors[i % colors.length] }} />
            <span style={{ color: '#4b4560' }}>{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
