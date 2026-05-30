export default function Divider({ className = '', vertical = false }) {
  return (
    <div
      className={`glamour-divider ${vertical ? 'glamour-divider-vertical' : ''} ${className}`.trim()}
      role="separator"
    />
  )
}
