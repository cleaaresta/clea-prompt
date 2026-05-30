export default function Eyebrow({ children, className = '' }) {
  return (
    <p className={`eyebrow ${className}`.trim()}>
      {children}
    </p>
  )
}
