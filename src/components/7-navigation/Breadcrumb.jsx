export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="glamour-breadcrumb" style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      fontSize: '0.9rem', color: '#a89fb8',
    }}>
      {items.map((item, index) => (
        <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {index > 0 && <span style={{ color: '#d4cde0' }}>›</span>}
          {item.href ? (
            <a href={item.href} style={{ color: '#7b61c4', textDecoration: 'none' }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: '#4b4560', fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
