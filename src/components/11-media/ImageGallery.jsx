export default function ImageGallery({ images = [], columns = 3, gap = '12px' }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }}>
      {images.map((img, i) => (
        <div key={i} style={{
          borderRadius: '16px', overflow: 'hidden',
          aspectRatio: '1', background: '#f4d5ff',
        }}>
          <img src={img.src} alt={img.alt || ''} style={{
            width: '100%', height: '100%', objectFit: 'cover',
          }} loading="lazy" />
        </div>
      ))}
    </div>
  )
}
