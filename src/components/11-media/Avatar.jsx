export default function Avatar({ name = '', emoji = '👤', size = 32, className = '' }) {
  return (
    <div className={`profile-avatar ${className}`.trim()} style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #e95dfd 0%, #fb878c 100%)',
      display: 'grid', placeItems: 'center', color: 'white',
      fontSize: size * 0.4, fontWeight: 700, flexShrink: 0,
    }}>
      {name ? name.charAt(0).toUpperCase() : emoji}
    </div>
  )
}
