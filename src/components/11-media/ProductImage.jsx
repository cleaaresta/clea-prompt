export default function ProductImage({ src, alt, size = 64, fallbackEmoji = '💄' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '16px', overflow: 'hidden',
      background: '#f4d5ff', display: 'grid', placeItems: 'center',
      flexShrink: 0,
    }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      ) : (
        <span style={{ fontSize: size * 0.45 }}>{fallbackEmoji}</span>
      )}
    </div>
  )
}
