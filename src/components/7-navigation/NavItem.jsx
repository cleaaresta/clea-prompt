import { NavLink as RouterNavLink } from 'react-router-dom'

export default function NavItem({ to, icon, label, end = false }) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
    >
      <span className="nav-icon">{icon}</span>
      {label}
    </RouterNavLink>
  )
}
