import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: '📊' },
  { label: 'Products', to: '/admin/products', icon: '💄' },
  { label: 'Make Sale', to: '/admin/make-sale', icon: '🛒' },
  { label: 'Inventory', to: '/admin/inventory', icon: '📦' },
  { label: 'Customers', to: '/admin/customers', icon: '👥' },
  { label: 'Analytics', to: '/admin/analytics', icon: '📈' },
  { label: 'Settings', to: '/admin/settings', icon: '⚙️' }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-card">
        <div className="brand-logo">💄</div>
        <div>
          <p className="brand-name">Glamour Studio</p>
          <p className="brand-subtitle">Beauty POS System</p>
        </div>
      </div>
      <nav className="main-nav">
        <p className="nav-section">Main Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <Link to="/login" className="button button-secondary logout-button">
          Logout
        </Link>
      </div>
    </aside>
  )
}
