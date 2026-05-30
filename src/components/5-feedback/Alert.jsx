export default function Alert({ children, variant = 'info', className = '' }) {
  const styles = {
    info: { background: '#eef2ff', color: '#3b4ac5', border: '1px solid #c7d2fe' },
    success: { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' },
    warning: { background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' },
    error: { background: '#ffe6e8', color: '#b92d40', border: '1px solid #fecaca' },
  }

  return (
    <div
      className={`glamour-alert ${className}`.trim()}
      style={{
        padding: '14px 16px',
        borderRadius: '18px',
        fontSize: '0.95rem',
        ...styles[variant],
      }}
      role="alert"
    >
      {children}
    </div>
  )
}
