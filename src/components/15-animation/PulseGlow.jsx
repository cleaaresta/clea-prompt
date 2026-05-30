export default function PulseGlow({ children, color = 'rgba(233, 93, 253, 0.3)' }) {
  return (
    <div style={{
      animation: 'pulseGlow 2s ease-in-out infinite',
      '--glow-color': color,
    }}>
      {children}
    </div>
  )
}
