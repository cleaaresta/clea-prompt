export default function Thumbnail({ src, alt, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '12px', overflow: 'hidden',
      border: '2px solid #f4efff', flexShrink: 0,
    }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(180deg, #fff8ff 0%, #f5edf7 100%)',
          display: 'grid', placeItems: 'center', fontSize: size * 0.4, color: '#a89fb8',
        }}>📷</div>
      )}
    </div>
  )
}
