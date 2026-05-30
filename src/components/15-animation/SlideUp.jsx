export default function SlideUp({ children, duration = '0.5s', delay = '0s', distance = '20px' }) {
  return (
    <div style={{
      animation: `slideUp ${duration} ease ${delay} both`,
      '--slide-distance': distance,
    }}>
      {children}
    </div>
  )
}
