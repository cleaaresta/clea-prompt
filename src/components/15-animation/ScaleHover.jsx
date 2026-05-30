export default function ScaleHover({ children, scale = 1.03 }) {
  return (
    <div style={{
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={(e) => e.currentTarget.style.transform = `scale(${scale})`}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {children}
    </div>
  )
}
