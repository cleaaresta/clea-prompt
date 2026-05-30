export default function IconBadge({ emoji, color = '#f4d5ff', size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '14px',
      background: color, display: 'grid', placeItems: 'center',
      fontSize: size * 0.45, flexShrink: 0,
    }}>
      {emoji}
    </div>
  )
}
