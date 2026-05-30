export default function Badge({ children, variant = 'default', className = '' }) {
  const variantClasses = {
    default: 'badge',
    vip: 'status vip',
    regular: 'status regular',
    success: 'badge badge-success',
    warning: 'badge badge-warning',
  }

  return (
    <span className={`${variantClasses[variant] || 'badge'} ${className}`.trim()}>
      {children}
    </span>
  )
}
