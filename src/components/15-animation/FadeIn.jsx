export default function FadeIn({ children, duration = '0.5s', delay = '0s' }) {
  return (
    <div style={{
      animation: `fadeIn ${duration} ease ${delay} both`,
    }}>
      {children}
    </div>
  )
}
