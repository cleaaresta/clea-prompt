export default function Shimmer({ width = '100%', height = '20px', borderRadius = '8px' }) {
  return (
    <div style={{
      width, height, borderRadius,
      background: 'linear-gradient(90deg, #f4efff 25%, #e8e1ec 50%, #f4efff 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s ease-in-out infinite',
    }} />
  )
}
