export default function Label({ children, htmlFor, required = false, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={className} style={{
      color: '#5f4e6d', fontSize: '0.95rem', fontWeight: 600,
    }}>
      {children}
      {required && <span style={{ color: '#ef4ea7', marginLeft: '4px' }}>*</span>}
    </label>
  )
}
