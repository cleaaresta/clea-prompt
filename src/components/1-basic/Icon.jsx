export default function Icon({ emoji, size = 'md', className = '' }) {
  const sizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
  }

  return (
    <span
      className={`glamour-icon ${className}`}
      style={{ fontSize: sizes[size] || sizes.md, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      role="img"
    >
      {emoji}
    </span>
  )
}
