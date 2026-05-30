export default function Caption({ children, className = '' }) {
  return (
    <p className={className} style={{
      margin: 0, fontSize: '0.85rem', color: '#a89fb8', lineHeight: 1.5,
    }}>
      {children}
    </p>
  )
}
