export default function Spinner({ size = 32, className = '' }) {
  return (
    <div className={`glamour-spinner ${className}`.trim()} style={{
      width: size, height: size,
      border: '3px solid #f4d5ff',
      borderTop: '3px solid #8416d9',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      display: 'inline-block',
    }} />
  )
}
