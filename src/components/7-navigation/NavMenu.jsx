export default function NavMenu({ items = [], title = 'Menu' }) {
  return (
    <nav className="main-nav">
      <p className="nav-section">{title}</p>
      {items.map((item) => (
        <a key={item.to} href={item.to} className="nav-link">
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  )
}
